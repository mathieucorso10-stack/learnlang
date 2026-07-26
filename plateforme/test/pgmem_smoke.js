// Script de test temporaire : seed + démarrage serveur contre un Postgres émulé
// en mémoire (pg-mem), pour valider la migration avant d'avoir un vrai Supabase.
process.env.PGMEM_TEST = '1';
process.env.PORT = process.env.PORT || '4399';

(async () => {
  const seedSpanish = require('../seed/seed_spanish');
  const extendCourses = require('../seed/extend_courses');

  await seedSpanish.run();
  await extendCourses.run();

  require('../server'); // démarre l'écoute HTTP dans ce même process (même DB en mémoire)

  console.log('SMOKE_READY');
})();
