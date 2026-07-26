const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db');
const srs = require('./srs');
const { checkTyped, checkMcq } = require('./answercheck');

const app = express();
const PORT = process.env.PORT || 4321;

// Nécessaire derrière un proxy inverse (Render, etc.) pour que Express sache
// que la requête d'origine était bien en HTTPS — sinon les cookies "secure"
// ne sont pas reconnus et la session ne persiste pas.
app.set('trust proxy', 1);

// Enveloppe les routes async pour que les erreurs tombent proprement dans le
// middleware d'erreur Express plutôt que de faire planter/pendre la requête.
function ah(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

app.use(express.json());
app.use(
  session({
    name: 'learnlang.sid',
    secret: process.env.SESSION_SECRET || 'learnlang-local-secret-change-if-you-care',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

// ---------- Auth helpers ----------

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Non connecté.' });
  next();
}

const requireAdmin = ah(async (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Non connecté.' });
  const user = await db.get('SELECT role FROM users WHERE id = ?', [req.session.userId]);
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Réservé aux administrateurs.' });
  next();
});

async function currentUser(req) {
  return db.get('SELECT id, username, display_name, role FROM users WHERE id = ?', [req.session.userId]);
}

// ---------- Auth routes ----------

app.post(
  '/api/login',
  ah(async (req, res) => {
    const { username, password } = req.body || {};
    const user = await db.get('SELECT * FROM users WHERE username = ?', [String(username || '').trim()]);
    if (!user || !bcrypt.compareSync(String(password || ''), user.password_hash)) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
    }
    req.session.userId = user.id;
    res.json({ id: user.id, username: user.username, display_name: user.display_name, role: user.role });
  })
);

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get(
  '/api/me',
  requireAuth,
  ah(async (req, res) => {
    res.json(await currentUser(req));
  })
);

app.post(
  '/api/me/password',
  requireAuth,
  ah(async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    const user = await db.get('SELECT * FROM users WHERE id = ?', [req.session.userId]);
    if (!bcrypt.compareSync(String(currentPassword || ''), user.password_hash)) {
      return res.status(400).json({ error: 'Mot de passe actuel incorrect.' });
    }
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit faire au moins 4 caractères.' });
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    await db.run('UPDATE users SET password_hash = ? WHERE id = ?', [hash, user.id]);
    res.json({ ok: true });
  })
);

// ---------- Student API ----------

const MASTERY_REPETITIONS = 2; // nb de répétitions réussies pour considérer une question "maîtrisée"

app.get(
  '/api/languages',
  requireAuth,
  ah(async (req, res) => {
    res.json(await db.all('SELECT id, code, name, flag_emoji FROM languages ORDER BY position, id'));
  })
);

app.get(
  '/api/languages/:id/lessons',
  requireAuth,
  ah(async (req, res) => {
    const languageId = Number(req.params.id);
    const lessons = await db.all('SELECT id, title, position FROM lessons WHERE language_id = ? ORDER BY position, id', [
      languageId,
    ]);
    const todayStr = srs.today();

    const result = await Promise.all(
      lessons.map(async (l) => {
        const total = (await db.get('SELECT COUNT(*) c FROM questions WHERE lesson_id = ?', [l.id])).c;
        const mastered = (
          await db.get(
            `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id
             WHERE q.lesson_id = ? AND p.user_id = ? AND p.repetitions >= ?`,
            [l.id, req.session.userId, MASTERY_REPETITIONS]
          )
        ).c;
        const due = (
          await db.get(
            `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id
             WHERE q.lesson_id = ? AND p.user_id = ? AND p.next_review_date <= ?`,
            [l.id, req.session.userId, todayStr]
          )
        ).c;
        return { ...l, totalQuestions: Number(total), masteredCount: Number(mastered), dueCount: Number(due) };
      })
    );
    res.json(result);
  })
);

app.get(
  '/api/lessons/:id',
  requireAuth,
  ah(async (req, res) => {
    const lesson = await db.get(
      `SELECT lessons.id, lessons.title, lessons.content_md, languages.name as "languageName", languages.id as "languageId"
       FROM lessons JOIN languages ON languages.id = lessons.language_id WHERE lessons.id = ?`,
      [req.params.id]
    );
    if (!lesson) return res.status(404).json({ error: 'Leçon introuvable.' });
    res.json(lesson);
  })
);

app.get(
  '/api/lessons/:id/quiz',
  requireAuth,
  ah(async (req, res) => {
    const lessonId = Number(req.params.id);
    const limit = Math.min(Number(req.query.limit) || 10, 30);
    const force = req.query.force === 'true';
    const userId = req.session.userId;
    const todayStr = srs.today();

    const due = await db.all(
      `SELECT q.id, q.type, q.prompt, q.options_json, p.next_review_date
       FROM questions q JOIN progress p ON p.question_id = q.id
       WHERE q.lesson_id = ? AND p.user_id = ? AND p.next_review_date <= ?
       ORDER BY p.next_review_date ASC`,
      [lessonId, userId, todayStr]
    );

    const seenIds = (await db.all(`SELECT question_id FROM progress WHERE user_id = ?`, [userId])).map(
      (r) => r.question_id
    );

    const neverSeen = await db.all(
      `SELECT id, type, prompt, options_json FROM questions WHERE lesson_id = ? ${
        seenIds.length ? `AND id NOT IN (${seenIds.join(',')})` : ''
      } ORDER BY RANDOM()`,
      [lessonId]
    );

    let pool = [...due, ...neverSeen];

    if (pool.length === 0 && force) {
      pool = await db.all(`SELECT id, type, prompt, options_json FROM questions WHERE lesson_id = ? ORDER BY RANDOM()`, [
        lessonId,
      ]);
    }

    const items = pool.slice(0, limit).map((q) => ({
      questionId: q.id,
      type: q.type,
      prompt: q.prompt,
      options: q.options_json ? JSON.parse(q.options_json) : null,
    }));

    res.json({ lessonId, items, hasMore: pool.length > limit });
  })
);

app.post(
  '/api/questions/:id/answer',
  requireAuth,
  ah(async (req, res) => {
    const questionId = Number(req.params.id);
    const userId = req.session.userId;
    const { answer } = req.body || {};

    const question = await db.get('SELECT * FROM questions WHERE id = ?', [questionId]);
    if (!question) return res.status(404).json({ error: 'Question introuvable.' });

    const accepted = JSON.parse(question.accepted_answers_json);
    const result = question.type === 'typed' ? checkTyped(answer, accepted) : checkMcq(answer, accepted);

    let prog = await db.get('SELECT * FROM progress WHERE user_id = ? AND question_id = ?', [userId, questionId]);
    if (!prog) {
      await db.run(
        `INSERT INTO progress (user_id, question_id, ease_factor, interval_days, repetitions, times_seen, times_correct, next_review_date, updated_at)
         VALUES (?, ?, 2.5, 0, 0, 0, 0, ?, ?)`,
        [userId, questionId, srs.today(), srs.nowTimestamp()]
      );
      prog = await db.get('SELECT * FROM progress WHERE user_id = ? AND question_id = ?', [userId, questionId]);
    }

    const next = srs.schedule(prog, result.correct);
    await db.run(
      `UPDATE progress SET ease_factor = ?, interval_days = ?, repetitions = ?, next_review_date = ?,
       times_seen = times_seen + 1, times_correct = times_correct + ?, last_result = ?, updated_at = ?
       WHERE id = ?`,
      [
        next.ease_factor,
        next.interval_days,
        next.repetitions,
        next.next_review_date,
        result.correct ? 1 : 0,
        result.correct ? 1 : 0,
        srs.nowTimestamp(),
        prog.id,
      ]
    );

    await db.run('INSERT INTO attempts (user_id, question_id, correct, answer_given, created_at) VALUES (?, ?, ?, ?, ?)', [
      userId,
      questionId,
      result.correct ? 1 : 0,
      String(answer || ''),
      srs.nowTimestamp(),
    ]);

    res.json({
      correct: result.correct,
      exact: result.exact,
      correctAnswer: accepted[0],
      explanation: question.explanation,
      nextReviewDate: next.next_review_date,
    });
  })
);

app.get(
  '/api/me/stats',
  requireAuth,
  ah(async (req, res) => {
    const userId = req.session.userId;
    const languages = await db.all('SELECT id, name, flag_emoji FROM languages ORDER BY position, id');
    const todayStr = srs.today();

    const perLanguage = await Promise.all(
      languages.map(async (lang) => {
        const total = (
          await db.get(
            `SELECT COUNT(*) c FROM questions q JOIN lessons l ON l.id = q.lesson_id WHERE l.language_id = ?`,
            [lang.id]
          )
        ).c;
        const mastered = (
          await db.get(
            `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id JOIN lessons l ON l.id = q.lesson_id
             WHERE l.language_id = ? AND p.user_id = ? AND p.repetitions >= ?`,
            [lang.id, userId, MASTERY_REPETITIONS]
          )
        ).c;
        const due = (
          await db.get(
            `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id JOIN lessons l ON l.id = q.lesson_id
             WHERE l.language_id = ? AND p.user_id = ? AND p.next_review_date <= ?`,
            [lang.id, userId, todayStr]
          )
        ).c;
        return { ...lang, totalQuestions: Number(total), masteredCount: Number(mastered), dueCount: Number(due) };
      })
    );

    const yesterdayStr = srs.shiftDays(todayStr, -1);
    const streakRow = await db.get(
      `SELECT COUNT(DISTINCT LEFT(created_at, 10)) c FROM attempts WHERE user_id = ? AND LEFT(created_at, 10) >= ?`,
      [userId, yesterdayStr]
    );

    res.json({ perLanguage, activeToday: Number(streakRow.c) > 0 });
  })
);

// ---------- Admin API ----------

app.get(
  '/api/admin/stats',
  requireAdmin,
  ah(async (req, res) => {
    const userCount = (await db.get("SELECT COUNT(*) c FROM users WHERE role = 'student'")).c;
    const languageCount = (await db.get('SELECT COUNT(*) c FROM languages')).c;
    const lessonCount = (await db.get('SELECT COUNT(*) c FROM lessons')).c;
    const questionCount = (await db.get('SELECT COUNT(*) c FROM questions')).c;
    const mostMissed = await db.all(
      `SELECT q.id, q.prompt, l.title as "lessonTitle",
              SUM(CASE WHEN a.correct = 0 THEN 1 ELSE 0 END) as misses,
              COUNT(*) as attempts,
              (1.0 * SUM(CASE WHEN a.correct = 0 THEN 1 ELSE 0 END) / COUNT(*)) as "missRate"
       FROM attempts a JOIN questions q ON q.id = a.question_id JOIN lessons l ON l.id = q.lesson_id
       GROUP BY q.id, q.prompt, l.title HAVING COUNT(*) >= 2
       ORDER BY "missRate" DESC, attempts DESC
       LIMIT 10`
    );
    res.json({
      userCount: Number(userCount),
      languageCount: Number(languageCount),
      lessonCount: Number(lessonCount),
      questionCount: Number(questionCount),
      mostMissed: mostMissed.map((m) => ({
        id: m.id,
        prompt: m.prompt,
        lessonTitle: m.lessonTitle,
        misses: Number(m.misses),
        attempts: Number(m.attempts),
      })),
    });
  })
);

app.get(
  '/api/admin/languages',
  requireAdmin,
  ah(async (req, res) => {
    res.json(await db.all('SELECT * FROM languages ORDER BY position, id'));
  })
);

app.post(
  '/api/admin/languages',
  requireAdmin,
  ah(async (req, res) => {
    const { code, name, flag_emoji, position } = req.body || {};
    if (!code || !name) return res.status(400).json({ error: 'code et name sont requis.' });
    const info = await db.run(
      'INSERT INTO languages (code, name, flag_emoji, position, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id',
      [code, name, flag_emoji || '🌐', position || 0, srs.nowTimestamp()]
    );
    res.json(await db.get('SELECT * FROM languages WHERE id = ?', [info.id]));
  })
);

app.put(
  '/api/admin/languages/:id',
  requireAdmin,
  ah(async (req, res) => {
    const { code, name, flag_emoji, position } = req.body || {};
    await db.run('UPDATE languages SET code=?, name=?, flag_emoji=?, position=? WHERE id=?', [
      code,
      name,
      flag_emoji,
      position || 0,
      req.params.id,
    ]);
    res.json(await db.get('SELECT * FROM languages WHERE id = ?', [req.params.id]));
  })
);

app.delete(
  '/api/admin/languages/:id',
  requireAdmin,
  ah(async (req, res) => {
    await db.run('DELETE FROM languages WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  })
);

app.get(
  '/api/admin/languages/:id/lessons',
  requireAdmin,
  ah(async (req, res) => {
    res.json(await db.all('SELECT * FROM lessons WHERE language_id = ? ORDER BY position, id', [req.params.id]));
  })
);

app.post(
  '/api/admin/languages/:id/lessons',
  requireAdmin,
  ah(async (req, res) => {
    const { title, content_md, position } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title est requis.' });
    const info = await db.run(
      'INSERT INTO lessons (language_id, position, title, content_md, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id',
      [req.params.id, position || 0, title, content_md || '', srs.nowTimestamp()]
    );
    res.json(await db.get('SELECT * FROM lessons WHERE id = ?', [info.id]));
  })
);

app.get(
  '/api/admin/lessons/:id',
  requireAdmin,
  ah(async (req, res) => {
    const lesson = await db.get('SELECT * FROM lessons WHERE id = ?', [req.params.id]);
    if (!lesson) return res.status(404).json({ error: 'Leçon introuvable.' });
    res.json(lesson);
  })
);

app.put(
  '/api/admin/lessons/:id',
  requireAdmin,
  ah(async (req, res) => {
    const { title, content_md, position } = req.body || {};
    await db.run('UPDATE lessons SET title=?, content_md=?, position=? WHERE id=?', [
      title,
      content_md,
      position || 0,
      req.params.id,
    ]);
    res.json(await db.get('SELECT * FROM lessons WHERE id = ?', [req.params.id]));
  })
);

app.delete(
  '/api/admin/lessons/:id',
  requireAdmin,
  ah(async (req, res) => {
    await db.run('DELETE FROM lessons WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  })
);

app.get(
  '/api/admin/lessons/:id/questions',
  requireAdmin,
  ah(async (req, res) => {
    const questions = await db.all('SELECT * FROM questions WHERE lesson_id = ? ORDER BY position, id', [
      req.params.id,
    ]);
    res.json(
      questions.map((q) => ({
        ...q,
        options: q.options_json ? JSON.parse(q.options_json) : null,
        accepted_answers: JSON.parse(q.accepted_answers_json),
      }))
    );
  })
);

app.post(
  '/api/admin/lessons/:id/questions',
  requireAdmin,
  ah(async (req, res) => {
    const { type, prompt, options, accepted_answers, explanation, position } = req.body || {};
    if (!type || !prompt || !accepted_answers || !accepted_answers.length) {
      return res.status(400).json({ error: 'type, prompt et accepted_answers sont requis.' });
    }
    if (type === 'mcq' && (!options || options.length < 2)) {
      return res.status(400).json({ error: 'Une question QCM nécessite au moins 2 options.' });
    }
    const info = await db.run(
      `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
      [
        req.params.id,
        position || 0,
        type,
        prompt,
        type === 'mcq' ? JSON.stringify(options) : null,
        JSON.stringify(accepted_answers),
        explanation || '',
        srs.nowTimestamp(),
      ]
    );
    res.json(await db.get('SELECT * FROM questions WHERE id = ?', [info.id]));
  })
);

app.put(
  '/api/admin/questions/:id',
  requireAdmin,
  ah(async (req, res) => {
    const { type, prompt, options, accepted_answers, explanation, position } = req.body || {};
    await db.run(
      `UPDATE questions SET type=?, prompt=?, options_json=?, accepted_answers_json=?, explanation=?, position=?
       WHERE id=?`,
      [
        type,
        prompt,
        type === 'mcq' ? JSON.stringify(options) : null,
        JSON.stringify(accepted_answers),
        explanation || '',
        position || 0,
        req.params.id,
      ]
    );
    res.json(await db.get('SELECT * FROM questions WHERE id = ?', [req.params.id]));
  })
);

app.delete(
  '/api/admin/questions/:id',
  requireAdmin,
  ah(async (req, res) => {
    await db.run('DELETE FROM questions WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  })
);

app.get(
  '/api/admin/users',
  requireAdmin,
  ah(async (req, res) => {
    res.json(await db.all('SELECT id, username, display_name, role, created_at FROM users ORDER BY created_at'));
  })
);

app.post(
  '/api/admin/users',
  requireAdmin,
  ah(async (req, res) => {
    const { username, password, display_name, role } = req.body || {};
    if (!username || !password || !display_name) {
      return res.status(400).json({ error: 'username, password et display_name sont requis.' });
    }
    const existing = await db.get('SELECT id FROM users WHERE username = ?', [username]);
    if (existing) return res.status(409).json({ error: 'Cet identifiant existe déjà.' });
    const hash = bcrypt.hashSync(password, 10);
    const info = await db.run(
      'INSERT INTO users (username, password_hash, display_name, role, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id',
      [username, hash, display_name, role === 'admin' ? 'admin' : 'student', srs.nowTimestamp()]
    );
    res.json(await db.get('SELECT id, username, display_name, role, created_at FROM users WHERE id = ?', [info.id]));
  })
);

app.put(
  '/api/admin/users/:id',
  requireAdmin,
  ah(async (req, res) => {
    const { display_name, role, password } = req.body || {};
    if (display_name !== undefined) {
      await db.run('UPDATE users SET display_name = ? WHERE id = ?', [display_name, req.params.id]);
    }
    if (role !== undefined) {
      await db.run('UPDATE users SET role = ? WHERE id = ?', [role === 'admin' ? 'admin' : 'student', req.params.id]);
    }
    if (password) {
      const hash = bcrypt.hashSync(password, 10);
      await db.run('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.params.id]);
    }
    res.json(
      await db.get('SELECT id, username, display_name, role, created_at FROM users WHERE id = ?', [req.params.id])
    );
  })
);

app.delete(
  '/api/admin/users/:id',
  requireAdmin,
  ah(async (req, res) => {
    if (Number(req.params.id) === req.session.userId) {
      return res.status(400).json({ error: 'Tu ne peux pas supprimer ton propre compte.' });
    }
    await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  })
);

app.get(
  '/api/admin/users/:id/progress',
  requireAdmin,
  ah(async (req, res) => {
    const userId = req.params.id;
    const lessons = await db.all(
      `SELECT lessons.id, lessons.title, languages.name as "languageName"
       FROM lessons JOIN languages ON languages.id = lessons.language_id ORDER BY languages.position, lessons.position`
    );
    const result = await Promise.all(
      lessons.map(async (l) => {
        const total = (await db.get('SELECT COUNT(*) c FROM questions WHERE lesson_id = ?', [l.id])).c;
        const mastered = (
          await db.get(
            `SELECT COUNT(*) c FROM progress p JOIN questions q ON q.id = p.question_id
             WHERE q.lesson_id = ? AND p.user_id = ? AND p.repetitions >= ?`,
            [l.id, userId, MASTERY_REPETITIONS]
          )
        ).c;
        return { ...l, totalQuestions: Number(total), masteredCount: Number(mastered) };
      })
    );
    res.json(result);
  })
);

// ---------- Static frontend ----------

app.use(express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur serveur.' });
});

async function start() {
  await db.initSchema();

  app.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const lanIps = Object.entries(os.networkInterfaces())
      .filter(([name]) => !/^(bridge|utun|awdl|llw|anpi|ap\d)/i.test(name))
      .flatMap(([, addrs]) => addrs)
      .filter((i) => i.family === 'IPv4' && !i.internal)
      .map((i) => i.address);

    console.log(`\nLearnLang lancé !`);
    console.log(`  Sur ce Mac      : http://localhost:${PORT}`);
    lanIps.forEach((ip) => console.log(`  Sur le wifi     : http://${ip}:${PORT}`));
    if (process.env.DATABASE_URL) console.log(`  Base de données : Postgres distant`);
    console.log('');
  });
}

start().catch((err) => {
  console.error('Impossible de démarrer LearnLang :', err.message);
  process.exit(1);
});
