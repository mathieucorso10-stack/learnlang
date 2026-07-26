function normalize(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[¿¡?!.,;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Vérifie une réponse tapée par l'utilisateur contre une liste de réponses acceptées.
// Retourne { correct, exact } — exact=false signifie "correct mais accents/tildes manquants".
function checkTyped(userAnswer, acceptedAnswers) {
  const normUser = normalize(userAnswer || '');
  if (!normUser) return { correct: false, exact: false };

  for (const accepted of acceptedAnswers) {
    if (normUser === normalize(accepted)) return { correct: true, exact: true };
  }
  const noAccentUser = stripAccents(normUser);
  for (const accepted of acceptedAnswers) {
    if (noAccentUser === stripAccents(normalize(accepted))) return { correct: true, exact: false };
  }
  return { correct: false, exact: false };
}

function checkMcq(userAnswer, acceptedAnswers) {
  const normUser = normalize(userAnswer || '');
  const ok = acceptedAnswers.some((a) => normalize(a) === normUser);
  return { correct: ok, exact: ok };
}

module.exports = { normalize, stripAccents, checkTyped, checkMcq };
