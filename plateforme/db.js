require('dotenv').config();

let Pool;
if (process.env.PGMEM_TEST === '1') {
  // Mode test uniquement : base Postgres émulée en mémoire (pg-mem), pour valider
  // le schéma et les requêtes sans dépendre d'un vrai serveur Postgres.
  const { newDb, DataType } = require('pg-mem');
  const mem = newDb();
  // pg-mem n'implémente pas RANDOM() nativement — on le simule pour les tests
  // (le vrai Postgres, lui, le supporte nativement).
  mem.public.registerFunction({
    name: 'random',
    args: [],
    returns: DataType.float,
    implementation: () => Math.random(),
    impure: true,
  });
  // Idem pour LEFT(text, n) — fonction standard Postgres, non implémentée par pg-mem.
  mem.public.registerFunction({
    name: 'left',
    args: [DataType.text, DataType.integer],
    returns: DataType.text,
    implementation: (str, n) => (str == null ? null : String(str).slice(0, n)),
  });
  ({ Pool } = mem.adapters.createPg());
} else {
  ({ Pool } = require('pg'));
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString && process.env.PGMEM_TEST !== '1') {
  throw new Error(
    'DATABASE_URL manquant. Crée un fichier .env (voir .env.example) avec la chaîne de connexion Postgres.'
  );
}

const pool = new Pool(
  process.env.PGMEM_TEST === '1'
    ? {}
    : { connectionString, ssl: { rejectUnauthorized: false } }
);

// Convertit les `?` façon SQLite en `$1, $2, ...` façon Postgres, pour garder des
// requêtes lisibles proches de l'original.
function toPgSql(sql) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

async function all(sql, params = []) {
  const res = await pool.query(toPgSql(sql), params);
  return res.rows;
}

async function get(sql, params = []) {
  const rows = await all(sql, params);
  return rows[0];
}

async function run(sql, params = []) {
  const res = await pool.query(toPgSql(sql), params);
  return { id: res.rows[0] ? res.rows[0].id : undefined, rowCount: res.rowCount };
}

let schemaInitialized = false;

async function initSchema() {
  if (schemaInitialized) return;
  let schemaSql = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin','student')) DEFAULT 'student',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS languages (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      flag_emoji TEXT NOT NULL DEFAULT '🌐',
      position INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      content_md TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      type TEXT NOT NULL CHECK(type IN ('mcq','typed')),
      prompt TEXT NOT NULL,
      options_json TEXT,
      accepted_answers_json TEXT NOT NULL,
      explanation TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS progress (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      interval_days REAL NOT NULL DEFAULT 0,
      repetitions INTEGER NOT NULL DEFAULT 0,
      next_review_date TEXT NOT NULL,
      times_seen INTEGER NOT NULL DEFAULT 0,
      times_correct INTEGER NOT NULL DEFAULT 0,
      last_result INTEGER,
      updated_at TEXT NOT NULL,
      UNIQUE(user_id, question_id)
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      correct INTEGER NOT NULL,
      answer_given TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_languages (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, language_id)
    );

    CREATE INDEX IF NOT EXISTS idx_lessons_lang ON lessons(language_id);
    CREATE INDEX IF NOT EXISTS idx_questions_lesson ON questions(lesson_id);
    CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
    CREATE INDEX IF NOT EXISTS idx_progress_question ON progress(question_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_languages_user ON user_languages(user_id);
  `;

  if (process.env.PGMEM_TEST === '1') {
    // pg-mem (émulateur utilisé uniquement pour les tests) ne supporte pas encore
    // les contraintes CHECK — on les retire seulement pour ce mode de test.
    schemaSql = schemaSql.replace(/\s*CHECK\((?:[^()]|\([^()]*\))*\)/g, '');
  }

  await pool.query(schemaSql);

  // Migration en douceur : la première fois que la table user_languages existe
  // (elle est vide), on donne accès à toutes les langues existantes à tous les
  // étudiants existants, pour ne rien casser pour ceux qui utilisaient déjà la
  // plateforme avant cette fonctionnalité. Après ça, c'est l'admin qui gère.
  const countRow = await pool.query('SELECT COUNT(*) c FROM user_languages');
  if (Number(countRow.rows[0].c) === 0) {
    await pool.query(`
      INSERT INTO user_languages (user_id, language_id)
      SELECT u.id, l.id FROM users u, languages l WHERE u.role = 'student'
      ON CONFLICT DO NOTHING
    `);
  }

  schemaInitialized = true;
}

module.exports = { pool, all, get, run, initSchema };
