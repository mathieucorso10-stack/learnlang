# 🌐 LearnLang

Une plateforme de cours de langues **multi-utilisateurs** et **multi-langues**,
avec répétition espacée, à faire tourner chez toi sur ton Mac. Pas de cloud,
pas d'abonnement, pas de compte à créer ailleurs — juste Node.js et un
fichier SQLite.

Développée pour un francophone débutant, avec deux cours complets prêts à
l'emploi : **Español** (10 leçons) et **English** (10 leçons).

## ✨ Fonctionnalités

- **Comptes multiples** : un admin (toi) qui gère tout, des étudiants qui
  apprennent — chacun avec sa propre progression.
- **Multi-langues** : ajoute autant de langues/cours que tu veux depuis le
  panel admin.
- **Répétition espacée (SM-2)** : chaque question réapparaît au bon moment
  selon que tu l'as réussie ou ratée, pas au hasard.
- **Quiz exigeants** : mélange de QCM à distracteurs resserrés et de
  questions à **saisie libre** (conjuguer, traduire, compléter) — la
  reconnaissance passive ne suffit pas.
- **Validation intelligente des réponses** : tolérante aux accents
  manquants (« presque, attention aux accents » plutôt qu'un simple faux),
  stricte sur tout le reste.
- **Accès réseau local** : lance le serveur sur ton Mac, connecte-toi depuis
  le téléphone ou un autre ordinateur sur le même wifi.
- **Interface soignée** : anneaux de progression, tableau de bord clair,
  petite célébration (confettis 🎉) quand tu réussis bien un quiz.

## 🚀 Démarrage

Prérequis : [Node.js](https://nodejs.org) installé (version 18 ou plus).

```bash
cd plateforme
npm install
npm run seed
npm run seed:extend
npm start
```

- `npm install` : à faire une seule fois, installe les dépendances.
- `npm run seed` : à faire une seule fois, crée la base et importe le cours d'espagnol.
- `npm run seed:extend` : à faire une seule fois, ajoute les leçons 7-10 en espagnol et tout le cours d'anglais.
- `npm start` : démarre le serveur (à refaire à chaque fois que tu veux relancer la plateforme).

⚠️ Colle ces commandes une par une dans le terminal plutôt que le bloc
entier d'un coup — si ton terminal reste bloqué sur une invite `quote>`
après un copier-coller, appuie sur `Ctrl+C` pour l'annuler et retape la
commande normalement.

Puis ouvre **http://localhost:4321** dans ton navigateur.

**Compte admin par défaut** (créé par `npm run seed`) :
- Identifiant : `admin`
- Mot de passe : `espanol123`

⚠️ Change ce mot de passe dès la première connexion (menu « Mot de passe »
en haut à droite du tableau de bord).

### Accéder depuis un autre appareil (même wifi)

Le serveur affiche au démarrage une adresse du type :

```
LearnLang lancé !
  Sur ce Mac      : http://localhost:4321
  Sur le wifi     : http://192.168.1.67:4321
```

Donne cette deuxième adresse à qui veut se connecter depuis son téléphone
ou un autre ordinateur du foyer, tant que le serveur tourne sur ton Mac.

### Accéder depuis internet, gratuitement (Cloudflare Tunnel)

Pour que des gens en dehors de ton wifi puissent se connecter (pas
seulement à la maison), sans payer d'hébergement et sans rien changer au
code : double-clique sur **`Lancer LearnLang en public.command`** (dans
ce dossier `plateforme/`).

Ça fait deux choses automatiquement :
1. Démarre le serveur LearnLang (comme `npm start`).
2. Ouvre un tunnel gratuit via [Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/)
   (`cloudflared`, déjà téléchargé dans `bin/`) qui donne une adresse
   publique du type `https://un-nom-aleatoire.trycloudflare.com`.

Cette adresse s'affiche dans le terminal qui s'ouvre — c'est celle-ci
qu'il faut partager. Points à savoir :

- **Gratuit, sans compte, sans carte bancaire.**
- L'adresse **change à chaque relance** (pas de compte Cloudflare = pas
  d'adresse fixe). Si tu veux une adresse stable qui ne change jamais, il
  faudrait un compte Cloudflare gratuit + un nom de domaine (ça, en
  revanche, coûte quelques euros par an).
- Ton Mac doit rester **allumé et connecté à internet** pendant que des
  gens l'utilisent — ferme la fenêtre du terminal (ou `Ctrl+C`) pour tout
  arrêter proprement.
- Comme le site devient accessible publiquement, assure-toi d'avoir
  changé le mot de passe admin par défaut (voir plus haut) avant de
  partager le lien.

## 👤 Utilisation

### Côté étudiant (`/app/`)

Tableau de bord avec une carte par langue (anneau de progression, leçons
listées avec leur numéro et leur taux de maîtrise). On clique sur une
leçon pour lire le cours puis lancer le quiz — les questions déjà vues et
dues reviennent en priorité, les nouvelles complètent jusqu'à 10 questions
par session.

### Côté admin (`/admin/`)

Panel avec sidebar : vue d'ensemble (stats, questions les plus ratées),
gestion des langues, des leçons (contenu en markdown), des questions (QCM
ou saisie libre), et des utilisateurs (créer, changer le rôle, réinitialiser
un mot de passe, voir la progression de chacun).

## 🗂️ Structure du projet

```
plateforme/
├── server.js              # Serveur Express : auth, API REST, fichiers statiques
├── db.js                  # Schéma SQLite (better-sqlite3)
├── srs.js                 # Algorithme de répétition espacée (SM-2)
├── answercheck.js          # Validation des réponses (accents, ponctuation)
├── seed/
│   ├── seed_spanish.js     # Importe le cours espagnol de base (leçons 1-6)
│   ├── extend_courses.js   # Ajoute ES 7-10 + tout le cours English (idempotent)
│   ├── content_es_extra.js # Contenu des leçons espagnoles 7-10
│   └── content_en.js       # Contenu complet du cours d'anglais
├── public/
│   ├── index.html          # Page de connexion
│   ├── style.css            # Design system (couleurs, typographie, composants)
│   ├── app/                # Interface étudiant (tableau de bord, leçon, quiz)
│   └── admin/               # Interface admin (sidebar + panneaux CRUD)
├── bin/
│   └── cloudflared          # Binaire pour le tunnel public gratuit (voir plus haut)
├── Lancer LearnLang en public.command   # Double-clic : serveur + tunnel public
└── data/
    └── learnlang.db         # Base SQLite (créée au premier `npm run seed`)
```

## 🧠 Comment fonctionne la répétition espacée

Chaque réponse à une question met à jour, pour cet utilisateur et cette
question, un facteur de facilité et une date de prochaine révision
(algorithme SM-2 simplifié dans `srs.js`) :

- **Bonne réponse** → l'intervalle avant la prochaine révision augmente
  (1 jour → 6 jours → puis multiplié par le facteur de facilité).
- **Mauvaise réponse** → on repart de zéro, la question revient dès le
  lendemain.

Une question est considérée comme **maîtrisée** après 2 répétitions
réussies consécutives (visible dans les pourcentages du tableau de bord).

## ➕ Ajouter du contenu

**Depuis l'admin** (`/admin/` → onglets Langues / Leçons / Questions) :
ajoute une langue, puis des leçons (titre + contenu markdown), puis des
questions (QCM avec options, ou saisie libre avec les réponses acceptées).

**En masse, par script** : pour ajouter un cours entier proprement, écris
un fichier `seed/content_xx.js` sur le modèle de `content_en.js` (un
tableau `LESSONS` avec `title`, `content_md`, `questions`), puis adapte
`extend_courses.js` pour l'importer — c'est idempotent, il vérifie les
titres de leçons existants avant d'insérer.

## 🛠️ Stack technique

- **Backend** : Node.js, Express, [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
  (base SQLite locale, un seul fichier)
- **Auth** : sessions via `express-session`, mots de passe hashés avec
  `bcryptjs`
- **Frontend** : HTML/CSS/JS vanilla, aucun build step. Markdown des leçons
  rendu côté client avec [marked](https://marked.js.org).
- **Polices** : Fraunces (titres) + Inter (texte), via Google Fonts.

Aucune donnée ne quitte ta machine — tout est stocké dans
`data/learnlang.db`.

## 🔒 Sauvegarder / réinitialiser tes données

Toute la progression vit dans `data/learnlang.db`. Pour sauvegarder,
copie ce fichier ailleurs. Pour repartir de zéro :

```bash
rm data/learnlang.db data/learnlang.db-shm data/learnlang.db-wal
npm run seed
npm run seed:extend
```

⚠️ Ça supprime définitivement tous les comptes, la progression et tout
contenu ajouté manuellement depuis l'admin.
