// Ajoute les leçons 7-10 au cours espagnol existant, et crée le cours d'anglais complet
// (10 leçons). Idempotent : relancer ce script ne duplique rien (vérifie par titre de leçon).
const db = require('../db');
const esExtra = require('./content_es_extra');
const en = require('./content_en');

function insertQuestions(lessonId, questions) {
  const insertQuestion = db.prepare(
    `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  questions.forEach((q, i) => {
    if (q.type === 'mcq') {
      insertQuestion.run(lessonId, i, 'mcq', q.prompt, JSON.stringify(q.options), JSON.stringify([q.options[q.answer]]), q.explanation);
    } else {
      insertQuestion.run(lessonId, i, 'typed', q.prompt, null, JSON.stringify(q.answers), q.explanation);
    }
  });
  return questions.length;
}

function addLessonsToLanguage(languageId, lessons, startPosition) {
  const insertLesson = db.prepare(
    `INSERT INTO lessons (language_id, position, title, content_md) VALUES (?, ?, ?, ?)`
  );
  const existing = db.prepare(`SELECT title FROM lessons WHERE language_id = ?`).all(languageId).map((r) => r.title);

  let added = 0;
  let totalQ = 0;
  lessons.forEach((lesson, i) => {
    if (existing.includes(lesson.title)) {
      console.log(`  (déjà présente, ignorée) ${lesson.title}`);
      return;
    }
    const lessonId = insertLesson.run(languageId, startPosition + i, lesson.title, lesson.content_md).lastInsertRowid;
    const nq = insertQuestions(lessonId, lesson.questions);
    console.log(`  + ${lesson.title} — ${nq} questions`);
    added++;
    totalQ += nq;
  });
  return { added, totalQ };
}

function run() {
  console.log('--- Extension du cours espagnol (leçons 7-10) ---');
  const esLang = db.prepare(`SELECT id FROM languages WHERE code = 'es'`).get();
  if (!esLang) {
    console.log('Langue "es" introuvable — lance d\'abord npm run seed pour créer le cours espagnol de base.');
  } else {
    const currentMax = db.prepare(`SELECT COALESCE(MAX(position), -1) as m FROM lessons WHERE language_id = ?`).get(esLang.id).m;
    const { added, totalQ } = addLessonsToLanguage(esLang.id, esExtra.LESSONS, currentMax + 1);
    console.log(`Espagnol : ${added} nouvelle(s) leçon(s), ${totalQ} nouvelles questions.\n`);
  }

  console.log('--- Création / mise à jour du cours anglais ---');
  let enLang = db.prepare(`SELECT id FROM languages WHERE code = 'en'`).get();
  if (!enLang) {
    const langPos = db.prepare(`SELECT COALESCE(MAX(position), -1) as m FROM languages`).get().m + 1;
    const info = db
      .prepare(`INSERT INTO languages (code, name, flag_emoji, position) VALUES (?, ?, ?, ?)`)
      .run('en', 'English', '🇬🇧', langPos);
    enLang = { id: info.lastInsertRowid };
    console.log('Langue "English" créée.');
  }
  const currentMaxEn = db.prepare(`SELECT COALESCE(MAX(position), -1) as m FROM lessons WHERE language_id = ?`).get(enLang.id).m;
  const { added: addedEn, totalQ: totalQEn } = addLessonsToLanguage(enLang.id, en.LESSONS, currentMaxEn + 1);
  console.log(`Anglais : ${addedEn} nouvelle(s) leçon(s), ${totalQEn} nouvelles questions.\n`);

  const summary = db
    .prepare(
      `SELECT languages.name, COUNT(DISTINCT lessons.id) as lessons, COUNT(questions.id) as questions
       FROM languages
       LEFT JOIN lessons ON lessons.language_id = languages.id
       LEFT JOIN questions ON questions.lesson_id = lessons.id
       GROUP BY languages.id ORDER BY languages.position`
    )
    .all();
  console.log('--- État final ---');
  summary.forEach((s) => console.log(`  ${s.name} : ${s.lessons} leçons, ${s.questions} questions`));
}

run();
