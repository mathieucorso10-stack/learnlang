// Répétition espacée façon SM-2, simplifiée pour un résultat binaire (correct / incorrect).
// q = qualité de la réponse : 4 si correcte, 2 si incorrecte (assez bas pour repartir de zéro
// sans punir l'utilisateur de façon disproportionnée).

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + Math.max(1, Math.round(days)));
  return d.toISOString().slice(0, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// Décalage de jours non contraint (peut être négatif) — utilisé pour des calculs
// généraux (ex: "hier"), contrairement à addDays() qui est spécifique au SRS
// (toujours au moins +1 jour).
function shiftDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + Math.round(days));
  return d.toISOString().slice(0, 10);
}

function nowTimestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function schedule(prev, correct) {
  const q = correct ? 4 : 2;
  let { ease_factor: ef, interval_days: interval, repetitions: reps } = prev;

  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ef < 1.3) ef = 1.3;

  if (q < 3) {
    reps = 0;
    interval = 1;
  } else {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 6;
    else interval = Math.round(interval * ef);
    reps += 1;
  }

  return {
    ease_factor: ef,
    interval_days: interval,
    repetitions: reps,
    next_review_date: addDays(today(), interval),
  };
}

module.exports = { schedule, today, addDays, shiftDays, nowTimestamp };
