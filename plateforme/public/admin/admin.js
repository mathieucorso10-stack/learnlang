async function api(url, opts) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (res.status === 401) { window.location.href = '/'; return null; }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Erreur');
  return data;
}

const state = { selectedLanguageId: null, selectedLessonId: null };

// ---------- Tabs ----------

document.querySelectorAll('.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function switchTab(tab) {
  document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach((p) => (p.style.display = 'none'));
  document.getElementById('tab-' + tab).style.display = 'block';
  if (tab === 'overview') renderOverview();
  if (tab === 'languages') renderLanguages();
  if (tab === 'lessons') renderLessons();
  if (tab === 'questions') renderQuestions();
  if (tab === 'users') renderUsers();
}

document.getElementById('logoutLink').addEventListener('click', async (e) => {
  e.preventDefault();
  await api('/api/logout', { method: 'POST' });
  window.location.href = '/';
});

// ---------- Overview ----------

async function renderOverview() {
  const panel = document.getElementById('tab-overview');
  panel.innerHTML = '<div class="card">Chargement…</div>';
  const stats = await api('/api/admin/stats');
  panel.innerHTML = `
    <h1 style="margin-bottom:24px">Vue d'ensemble</h1>
    <div class="stat-grid">
      <div class="card stat-card enter">
        <div class="stat-num">${stats.userCount}</div>
        <div class="muted">Étudiants</div>
      </div>
      <div class="card stat-card enter">
        <div class="stat-num">${stats.languageCount}</div>
        <div class="muted">Langues</div>
      </div>
      <div class="card stat-card enter">
        <div class="stat-num">${stats.lessonCount}</div>
        <div class="muted">Leçons</div>
      </div>
      <div class="card stat-card enter">
        <div class="stat-num">${stats.questionCount}</div>
        <div class="muted">Questions</div>
      </div>
    </div>
    <div class="card">
      <h2>Questions les plus ratées</h2>
      ${
        stats.mostMissed.length === 0
          ? '<p class="muted">Pas encore assez de données.</p>'
          : `<table class="admin-table">
              <tr><th>Question</th><th>Leçon</th><th>Taux d'échec</th><th>Tentatives</th></tr>
              ${stats.mostMissed
                .map(
                  (q) => `<tr>
                    <td>${escapeHtml(q.prompt)}</td>
                    <td>${escapeHtml(q.lessonTitle)}</td>
                    <td>${Math.round((q.misses / q.attempts) * 100)}%</td>
                    <td>${q.attempts}</td>
                  </tr>`
                )
                .join('')}
            </table>`
      }
    </div>
  `;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Languages ----------

async function renderLanguages() {
  const panel = document.getElementById('tab-languages');
  const languages = await api('/api/admin/languages');
  panel.innerHTML = `
    <h1 style="margin-bottom:24px">Langues</h1>
    <div class="card">
      <h2>Langues disponibles</h2>
      <table class="admin-table">
        <tr><th>Emoji</th><th>Nom</th><th>Code</th><th>Ordre</th><th></th></tr>
        ${languages
          .map(
            (l) => `<tr>
              <td>${l.flag_emoji}</td><td>${escapeHtml(l.name)}</td><td>${escapeHtml(l.code)}</td><td>${l.position}</td>
              <td><button class="secondary" data-edit-lang="${l.id}">Modifier</button>
                  <button class="danger" data-del-lang="${l.id}">Supprimer</button></td>
            </tr>`
          )
          .join('')}
      </table>
    </div>
    <div class="card" id="langForm">
      <h2>Ajouter une langue</h2>
      <div class="row">
        <div class="field"><label>Emoji drapeau</label><input id="newLangEmoji" placeholder="🇬🇧" style="width:80px"></div>
        <div class="field"><label>Nom</label><input id="newLangName" placeholder="English"></div>
        <div class="field"><label>Code</label><input id="newLangCode" placeholder="en" style="width:100px"></div>
        <div class="field"><label>Ordre</label><input id="newLangPos" type="number" value="0" style="width:80px"></div>
      </div>
      <button id="addLangBtn">Ajouter la langue</button>
      <div class="muted" style="margin-top:8px">Ajoute une langue vide, puis va dans l'onglet Leçons pour lui créer du contenu.</div>
      <div class="error" id="langErr"></div>
    </div>
  `;

  document.getElementById('addLangBtn').addEventListener('click', async () => {
    const errEl = document.getElementById('langErr');
    errEl.textContent = '';
    try {
      await api('/api/admin/languages', {
        method: 'POST',
        body: JSON.stringify({
          name: document.getElementById('newLangName').value,
          code: document.getElementById('newLangCode').value,
          flag_emoji: document.getElementById('newLangEmoji').value || '🌐',
          position: Number(document.getElementById('newLangPos').value) || 0,
        }),
      });
      renderLanguages();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });

  panel.querySelectorAll('[data-del-lang]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      if (!confirm('Supprimer cette langue et TOUT son contenu (leçons, questions, progression) ?')) return;
      await api(`/api/admin/languages/${btn.dataset.delLang}`, { method: 'DELETE' });
      renderLanguages();
    })
  );

  panel.querySelectorAll('[data-edit-lang]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const lang = languages.find((l) => l.id == btn.dataset.editLang);
      const name = prompt('Nom de la langue', lang.name);
      if (name === null) return;
      const emoji = prompt('Emoji drapeau', lang.flag_emoji);
      await api(`/api/admin/languages/${lang.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...lang, name, flag_emoji: emoji }),
      });
      renderLanguages();
    })
  );
}

// ---------- Lessons ----------

async function renderLessons() {
  const panel = document.getElementById('tab-lessons');
  const languages = await api('/api/admin/languages');
  if (!state.selectedLanguageId && languages.length) state.selectedLanguageId = languages[0].id;

  panel.innerHTML = `
    <h1 style="margin-bottom:24px">Leçons</h1>
    <div class="card">
      <div class="field">
        <label>Langue</label>
        <select id="lessonLangSelect">
          ${languages.map((l) => `<option value="${l.id}" ${l.id === state.selectedLanguageId ? 'selected' : ''}>${l.flag_emoji} ${escapeHtml(l.name)}</option>`).join('')}
        </select>
      </div>
      <div id="lessonsList"></div>
    </div>
    <div class="card">
      <h2 id="lessonFormTitle">Ajouter une leçon</h2>
      <div class="field"><label>Titre</label><input id="lessonTitleInput" style="width:100%"></div>
      <div class="field"><label>Ordre</label><input id="lessonPosInput" type="number" value="0" style="width:100px"></div>
      <div class="field"><label>Contenu (markdown)</label><textarea id="lessonContentInput" rows="14" style="width:100%;font-family:ui-monospace,monospace"></textarea></div>
      <div class="row">
        <button id="saveLessonBtn">Enregistrer</button>
        <button class="secondary" id="clearLessonFormBtn">Nouvelle leçon (vider)</button>
      </div>
      <div class="error" id="lessonErr"></div>
    </div>
  `;

  document.getElementById('lessonLangSelect').addEventListener('change', (e) => {
    state.selectedLanguageId = Number(e.target.value);
    renderLessons();
  });

  let editingLessonId = null;

  async function loadLessonsList() {
    const lessons = await api(`/api/admin/languages/${state.selectedLanguageId}/lessons`);
    document.getElementById('lessonsList').innerHTML = `
      <table class="admin-table">
        <tr><th>Ordre</th><th>Titre</th><th></th></tr>
        ${lessons
          .map(
            (l) => `<tr>
              <td>${l.position}</td><td>${escapeHtml(l.title)}</td>
              <td><button class="secondary" data-edit-lesson="${l.id}">Modifier</button>
                  <button class="danger" data-del-lesson="${l.id}">Supprimer</button></td>
            </tr>`
          )
          .join('')}
      </table>
    `;
    document.querySelectorAll('[data-del-lesson]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        if (!confirm('Supprimer cette leçon et ses questions ?')) return;
        await api(`/api/admin/lessons/${btn.dataset.delLesson}`, { method: 'DELETE' });
        loadLessonsList();
      })
    );
    document.querySelectorAll('[data-edit-lesson]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        const lesson = await api(`/api/admin/lessons/${btn.dataset.editLesson}`);
        editingLessonId = lesson.id;
        document.getElementById('lessonFormTitle').textContent = 'Modifier : ' + lesson.title;
        document.getElementById('lessonTitleInput').value = lesson.title;
        document.getElementById('lessonPosInput').value = lesson.position;
        document.getElementById('lessonContentInput').value = lesson.content_md;
      })
    );
  }
  loadLessonsList();

  document.getElementById('clearLessonFormBtn').addEventListener('click', () => {
    editingLessonId = null;
    document.getElementById('lessonFormTitle').textContent = 'Ajouter une leçon';
    document.getElementById('lessonTitleInput').value = '';
    document.getElementById('lessonPosInput').value = 0;
    document.getElementById('lessonContentInput').value = '';
  });

  document.getElementById('saveLessonBtn').addEventListener('click', async () => {
    const errEl = document.getElementById('lessonErr');
    errEl.textContent = '';
    const payload = {
      title: document.getElementById('lessonTitleInput').value,
      position: Number(document.getElementById('lessonPosInput').value) || 0,
      content_md: document.getElementById('lessonContentInput').value,
    };
    try {
      if (editingLessonId) {
        await api(`/api/admin/lessons/${editingLessonId}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await api(`/api/admin/languages/${state.selectedLanguageId}/lessons`, { method: 'POST', body: JSON.stringify(payload) });
      }
      document.getElementById('clearLessonFormBtn').click();
      loadLessonsList();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });
}

// ---------- Questions ----------

async function renderQuestions() {
  const panel = document.getElementById('tab-questions');
  const languages = await api('/api/admin/languages');
  if (!state.selectedLanguageId && languages.length) state.selectedLanguageId = languages[0].id;
  const lessons = await api(`/api/admin/languages/${state.selectedLanguageId}/lessons`);
  if (!state.selectedLessonId || !lessons.find((l) => l.id === state.selectedLessonId)) {
    state.selectedLessonId = lessons.length ? lessons[0].id : null;
  }

  panel.innerHTML = `
    <h1 style="margin-bottom:24px">Questions</h1>
    <div class="card">
      <div class="row">
        <div class="field">
          <label>Langue</label>
          <select id="qLangSelect">${languages.map((l) => `<option value="${l.id}" ${l.id === state.selectedLanguageId ? 'selected' : ''}>${l.flag_emoji} ${escapeHtml(l.name)}</option>`).join('')}</select>
        </div>
        <div class="field">
          <label>Leçon</label>
          <select id="qLessonSelect">${lessons.map((l) => `<option value="${l.id}" ${l.id === state.selectedLessonId ? 'selected' : ''}>${escapeHtml(l.title)}</option>`).join('')}</select>
        </div>
      </div>
      <div id="questionsList"></div>
    </div>
    <div class="card">
      <h2 id="qFormTitle">Ajouter une question</h2>
      <div class="field">
        <label>Type</label>
        <select id="qType">
          <option value="mcq">QCM (choix multiple)</option>
          <option value="typed">Saisie libre (recommandé — plus difficile)</option>
        </select>
      </div>
      <div class="field"><label>Question</label><textarea id="qPrompt" rows="2" style="width:100%"></textarea></div>
      <div class="field" id="qOptionsField">
        <label>Options (une par ligne, QCM uniquement)</label>
        <textarea id="qOptions" rows="4" style="width:100%" placeholder="option 1&#10;option 2&#10;option 3"></textarea>
      </div>
      <div class="field">
        <label id="qAcceptedLabel">Réponse(s) correcte(s) — une par ligne (pour QCM : le texte exact de la bonne option ; pour saisie libre : toutes les variantes acceptées)</label>
        <textarea id="qAccepted" rows="3" style="width:100%"></textarea>
      </div>
      <div class="field"><label>Explication (affichée après la réponse)</label><textarea id="qExplanation" rows="2" style="width:100%"></textarea></div>
      <div class="field"><label>Ordre</label><input id="qPosition" type="number" value="0" style="width:100px"></div>
      <div class="row">
        <button id="saveQBtn">Enregistrer</button>
        <button class="secondary" id="clearQBtn">Nouvelle question (vider)</button>
      </div>
      <div class="muted" style="margin-top:8px">Rappel : évite les QCM trop faciles — préfère la saisie libre ou des options-pièges vraiment plausibles.</div>
      <div class="error" id="qErr"></div>
    </div>
  `;

  document.getElementById('qLangSelect').addEventListener('change', (e) => {
    state.selectedLanguageId = Number(e.target.value);
    state.selectedLessonId = null;
    renderQuestions();
  });
  document.getElementById('qLessonSelect').addEventListener('change', (e) => {
    state.selectedLessonId = Number(e.target.value);
    renderQuestions();
  });

  let editingQId = null;

  async function loadQuestionsList() {
    if (!state.selectedLessonId) {
      document.getElementById('questionsList').innerHTML = '<p class="muted">Aucune leçon dans cette langue — crée-en une dans l\'onglet Leçons.</p>';
      return;
    }
    const questions = await api(`/api/admin/lessons/${state.selectedLessonId}/questions`);
    document.getElementById('questionsList').innerHTML = `
      <table class="admin-table">
        <tr><th>Type</th><th>Question</th><th>Réponse</th><th></th></tr>
        ${questions
          .map(
            (q) => `<tr>
              <td><span class="pill">${q.type === 'mcq' ? 'QCM' : 'Saisie'}</span></td>
              <td>${escapeHtml(q.prompt)}</td>
              <td>${escapeHtml(q.accepted_answers[0])}</td>
              <td><button class="secondary" data-edit-q="${q.id}">Modifier</button>
                  <button class="danger" data-del-q="${q.id}">Supprimer</button></td>
            </tr>`
          )
          .join('')}
      </table>
    `;
    document.querySelectorAll('[data-del-q]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        if (!confirm('Supprimer cette question (et la progression associée) ?')) return;
        await api(`/api/admin/questions/${btn.dataset.delQ}`, { method: 'DELETE' });
        loadQuestionsList();
      })
    );
    document.querySelectorAll('[data-edit-q]').forEach((btn) =>
      btn.addEventListener('click', () => {
        const q = questions.find((x) => x.id == btn.dataset.editQ);
        editingQId = q.id;
        document.getElementById('qFormTitle').textContent = 'Modifier la question';
        document.getElementById('qType').value = q.type;
        toggleOptionsField();
        document.getElementById('qPrompt').value = q.prompt;
        document.getElementById('qOptions').value = (q.options || []).join('\n');
        document.getElementById('qAccepted').value = q.accepted_answers.join('\n');
        document.getElementById('qExplanation').value = q.explanation;
        document.getElementById('qPosition').value = q.position;
      })
    );
  }
  loadQuestionsList();

  function toggleOptionsField() {
    document.getElementById('qOptionsField').style.display = document.getElementById('qType').value === 'mcq' ? 'block' : 'none';
  }
  document.getElementById('qType').addEventListener('change', toggleOptionsField);
  toggleOptionsField();

  document.getElementById('clearQBtn').addEventListener('click', () => {
    editingQId = null;
    document.getElementById('qFormTitle').textContent = 'Ajouter une question';
    document.getElementById('qType').value = 'typed';
    document.getElementById('qPrompt').value = '';
    document.getElementById('qOptions').value = '';
    document.getElementById('qAccepted').value = '';
    document.getElementById('qExplanation').value = '';
    document.getElementById('qPosition').value = 0;
    toggleOptionsField();
  });

  document.getElementById('saveQBtn').addEventListener('click', async () => {
    const errEl = document.getElementById('qErr');
    errEl.textContent = '';
    const type = document.getElementById('qType').value;
    const options = document.getElementById('qOptions').value.split('\n').map((s) => s.trim()).filter(Boolean);
    const accepted = document.getElementById('qAccepted').value.split('\n').map((s) => s.trim()).filter(Boolean);
    const payload = {
      type,
      prompt: document.getElementById('qPrompt').value,
      options: type === 'mcq' ? options : undefined,
      accepted_answers: accepted,
      explanation: document.getElementById('qExplanation').value,
      position: Number(document.getElementById('qPosition').value) || 0,
    };
    try {
      if (type === 'mcq' && !options.some((o) => o === accepted[0])) {
        throw new Error('Pour un QCM, la première réponse acceptée doit correspondre exactement au texte d\'une des options.');
      }
      if (editingQId) {
        await api(`/api/admin/questions/${editingQId}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await api(`/api/admin/lessons/${state.selectedLessonId}/questions`, { method: 'POST', body: JSON.stringify(payload) });
      }
      document.getElementById('clearQBtn').click();
      loadQuestionsList();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });
}

// ---------- Users ----------

async function renderUsers() {
  const panel = document.getElementById('tab-users');
  const users = await api('/api/admin/users');
  const me = await api('/api/me');

  panel.innerHTML = `
    <h1 style="margin-bottom:24px">Utilisateurs</h1>
    <div class="card">
      <h2>Comptes existants</h2>
      <table class="admin-table">
        <tr><th>Nom</th><th>Identifiant</th><th>Rôle</th><th>Créé le</th><th></th></tr>
        ${users
          .map(
            (u) => `<tr>
              <td>${escapeHtml(u.display_name)}</td><td>${escapeHtml(u.username)}</td>
              <td><span class="pill ${u.role === 'admin' ? 'mastered' : ''}">${u.role}</span></td>
              <td class="muted">${u.created_at}</td>
              <td>
                <button class="secondary" data-progress="${u.id}">Progression</button>
                <button class="secondary" data-reset="${u.id}">Reset mdp</button>
                <button class="secondary" data-toggle-role="${u.id}" data-role="${u.role}">${u.role === 'admin' ? 'Rétrograder' : 'Promouvoir admin'}</button>
                ${u.id === me.id ? '' : `<button class="danger" data-del-user="${u.id}">Supprimer</button>`}
              </td>
            </tr>`
          )
          .join('')}
      </table>
      <div id="userProgressPanel"></div>
    </div>
    <div class="card">
      <h2>Ajouter un utilisateur</h2>
      <div class="row">
        <div class="field"><label>Nom affiché</label><input id="newUserDisplay"></div>
        <div class="field"><label>Identifiant</label><input id="newUserUsername"></div>
        <div class="field"><label>Mot de passe</label><input id="newUserPassword" type="text"></div>
        <div class="field"><label>Rôle</label>
          <select id="newUserRole"><option value="student">student</option><option value="admin">admin</option></select>
        </div>
      </div>
      <button id="addUserBtn">Créer l'utilisateur</button>
      <div class="error" id="userErr"></div>
    </div>
  `;

  document.getElementById('addUserBtn').addEventListener('click', async () => {
    const errEl = document.getElementById('userErr');
    errEl.textContent = '';
    try {
      await api('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          display_name: document.getElementById('newUserDisplay').value,
          username: document.getElementById('newUserUsername').value,
          password: document.getElementById('newUserPassword').value,
          role: document.getElementById('newUserRole').value,
        }),
      });
      renderUsers();
    } catch (err) {
      errEl.textContent = err.message;
    }
  });

  panel.querySelectorAll('[data-del-user]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      if (!confirm('Supprimer cet utilisateur et toute sa progression ?')) return;
      await api(`/api/admin/users/${btn.dataset.delUser}`, { method: 'DELETE' });
      renderUsers();
    })
  );

  panel.querySelectorAll('[data-reset]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const pwd = prompt('Nouveau mot de passe pour cet utilisateur :');
      if (!pwd) return;
      await api(`/api/admin/users/${btn.dataset.reset}`, { method: 'PUT', body: JSON.stringify({ password: pwd }) });
      alert('Mot de passe mis à jour.');
    })
  );

  panel.querySelectorAll('[data-toggle-role]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const newRole = btn.dataset.role === 'admin' ? 'student' : 'admin';
      await api(`/api/admin/users/${btn.dataset.toggleRole}`, { method: 'PUT', body: JSON.stringify({ role: newRole }) });
      renderUsers();
    })
  );

  panel.querySelectorAll('[data-progress]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const progress = await api(`/api/admin/users/${btn.dataset.progress}/progress`);
      const user = users.find((u) => u.id == btn.dataset.progress);
      document.getElementById('userProgressPanel').innerHTML = `
        <h3>Progression de ${escapeHtml(user.display_name)}</h3>
        <table class="admin-table">
          <tr><th>Langue</th><th>Leçon</th><th>Maîtrise</th></tr>
          ${progress
            .map((p) => {
              const pct = p.totalQuestions ? Math.round((p.masteredCount / p.totalQuestions) * 100) : 0;
              return `<tr><td>${escapeHtml(p.languageName)}</td><td>${escapeHtml(p.title)}</td><td>${pct}% (${p.masteredCount}/${p.totalQuestions})</td></tr>`;
            })
            .join('')}
        </table>
      `;
    })
  );
}

// ---------- Init ----------

(async function init() {
  const me = await api('/api/me');
  if (!me) return;
  if (me.role !== 'admin') { window.location.href = '/app/'; return; }
  document.getElementById('whoami').textContent = `${me.display_name} (${me.username})`;
  renderOverview();
})();
