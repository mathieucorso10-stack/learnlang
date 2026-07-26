# 🌐 LearnLang

Une plateforme de cours de langues **multi-utilisateurs** et **multi-langues**,
avec répétition espacée. Développée pour un francophone débutant, avec trois
cours complets prêts à l'emploi : **Español** (10 leçons), **English**
(10 leçons) et **Italiano** (10 leçons).

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
- **Interface soignée** : anneaux de progression, tableau de bord clair,
  petite célébration (confettis 🎉) quand tu réussis bien un quiz.
- **Base de données PostgreSQL** : la même base peut être utilisée en local
  et en production — la progression est partagée, pas piégée sur un seul
  Mac.

## 🗺️ Deux façons de l'utiliser

| | Local sur ton Mac | En ligne 24/7 (public) |
|---|---|---|
| Coût | Gratuit | Gratuit |
| Comptes à créer | Supabase (base de données) | Supabase + Render + GitHub |
| Disponibilité | Seulement quand ton Mac tourne | Toujours, même Mac éteint |
| Mise en place | ~5 min | ~20 min |

Les deux modes utilisent **la même base de données Postgres** (sur
Supabase) — tu peux commencer en local et passer en ligne plus tard sans
rien perdre.

## 🚀 Démarrage en local

Prérequis : [Node.js](https://nodejs.org) (version 18+) et un compte
[Supabase](https://supabase.com) gratuit (aucune carte bancaire requise).

### 1. Crée ta base de données (une seule fois)

1. Crée un compte sur [supabase.com](https://supabase.com) et un nouveau projet.
2. Dans **Project Settings → Database → Connection string**, copie l'URI
   (commence par `postgresql://...`).

### 2. Configure et lance LearnLang

```bash
cd plateforme
cp .env.example .env
```

Ouvre `.env` et colle ta chaîne de connexion Supabase dans `DATABASE_URL`.
Puis :

```bash
npm install
npm run seed
npm run seed:extend
npm start
```

- `npm install` : à faire une seule fois, installe les dépendances.
- `npm run seed` : à faire une seule fois, crée les tables et importe le cours d'espagnol.
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
en haut à droite du tableau de bord) — c'est d'autant plus important que
ta base est maintenant accessible depuis internet (même en usage local,
Supabase héberge tes données).

### Accéder depuis un autre appareil (même wifi)

Le serveur affiche au démarrage une adresse du type :

```
LearnLang lancé !
  Sur ce Mac      : http://localhost:4321
  Sur le wifi     : http://192.168.1.67:4321
```

Donne cette deuxième adresse à qui veut se connecter depuis son téléphone
ou un autre ordinateur du foyer, tant que le serveur tourne sur ton Mac.

## 🌍 Déploiement public, gratuit, 24/7

Pour que le site reste accessible même quand ton Mac est éteint, il faut
l'héberger ailleurs. Voici la checklist complète — gratuite, sans carte
bancaire, mais qui demande de créer 3 comptes toi-même (je ne peux pas le
faire à ta place : ce sont TES comptes, avec TON email).

### Ce qu'il te reste à faire (~20 minutes, une seule fois)

1. **Supabase** (si pas déjà fait ci-dessus) → crée ton projet, récupère
   `DATABASE_URL`, lance `npm run seed` et `npm run seed:extend` en local
   une fois pour peupler la base (voir démarrage en local ci-dessus).

2. **GitHub** → crée un compte sur [github.com](https://github.com), puis
   un nouveau dépôt (vide, sans README). Depuis le dossier du projet :
   ```bash
   git remote add origin https://github.com/TON-PSEUDO/learnlang.git
   git push -u origin main
   ```
   (remplace l'URL par celle de ton dépôt — GitHub te la donne après
   création)

3. **Render** → crée un compte sur [render.com](https://render.com),
   clique **New → Blueprint**, connecte ton dépôt GitHub. Render détecte
   automatiquement `render.yaml` et propose de créer le service. Quand il
   demande la valeur de `DATABASE_URL`, colle ta chaîne de connexion
   Supabase. Clique **Deploy**.

4. Après quelques minutes, Render te donne une adresse fixe du type
   `https://learnlang.onrender.com` — **c'est celle-ci que tu partages**,
   elle ne change jamais.

### À savoir, honnêtement

- Le service gratuit Render **s'endort après 15 minutes sans visite** et
  met environ une minute à se réveiller au premier visiteur suivant —
  normal, pas un bug.
- La base Supabase gratuite **se met en pause après 7 jours sans aucune
  activité** (mais ne perd jamais les données) — il suffit d'aller cliquer
  « Restore » dans le tableau de bord Supabase si ça arrive.
- Pour mettre à jour le site après une modification du code : `git push`
  suffit, Render redéploie automatiquement.

## 🛜 Alternative : tunnel gratuit depuis ton Mac (sans Render/GitHub)

Si tu veux un accès public mais sans créer de compte Render/GitHub, et que
ça ne te dérange pas que ton Mac reste allumé : double-clique sur
**`Lancer LearnLang en public.command`** (dans ce dossier). Ça démarre le
serveur et ouvre un tunnel [Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/)
gratuit (`cloudflared`, déjà téléchargé dans `bin/`), qui donne une
adresse publique temporaire du type `https://un-nom.trycloudflare.com`.

- Gratuit, sans compte, sans carte bancaire.
- L'adresse **change à chaque relance**.
- Ton Mac doit rester **allumé et connecté** pendant que des gens
  l'utilisent.
- Nécessite quand même le compte Supabase (étape 1 ci-dessus), puisque
  LearnLang utilise Postgres même en local désormais.

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
├── server.js               # Serveur Express : auth, API REST, fichiers statiques
├── db.js                   # Connexion PostgreSQL (pg), schéma, helpers async
├── srs.js                  # Algorithme de répétition espacée (SM-2) + helpers de date
├── answercheck.js          # Validation des réponses (accents, ponctuation)
├── render.yaml              # Config de déploiement Render (Blueprint)
├── .env.example             # Modèle de configuration (DATABASE_URL, SESSION_SECRET)
├── seed/
│   ├── seed_spanish.js      # Importe le cours espagnol de base (leçons 1-6)
│   ├── extend_courses.js    # Ajoute ES 7-10 + cours English + cours Italiano (idempotent)
│   ├── content_es_extra.js  # Contenu des leçons espagnoles 7-10
│   ├── content_en.js        # Contenu complet du cours d'anglais
│   └── content_it.js        # Contenu complet du cours d'italien
├── public/
│   ├── index.html           # Page de connexion
│   ├── style.css             # Design system (couleurs, typographie, composants)
│   ├── app/                 # Interface étudiant (tableau de bord, leçon, quiz)
│   └── admin/                # Interface admin (sidebar + panneaux CRUD)
├── bin/
│   └── cloudflared           # Binaire pour le tunnel public gratuit (voir plus haut)
├── test/
│   └── pgmem_smoke.js        # Test de bout en bout sans base réelle (voir plus bas)
└── Lancer LearnLang en public.command   # Double-clic : serveur + tunnel public
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

- **Backend** : Node.js, Express, [pg](https://node-postgres.com) (client PostgreSQL)
- **Base de données** : PostgreSQL hébergé gratuitement sur [Supabase](https://supabase.com)
- **Auth** : sessions via `express-session`, mots de passe hashés avec `bcryptjs`
- **Frontend** : HTML/CSS/JS vanilla, aucun build step. Markdown des leçons
  rendu côté client avec [marked](https://marked.js.org).
- **Polices** : Fraunces (titres) + Inter (texte), via Google Fonts.
- **Déploiement** : [Render](https://render.com) (hébergement gratuit du serveur)

## 🧪 Tester sans base de données réelle

`npm run test:pgmem` fait tourner tout le cycle (création des tables,
import des deux cours, démarrage du serveur) contre une base PostgreSQL
**émulée en mémoire** (le paquet `pg-mem`), sans avoir besoin d'un vrai
Supabase. Pratique pour vérifier que le code démarre correctement après
une modification, avant de toucher à la vraie base.

## 🔒 Sauvegarder / réinitialiser tes données

Toute la progression vit dans ta base Supabase, pas sur ton disque —
Supabase la sauvegarde automatiquement. Pour repartir totalement à zéro,
le plus simple est de supprimer les tables depuis l'onglet **Table
Editor** de Supabase (ou de créer un nouveau projet Supabase), puis :

```bash
npm run seed
npm run seed:extend
```

⚠️ Ça supprime définitivement tous les comptes, la progression et tout
contenu ajouté manuellement depuis l'admin.
