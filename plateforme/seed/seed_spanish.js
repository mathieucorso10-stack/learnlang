// Importe le cours espagnol existant (fichiers markdown + quiz.html) dans la base,
// et ajoute des questions à saisie libre pour muscler la difficulté des quiz.
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../db');
const srs = require('../srs');

const COURSE_ROOT = path.join(__dirname, '..', '..'); // dossier "COURS D'ESPAGNOL"

const LESSON_DIRS = [
  '01_Prononciation',
  '02_Salutations_Presentations',
  '03_Articles_Verbes_Reguliers',
  '04_Ser_Estar_Familia',
  '05_Numeros_Hora_Fecha',
  '06_Restaurante_Compras',
];

const LESSON_TITLES = {
  '01_Prononciation': 'Prononciation et alphabet',
  '02_Salutations_Presentations': 'Salutations et présentations',
  '03_Articles_Verbes_Reguliers': 'Articles, genre et verbes réguliers',
  '04_Ser_Estar_Familia': 'Ser vs Estar, famille et description',
  '05_Numeros_Hora_Fecha': 'Nombres, heure et date',
  '06_Restaurante_Compras': 'Au restaurant et au marché',
};

// Questions à saisie libre écrites à la main, par dossier de leçon — pour forcer
// le rappel actif plutôt que la reconnaissance passive (voir consigne : pas de quiz facile).
const TYPED_QUESTIONS = {
  '01_Prononciation': [
    { prompt: 'Écris le mot espagnol pour « chien » (attention au double r roulé).', answers: ['perro'], explanation: 'perro = chien. Le rr se roule fort et long, différent de « pero » (mais).' },
    { prompt: 'Écris le mot espagnol pour « bonjour » (familier, à toute heure).', answers: ['hola'], explanation: 'hola = salut/bonjour informel, utilisable à tout moment de la journée.' },
    { prompt: 'Écris le mot espagnol pour « enfant » (avec le ñ).', answers: ['niño'], explanation: 'niño = enfant. Le ñ se prononce « gn » comme dans montagne.' },
  ],
  '02_Salutations_Presentations': [
    { prompt: 'Conjugue SER à la 1ʳᵉ personne du singulier (yo).', answers: ['soy'], explanation: 'yo soy = je suis.' },
    { prompt: 'Conjugue SER à la 2ᵉ personne du singulier (tú).', answers: ['eres'], explanation: 'tú eres = tu es.' },
    { prompt: 'Traduis en espagnol : « Je m\'appelle Laura ».', answers: ['me llamo laura'], explanation: 'Me llamo Laura — structure réfléchie « me llamo » (littéralement « je m\'appelle »).' },
    { prompt: 'Traduis en espagnol : « D\'où viens-tu ? »', answers: ['de dónde eres'], explanation: '¿De dónde eres? — n\'oublie pas le ¿ au début à l\'écrit !' },
  ],
  '03_Articles_Verbes_Reguliers': [
    { prompt: 'Conjugue HABLAR à la 3ᵉ personne du singulier (él/ella).', answers: ['habla'], explanation: 'él/ella habla = il/elle parle.' },
    { prompt: 'Conjugue VIVIR à la 1ʳᵉ personne du pluriel (nosotros).', answers: ['vivimos'], explanation: 'nosotros vivimos = nous vivons/habitons.' },
    { prompt: 'Quel article accompagne « mano » (la main) ? Attention, c\'est une exception !', answers: ['la'], explanation: 'la mano — féminin malgré le -o final, une exception à connaître par cœur.' },
    { prompt: 'Écris le pluriel de « profesor ».', answers: ['profesores'], explanation: 'Mot terminé par une consonne → on ajoute -es : profesores.' },
    { prompt: 'Traduis en espagnol : « Je ne mange pas de viande ».', answers: ['no como carne'], explanation: 'No como carne — la négation « no » se place juste avant le verbe.' },
  ],
  '04_Ser_Estar_Familia': [
    { prompt: 'Conjugue ESTAR à la 1ʳᵉ personne du singulier (yo).', answers: ['estoy'], explanation: 'yo estoy — verbe irrégulier à apprendre par cœur.' },
    { prompt: 'Complète avec SER ou ESTAR conjugué : « Madrid ___ en España ».', answers: ['está'], explanation: 'Madrid está en España — la localisation utilise toujours ESTAR.' },
    { prompt: 'Complète avec SER ou ESTAR conjugué : « Yo ___ francés ».', answers: ['soy'], explanation: 'Yo soy francés — l\'identité/nationalité utilise toujours SER.' },
    { prompt: 'Complète avec SER ou ESTAR conjugué : « Mis padres ___ contentos ».', answers: ['están'], explanation: 'Mis padres están contentos — un état temporaire utilise ESTAR.' },
    { prompt: 'Traduis en espagnol : « Je suis fatigué ».', answers: ['estoy cansado'], explanation: 'Estoy cansado — état temporaire, donc ESTAR.' },
    { prompt: 'Traduis en espagnol : « Où est ton frère ? »', answers: ['dónde está tu hermano'], explanation: '¿Dónde está tu hermano? — localisation = ESTAR.' },
  ],
  '05_Numeros_Hora_Fecha': [
    { prompt: 'Écris le nombre 42 en espagnol (en toutes lettres).', answers: ['cuarenta y dos'], explanation: 'À partir de 31, dizaine et unité se séparent avec « y ».' },
    { prompt: 'Écris le nombre 16 en espagnol (un seul mot).', answers: ['dieciséis'], explanation: 'dieciséis — à partir de 16, le nombre se colle en un seul mot.' },
    { prompt: 'Comment dit-on « Il est trois heures et demie » ?', answers: ['son las tres y media'], explanation: 'Son las tres y media — heures au pluriel → « son ».' },
    { prompt: 'Écris le jour qui suit « viernes » (vendredi).', answers: ['sábado'], explanation: 'sábado = samedi.' },
    { prompt: 'Écris le mois de « janvier » en espagnol.', answers: ['enero'], explanation: 'enero = janvier.' },
  ],
  '06_Restaurante_Compras': [
    { prompt: 'Conjugue QUERER à la 1ʳᵉ personne du singulier (yo).', answers: ['quiero'], explanation: 'yo quiero — diphtongue e→ie.' },
    { prompt: 'Conjugue PODER à la 2ᵉ personne du singulier (tú).', answers: ['puedes'], explanation: 'tú puedes — diphtongue o→ue.' },
    { prompt: 'Traduis en espagnol : « L\'addition, s\'il vous plaît ».', answers: ['la cuenta por favor'], explanation: 'La cuenta, por favor — phrase indispensable au restaurant.' },
    { prompt: 'Traduis en espagnol : « Combien ça coûte ? »', answers: ['cuánto cuesta esto', 'cuánto cuesta'], explanation: '¿Cuánto cuesta esto? — pour demander un prix.' },
    { prompt: 'Conjugue TENER à la 3ᵉ personne du singulier (él/ella).', answers: ['tiene'], explanation: 'él/ella tiene — verbe irrégulier très fréquent.' },
  ],
};

function extractMcqQuestions(quizHtmlPath) {
  const html = fs.readFileSync(quizHtmlPath, 'utf8');
  const match = html.match(/const questions = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('Impossible de lire les questions dans ' + quizHtmlPath);
  // eslint-disable-next-line no-eval
  const raw = eval(match[1]);
  return raw.map((q) => ({
    prompt: q.q,
    options: q.options,
    correct: q.options[q.answer],
    explanation: q.explain || q.explanation || '',
  }));
}

async function run() {
  await db.initSchema();

  const existing = await db.get('SELECT id FROM languages WHERE code = ?', ['es']);
  if (existing) {
    console.log('La langue espagnole est déjà présente (id=' + existing.id + '), seed ignoré.');
    console.log('Pour tout réimporter : vide la base puis relance npm run seed.');
    return;
  }

  const lang = await db.run(
    `INSERT INTO languages (code, name, flag_emoji, position, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id`,
    ['es', 'Español', '🇪🇸', 0, srs.nowTimestamp()]
  );
  const langId = lang.id;

  let totalQuestions = 0;
  for (let i = 0; i < LESSON_DIRS.length; i++) {
    const dir = LESSON_DIRS[i];
    const lessonPath = path.join(COURSE_ROOT, dir);
    const mdPath = path.join(lessonPath, 'lecon.md');
    const quizPath = path.join(lessonPath, 'quiz.html');
    const contentMd = fs.readFileSync(mdPath, 'utf8');

    const lessonRow = await db.run(
      `INSERT INTO lessons (language_id, position, title, content_md, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id`,
      [langId, i, LESSON_TITLES[dir], contentMd, srs.nowTimestamp()]
    );
    const lessonId = lessonRow.id;

    let pos = 0;
    const mcqQuestions = extractMcqQuestions(quizPath);
    for (const q of mcqQuestions) {
      await db.run(
        `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [lessonId, pos++, 'mcq', q.prompt, JSON.stringify(q.options), JSON.stringify([q.correct]), q.explanation, srs.nowTimestamp()]
      );
      totalQuestions++;
    }

    for (const q of TYPED_QUESTIONS[dir] || []) {
      await db.run(
        `INSERT INTO questions (lesson_id, position, type, prompt, options_json, accepted_answers_json, explanation, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [lessonId, pos++, 'typed', q.prompt, null, JSON.stringify(q.answers), q.explanation, srs.nowTimestamp()]
      );
      totalQuestions++;
    }

    console.log(`Leçon "${LESSON_TITLES[dir]}" importée : ${pos} questions.`);
  }

  console.log(`\nTotal : 1 langue, ${LESSON_DIRS.length} leçons, ${totalQuestions} questions.`);

  // Compte admin par défaut — à changer après la première connexion.
  const adminExists = await db.get('SELECT id FROM users WHERE username = ?', ['admin']);
  if (!adminExists) {
    const hash = bcrypt.hashSync('espanol123', 10);
    await db.run(
      `INSERT INTO users (username, password_hash, display_name, role, created_at) VALUES (?, ?, ?, 'admin', ?)`,
      ['admin', hash, 'Mathieu', srs.nowTimestamp()]
    );
    console.log('\nCompte admin créé : identifiant "admin", mot de passe "espanol123" (à changer !).');
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
