// Ajoute les leçons 7-10 au cours espagnol existant, et crée le cours d'anglais complet
// (10 leçons). Idempotent : relancer ce script ne duplique rien (vérifie par titre de leçon).
const db = require('../db');
const srs = require('../srs');
const esExtra = require('./content_es_extra');
const en = require('./content_en');
const it = require('./content_it');

async function insertQuestions(lessonId, questions) {
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (q.type === 'mcq') {
      await db.run(
        `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [lessonId, i, 'mcq', q.prompt, JSON.stringify(q.options), JSON.stringify([q.options[q.answer]]), q.explanation, srs.nowTimestamp()]
      );
    } else {
      await db.run(
        `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [lessonId, i, 'typed', q.prompt, null, JSON.stringify(q.answers), q.explanation, srs.nowTimestamp()]
      );
    }
  }
  return questions.length;
}

async function addLessonsToLanguage(languageId, lessons, startPosition) {
  const existing = (await db.all(`SELECT title FROM lessons WHERE language_id = ?`, [languageId])).map(
    (r) => r.title
  );

  let added = 0;
  let totalQ = 0;
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    if (existing.includes(lesson.title)) {
      console.log(`  (déjà présente, ignorée) ${lesson.title}`);
      continue;
    }
    const lessonRow = await db.run(
      `INSERT INTO lessons (language_id, position, title, content_md, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id`,
      [languageId, startPosition + i, lesson.title, lesson.content_md, srs.nowTimestamp()]
    );
    const nq = await insertQuestions(lessonRow.id, lesson.questions);
    console.log(`  + ${lesson.title} — ${nq} questions`);
    added++;
    totalQ += nq;
  }
  return { added, totalQ };
}

async function run() {
  await db.initSchema();

  console.log('--- Extension du cours espagnol (leçons 7-10) ---');
  const esLang = await db.get(`SELECT id FROM languages WHERE code = 'es'`);
  if (!esLang) {
    console.log("Langue \"es\" introuvable — lance d'abord npm run seed pour créer le cours espagnol de base.");
  } else {
    const currentMax = (await db.get(`SELECT COALESCE(MAX(position), -1) as m FROM lessons WHERE language_id = ?`, [
      esLang.id,
    ])).m;
    const { added, totalQ } = await addLessonsToLanguage(esLang.id, esExtra.LESSONS, Number(currentMax) + 1);
    console.log(`Espagnol : ${added} nouvelle(s) leçon(s), ${totalQ} nouvelles questions.\n`);
  }

  console.log('--- Création / mise à jour du cours anglais ---');
  let enLang = await db.get(`SELECT id FROM languages WHERE code = 'en'`);
  if (!enLang) {
    const langPos = Number((await db.get(`SELECT COALESCE(MAX(position), -1) as m FROM languages`)).m) + 1;
    const info = await db.run(
      `INSERT INTO languages (code, name, flag_emoji, position, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id`,
      ['en', 'English', '🇬🇧', langPos, srs.nowTimestamp()]
    );
    enLang = { id: info.id };
    console.log('Langue "English" créée.');
  }
  const currentMaxEn = (await db.get(`SELECT COALESCE(MAX(position), -1) as m FROM lessons WHERE language_id = ?`, [
    enLang.id,
  ])).m;
  const { added: addedEn, totalQ: totalQEn } = await addLessonsToLanguage(enLang.id, en.LESSONS, Number(currentMaxEn) + 1);
  console.log(`Anglais : ${addedEn} nouvelle(s) leçon(s), ${totalQEn} nouvelles questions.\n`);

  console.log('--- Création / mise à jour du cours italien ---');
  let itLang = await db.get(`SELECT id FROM languages WHERE code = 'it'`);
  if (!itLang) {
    const langPosIt = Number((await db.get(`SELECT COALESCE(MAX(position), -1) as m FROM languages`)).m) + 1;
    const infoIt = await db.run(
      `INSERT INTO languages (code, name, flag_emoji, position, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id`,
      ['it', 'Italiano', '🇮🇹', langPosIt, srs.nowTimestamp()]
    );
    itLang = { id: infoIt.id };
    console.log('Langue "Italiano" créée.');
  }
  const currentMaxIt = (await db.get(`SELECT COALESCE(MAX(position), -1) as m FROM lessons WHERE language_id = ?`, [
    itLang.id,
  ])).m;
  const { added: addedIt, totalQ: totalQIt } = await addLessonsToLanguage(itLang.id, it.LESSONS, Number(currentMaxIt) + 1);
  console.log(`Italien : ${addedIt} nouvelle(s) leçon(s), ${totalQIt} nouvelles questions.\n`);

  // Résumé final — purement informatif, ne doit jamais faire échouer le seed.
  try {
    const summary = await db.all(
      `SELECT languages.name, COUNT(DISTINCT lessons.id) as lessons, COUNT(DISTINCT questions.id) as questions
       FROM languages
       LEFT JOIN lessons ON lessons.language_id = languages.id
       LEFT JOIN questions ON questions.lesson_id = lessons.id
       GROUP BY languages.id, languages.position, languages.name ORDER BY languages.position`
    );
    console.log('--- État final ---');
    summary.forEach((s) => console.log(`  ${s.name} : ${s.lessons} leçons, ${s.questions} questions`));
  } catch (err) {
    console.log('(résumé final indisponible : ' + err.message + ')');
  }
}

module.exports = { run };

if (require.main === module) {
  run()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
