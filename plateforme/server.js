const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db');
const srs = require('./srs');
const { checkTyped, checkMcq } = require('./answercheck');

const app = express();
const PORT = process.env.PORT || 4321;

app.use(express.json());
app.use(
  session({
    name: 'learnlang.sid',
    secret: 'learnlang-local-secret-change-if-you-care',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

// ---------- Auth helpers ----------

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Non connecté.' });
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Non connecté.' });
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.session.userId);
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Réservé aux administrateurs.' });
  next();
}

function currentUser(req) {
  return db.prepare('SELECT id, username, display_name, role FROM users WHERE id = ?').get(req.session.userId);
}

// ---------- Auth routes ----------

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(String(username || '').trim());
  if (!user || !bcrypt.compareSync(String(password || ''), user.password_hash)) {
    return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
  }
  req.session.userId = user.id;
  res.json({ id: user.id, username: user.username, display_name: user.display_name, role: user.role });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/me', requireAuth, (req, res) => {
  res.json(currentUser(req));
});

app.post('/api/me/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);
  if (!bcrypt.compareSync(String(currentPassword || ''), user.password_hash)) {
    return res.status(400).json({ error: 'Mot de passe actuel incorrect.' });
  }
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit faire au moins 4 caractères.' });
  }
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, user.id);
  res.json({ ok: true });
});

// ---------- Student API ----------

const MASTERY_REPETITIONS = 2; // nb de répétitions réussies pour considérer une question "maîtrisée"

app.get('/api/languages', requireAuth, (req, res) => {
  res.json(db.prepare('SELECT id, code, name, flag_emoji FROM languages ORDER BY position, id').all());
});

app.get('/api/languages/:id/lessons', requireAuth, (req, res) => {
  const languageId = Number(req.params.id);
  const lessons = db
    .prepare('SELECT id, title, position FROM lessons WHERE language_id = ? ORDER BY position, id')
    .all(languageId);

  const totalQStmt = db.prepare('SELECT COUNT(*) c FROM questions WHERE lesson_id = ?');
  const masteredStmt = db.prepare(
    `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id
     WHERE q.lesson_id = ? AND p.user_id = ? AND p.repetitions >= ?`
  );
  const dueStmt = db.prepare(
    `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id
     WHERE q.lesson_id = ? AND p.user_id = ? AND p.next_review_date <= date('now')`
  );

  const result = lessons.map((l) => {
    const total = totalQStmt.get(l.id).c;
    const mastered = masteredStmt.get(l.id, req.session.userId, MASTERY_REPETITIONS).c;
    const due = dueStmt.get(l.id, req.session.userId).c;
    return { ...l, totalQuestions: total, masteredCount: mastered, dueCount: due };
  });
  res.json(result);
});

app.get('/api/lessons/:id', requireAuth, (req, res) => {
  const lesson = db
    .prepare(
      `SELECT lessons.id, lessons.title, lessons.content_md, languages.name as languageName, languages.id as languageId
       FROM lessons JOIN languages ON languages.id = lessons.language_id WHERE lessons.id = ?`
    )
    .get(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Leçon introuvable.' });
  res.json(lesson);
});

app.get('/api/lessons/:id/quiz', requireAuth, (req, res) => {
  const lessonId = Number(req.params.id);
  const limit = Math.min(Number(req.query.limit) || 10, 30);
  const force = req.query.force === 'true';
  const userId = req.session.userId;

  const due = db
    .prepare(
      `SELECT q.id, q.type, q.prompt, q.options_json, p.next_review_date
       FROM questions q JOIN progress p ON p.question_id = q.id
       WHERE q.lesson_id = ? AND p.user_id = ? AND p.next_review_date <= date('now')
       ORDER BY p.next_review_date ASC`
    )
    .all(lessonId, userId);

  const seenIds = db
    .prepare(`SELECT question_id FROM progress WHERE user_id = ?`)
    .all(userId)
    .map((r) => r.question_id);

  const neverSeen = db
    .prepare(
      `SELECT id, type, prompt, options_json FROM questions WHERE lesson_id = ? ${
        seenIds.length ? `AND id NOT IN (${seenIds.join(',')})` : ''
      } ORDER BY RANDOM()`
    )
    .all(lessonId);

  let pool = [...due, ...neverSeen];

  if (pool.length === 0 && force) {
    pool = db
      .prepare(`SELECT id, type, prompt, options_json FROM questions WHERE lesson_id = ? ORDER BY RANDOM()`)
      .all(lessonId);
  }

  const items = pool.slice(0, limit).map((q) => ({
    questionId: q.id,
    type: q.type,
    prompt: q.prompt,
    options: q.options_json ? JSON.parse(q.options_json) : null,
  }));

  res.json({ lessonId, items, hasMore: pool.length > limit });
});

app.post('/api/questions/:id/answer', requireAuth, (req, res) => {
  const questionId = Number(req.params.id);
  const userId = req.session.userId;
  const { answer } = req.body || {};

  const question = db.prepare('SELECT * FROM questions WHERE id = ?').get(questionId);
  if (!question) return res.status(404).json({ error: 'Question introuvable.' });

  const accepted = JSON.parse(question.accepted_answers_json);
  const result =
    question.type === 'typed' ? checkTyped(answer, accepted) : checkMcq(answer, accepted);

  let prog = db.prepare('SELECT * FROM progress WHERE user_id = ? AND question_id = ?').get(userId, questionId);
  if (!prog) {
    db.prepare(
      `INSERT INTO progress (user_id, question_id, ease_factor, interval_days, repetitions, next_review_date, times_seen, times_correct)
       VALUES (?, ?, 2.5, 0, 0, date('now'), 0, 0)`
    ).run(userId, questionId);
    prog = db.prepare('SELECT * FROM progress WHERE user_id = ? AND question_id = ?').get(userId, questionId);
  }

  const next = srs.schedule(prog, result.correct);
  db.prepare(
    `UPDATE progress SET ease_factor = ?, interval_days = ?, repetitions = ?, next_review_date = ?,
     times_seen = times_seen + 1, times_correct = times_correct + ?, last_result = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(
    next.ease_factor,
    next.interval_days,
    next.repetitions,
    next.next_review_date,
    result.correct ? 1 : 0,
    result.correct ? 1 : 0,
    prog.id
  );

  db.prepare('INSERT INTO attempts (user_id, question_id, correct, answer_given) VALUES (?, ?, ?, ?)').run(
    userId,
    questionId,
    result.correct ? 1 : 0,
    String(answer || '')
  );

  res.json({
    correct: result.correct,
    exact: result.exact,
    correctAnswer: accepted[0],
    explanation: question.explanation,
    nextReviewDate: next.next_review_date,
  });
});

app.get('/api/me/stats', requireAuth, (req, res) => {
  const userId = req.session.userId;
  const languages = db.prepare('SELECT id, name, flag_emoji FROM languages ORDER BY position, id').all();

  const perLanguage = languages.map((lang) => {
    const total = db
      .prepare(
        `SELECT COUNT(*) c FROM questions q JOIN lessons l ON l.id = q.lesson_id WHERE l.language_id = ?`
      )
      .get(lang.id).c;
    const mastered = db
      .prepare(
        `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id JOIN lessons l ON l.id = q.lesson_id
         WHERE l.language_id = ? AND p.user_id = ? AND p.repetitions >= ?`
      )
      .get(lang.id, userId, MASTERY_REPETITIONS).c;
    const due = db
      .prepare(
        `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id JOIN lessons l ON l.id = q.lesson_id
         WHERE l.language_id = ? AND p.user_id = ? AND p.next_review_date <= date('now')`
      )
      .get(lang.id, userId).c;
    return { ...lang, totalQuestions: total, masteredCount: mastered, dueCount: due };
  });

  const streakRow = db
    .prepare(
      `SELECT COUNT(DISTINCT date(created_at)) c FROM attempts WHERE user_id = ? AND date(created_at) >= date('now', '-1 day')`
    )
    .get(userId);

  res.json({ perLanguage, activeToday: streakRow.c > 0 });
});

// ---------- Admin API ----------

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const userCount = db.prepare("SELECT COUNT(*) c FROM users WHERE role = 'student'").get().c;
  const languageCount = db.prepare('SELECT COUNT(*) c FROM languages').get().c;
  const lessonCount = db.prepare('SELECT COUNT(*) c FROM lessons').get().c;
  const questionCount = db.prepare('SELECT COUNT(*) c FROM questions').get().c;
  const mostMissed = db
    .prepare(
      `SELECT q.id, q.prompt, l.title as lessonTitle,
              SUM(a.correct = 0) as misses, COUNT(*) as attempts
       FROM attempts a JOIN questions q ON q.id = a.question_id JOIN lessons l ON l.id = q.lesson_id
       GROUP BY q.id HAVING attempts >= 2
       ORDER BY (1.0 * misses / attempts) DESC, attempts DESC
       LIMIT 10`
    )
    .all();
  res.json({ userCount, languageCount, lessonCount, questionCount, mostMissed });
});

app.get('/api/admin/languages', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM languages ORDER BY position, id').all());
});

app.post('/api/admin/languages', requireAdmin, (req, res) => {
  const { code, name, flag_emoji, position } = req.body || {};
  if (!code || !name) return res.status(400).json({ error: 'code et name sont requis.' });
  const info = db
    .prepare('INSERT INTO languages (code, name, flag_emoji, position) VALUES (?, ?, ?, ?)')
    .run(code, name, flag_emoji || '🌐', position || 0);
  res.json(db.prepare('SELECT * FROM languages WHERE id = ?').get(info.lastInsertRowid));
});

app.put('/api/admin/languages/:id', requireAdmin, (req, res) => {
  const { code, name, flag_emoji, position } = req.body || {};
  db.prepare('UPDATE languages SET code=?, name=?, flag_emoji=?, position=? WHERE id=?').run(
    code,
    name,
    flag_emoji,
    position || 0,
    req.params.id
  );
  res.json(db.prepare('SELECT * FROM languages WHERE id = ?').get(req.params.id));
});

app.delete('/api/admin/languages/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM languages WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.get('/api/admin/languages/:id/lessons', requireAdmin, (req, res) => {
  res.json(
    db.prepare('SELECT * FROM lessons WHERE language_id = ? ORDER BY position, id').all(req.params.id)
  );
});

app.post('/api/admin/languages/:id/lessons', requireAdmin, (req, res) => {
  const { title, content_md, position } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title est requis.' });
  const info = db
    .prepare('INSERT INTO lessons (language_id, position, title, content_md) VALUES (?, ?, ?, ?)')
    .run(req.params.id, position || 0, title, content_md || '');
  res.json(db.prepare('SELECT * FROM lessons WHERE id = ?').get(info.lastInsertRowid));
});

app.get('/api/admin/lessons/:id', requireAdmin, (req, res) => {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Leçon introuvable.' });
  res.json(lesson);
});

app.put('/api/admin/lessons/:id', requireAdmin, (req, res) => {
  const { title, content_md, position } = req.body || {};
  db.prepare('UPDATE lessons SET title=?, content_md=?, position=? WHERE id=?').run(
    title,
    content_md,
    position || 0,
    req.params.id
  );
  res.json(db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id));
});

app.delete('/api/admin/lessons/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM lessons WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.get('/api/admin/lessons/:id/questions', requireAdmin, (req, res) => {
  const questions = db
    .prepare('SELECT * FROM questions WHERE lesson_id = ? ORDER BY position, id')
    .all(req.params.id);
  res.json(
    questions.map((q) => ({
      ...q,
      options: q.options_json ? JSON.parse(q.options_json) : null,
      accepted_answers: JSON.parse(q.accepted_answers_json),
    }))
  );
});

app.post('/api/admin/lessons/:id/questions', requireAdmin, (req, res) => {
  const { type, prompt, options, accepted_answers, explanation, position } = req.body || {};
  if (!type || !prompt || !accepted_answers || !accepted_answers.length) {
    return res.status(400).json({ error: 'type, prompt et accepted_answers sont requis.' });
  }
  if (type === 'mcq' && (!options || options.length < 2)) {
    return res.status(400).json({ error: 'Une question QCM nécessite au moins 2 options.' });
  }
  const info = db
    .prepare(
      `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      req.params.id,
      position || 0,
      type,
      prompt,
      type === 'mcq' ? JSON.stringify(options) : null,
      JSON.stringify(accepted_answers),
      explanation || ''
    );
  res.json(db.prepare('SELECT * FROM questions WHERE id = ?').get(info.lastInsertRowid));
});

app.put('/api/admin/questions/:id', requireAdmin, (req, res) => {
  const { type, prompt, options, accepted_answers, explanation, position } = req.body || {};
  db.prepare(
    `UPDATE questions SET type=?, prompt=?, options_json=?, accepted_answers_json=?, explanation=?, position=?
     WHERE id=?`
  ).run(
    type,
    prompt,
    type === 'mcq' ? JSON.stringify(options) : null,
    JSON.stringify(accepted_answers),
    explanation || '',
    position || 0,
    req.params.id
  );
  res.json(db.prepare('SELECT * FROM questions WHERE id = ?').get(req.params.id));
});

app.delete('/api/admin/questions/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM questions WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json(
    db.prepare('SELECT id, username, display_name, role, created_at FROM users ORDER BY created_at').all()
  );
});

app.post('/api/admin/users', requireAdmin, (req, res) => {
  const { username, password, display_name, role } = req.body || {};
  if (!username || !password || !display_name) {
    return res.status(400).json({ error: 'username, password et display_name sont requis.' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) return res.status(409).json({ error: 'Cet identifiant existe déjà.' });
  const hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare('INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)')
    .run(username, hash, display_name, role === 'admin' ? 'admin' : 'student');
  res.json(
    db.prepare('SELECT id, username, display_name, role, created_at FROM users WHERE id = ?').get(info.lastInsertRowid)
  );
});

app.put('/api/admin/users/:id', requireAdmin, (req, res) => {
  const { display_name, role, password } = req.body || {};
  if (display_name !== undefined) {
    db.prepare('UPDATE users SET display_name = ? WHERE id = ?').run(display_name, req.params.id);
  }
  if (role !== undefined) {
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role === 'admin' ? 'admin' : 'student', req.params.id);
  }
  if (password) {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, req.params.id);
  }
  res.json(db.prepare('SELECT id, username, display_name, role, created_at FROM users WHERE id = ?').get(req.params.id));
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  if (Number(req.params.id) === req.session.userId) {
    return res.status(400).json({ error: 'Tu ne peux pas supprimer ton propre compte.' });
  }
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.get('/api/admin/users/:id/progress', requireAdmin, (req, res) => {
  const userId = req.params.id;
  const lessons = db
    .prepare(
      `SELECT lessons.id, lessons.title, languages.name as languageName
       FROM lessons JOIN languages ON languages.id = lessons.language_id ORDER BY languages.position, lessons.position`
    )
    .all();
  const totalQStmt = db.prepare('SELECT COUNT(*) c FROM questions WHERE lesson_id = ?');
  const masteredStmt = db.prepare(
    `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id
     WHERE q.lesson_id = ? AND p.user_id = ? AND p.repetitions >= ?`
  );
  const result = lessons.map((l) => ({
    ...l,
    totalQuestions: totalQStmt.get(l.id).c,
    masteredCount: masteredStmt.get(l.id, userId, MASTERY_REPETITIONS).c,
  }));
  res.json(result);
});

// ---------- Static frontend ----------

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  // On Mac, exclude virtual/bridge/tunnel interfaces (Internet Sharing, Thunderbolt
  // Bridge, VPNs...) that aren't reachable from other devices on the actual wifi.
  const lanIps = Object.entries(os.networkInterfaces())
    .filter(([name]) => !/^(bridge|utun|awdl|llw|anpi|ap\d)/i.test(name))
    .flatMap(([, addrs]) => addrs)
    .filter((i) => i.family === 'IPv4' && !i.internal)
    .map((i) => i.address);

  console.log(`\nLearnLang lancé !`);
  console.log(`  Sur ce Mac      : http://localhost:${PORT}`);
  lanIps.forEach((ip) => console.log(`  Sur le wifi     : http://${ip}:${PORT}`));
  if (lanIps.length === 0) console.log('  (Aucune adresse réseau locale détectée — vérifie ta connexion wifi.)');
  console.log('');
});
