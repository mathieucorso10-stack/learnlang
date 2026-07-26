// Cours d'anglais complet (10 leçons), écrit directement ici pour import en base.
// Public cible : francophone débutant total. Même exigence que le cours espagnol :
// pas de QCM faciles, pièges spécifiques au français signalés partout où ça compte.
'use strict';

const LESSONS = [
  {
    title: 'Prononciation et alphabet anglais',
    content_md: `# Leçon 1 — Prononciation et alphabet anglais

## La mauvaise nouvelle (et comment s'en sortir)

Contrairement à l'espagnol, l'anglais **ne se prononce pas comme il
s'écrit** : une même lettre peut se prononcer de plusieurs façons selon le
mot (**a** dans *cat*, *car*, *cake*, *about* — quatre sons différents !).
Il n'y a pas de règle unique à apprendre par cœur : c'est le vocabulaire
qui s'apprend avec sa prononciation, mot par mot. La bonne nouvelle :
quelques points de méthode suffisent à éviter 80% des pièges classiques
pour un francophone.

## Le son « th » — le son qui n'existe pas en français

Deux sons **th** différents, tous deux inconnus en français :
- **th** sourd (comme dans **think**, **three**, **bath**) : bout de
  langue entre les dents, on souffle sans faire vibrer les cordes vocales.
- **th** voisé (comme dans **this**, **that**, **mother**) : même
  position de langue, mais les cordes vocales vibrent.

⚠️ Piège n°1 : le réflexe français est de dire « z » ou « s » à la place
(« zis » au lieu de *this*). Il faut vraiment mettre le bout de la langue
entre les dents.

## Le « h » aspiré

Contrairement au français où le h est toujours muet, le **h** anglais se
prononce en général comme un souffle : **house**, **hello**, **happy**.
⚠️ Piège : ton réflexe sera d'avaler le h comme en français. Il faut
souffler légèrement, presque comme un h espagnol/arabe doux.

## Les voyelles courtes et longues

L'anglais distingue des paires de voyelles courtes/longues qui changent
le sens du mot :
- **ship** (bateau, i court) vs **sheep** (mouton, i long)
- **bit** (morceau, i court) vs **beat** (battre, i long)
- **full** (plein, ou court) vs **fool** (idiot, ou long)

Le français ne fait pas cette distinction de longueur, donc l'oreille d'un
francophone doit s'entraîner activement à l'entendre.

## Les lettres muettes

Beaucoup de mots ont des lettres qui ne se prononcent pas du tout :
**know** (le k est muet), **write** (le w est muet), **island** (le s est
muet), **comb** (le b est muet), **listen** (le t est muet).
⚠️ Contrairement au français où les lettres muettes sont surtout en fin de
mot, en anglais elles peuvent être n'importe où dans le mot.

## L'accent tonique (word stress)

En anglais, un mot mal accentué peut devenir incompréhensible, même si
tous les sons sont corrects. L'accent tonique n'est **pas fixe** comme en
français (toujours sur la dernière syllabe) : il change d'un mot à
l'autre et il faut l'apprendre avec le mot.
- **PHOtograph** (nom) vs **phoTOgraphy** (le mot dérivé change d'accent)
- **REcord** (nom, un disque) vs **reCORD** (verbe, enregistrer) — le même
  mot change de sens selon l'accent !

## L'alphabet pour épeler

Savoir épeler à voix haute est indispensable en anglais (donner son nom,
son email au téléphone). Quelques lettres à bien travailler :
**A** (eille), **E** (i), **I** (aïe), **G** (dji), **J** (djeille),
**W** (dabliou), **Y** (waï).

## Phrases à répéter à voix haute

- **This is my brother.** (entraîne le th voisé)
- **I think that's right.** (entraîne le th sourd)
- **How are you today?** (entraîne le h aspiré)
- **Can you spell your name, please?** (entraîne l'épellation)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Comment prononce-t-on le « th » de « think » ?', options: ['Comme un « z »', 'Bout de langue entre les dents, sans faire vibrer les cordes vocales', 'Comme un « s » classique', 'Bout de langue entre les dents, en faisant vibrer les cordes vocales'], answer: 1, explanation: 'th sourd (think) : langue entre les dents, on souffle sans vibration des cordes vocales — le th voisé (this) vibre.' },
      { type: 'mcq', prompt: 'Le « h » de « house » se prononce comment, contrairement au français ?', options: ['Il est muet, comme en français', 'Il se prononce, comme un léger souffle', 'Comme un « r » guttural', 'Comme un « k »'], answer: 1, explanation: 'Le h anglais se prononce (souffle léger), contrairement au h français toujours muet.' },
      { type: 'mcq', prompt: 'Quelle paire de mots illustre la différence de voyelle courte/longue ?', options: ['cat / cats', 'ship / sheep', 'go / going', 'the / that'], answer: 1, explanation: 'ship (i court) et sheep (i long) ne se distinguent que par la longueur de la voyelle — un piège pour l\'oreille française.' },
      { type: 'typed', prompt: 'Dans le mot « know » (savoir), quelle lettre est muette ?', answers: ['k'], explanation: 'Le k de know est muet — on prononce « no ».' },
      { type: 'mcq', prompt: 'Que se passe-t-il si l\'accent tonique d\'un mot anglais est mal placé ?', options: ['Rien, ce n\'est pas important', 'Le mot peut devenir incompréhensible', 'Le sens change légèrement seulement', 'Cela n\'arrive jamais en anglais'], answer: 1, explanation: 'Contrairement au français où l\'accent est prévisible, un mauvais accent tonique en anglais peut rendre le mot incompréhensible.' },
      { type: 'mcq', prompt: '« RECord » (nom) et « reCORD » (verbe) : ces deux mots se distinguent par :', options: ['L\'orthographe', 'L\'accent tonique uniquement', 'Le th', 'Une lettre muette'], answer: 1, explanation: 'Même orthographe, mais l\'accent tonique change et distingue le nom du verbe.' },
      { type: 'typed', prompt: 'Épelle en anglais la lettre « J » (comment se prononce son nom).', answers: ['djeille'], explanation: 'J se prononce « djeille » (proche de l\'anglais « jay »).' },
      { type: 'mcq', prompt: 'Contrairement au français, les lettres muettes en anglais peuvent se trouver :', options: ['Seulement en fin de mot', 'N\'importe où dans le mot', 'Seulement en début de mot', 'Elles n\'existent pas en anglais'], answer: 1, explanation: 'write (w muet en début), listen (t muet au milieu), comb (b muet en fin) — n\'importe où dans le mot.' },
    ],
  },
  {
    title: 'Salutations et présentations',
    content_md: `# Leçon 2 — Salutations et présentations

## Se saluer

| Anglais | Français |
|---|---|
| Hi! / Hello! | Salut ! / Bonjour ! |
| Good morning | Bonjour (le matin) |
| Good afternoon | Bon après-midi |
| Good evening | Bonsoir |
| How are you? / How's it going? | Comment ça va ? |
| I'm fine, thanks. And you? | Je vais bien, merci. Et toi ? |
| Goodbye / Bye | Au revoir / Salut |
| See you later | À plus tard |
| See you tomorrow | À demain |

## Les pronoms personnels

| Anglais | Français |
|---|---|
| I | je |
| you | tu / vous (identique au singulier et au pluriel !) |
| he / she / it | il / elle / il-elle (objet, animal, concept) |
| we | nous |
| you | vous (pluriel) |
| they | ils / elles |

⚠️ Piège n°1 : contrairement au français, l'anglais **n'a qu'un seul mot**
pour « tu » et « vous » : **you**. Pas de distinction de politesse. Et le
pronom sujet **ne peut jamais être omis** en anglais (contrairement à
l'espagnol) : on dit toujours « I am », jamais juste « am ».

⚠️ Piège n°2 : **it** sert à désigner un objet, un animal ou un concept
neutre — il n'y a pas de genre grammatical en anglais pour les choses
(« la table » se dit juste **it**, pas de mot pour « elle » au sens
d'objet féminin).

## Le verbe TO BE (être)

| | Anglais | Français |
|---|---|---|
| I | am | je suis |
| you | are | tu es |
| he/she/it | is | il/elle est |
| we | are | nous sommes |
| you | are | vous êtes |
| they | are | ils/elles sont |

À l'oral et à l'écrit courant, on contracte souvent : **I'm**, **you're**,
**he's**, **we're**, **they're**.

## Se présenter

- **My name is Mathieu.** (Je m'appelle Mathieu — littéralement « mon nom
  est Mathieu », pas de verbe réfléchi comme en français/espagnol.)
- **I'm French.** (Je suis français.)
- **I'm from France.** (Je suis de France / Je viens de France.)
- **I'm thirty years old.** (J'ai trente ans — littéralement « je suis
  trente ans », avec **to be** et pas « avoir » comme en français !)
- **Nice to meet you.** (Enchanté(e).)
- **What's your name?** (Comment tu t'appelles ?)
- **Where are you from?** (D'où viens-tu ?)

⚠️ Piège majeur : pour donner son âge, l'anglais utilise **to be** («
être ») et non « avoir » comme en français : **I am 30**, jamais *I have
30*. C'est l'inverse de l'espagnol qui utilise *tener* (avoir) !

## Poser une question simple avec TO BE

Avec le verbe **to be**, on forme la question en inversant simplement le
sujet et le verbe (pas besoin d'auxiliaire ici, contrairement au présent
simple qu'on verra en leçon 3) :
- **Are you French?** (Es-tu français ?)
- **Is he a teacher?** (Est-il professeur ?)

## Dialogue à mémoriser

> — Hi! How are you?
> — I'm fine, thanks. And you?
> — I'm good too. What's your name?
> — My name is Laura. And you?
> — I'm Mathieu. Nice to meet you.
> — Nice to meet you too. Where are you from?
> — I'm from France. And you?
> — I'm from London.

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Comment dit-on « tu » ET « vous » en anglais ?', options: ['Deux mots différents comme en français', 'you (un seul mot pour les deux)', 'it', 'thou (toujours utilisé aujourd\'hui)'], answer: 1, explanation: 'you sert à la fois pour le tutoiement et le vouvoiement — pas de distinction de politesse en anglais moderne.' },
      { type: 'typed', prompt: 'Conjugue TO BE à la 1ʳᵉ personne du singulier (I).', answers: ['am'], explanation: 'I am — irrégulier, à apprendre par cœur.' },
      { type: 'typed', prompt: 'Conjugue TO BE à la 3ᵉ personne du singulier (he/she/it).', answers: ['is'], explanation: 'he/she/it is.' },
      { type: 'mcq', prompt: 'Pour donner son âge, quel verbe utilise l\'anglais (contrairement au français) ?', options: ['to have (avoir)', 'to be (être)', 'to get', 'to do'], answer: 1, explanation: 'I am 30 years old — littéralement « je SUIS 30 ans », pas « j\'ai » comme en français.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Je m\'appelle Laura. »', answers: ['my name is laura'], explanation: 'My name is Laura — pas de verbe réfléchi comme en français, structure « mon nom est ».' },
      { type: 'typed', prompt: 'Traduis en anglais : « D\'où viens-tu ? »', answers: ['where are you from'], explanation: 'Where are you from? — inversion sujet/verbe avec to be pour la question.' },
      { type: 'mcq', prompt: 'Comment forme-t-on une question avec TO BE ?', options: ['On ajoute do/does devant', 'On inverse simplement le sujet et le verbe', 'On met un point d\'interrogation à l\'oral seulement', 'On ajoute « is it that » devant'], answer: 1, explanation: 'Are you French? — avec to be, pas besoin d\'auxiliaire, on inverse juste sujet et verbe.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Enchanté(e). » (à l\'occasion d\'une rencontre)', answers: ['nice to meet you'], explanation: 'Nice to meet you — expression standard pour une première rencontre.' },
      { type: 'mcq', prompt: 'Le pronom « it » sert à désigner :', options: ['Uniquement une personne', 'Un objet, un animal ou un concept neutre', 'Uniquement le narrateur', 'La politesse envers un inconnu'], answer: 1, explanation: 'it remplace un objet/animal/concept — l\'anglais n\'a pas de genre grammatical pour les choses.' },
    ],
  },
  {
    title: 'Articles, pluriel et présent simple',
    content_md: `# Leçon 3 — Articles, pluriel et présent simple (DO/DOES)

## Les articles A / AN / THE

| Anglais | Usage | Français |
|---|---|---|
| **a** book | devant un son consonne | un livre |
| **an** apple | devant un son voyelle | une pomme |
| **the** book | le/la/les (défini, singulier ET pluriel) | le livre / les livres |

⚠️ Piège : le choix entre **a** et **an** dépend du **son**, pas de la
lettre écrite : **an hour** (le h est muet, donc son voyelle) mais **a
university** (le u se prononce « you », donc son consonne).

⚠️ Contrairement au français, l'anglais **omet souvent l'article** dans
des cas généraux : **I like coffee.** (J'aime le café — pas de « the »
devant un nom général), **I'm a teacher.** (mais on garde « a » pour un
métier, contrairement à l'espagnol qui l'omet).

## Le pluriel

Règle générale : on ajoute **-s** : **book → books**. Variantes :
- mots en -s/-sh/-ch/-x → **-es** : **bus → buses**, **box → boxes**
- mots en consonne + y → **-y devient -ies** : **city → cities**
- pluriels irréguliers à connaître : **man → men**, **woman → women**,
  **child → children**, **person → people**, **foot → feet**

## Le présent simple

Le présent simple sert à parler d'habitudes, de faits généraux, de
vérités. À toutes les personnes, le verbe garde sa forme de base, **sauf
à la 3e personne du singulier** où on ajoute **-s** :

| | Anglais |
|---|---|
| I | work |
| you | work |
| he/she/it | work**s** |
| we | work |
| you | work |
| they | work |

## LE point le plus important de toute la leçon : DO / DOES

Contrairement au français et à l'espagnol, l'anglais a besoin d'un
**auxiliaire** (**do** / **does**) pour former les questions et les
négations au présent simple — même quand il n'y a pas d'autre auxiliaire
dans la phrase !

### Questions

**Do/Does + sujet + verbe à la base (sans -s) ?**
- **Do you like coffee?** (Aimes-tu le café ?) — jamais *Like you
  coffee?*
- **Does she work here?** (Travaille-t-elle ici ?) — **does** à la 3e
  personne, et le verbe perd son -s : *does she works* est incorrect.

### Négations

**Sujet + don't/doesn't + verbe à la base.**
- **I don't like tea.** (Je n'aime pas le thé.)
- **He doesn't speak French.** (Il ne parle pas français.)

⚠️ Piège classique n°1 pour un francophone : vouloir traduire mot à mot
et dire *"I not like it"* ou *"You like it?"* — il faut absolument
l'auxiliaire **do/does**.

⚠️ Piège classique n°2 : à la 3e personne, le -s se met sur **does**, pas
sur le verbe principal : **does he like** (pas *does he likes*).

## Phrases à retenir

- **I don't understand.** (Je ne comprends pas.)
- **Do you speak English?** (Parles-tu anglais ?)
- **She doesn't live here.** (Elle n'habite pas ici.)
- **We work every day.** (Nous travaillons tous les jours.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Quel article utiliser devant « hour » (heure) ? Le h est muet !', options: ['a hour', 'an hour', 'the hour uniquement', 'aucun article'], answer: 1, explanation: 'an hour — le choix a/an dépend du SON, pas de la lettre : h muet = son voyelle = an.' },
      { type: 'typed', prompt: 'Écris le pluriel de « city » (ville).', answers: ['cities'], explanation: 'city → cities : consonne + y devient -ies.' },
      { type: 'typed', prompt: 'Écris le pluriel irrégulier de « child » (enfant).', answers: ['children'], explanation: 'child → children, pluriel totalement irrégulier à apprendre par cœur.' },
      { type: 'typed', prompt: 'Conjugue TO WORK au présent simple, 3ᵉ personne du singulier (she).', answers: ['works'], explanation: 'she works — ajout du -s uniquement à la 3e personne du singulier.' },
      { type: 'typed', prompt: 'Traduis en anglais avec DO : « Aimes-tu le café ? »', answers: ['do you like coffee'], explanation: 'Do you like coffee? — auxiliaire do obligatoire pour la question, jamais « Like you coffee? ».' },
      { type: 'typed', prompt: 'Traduis en anglais avec DOES : « Travaille-t-elle ici ? »', answers: ['does she work here'], explanation: 'Does she work here? — does à la 3e personne, et le verbe perd son -s après does.' },
      { type: 'mcq', prompt: 'Quelle phrase est correcte ?', options: ['Does he likes coffee?', 'Does he like coffee?', 'He does like coffee?', 'Like he coffee?'], answer: 1, explanation: 'Does he like coffee? — le -s se met sur DOES, jamais sur le verbe principal après does.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Je n\'aime pas le thé. » (utilise don\'t)', answers: ["i don't like tea", 'i dont like tea'], explanation: "I don't like tea — négation avec don't + verbe à la base." },
      { type: 'typed', prompt: 'Traduis en anglais : « Il ne parle pas français. » (utilise doesn\'t)', answers: ["he doesn't speak french", 'he doesnt speak french'], explanation: "He doesn't speak French — doesn't à la 3e personne du singulier." },
      { type: 'mcq', prompt: 'Pourquoi « I not like it » est-il incorrect ?', options: ['Ce n\'est pas incorrect', 'Il manque l\'auxiliaire don\'t', 'Il manque un article', 'Le verbe devrait être au pluriel'], answer: 1, explanation: 'La négation au présent simple nécessite obligatoirement don\'t/doesn\'t : I don\'t like it.' },
    ],
  },
  {
    title: 'To be, to have, famille et description',
    content_md: `# Leçon 4 — To be, to have, famille et description

## TO HAVE (avoir)

| | Anglais | Français |
|---|---|---|
| I | have | j'ai |
| you | have | tu as |
| he/she/it | ha**s** | il/elle a |
| we | have | nous avons |
| you | have | vous avez |
| they | have | ils/elles ont |

Comme les autres verbes au présent simple, **to have** prend un -s (qui
devient **has**) à la 3e personne du singulier — et pour les questions/
négations, on utilise **do/does** comme n'importe quel verbe : **Do you
have a car?**, **She doesn't have time.** (Sauf pour les significations
de possession pure en anglais britannique familier, mais retiens la
règle avec do/does, universelle et toujours correcte.)

## La famille (the family)

| Anglais | Français |
|---|---|
| mother / mom | mère / maman |
| father / dad | père / papa |
| brother / sister | frère / sœur |
| son / daughter | fils / fille |
| grandfather / grandmother | grand-père / grand-mère |
| uncle / aunt | oncle / tante |
| cousin | cousin(e) — un seul mot pour les deux genres ! |
| husband / wife | mari / femme |

⚠️ Piège : **cousin** ne change pas selon le genre en anglais
(contrairement à *cousin/cousine* en français) — il faut préciser avec
« my cousin, she... » si le genre importe dans le contexte.

## Les adjectifs : la grande simplification (et son piège)

**Les adjectifs anglais sont TOUJOURS invariables** : ils ne s'accordent
ni en genre, ni en nombre, ni en rien. C'est plus simple qu'en français
et en espagnol... mais le réflexe francophone de vouloir accorder («
*tall-e*, *tall-s*) est un vrai piège à corriger activement.

- **He is tall. She is tall. They are tall.** (Il est grand. Elle est
  grande. Ils sont grands. — même mot « tall » à chaque fois !)
- **a tall man / a tall woman / tall children** (même adjectif partout)

## L'ordre des adjectifs

En anglais, l'adjectif se place **avant** le nom (contrairement au
français où il est souvent après) : **a big house** (une grande maison),
**an interesting book** (un livre intéressant).

## Décrire quelqu'un

- **He has brown eyes.** (Il a les yeux marron — to have, pas to be, pour
  les caractéristiques physiques avec un nom : « il a des yeux bruns ».)
- **She is tall and friendly.** (Elle est grande et sympathique — to be
  pour un adjectif de caractère/apparence.)
- **My brother is 25 years old.** (Mon frère a 25 ans.)
- **We have two children.** (Nous avons deux enfants.)

## Phrases à retenir

- **My mother is a doctor and my father is a teacher.** (Ma mère est
  médecin et mon père est professeur.)
- **I have one brother and two sisters.** (J'ai un frère et deux sœurs.)
- **Do you have any siblings?** (As-tu des frères et sœurs ?)
- **She doesn't have a car.** (Elle n'a pas de voiture.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue TO HAVE à la 3ᵉ personne du singulier (he/she/it).', answers: ['has'], explanation: 'he/she/it has — irrégulier à l\'écrit (pas juste have+s).' },
      { type: 'typed', prompt: "Traduis en anglais avec DOESN'T : « Elle n'a pas de voiture. »", answers: ["she doesn't have a car", 'she doesnt have a car'], explanation: "She doesn't have a car — do/does s'applique aussi à have." },
      { type: 'mcq', prompt: 'Comment dit-on « cousine » (féminin) en anglais ?', options: ['cousine', 'female cousin', 'cousin (même mot que masculin)', 'cousina'], answer: 2, explanation: 'cousin ne change pas de genre en anglais, contrairement au français.' },
      { type: 'mcq', prompt: 'Comment s\'accorde l\'adjectif « tall » (grand) au féminin pluriel (« elles sont grandes ») ?', options: ['talles', 'tall (invariable)', 'talls', 'tallees'], answer: 1, explanation: 'Les adjectifs anglais sont TOUJOURS invariables : tall, jamais talls ni talles.' },
      { type: 'typed', prompt: 'Traduis en anglais : « une grande maison » (adjectif avant le nom)', answers: ['a big house'], explanation: 'a big house — l\'adjectif se place avant le nom en anglais, contrairement au français.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Il a les yeux marron. » (utilise to have)', answers: ['he has brown eyes'], explanation: 'He has brown eyes — to have pour une caractéristique physique avec un nom.' },
      { type: 'mcq', prompt: 'Pour dire qu\'une personne est grande et sympathique (adjectifs), on utilise :', options: ['to have', 'to be', 'to do', 'to get'], answer: 1, explanation: 'She is tall and friendly — to be devant un adjectif de caractère/apparence.' },
      { type: 'typed', prompt: "Traduis en anglais : « As-tu des frères et sœurs ? » (utilise Do you have)", answers: ['do you have any siblings', 'do you have siblings'], explanation: 'Do you have any siblings? — question avec do, pas d\'inversion directe du verbe have.' },
    ],
  },
  {
    title: 'Nombres, heure et date',
    content_md: `# Leçon 5 — Nombres, heure et date

## Les nombres de 0 à 20

| # | Anglais |
|---|---|
| 0 | zero |
| 1 | one |
| 2 | two |
| 3 | three |
| 4 | four |
| 5 | five |
| 6 | six |
| 7 | seven |
| 8 | eight |
| 9 | nine |
| 10 | ten |
| 11 | eleven |
| 12 | twelve |
| 13 | thirteen |
| 14 | fourteen |
| 15 | fifteen |
| 16 | sixteen |
| 17 | seventeen |
| 18 | eighteen |
| 19 | nineteen |
| 20 | twenty |

## De 21 à 100

- 21-29 : **twenty-one, twenty-two**... jusqu'à **twenty-nine** (avec un
  trait d'union).
- Dizaines : **thirty, forty, fifty, sixty, seventy, eighty, ninety,
  one hundred**.
- Comme en espagnol (et contrairement au français), chaque dizaine a son
  propre mot — pas de « quatre-vingts » compliqué.

## Les nombres ordinaux (pour les dates)

**first (1st), second (2nd), third (3rd), fourth (4th), fifth (5th)**...
puis en général on ajoute **-th** : **sixth, seventh, tenth, twentieth**.

## Dire l'heure

- **What time is it?** (Quelle heure est-il ?)
- **It's 3 o'clock.** (Il est 3 heures.)
- **It's half past three.** (Il est trois heures et demie —
  littéralement « demi passé trois ».)
- **It's quarter past three.** (Il est trois heures et quart.)
- **It's quarter to four.** (Il est quatre heures moins le quart —
  littéralement « quart pour quatre ».)
- **It's 3:15 / It's 3:45** (formes numériques, aussi très utilisées)

⚠️ Piège : contrairement au français qui compte toujours en avançant («
trois heures quarante-cinq »), l'anglais parle souvent de l'heure
**suivante** pour la deuxième moitié de l'heure (« quarter to four » =
un quart avant quatre heures).

## AM / PM

L'anglais (surtout américain) utilise souvent un système sur 12 heures
avec **AM** (minuit à midi) et **PM** (midi à minuit) plutôt que le
système sur 24h : **3 PM** = 15h.

## Les jours de la semaine

| Anglais | Français |
|---|---|
| Monday | lundi |
| Tuesday | mardi |
| Wednesday | mercredi |
| Thursday | jeudi |
| Friday | vendredi |
| Saturday | samedi |
| Sunday | dimanche |

⚠️ Piège : contrairement au français, les jours de la semaine **prennent
une majuscule** en anglais.

## Les mois

| Anglais | Français |
|---|---|
| January | janvier |
| February | février |
| March | mars |
| April | avril |
| May | mai |
| June | juin |
| July | juillet |
| August | août |
| September | septembre |
| October | octobre |
| November | novembre |
| December | décembre |

Comme les jours, les mois prennent une **majuscule** en anglais.

## Dire la date

**Today is Monday, July 26th, 2026.** (Aujourd'hui, c'est lundi 26
juillet 2026.)

⚠️ Piège important : à l'écrit, les Américains utilisent l'ordre
**mois/jour/année** (07/26/2026), alors que les Britanniques utilisent
**jour/mois/année** comme en français (26/07/2026). Vérifie toujours le
contexte pour éviter les confusions de date !

## Phrases à retenir

- **I was born on May 15th.** (Je suis né(e) le 15 mai.)
- **The meeting is at half past two.** (La réunion est à deux heures et
  demie.)
- **See you on Friday!** (À vendredi !)
- **My birthday is in September.** (Mon anniversaire est en septembre.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Écris le nombre 42 en anglais.', answers: ['forty-two', 'forty two'], explanation: 'forty-two — trait d\'union entre la dizaine et l\'unité.' },
      { type: 'typed', prompt: "Comment dit-on « trois heures et demie » ?", answers: ['half past three', "it's half past three", 'its half past three'], explanation: 'half past three — littéralement « demi passé trois ».' },
      { type: 'typed', prompt: 'Comment dit-on « quatre heures moins le quart » ?', answers: ['quarter to four', "it's quarter to four", 'its quarter to four'], explanation: 'quarter to four — littéralement « un quart avant quatre heures ».' },
      { type: 'mcq', prompt: 'Quel jour est « Wednesday » ?', options: ['lundi', 'mardi', 'mercredi', 'jeudi'], answer: 2, explanation: 'Wednesday = mercredi.' },
      { type: 'mcq', prompt: 'Contrairement au français, les jours et mois en anglais :', options: ['s\'écrivent toujours en minuscule', 'prennent une majuscule', 'n\'ont pas de nom propre', 'changent selon le pays'], answer: 1, explanation: 'Monday, July... prennent toujours une majuscule en anglais, contrairement au français.' },
      { type: 'mcq', prompt: 'Aux États-Unis, la date écrite 07/26/2026 signifie :', options: ['le 7 juin 2026', 'le 26 juillet 2026', 'le 7 février 2026', 'le 26 janvier 2026'], answer: 1, explanation: 'Ordre américain : mois/jour/année → 07 (juillet) / 26 / 2026.' },
      { type: 'typed', prompt: 'Écris l\'ordinal correspondant à « 3 » (pour une date : troisième).', answers: ['third'], explanation: 'third (3rd) — ordinal irrégulier, comme first et second.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Mon anniversaire est en septembre. »', answers: ['my birthday is in september'], explanation: 'My birthday is in September — septembre prend une majuscule.' },
    ],
  },
  {
    title: 'Au restaurant et au marché',
    content_md: `# Leçon 6 — Au restaurant et au marché

## THERE IS / THERE ARE

- **There is** (singulier) : **There is a table for two.** (Il y a une
  table pour deux.)
- **There are** (pluriel) : **There are two menus.** (Il y a deux menus.)

## SOME et ANY

- **some** : dans les phrases affirmatives — **I'd like some water.**
  (Je voudrais de l'eau.)
- **any** : dans les questions et les négations — **Do you have any
  bread?** (Avez-vous du pain ?), **I don't have any money.** (Je n'ai
  pas d'argent.)

⚠️ Piège : contrairement au français qui utilise « du/de la/des »
partout, l'anglais choisit **some** ou **any** selon le type de phrase
(affirmative vs question/négation).

## Commander poliment : CAN / COULD

- **Can I have the menu, please?** (Puis-je avoir le menu, s'il vous
  plaît ?)
- **Could I have a table for two?** (Pourrais-je avoir une table pour
  deux ? — plus poli que *can*, équivalent du conditionnel français.)
- **I'd like the soup, please.** (Je voudrais la soupe, s'il vous plaît —
  **I'd like** = **I would like**, forme polie de *I want*.)
- **What would you recommend?** (Que me recommandez-vous ?)

## Au restaurant

- **A table for two, please.** (Une table pour deux, s'il vous plaît.)
- **Are you ready to order?** (Êtes-vous prêts à commander ?)
- **I'll have the chicken, please.** (Je prendrai le poulet, s'il vous
  plaît.)
- **Can I get the bill, please?** (Puis-je avoir l'addition, s'il vous
  plaît ? — « the check » en anglais américain.)
- **Can I pay by card?** (Puis-je payer par carte ?)
- **This is delicious!** (C'est délicieux !)

## Au marché / dans les magasins

- **How much is this?** (Combien ça coûte ?)
- **How much does it cost?** (Combien ça coûte ?)
- **I'd like to buy some apples.** (Je voudrais acheter des pommes.)
- **Do you have any bread?** (Avez-vous du pain ?)
- **It's very expensive / cheap.** (C'est très cher / pas cher.)

## Faux-amis anglais/français à connaître

| Mot anglais | Sens réel | Ressemble au français | Sens français réel |
|---|---|---|---|
| **actually** | en fait, en réalité | « actuellement » | actuellement = **currently/now** |
| **library** | bibliothèque | « librairie » | librairie = **bookshop** |
| **sensible** | raisonnable, sensé | « sensible » | sensible (émotif) = **sensitive** |
| **attend** | assister à (un événement) | « attendre » | attendre = **wait for** |
| **eventually** | finalement, à terme | « éventuellement » | éventuellement = **possibly** |
| **achieve** | réussir, accomplir | « achever » | achever = **finish/complete** |
| **large** | grand (en taille générale) | « large » | large (largeur) = **wide** |
| **deceive** | tromper | « décevoir » | décevoir = **disappoint** |
| **ignore** | ne pas prêter attention à | « ignorer » | ignorer (ne pas savoir) = **not know** |

⚠️ Ces faux-amis sont une source d'erreurs très fréquente pour un
francophone — le mot « ressemble » tellement qu'on l'utilise sans
vérifier, et le sens est parfois complètement différent.

## Dialogue à mémoriser

> — Good evening! Table for two?
> — Yes, please.
> — Are you ready to order?
> — Yes. I'll have the soup and the chicken. And you?
> — I'll have the fish, please. And some water.
> — Anything else?
> — No, thank you. Can I get the bill, please?
> — Of course. That's twenty-five pounds.
> — Can I pay by card?
> — Sure.

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Le mot anglais « actually » veut dire :', options: ['Actuellement', 'En fait / en réalité', 'Réellement rapide', 'Bientôt'], answer: 1, explanation: 'Faux-ami classique : actually = en fait. « Actuellement » se dit currently/now.' },
      { type: 'mcq', prompt: 'Le mot anglais « library » veut dire :', options: ['Librairie', 'Bibliothèque', 'Liberté', 'Livre'], answer: 1, explanation: 'library = bibliothèque. « Librairie » (où on achète des livres) se dit bookshop.' },
      { type: 'typed', prompt: "Traduis en anglais : « Il y a une table pour deux. » (there is)", answers: ['there is a table for two'], explanation: 'There is + singulier.' },
      { type: 'mcq', prompt: "Dans une phrase affirmative (« je voudrais ___ eau »), utilise-t-on SOME ou ANY ?", options: ['any', 'some', 'les deux indifféremment', 'aucun des deux'], answer: 1, explanation: "some s'utilise dans les phrases affirmatives : I'd like some water." },
      { type: 'mcq', prompt: "Dans une question (« avez-vous ___ pain ? »), utilise-t-on SOME ou ANY ?", options: ['any', 'some', 'les deux indifféremment', 'aucun des deux'], answer: 0, explanation: 'any s\'utilise dans les questions et négations : Do you have any bread?' },
      { type: 'typed', prompt: "Traduis en anglais poliment : « Je voudrais la soupe, s'il vous plaît. » (I'd like)", answers: ["i'd like the soup, please", 'id like the soup please', "i'd like the soup please"], explanation: "I'd like the soup, please — forme polie de I want." },
      { type: 'typed', prompt: 'Traduis en anglais : « Combien ça coûte ? »', answers: ['how much is this', 'how much does it cost'], explanation: 'How much is this? / How much does it cost?' },
      { type: 'mcq', prompt: 'Le mot anglais « sensible » veut dire :', options: ['Sensible (émotif)', 'Raisonnable, sensé', 'Sensuel', 'Sensoriel'], answer: 1, explanation: 'sensible = raisonnable/sensé. « Sensible » (émotif) se dit sensitive en anglais.' },
      { type: 'typed', prompt: "Traduis en anglais poliment : « Puis-je avoir l'addition, s'il vous plaît ? »", answers: ['can i get the bill, please', 'can i get the bill please', 'could i have the bill, please', 'could i have the bill please'], explanation: 'Can I get the bill, please? (« the check » en anglais américain).' },
    ],
  },
  {
    title: 'Routine quotidienne et fréquence',
    content_md: `# Leçon 7 — Routine quotidienne et fréquence

## Les adverbes de fréquence

| Anglais | Français |
|---|---|
| always | toujours |
| usually | d'habitude, généralement |
| often | souvent |
| sometimes | parfois |
| rarely / seldom | rarement |
| never | jamais |

⚠️ Piège de position : contrairement au français où l'adverbe suit
généralement le verbe, en anglais l'adverbe de fréquence se place
**avant le verbe principal** mais **après le verbe to be** :
- **I always wake up early.** (adverbe avant le verbe principal *wake up*)
- **I am always tired in the morning.** (adverbe après *am*, le verbe to be)

## La routine quotidienne (daily routine)

- **I wake up at seven.** (Je me réveille à sept heures.)
- **I get up at quarter past seven.** (Je me lève à sept heures et
  quart — *get up* = sortir du lit, différent de *wake up* = se réveiller.)
- **I take a shower and get dressed.** (Je prends une douche et je
  m'habille.)
- **I have breakfast.** (Je prends le petit-déjeuner — *to have* pour les
  repas, pas de verbe réfléchi comme en espagnol.)
- **I go to work/school.** (Je vais au travail/à l'école.)
- **I have lunch at noon.** (Je déjeune à midi.)
- **I come back home in the evening.** (Je rentre à la maison le soir.)
- **I have dinner at eight.** (Je dîne à huit heures.)
- **I go to bed at eleven.** (Je me couche à onze heures.)

⚠️ Différence notable avec l'espagnol : l'anglais **n'a pas de verbes
réfléchis** pour la routine quotidienne — on utilise des verbes simples
(*wake up*, *get up*, *have breakfast*) sans pronom réfléchi.

## Présent simple vs présent continu (introduction)

Deux présents en anglais, avec un usage différent :
- **Présent simple** : habitudes, faits généraux. **I go to work by
  bus.** (D'habitude, je vais au travail en bus — une habitude.)
- **Présent continu** (**to be + verbe-ing**) : action en train de se
  passer maintenant. **I am going to work right now.** (Je suis en train
  d'aller au travail, là, maintenant.)

⚠️ Piège important : le français utilise souvent le présent simple pour
les deux cas (« je vais au travail » peut vouloir dire une habitude OU
maintenant). L'anglais, lui, **distingue toujours** grammaticalement les
deux : ne confonds pas *I work* (habitude) et *I am working* (en ce
moment).

## Phrases à retenir

- **I usually have breakfast at eight.** (D'habitude, je prends le
  petit-déjeuner à huit heures.)
- **She never wakes up early.** (Elle ne se réveille jamais tôt.)
- **We are often busy on Mondays.** (Nous sommes souvent occupés le
  lundi.)
- **Right now, I am writing an email.** (Là maintenant, j'écris un
  email — présent continu, action en cours.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Où se place l\'adverbe de fréquence avec un verbe principal (« always », « often »...) ?', options: ['Après le verbe principal', 'Avant le verbe principal', 'En début de phrase uniquement', 'Cela n\'a pas d\'importance'], answer: 1, explanation: 'I always wake up early — l\'adverbe se place avant le verbe principal.' },
      { type: 'mcq', prompt: 'Où se place l\'adverbe de fréquence avec TO BE ?', options: ['Avant le verbe to be', 'Après le verbe to be', 'Cela ne s\'utilise jamais avec to be', 'En fin de phrase uniquement'], answer: 1, explanation: 'I am always tired — l\'adverbe se place après to be, contrairement aux autres verbes.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Je me réveille à sept heures. » (wake up)', answers: ['i wake up at seven'], explanation: 'I wake up at seven.' },
      { type: 'mcq', prompt: 'Quelle est la différence entre « wake up » et « get up » ?', options: ['Aucune différence', 'wake up = se réveiller, get up = sortir du lit', 'wake up = sortir du lit, get up = se réveiller', 'Ce sont des synonymes de « dormir »'], answer: 1, explanation: 'wake up = ouvrir les yeux/se réveiller ; get up = sortir physiquement du lit.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Je prends le petit-déjeuner. » (to have)', answers: ['i have breakfast'], explanation: 'I have breakfast — to have pour les repas, pas de verbe réfléchi comme en espagnol.' },
      { type: 'mcq', prompt: 'Quel présent utilise-t-on pour une action en train de se passer maintenant ?', options: ['Le présent simple', 'Le présent continu (to be + verbe-ing)', 'Le futur proche', 'Le passé simple'], answer: 1, explanation: 'I am working right now — présent continu pour une action en cours.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Elle ne se réveille jamais tôt. » (never)', answers: ['she never wakes up early'], explanation: 'She never wakes up early — never avant le verbe principal, et -s à la 3e personne.' },
      { type: 'mcq', prompt: '« I am going to work right now » exprime :', options: ['Une habitude quotidienne', 'Une action en cours, maintenant', 'Un projet pour demain', 'Un souhait'], answer: 1, explanation: 'Présent continu = action en train de se dérouler au moment où on parle.' },
    ],
  },
  {
    title: 'Le passé simple',
    content_md: `# Leçon 8 — Le passé simple (simple past)

## Les verbes réguliers : -ED

Pour former le passé des verbes réguliers, on ajoute **-ed** à
l'infinitif, **à toutes les personnes** (pas de terminaison différente
selon le sujet, contrairement à l'espagnol et au français !) :

| | Anglais |
|---|---|
| I | work**ed** |
| you | work**ed** |
| he/she/it | work**ed** |
| we | work**ed** |
| you | work**ed** |
| they | work**ed** |

Règles d'orthographe : **like → liked** (e final, on ajoute juste -d),
**stop → stopped** (consonne finale doublée après voyelle courte accentuée),
**study → studied** (consonne + y devient -ied).

## Les verbes irréguliers indispensables

Contrairement aux verbes réguliers, ces verbes très fréquents changent
complètement de forme au passé — à apprendre par cœur, un par un :

| Infinitif | Passé | Français |
|---|---|---|
| be | was/were | être (was: I/he/she/it, were: you/we/they) |
| go | went | aller |
| have | had | avoir |
| do | did | faire |
| see | saw | voir |
| eat | ate | manger |
| make | made | faire/fabriquer |
| take | took | prendre |
| get | got | obtenir/recevoir |
| say | said | dire |

⚠️ Piège : **be** est le seul verbe anglais qui a **deux** formes
différentes au passé selon le sujet (**was** / **were**) — tous les
autres verbes ont une forme unique à toutes les personnes.

## Questions et négations avec DID

Comme au présent simple avec do/does, le passé simple utilise un
auxiliaire pour les questions et négations : **did** (identique à toutes
les personnes), et le verbe principal revient à sa forme de base (plus de
-ed ni de forme irrégulière) :

- **Did you go to the party?** (Es-tu allé à la fête ?) — pas *Did you
  went*.
- **I didn't see him yesterday.** (Je ne l'ai pas vu hier.) — pas *I
  didn't saw*.
- **She didn't finish her homework.** (Elle n'a pas fini ses devoirs.)

⚠️ Piège classique : après **did/didn't**, le verbe reste TOUJOURS à sa
forme de base, même pour les verbes irréguliers. On ne dit jamais *did
you went* — le did porte déjà la marque du passé, inutile (et
incorrect) de la répéter sur le verbe.

## Marqueurs temporels du passé

- **yesterday** — hier
- **last week/month/year** — la semaine/le mois/l'année dernier(e)
- **two days ago** — il y a deux jours
- **in 2020** — en 2020

## Phrases à retenir

- **I went to Spain last summer.** (Je suis allé en Espagne l'été
  dernier.)
- **What did you do yesterday?** (Qu'as-tu fait hier ?)
- **We didn't have time.** (Nous n'avons pas eu le temps.)
- **She was very happy.** (Elle était très heureuse.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue TO WORK au passé simple (même forme à toutes les personnes).', answers: ['worked'], explanation: 'worked — identique à toutes les personnes, contrairement à l\'espagnol/français.' },
      { type: 'typed', prompt: 'Écris le passé irrégulier de GO (aller).', answers: ['went'], explanation: 'go → went, verbe irrégulier à apprendre par cœur.' },
      { type: 'typed', prompt: 'Écris le passé irrégulier de EAT (manger).', answers: ['ate'], explanation: 'eat → ate.' },
      { type: 'mcq', prompt: 'Quel est le seul verbe anglais avec deux formes différentes au passé selon le sujet ?', options: ['go (went)', 'be (was/were)', 'have (had)', 'do (did)'], answer: 1, explanation: 'be est le seul verbe avec was (I/he/she/it) et were (you/we/they) — tous les autres ont une forme unique.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Es-tu allé à la fête ? » (utilise did)', answers: ['did you go to the party'], explanation: 'Did you go to the party? — jamais « did you went », le verbe revient à sa base après did.' },
      { type: 'mcq', prompt: 'Pourquoi « Did you went to the party? » est-il incorrect ?', options: ['Ce n\'est pas incorrect', 'Le verbe doit rester à sa forme de base après did', 'Il manque un article', 'Party devrait être au pluriel'], answer: 1, explanation: 'Did porte déjà la marque du passé — le verbe qui suit reste toujours à sa forme de base : did you go.' },
      { type: 'typed', prompt: "Traduis en anglais : « Je ne l'ai pas vu hier. » (didn't see)", answers: ["i didn't see him yesterday", 'i didnt see him yesterday'], explanation: "I didn't see him yesterday — verbe see (pas saw) après didn't." },
      { type: 'typed', prompt: 'Traduis en anglais : « Elle était très heureuse. » (was)', answers: ['she was very happy'], explanation: 'She was very happy — was pour he/she/it au passé de to be.' },
      { type: 'mcq', prompt: 'Comment dit-on « il y a deux jours » ?', options: ['two days before', 'two days ago', 'before two days', 'ago two days'], answer: 1, explanation: 'two days ago — ago se place après la durée.' },
    ],
  },
  {
    title: 'Le futur et la météo',
    content_md: `# Leçon 9 — Le futur : GOING TO et WILL, et la météo

## GOING TO — le futur proche / les projets

**to be + going to + infinitif** sert pour un projet déjà décidé ou une
prédiction basée sur ce qu'on observe maintenant :
- **I'm going to visit Spain next year.** (Je vais visiter l'Espagne
  l'année prochaine — décision déjà prise.)
- **Look at those clouds! It's going to rain.** (Regarde ces nuages ! Il
  va pleuvoir — prédiction basée sur un indice visible.)
- **What are you going to do this weekend?** (Qu'est-ce que tu vas faire
  ce week-end ?)

## WILL — décisions spontanées, promesses, prédictions générales

**will + infinitif sans to** (identique à toutes les personnes, pas de
-s !) sert pour une décision prise **au moment où on parle**, une
promesse, ou une prédiction générale sans preuve immédiate :
- **I'll help you with that.** (Je vais t'aider avec ça — décision
  spontanée, à l'instant.)
- **I promise I will call you.** (Je promets que je t'appellerai.)
- **I think it will rain tomorrow.** (Je pense qu'il pleuvra demain —
  prédiction, opinion, pas d'indice visible immédiat.)

⚠️ Nuance importante : **going to** = déjà décidé / preuve visible
maintenant ; **will** = décision spontanée / opinion générale. Ce n'est
pas une différence que fait le français (« je vais » sert pour tout), donc
c'est un vrai effort à faire.

## Conjugaison de WILL (identique partout !)

| | Anglais |
|---|---|
| I | will help (I'll) |
| you | will help (you'll) |
| he/she/it | will help (he'll) |
| we | will help (we'll) |
| you | will help (you'll) |
| they | will help (they'll) |

Négation : **won't** (= will not) : **I won't be late.** (Je ne serai pas
en retard.)

## La météo (the weather)

- **It's sunny.** (Il fait soleil.)
- **It's hot / cold.** (Il fait chaud / froid.)
- **It's windy.** (Il y a du vent.)
- **It's raining.** (Il pleut — littéralement « c'est en train de
  pleuvoir », présent continu.)
- **It's snowing.** (Il neige.)
- **It's cloudy.** (Le temps est nuageux.)
- **What's the weather like today?** (Quel temps fait-il aujourd'hui ?)

⚠️ Piège : contrairement au français (« il fait beau »), l'anglais
utilise **it's** (« c'est ») pour la météo, et souvent le présent continu
(**it's raining**, pas *it rains* pour dire qu'il pleut maintenant).

## Phrases à retenir

- **This weekend, I'm going to rest.** (Ce week-end, je vais me reposer —
  projet déjà décidé.)
- **If it's sunny, we'll go to the beach.** (S'il fait beau, nous irons
  à la plage — décision qui dépendra du moment.)
- **Next year, I will live in Barcelona.** (L'année prochaine, je vivrai
  à Barcelone.)
- **It's going to snow tomorrow.** (Il va neiger demain.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Pour un projet déjà décidé (« Je vais visiter l\'Espagne l\'année prochaine »), on utilise :', options: ['will', 'going to', 'les deux indifféremment', 'le présent simple uniquement'], answer: 1, explanation: 'going to pour un projet déjà décidé : I\'m going to visit Spain.' },
      { type: 'mcq', prompt: 'Pour une décision spontanée prise à l\'instant (« Je vais t\'aider »), on utilise plutôt :', options: ['going to', 'will', 'le passé simple', 'le présent continu'], answer: 1, explanation: 'will pour une décision spontanée, prise au moment où on parle : I\'ll help you.' },
      { type: 'typed', prompt: "Traduis en anglais : « Il va pleuvoir. » (indice visible, nuages) — going to", answers: ["it's going to rain", 'its going to rain'], explanation: "It's going to rain — prédiction basée sur un indice visible (les nuages)." },
      { type: 'typed', prompt: "Conjugue WILL à la 3ᵉ personne du singulier (he) pour « il aidera » (help).", answers: ['he will help', "he'll help"], explanation: 'will est identique à toutes les personnes, jamais de -s : he will help (pas he wills).' },
      { type: 'typed', prompt: 'Écris la forme négative contractée de « will not ».', answers: ["won't", 'wont'], explanation: "won't = will not." },
      { type: 'typed', prompt: 'Traduis en anglais : « Il fait soleil. »', answers: ["it's sunny", 'its sunny'], explanation: "It's sunny — it's pour la météo, comme en français « il fait »." },
      { type: 'typed', prompt: 'Traduis en anglais : « Il pleut. » (présent continu)', answers: ["it's raining", 'its raining'], explanation: "It's raining — présent continu pour une action météo en cours." },
      { type: 'mcq', prompt: '« I think it will rain tomorrow » exprime :', options: ['Une décision spontanée', 'Une opinion/prédiction générale, sans preuve immédiate', 'Un projet déjà planifié', 'Un ordre'], answer: 1, explanation: 'will pour une opinion/prédiction générale (je pense que...), sans indice visible immédiat.' },
    ],
  },
  {
    title: 'Comparatifs, directions et voyage',
    content_md: `# Leçon 10 — Comparatifs, directions et voyage

## Le comparatif

- Adjectifs courts (1 syllabe) : **+ -er + than** — **taller than**
  (plus grand que), **bigger than** (plus grand, consonne doublée).
- Adjectifs longs (2 syllabes ou plus) : **more + adjectif + than** —
  **more expensive than** (plus cher que), **more interesting than**
  (plus intéressant que).
- Égalité : **as ... as** — **She is as tall as her brother.** (Elle est
  aussi grande que son frère.)

⚠️ Comparatifs irréguliers à connaître : **good → better** (meilleur, pas
*more good*), **bad → worse** (pire), **far → farther/further** (plus
loin).

## Le superlatif

- Adjectifs courts : **the + adjectif-est** — **the tallest** (le/la plus
  grand(e)).
- Adjectifs longs : **the most + adjectif** — **the most expensive** (le/
  la plus cher(-ère)).
- Irréguliers : **the best** (le meilleur), **the worst** (le pire).

- **This is the best restaurant in the city.** (C'est le meilleur
  restaurant de la ville.)
- **It's the most beautiful beach I've seen.** (C'est la plus belle plage
  que j'aie vue.)

## Se repérer en ville (asking for directions)

- **Where is the train station?** (Où est la gare ?)
- **How do I get to...?** (Comment fait-on pour aller à... ?)
- **Go straight ahead.** (Allez tout droit.)
- **Turn left / right.** (Tournez à gauche / à droite.)
- **It's near / far.** (C'est près / loin.)
- **It's next to / opposite / behind the church.** (C'est à côté de / en
  face de / derrière l'église.)
- **Take the first street on the right.** (Prenez la première rue à
  droite.)

## À l'hôtel (at the hotel)

- **I have a reservation under the name...** (J'ai une réservation au
  nom de...)
- **Do you have any rooms available?** (Avez-vous des chambres
  disponibles ?)
- **A double/single room, please.** (Une chambre double/simple, s'il
  vous plaît.)
- **What time is breakfast?** (À quelle heure est le petit-déjeuner ?)
- **What time is check-out?** (À quelle heure faut-il libérer la
  chambre ?)

## À l'aéroport (at the airport)

- **Where is the check-in desk?** (Où est le comptoir
  d'enregistrement ?)
- **My flight leaves at ten.** (Mon vol part à dix heures.)
- **I've lost my suitcase.** (J'ai perdu ma valise.)
- **Where do I collect my luggage?** (Où récupère-t-on les bagages ?)

## Phrases à retenir

- **This restaurant is better than the one from yesterday.** (Ce
  restaurant est meilleur que celui d'hier.)
- **Turn left at the next street.** (Tournez à gauche à la prochaine
  rue.)
- **How do I get to the museum from here?** (Comment va-t-on au musée
  depuis ici ?)

## Récapitulatif du cours

Avec ces 10 leçons, tu as désormais toutes les bases pour te débrouiller
en anglais : te présenter, le présent simple et son fameux DO/DOES, les
adjectifs invariables, le passé, le futur (going to vs will), les
comparaisons, et le vocabulaire pour voyager, réserver un hôtel et
commander au restaurant. Congratulations, you now have an A2-B1 level!`,
    questions: [
      { type: 'typed', prompt: 'Traduis en anglais : « plus grand que » (adjectif court : tall)', answers: ['taller than'], explanation: 'taller than — adjectif court : + -er + than.' },
      { type: 'typed', prompt: 'Traduis en anglais : « plus cher que » (adjectif long : expensive)', answers: ['more expensive than'], explanation: 'more expensive than — adjectif long : more + adjectif + than.' },
      { type: 'mcq', prompt: 'Quel est le comparatif irrégulier de « good » (bon) ?', options: ['more good', 'gooder', 'better', 'best'], answer: 2, explanation: 'better = comparatif irrégulier de good — jamais « more good ».' },
      { type: 'typed', prompt: 'Traduis en anglais : « le meilleur restaurant » (superlatif irrégulier)', answers: ['the best restaurant'], explanation: 'the best restaurant — superlatif irrégulier de good.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Elle est aussi grande que son frère. » (as...as)', answers: ['she is as tall as her brother'], explanation: 'as ... as = aussi ... que.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Tournez à gauche. »', answers: ['turn left'], explanation: 'Turn left — impératif simple, sans pronom.' },
      { type: 'mcq', prompt: '« It\'s opposite the church » veut dire :', options: ['C\'est derrière l\'église', 'C\'est à côté de l\'église', 'C\'est en face de l\'église', 'C\'est loin de l\'église'], answer: 2, explanation: 'opposite = en face de.' },
      { type: 'typed', prompt: 'Traduis en anglais : « Avez-vous des chambres disponibles ? »', answers: ['do you have any rooms available'], explanation: 'Do you have any rooms available?' },
      { type: 'typed', prompt: 'Traduis en anglais : « Mon vol part à dix heures. »', answers: ['my flight leaves at ten'], explanation: 'My flight leaves at ten.' },
    ],
  },
];

module.exports = { LESSONS };
