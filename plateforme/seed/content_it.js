// Cours d'italien complet (10 leçons), écrit directement ici pour import en base.
// Public cible : francophone débutant total. Même exigence que les autres cours :
// pas de QCM faciles, pièges spécifiques au français signalés partout où ça compte.
'use strict';

const LESSONS = [
  {
    title: 'Prononciation et alphabet italien',
    content_md: `# Leçon 1 — Prononciation et alphabet italien

## La bonne nouvelle

Comme l'espagnol, l'italien se prononce **presque comme il s'écrit** — bien
plus régulier que le français. Une fois quelques règles apprises, tu liras
n'importe quel mot italien sans hésiter.

## Les consonnes doubles : LE piège n°1

En italien, une consonne **doublée** se prononce plus longue/plus appuyée
qu'une consonne simple — et **ça change le sens du mot** :
- **sono** (je suis) vs **sonno** (sommeil)
- **capello** (cheveu) vs **cappello** (chapeau)
- **casa** (maison) vs **cassa** (caisse)

⚠️ Le français ne fait aucune différence de prononciation entre une
consonne simple et double (« illusion » se prononce comme s'il n'y avait
qu'un l) — c'est le réflexe à corriger en priorité : marque bien
l'allongement sur les consonnes doubles italiennes.

## Le « c » et le « g » : durs ou doux

- **c/g devant a, o, u** → son dur : **casa** (maison), **gatto** (chat).
- **c/g devant e, i** → son doux « tch »/« dj » : **cena** (dîner) se dit
  « **tché**na », **gente** (gens) se dit « **djè**nte ».
- **ch/gh devant e, i** → redevient dur : **che** (que) se dit « **ké** »,
  **spaghetti** se dit « spa**gué**tti ».
- **sc devant e, i** → son « ch » français : **scena** (scène) se dit
  « **ché**na ». **sc devant a, o, u ou + h** → son « sk » : **scuola**
  (école) se dit « **skou**ola ».

⚠️ Piège n°1 pour un francophone : réflexe de prononcer « ci » comme en
français (« si »), alors qu'en italien **ci** se prononce « **tchi** »
(comme dans « ciao »).

## Le son GLI et GN

- **gli** → son mouillé, un peu comme le « ll » espagnol ou le « lli »
  français dans « million » : **famiglia** (famille) → fa**mi**glia (le
  gli fond en un seul son).
- **gn** → comme le français « gn » de montagne : **gnocchi**, **bagno**
  (salle de bain).

## L'accent tonique

La plupart des mots italiens sont accentués sur l'**avant-dernière
syllabe** : **ca-SA**, **par-LA-re**. Quand ce n'est pas le cas, un accent
écrit l'indique sur la dernière syllabe : **città** (ville), **però**
(mais/cependant), **caffè** (café).

⚠️ Contrairement au français où l'accent tombe toujours en fin de groupe
de mots, en italien chaque mot a son propre accent tonique fixe à
retenir — un vrai effort d'oreille pour un francophone.

## Le « r » italien

Le r italien est **roulé** avec la pointe de la langue, comme en espagnol —
pas du tout comme le r français, guttural et produit au fond de la gorge.
Un entraînement à part entière : **Roma**, **treno**, **raro**.

## Phrases à répéter à voix haute

- **Buongiorno, come stai?** (Bonjour, comment vas-tu ?)
- **Mi chiamo Mathieu.** (Je m'appelle Mathieu.)
- **Il cane corre nella strada.** (Le chien court dans la rue.) —
  entraîne ton r roulé.
- **La cena è pronta, andiamo a scuola.** (Le dîner est prêt, allons à
  l'école.) — entraîne le c doux et le sc dur.

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Quelle est la différence entre « sono » (je suis) et « sonno » (sommeil) ?', options: ['Aucune, ça se prononce pareil', 'La longueur de la consonne n (double = plus longue/appuyée)', 'L\'accent tonique', 'La voyelle finale'], answer: 1, explanation: 'sonno se prononce avec un n double, plus long/appuyé que le n simple de sono — contrairement au français où doubler une consonne ne change rien à la prononciation.' },
      { type: 'mcq', prompt: 'Comment se prononce « ci » dans « ciao » ?', options: ['Comme « si » en français', 'Comme « tchi »', 'Comme « ki »', 'Il est muet'], answer: 1, explanation: 'ci se prononce « tchi » — piège n°1 pour un francophone qui a le réflexe de dire « si ».' },
      { type: 'typed', prompt: 'Comment se prononce « che » (que) ? Écris le son phonétique simplifié (ex: « ké »).', answers: ['ké', 'ke'], explanation: 'che devant e/i avec un h redevient dur : « ké ».' },
      { type: 'mcq', prompt: 'Le son « gli » (comme dans « famiglia ») ressemble à :', options: ['Un simple « gli » séquentiel comme en français', 'Un son mouillé, un seul son fondu', 'Un « gui » dur', 'Il est muet'], answer: 1, explanation: 'gli forme un seul son mouillé, pas deux sons séparés « g » + « li ».' },
      { type: 'mcq', prompt: 'Où tombe l\'accent tonique par défaut (sans accent écrit) dans un mot italien ?', options: ['Toujours sur la dernière syllabe', 'Toujours sur l\'avant-dernière syllabe', 'Toujours sur la première syllabe', 'Cela varie totalement au hasard'], answer: 1, explanation: 'Par défaut, l\'accent tombe sur l\'avant-dernière syllabe (casa, parlare) ; sinon un accent écrit l\'indique (città).' },
      { type: 'typed', prompt: 'Écris le mot italien pour « chapeau » (attention à la consonne double, différent de « cheveu »).', answers: ['cappello'], explanation: 'cappello = chapeau (deux p) ; capello = cheveu (un seul p).' },
      { type: 'mcq', prompt: 'Le « r » italien se prononce :', options: ['Comme le r français, au fond de la gorge', 'Roulé avec la pointe de la langue', 'Il est muet', 'Comme un « l »'], answer: 1, explanation: 'Le r italien est roulé avec la pointe de la langue, comme en espagnol — pas comme le r guttural français.' },
      { type: 'mcq', prompt: 'Comment se prononce « scuola » (école) ?', options: ['« chouola »', '« skouola »', '« souola »', '« skiuola »'], answer: 1, explanation: 'sc devant u/o/a se prononce « sk » — scuola = « skouola ».' },
    ],
  },
  {
    title: 'Salutations et présentations',
    content_md: `# Leçon 2 — Salutations et présentations

## Se saluer

| Italien | Français |
|---|---|
| Ciao! | Salut ! |
| Buongiorno | Bonjour |
| Buon pomeriggio | Bon après-midi |
| Buonasera | Bonsoir |
| Buonanotte | Bonne nuit |
| Come stai? / Come va? | Comment vas-tu ? |
| Molto bene, grazie. E tu? | Très bien, merci. Et toi ? |
| Arrivederci | Au revoir |
| A dopo | À plus tard |
| A domani | À demain |

⚠️ Piège : **Ciao** s'utilise aussi bien pour dire bonjour que pour dire
au revoir, mais uniquement entre proches/informel — pas avec un inconnu
plus âgé ou en contexte professionnel (préfère alors *Buongiorno* et
*Arrivederci*).

## Les pronoms personnels

| Italien | Français |
|---|---|
| io | je |
| tu | tu |
| lui / lei / Lei (poli) | il / elle / vous (poli, singulier) |
| noi | nous |
| voi | vous (pluriel) |
| loro | ils/elles |

⚠️ Comme en espagnol, le pronom sujet est souvent **omis** en italien car
la terminaison du verbe indique déjà qui parle : **sono** francese (« je
suis » français) et pas forcément *io sono francese*, sauf pour insister.
Le français, lui, ne peut jamais l'omettre.

## Le verbe ESSERE (être)

| | Italien |
|---|---|
| io | sono |
| tu | sei |
| lui/lei | è |
| noi | siamo |
| voi | siete |
| loro | sono |

⚠️ Remarque : **io sono** et **loro sono** ont exactement la même forme
« sono » — seul le contexte (ou le pronom, si utilisé) permet de savoir
si on parle de « je » ou « ils/elles ».

## Se présenter

- **Mi chiamo Mathieu.** (Je m'appelle Mathieu — littéralement « je me
  appelle », structure réfléchie comme en français.)
- **Sono francese.** (Je suis français.)
- **Sono di Parigi.** (Je suis de Paris.)
- **Ho trent'anni.** (J'ai trente ans — avec **avere**, comme en
  français ! Contrairement à l'anglais qui utilise *to be*.)
- **Piacere!** (Enchanté(e) !)
- **Come ti chiami?** (Comment t'appelles-tu ?)
- **Di dove sei?** (D'où viens-tu ?)

## Dialogue à mémoriser

> — Ciao! Come stai?
> — Molto bene, grazie. E tu?
> — Bene anch'io. Come ti chiami?
> — Mi chiamo Laura. E tu?
> — Mi chiamo Mathieu. Piacere!
> — Piacere mio! Di dove sei?
> — Sono di Parigi, e tu?
> — Sono di Roma.

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue ESSERE à la 1ʳᵉ personne du singulier (io).', answers: ['sono'], explanation: 'io sono = je suis.' },
      { type: 'typed', prompt: 'Conjugue ESSERE à la 2ᵉ personne du singulier (tu).', answers: ['sei'], explanation: 'tu sei = tu es.' },
      { type: 'mcq', prompt: 'Pour donner son âge, quel verbe utilise l\'italien (comme le français) ?', options: ['essere (être)', 'avere (avoir)', 'stare', 'fare'], answer: 1, explanation: 'Ho trent\'anni — avere, comme en français « j\'ai trente ans ».' },
      { type: 'typed', prompt: 'Traduis en italien : « Je m\'appelle Laura. »', answers: ['mi chiamo laura'], explanation: 'Mi chiamo Laura — structure réfléchie, comme en français.' },
      { type: 'mcq', prompt: '« Ciao » peut s\'utiliser pour dire :', options: ['Seulement bonjour', 'Seulement au revoir', 'Bonjour ET au revoir, en contexte informel', 'Seulement avec des inconnus'], answer: 2, explanation: 'Ciao sert pour bonjour et au revoir, mais uniquement en informel/avec des proches.' },
      { type: 'typed', prompt: 'Traduis en italien : « D\'où viens-tu ? »', answers: ['di dove sei'], explanation: 'Di dove sei? — structure directe, pas d\'inversion complexe.' },
      { type: 'mcq', prompt: '« sono » peut vouloir dire :', options: ['Seulement « je suis »', 'Seulement « ils sont »', '« je suis » OU « ils/elles sont » selon le contexte', 'Rien de particulier'], answer: 2, explanation: 'io sono et loro sono partagent la même forme « sono ».' },
      { type: 'typed', prompt: 'Traduis en italien : « Enchanté(e) ! »', answers: ['piacere'], explanation: 'Piacere! — littéralement « plaisir ! ».' },
    ],
  },
  {
    title: 'Articles, genre et verbes réguliers',
    content_md: `# Leçon 3 — Articles, genre et verbes réguliers

## LE point le plus dur de cette leçon : les articles définis

Contrairement au français (le/la/les), l'italien a **plusieurs formes**
d'article défini selon le genre, le nombre, et surtout la **première
lettre du mot qui suit** :

| Cas | Article | Exemple |
|---|---|---|
| Masculin singulier, consonne normale | **il** | il libro (le livre) |
| Masculin singulier, devant voyelle | **l'** | l'amico (l'ami) |
| Masculin singulier, devant s+consonne, z, gn, ps, x, y | **lo** | lo studente, lo zaino |
| Masculin pluriel, consonne normale | **i** | i libri |
| Masculin pluriel, devant voyelle/cas de « lo » | **gli** | gli amici, gli studenti |
| Féminin singulier, consonne | **la** | la casa (la maison) |
| Féminin singulier, devant voyelle | **l'** | l'amica (l'amie) |
| Féminin pluriel | **le** | le case, le amiche |

⚠️ C'est LE piège n°1 pour un francophone : le français n'a que 3 formes
(le/la/les), l'italien en a 7 selon le contexte. Le réflexe à prendre :
regarder la première lettre du mot, pas seulement son genre.

## Les articles indéfinis

| Italien | Français |
|---|---|
| **un** libro | un livre |
| **uno** studente (devant s+consonne, z...) | un étudiant |
| **una** casa | une maison |
| **un'**amica (devant voyelle, féminin) | une amie |

## Le pluriel

Règle générale (différente du français qui ajoute juste -s) :
- mots masculins en **-o** → pluriel en **-i** : libro → libri
- mots féminins en **-a** → pluriel en **-e** : casa → case
- mots en **-e** (masculin ou féminin) → pluriel en **-i** : stazione → stazioni

## Les verbes réguliers : trois groupes

Comme en français et en espagnol, trois groupes selon la terminaison de
l'infinitif : **-are**, **-ere**, **-ire**.

### Groupe 1 : -ARE — parlare (parler)

| | Italien |
|---|---|
| io | parl**o** |
| tu | parl**i** |
| lui/lei | parl**a** |
| noi | parl**iamo** |
| voi | parl**ate** |
| loro | parl**ano** |

### Groupe 2 : -ERE — vivere (vivre)

| | Italien |
|---|---|
| io | viv**o** |
| tu | viv**i** |
| lui/lei | viv**e** |
| noi | viv**iamo** |
| voi | viv**ete** |
| loro | viv**ono** |

### Groupe 3 : -IRE — partire (partir)

| | Italien |
|---|---|
| io | part**o** |
| tu | part**i** |
| lui/lei | part**e** |
| noi | part**iamo** |
| voi | part**ite** |
| loro | part**ono** |

## La négation

Comme en espagnol, un seul mot **non** placé avant le verbe suffit :
**Non parlo italiano.** (Je ne parle pas italien.) — contrairement au
français « ne...pas ».

## Phrases à retenir

- **Parlo un po' d'italiano.** (Je parle un peu italien.)
- **Viviamo a Milano.** (Nous vivons à Milan.)
- **I libri sono sul tavolo.** (Les livres sont sur la table.)
- **Non capisco.** (Je ne comprends pas.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Quel article utiliser devant « studente » (masculin, commence par s+consonne) ?', options: ['il', 'lo', 'l\'', 'i'], answer: 1, explanation: 'lo studente — devant s+consonne au masculin singulier, on utilise « lo », pas « il ».' },
      { type: 'mcq', prompt: 'Quel article utiliser devant « amico » (masculin, commence par une voyelle) ?', options: ['il', 'lo', 'l\'', 'la'], answer: 2, explanation: 'l\'amico — devant voyelle au masculin singulier, on utilise « l\' ».' },
      { type: 'typed', prompt: 'Écris le pluriel de « libro » (livre, masculin en -o).', answers: ['libri'], explanation: 'libro → libri : masculin en -o devient -i au pluriel.' },
      { type: 'typed', prompt: 'Écris le pluriel de « casa » (maison, féminin en -a).', answers: ['case'], explanation: 'casa → case : féminin en -a devient -e au pluriel.' },
      { type: 'mcq', prompt: 'Quel est le pluriel masculin de l\'article devant une voyelle (comme « amico » → « amici ») ?', options: ['i', 'gli', 'le', 'lo'], answer: 1, explanation: 'gli amici — pluriel masculin devant voyelle (ou cas de « lo »).' },
      { type: 'typed', prompt: 'Conjugue PARLARE à la 1ʳᵉ personne du singulier (io).', answers: ['parlo'], explanation: 'io parlo = je parle.' },
      { type: 'typed', prompt: 'Conjugue VIVERE à la 1ʳᵉ personne du pluriel (noi).', answers: ['viviamo'], explanation: 'noi viviamo = nous vivons.' },
      { type: 'typed', prompt: 'Traduis en italien : « Je ne comprends pas. » (un seul mot de négation)', answers: ['non capisco'], explanation: 'Non capisco — un seul mot « non », contrairement au « ne...pas » français.' },
      { type: 'mcq', prompt: 'Quel article utiliser devant « zaino » (sac à dos, commence par z) ?', options: ['il', 'lo', 'l\'', 'la'], answer: 1, explanation: 'lo zaino — devant z au masculin singulier, on utilise « lo ».' },
    ],
  },
  {
    title: 'Avere, famille et description',
    content_md: `# Leçon 4 — AVERE, famille et description

## Le verbe AVERE (avoir)

| | Italien |
|---|---|
| io | ho |
| tu | hai |
| lui/lei | ha |
| noi | abbiamo |
| voi | avete |
| loro | hanno |

⚠️ Piège à l'écrit : la forme **ho** (j'ai) s'écrit avec un **h muet**,
comme en français « j'ai » ne s'écrit pas « je »... mais attention à ne
pas confondre avec **o** (« ou », la conjonction) — l'orthographe change
tout le sens !

## Les expressions avec AVERE

Comme en français, l'italien utilise **avere** pour beaucoup d'expressions
où on pourrait être tenté d'utiliser « être » :
- **avere fame / sete** — avoir faim / soif
- **avere caldo / freddo** — avoir chaud / froid
- **avere ragione / torto** — avoir raison / tort
- **avere paura** — avoir peur
- **avere bisogno di** — avoir besoin de
- **avere ... anni** — avoir ... ans

## La famille (la famiglia)

| Italien | Français |
|---|---|
| madre / mamma | mère / maman |
| padre / papà | père / papa |
| fratello / sorella | frère / sœur |
| figlio / figlia | fils / fille |
| nonno / nonna | grand-père / grand-mère |
| zio / zia | oncle / tante |
| cugino / cugina | cousin / cousine |
| marito / moglie | mari / femme |

## Les adjectifs : accord en genre et en nombre

Comme en français, l'adjectif italien s'accorde avec le nom :
- adjectifs en **-o/-a/-i/-e** : **alto, alta, alti, alte** (grand)
- adjectifs en **-e** (invariables en genre) : **intelligente** (masculin
  ET féminin), pluriel **intelligenti**

⚠️ Contrairement au français où l'adjectif se place souvent après le nom,
en italien la position est plus flexible mais **après le nom est la
norme** (comme en français) : **una casa grande** (une grande maison).

## Décrire quelqu'un

- **Ha gli occhi marroni.** (Il/elle a les yeux marron.)
- **È alto e simpatico.** (Il est grand et sympathique.)
- **Mio fratello ha venticinque anni.** (Mon frère a vingt-cinq ans.)
- **Abbiamo due figli.** (Nous avons deux enfants.)

## Faux-amis italien/français à connaître

| Mot italien | Sens réel | Ressemble au français | Sens français réel |
|---|---|---|---|
| **camera** | chambre | « caméra » | caméra se dit **videocamera** |
| **guardare** | regarder | « garder » | garder se dit **tenere/conservare** |
| **morbido** | doux, moelleux | « morbide » | morbide se dit **morboso** |
| **educato** | poli, bien élevé | « éduqué » | éduqué (érudit) se dit **istruito/colto** |
| **pretendere** | exiger | « prétendre » | prétendre (affirmer) se dit **sostenere/affermare** |
| **mobile** | meuble | « mobile » (téléphone) | mobile (téléphone) se dit **cellulare** |

## Phrases à retenir

- **Mia madre è medico e mio padre è insegnante.** (Ma mère est médecin
  et mon père est enseignant.)
- **Ho un fratello e due sorelle.** (J'ai un frère et deux sœurs.)
- **Hai fratelli o sorelle?** (As-tu des frères et sœurs ?)
- **Non ha una macchina.** (Il/elle n'a pas de voiture.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue AVERE à la 1ʳᵉ personne du singulier (io).', answers: ['ho'], explanation: 'io ho = j\'ai (h muet à l\'écrit, ne pas confondre avec « o » = ou).' },
      { type: 'mcq', prompt: 'Le mot italien « camera » veut dire :', options: ['Caméra', 'Chambre', 'Caravane', 'Carrière'], answer: 1, explanation: 'camera = chambre. Caméra se dit videocamera en italien.' },
      { type: 'mcq', prompt: 'Le mot italien « guardare » veut dire :', options: ['Garder', 'Regarder', 'Guider', 'Guérir'], answer: 1, explanation: 'guardare = regarder. Garder se dit tenere/conservare.' },
      { type: 'typed', prompt: 'Traduis en italien : « J\'ai faim. » (avere)', answers: ['ho fame'], explanation: 'Ho fame — avere fame = avoir faim.' },
      { type: 'mcq', prompt: 'Le mot italien « mobile » (au sens meuble) veut dire :', options: ['Un téléphone portable', 'Un meuble', 'Un véhicule', 'Une mobylette'], answer: 1, explanation: 'mobile = meuble. Le téléphone portable se dit cellulare en italien.' },
      { type: 'typed', prompt: 'Traduis en italien : « Il a les yeux marron. » (avere)', answers: ['ha gli occhi marroni'], explanation: 'Ha gli occhi marroni — avere pour une caractéristique physique avec un nom.' },
      { type: 'mcq', prompt: 'Le mot italien « educato » veut dire :', options: ['Éduqué, érudit', 'Poli, bien élevé', 'Éducatif', 'Scolarisé'], answer: 1, explanation: 'educato = poli/bien élevé. Éduqué (érudit) se dit istruito/colto.' },
      { type: 'typed', prompt: 'Traduis en italien : « As-tu des frères et sœurs ? »', answers: ['hai fratelli o sorelle'], explanation: 'Hai fratelli o sorelle? — question directe avec avere.' },
    ],
  },
  {
    title: 'Nombres, heure et date',
    content_md: `# Leçon 5 — Nombres, heure et date

## Les nombres de 0 à 20

| # | Italien |
|---|---|
| 0 | zero |
| 1 | uno |
| 2 | due |
| 3 | tre |
| 4 | quattro |
| 5 | cinque |
| 6 | sei |
| 7 | sette |
| 8 | otto |
| 9 | nove |
| 10 | dieci |
| 11 | undici |
| 12 | dodici |
| 13 | tredici |
| 14 | quattordici |
| 15 | quindici |
| 16 | sedici |
| 17 | diciassette |
| 18 | diciotto |
| 19 | diciannove |
| 20 | venti |

## De 21 à 100

- **venti** perd son « i » devant **uno** et **otto** : **ventuno** (21),
  **ventotto** (28) — un seul mot, sans espace.
- Dizaines : **trenta, quaranta, cinquanta, sessanta, settanta, ottanta,
  novanta, cento**.
- Même règle d'élision pour toutes les dizaines : **trentuno** (31),
  **quarantotto** (48).

⚠️ Contrairement au français (« quatre-vingts »), chaque dizaine a son
propre mot, régulier.

## Dire l'heure

- **Che ore sono?** (Quelle heure est-il ?)
- **È l'una.** (Il est une heure — singulier.)
- **Sono le tre.** (Il est trois heures — pluriel.)
- **Sono le tre e mezza.** (Il est trois heures et demie.)
- **Sono le quattro e un quarto.** (Il est quatre heures et quart.)
- **Sono le cinque meno un quarto.** (Il est cinq heures moins le quart.)
- **È mezzogiorno. / È mezzanotte.** (Il est midi. / Il est minuit.)

Structure très proche du français, seul le verbe change (**è/sono** au
lieu de « il est »).

## Les jours de la semaine

| Italien | Français |
|---|---|
| lunedì | lundi |
| martedì | mardi |
| mercoledì | mercredi |
| giovedì | jeudi |
| venerdì | vendredi |
| sabato | samedi |
| domenica | dimanche |

⚠️ Comme en français, les jours de la semaine **ne prennent pas de
majuscule** en italien.

## Les mois

| Italien | Français |
|---|---|
| gennaio | janvier |
| febbraio | février |
| marzo | mars |
| aprile | avril |
| maggio | mai |
| giugno | juin |
| luglio | juillet |
| agosto | août |
| settembre | septembre |
| ottobre | octobre |
| novembre | novembre |
| dicembre | décembre |

## Dire la date

**Oggi è lunedì, 26 luglio 2026.** (Aujourd'hui, c'est lundi 26 juillet
2026.)

Comme en français, on utilise un nombre cardinal (pas d'ordinal) sauf
pour le premier du mois : **il primo gennaio** (le premier janvier), mais
**il due febbraio** (le deux février).

## Phrases à retenir

- **Ho ventotto anni.** (J'ai vingt-huit ans.)
- **Il mio compleanno è il quindici maggio.** (Mon anniversaire est le
  15 mai.)
- **Ci vediamo giovedì alle sette.** (On se voit jeudi à sept heures.)
- **Il negozio apre alle nove e chiude alle otto.** (Le magasin ouvre à
  9h et ferme à 20h.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Écris le nombre 21 en italien (attention à l\'élision).', answers: ['ventuno'], explanation: 'ventuno — venti perd son i devant uno.' },
      { type: 'typed', prompt: 'Écris le nombre 28 en italien (attention à l\'élision).', answers: ['ventotto'], explanation: 'ventotto — venti perd son i devant otto.' },
      { type: 'typed', prompt: 'Comment dit-on « trois heures et demie » ?', answers: ['sono le tre e mezza'], explanation: 'Sono le tre e mezza — pluriel « sono » pour plusieurs heures.' },
      { type: 'mcq', prompt: 'Quel jour est « giovedì » ?', options: ['mardi', 'mercredi', 'jeudi', 'vendredi'], answer: 2, explanation: 'giovedì = jeudi.' },
      { type: 'typed', prompt: 'Traduis en italien : « Il est une heure. » (singulier)', answers: ["è l'una", 'e l\'una'], explanation: "È l'una — singulier, une seule heure." },
      { type: 'typed', prompt: 'Écris le mois de « janvier » en italien.', answers: ['gennaio'], explanation: 'gennaio = janvier.' },
      { type: 'mcq', prompt: 'Comment dit-on « le premier janvier » ?', options: ['il uno gennaio', 'il primo gennaio', 'il prima gennaio', 'il un gennaio'], answer: 1, explanation: 'il primo gennaio — seule exception où on utilise l\'ordinal (primo) au lieu du cardinal.' },
      { type: 'typed', prompt: 'Traduis en italien : « J\'ai vingt-huit ans. »', answers: ['ho ventotto anni'], explanation: 'Ho ventotto anni — avere pour l\'âge, comme en français.' },
    ],
  },
  {
    title: 'Au restaurant et au marché',
    content_md: `# Leçon 6 — Au restaurant et au marché

## Les verbes irréguliers indispensables

### VOLERE (vouloir)

| | Italien |
|---|---|
| io | voglio |
| tu | vuoi |
| lui/lei | vuole |
| noi | vogliamo |
| voi | volete |
| loro | vogliono |

### POTERE (pouvoir)

| | Italien |
|---|---|
| io | posso |
| tu | puoi |
| lui/lei | può |
| noi | possiamo |
| voi | potete |
| loro | possono |

### DOVERE (devoir)

| | Italien |
|---|---|
| io | devo |
| tu | devi |
| lui/lei | deve |
| noi | dobbiamo |
| voi | dovete |
| loro | devono |

## L'article partitif : « du/de la/des »

L'italien forme le partitif en combinant **di** + l'article défini :
**di + il = del**, **di + lo = dello**, **di + la = della**, **di + i =
dei**, **di + gli = degli**, **di + le = delle**.
- **Vorrei del pane.** (Je voudrais du pain.)
- **Compro delle mele.** (J'achète des pommes.)

## Au restaurant

- **Un tavolo per due, per favore.** (Une table pour deux, s'il vous
  plaît.)
- **Cosa desiderate?** (Que désirez-vous ?)
- **Vorrei la zuppa, per favore.** (Je voudrais la soupe, s'il vous
  plaît — **vorrei** = forme polie de *voglio*.)
- **Cosa mi consiglia?** (Que me recommandez-vous ?)
- **Per me, il pollo.** (Pour moi, le poulet.)
- **Avete... ?** (Avez-vous... ?)
- **Ho fame / sete.** (J'ai faim / soif.)
- **È molto buono!** (C'est délicieux !)
- **Il conto, per favore.** (L'addition, s'il vous plaît.)
- **Posso pagare con la carta?** (Je peux payer par carte ?)

## Au marché / dans les magasins

- **Quanto costa questo?** (Combien ça coûte ?)
- **Quanto viene in totale?** (Combien ça fait en tout ?)
- **Vorrei comprare delle mele.** (Je voudrais acheter des pommes.)
- **Avete del pane?** (Avez-vous du pain ?)
- **È molto caro / economico.** (C'est très cher / pas cher.)

## Dialogue à mémoriser

> — Buonasera, un tavolo per due?
> — Sì, grazie.
> — Cosa desiderate?
> — Vorrei la zuppa e il pollo. E tu?
> — Per me il pesce, per favore. E una bottiglia d'acqua.
> — Altro?
> — No, grazie. Il conto, per favore.
> — Certo. Sono venticinque euro.
> — Posso pagare con la carta?
> — Certo.

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue VOLERE à la 1ʳᵉ personne du singulier (io).', answers: ['voglio'], explanation: 'io voglio — verbe très irrégulier.' },
      { type: 'typed', prompt: 'Conjugue POTERE à la 2ᵉ personne du singulier (tu).', answers: ['puoi'], explanation: 'tu puoi — verbe irrégulier.' },
      { type: 'mcq', prompt: 'Comment se forme l\'article partitif « du pain » ?', options: ['di + il pane = di il pane', 'del pane (di + il fusionnés)', 'un pane', 'pane solo'], answer: 1, explanation: 'del pane — di + il se contractent en « del ».' },
      { type: 'typed', prompt: 'Traduis en italien poliment : « Je voudrais la soupe, s\'il vous plaît. »', answers: ['vorrei la zuppa, per favore', 'vorrei la zuppa per favore'], explanation: 'Vorrei la zuppa, per favore — vorrei est la forme polie de voglio.' },
      { type: 'typed', prompt: 'Traduis en italien : « Combien ça coûte ? »', answers: ['quanto costa questo', 'quanto costa'], explanation: 'Quanto costa questo? — pour demander un prix.' },
      { type: 'mcq', prompt: 'Conjugue DOVERE à la 1ʳᵉ personne du pluriel (noi) :', options: ['dobbiamo', 'doviamo', 'devemo', 'dovemmo'], answer: 0, explanation: 'noi dobbiamo — forme irrégulière à apprendre par cœur.' },
      { type: 'typed', prompt: 'Traduis en italien poliment : « Puis-je avoir l\'addition, s\'il vous plaît ? »', answers: ['il conto, per favore', 'il conto per favore', 'posso avere il conto, per favore', 'posso avere il conto per favore'], explanation: 'Il conto, per favore — la phrase indispensable au restaurant.' },
      { type: 'mcq', prompt: 'Comment dit-on « des pommes » (article partitif) ?', options: ['delle mele', 'dei mele', 'un mele', 'la mele'], answer: 0, explanation: 'delle mele — di + le (féminin pluriel) = delle.' },
    ],
  },
  {
    title: 'Verbes réfléchis et routine quotidienne',
    content_md: `# Leçon 7 — Verbes réfléchis et routine quotidienne

## Les verbes réfléchis (verbi riflessivi)

Comme en français, beaucoup de verbes du quotidien sont réfléchis en
italien, avec un pronom réfléchi (**mi, ti, si, ci, vi, si**) placé avant
le verbe conjugué — la structure est très proche du français, seule la
conjugaison change :

| | Italien | Français |
|---|---|---|
| io | **mi** alzo | je **me** lève |
| tu | **ti** alzi | tu **te** lèves |
| lui/lei | **si** alza | il/elle **se** lève |
| noi | **ci** alziamo | nous **nous** levons |
| voi | **vi** alzate | vous **vous** levez |
| loro | **si** alzano | ils/elles **se** lèvent |

## Les verbes réfléchis les plus utiles

- **svegliarsi** — se réveiller
- **alzarsi** — se lever
- **lavarsi** — se laver
- **farsi la doccia** — se doucher
- **vestirsi** — s'habiller
- **pettinarsi** — se coiffer
- **addormentarsi** — s'endormir
- **coricarsi/andare a letto** — se coucher
- **chiamarsi** — s'appeler (déjà vu leçon 2 !)

## La routine quotidienne (la routine quotidiana)

- **Mi sveglio alle sette.** (Je me réveille à sept heures.)
- **Mi alzo alle sette e un quarto.** (Je me lève à sept heures et quart.)
- **Mi faccio la doccia e mi vesto.** (Je me douche et je m'habille.)
- **Faccio colazione.** (Je prends le petit-déjeuner.)
- **Vado al lavoro/a scuola.** (Je vais au travail/à l'école.)
- **Pranzo a mezzogiorno.** (Je déjeune à midi.)
- **Torno a casa nel pomeriggio.** (Je rentre à la maison l'après-midi.)
- **Ceno alle nove.** (Je dîne à neuf heures.)
- **Vado a letto alle undici.** (Je me couche à onze heures.)

## Les adverbes de fréquence

- **sempre** — toujours
- **di solito** — d'habitude
- **spesso** — souvent
- **a volte** — parfois
- **raramente** — rarement
- **mai** — jamais

Comme en français, ils se placent généralement après le verbe conjugué :
**Mi alzo sempre presto.** (Je me lève toujours tôt.) **Non faccio mai
colazione.** (Je ne prends jamais de petit-déjeuner.)

## Phrases à retenir

- **A che ora ti alzi di solito?** (À quelle heure te lèves-tu
  d'habitude ?)
- **Il weekend mi alzo tardi.** (Le week-end, je me lève tard.)
- **Prima di andare a letto, leggo un po'.** (Avant de me coucher, je
  lis un peu.)
- **Ci facciamo la doccia la mattina.** (Nous nous douchons le matin.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue ALZARSI à la 1ʳᵉ personne du singulier (io).', answers: ['mi alzo'], explanation: 'mi alzo = je me lève — pronom réfléchi « mi » devant le verbe conjugué.' },
      { type: 'typed', prompt: 'Conjugue SVEGLIARSI à la 3ᵉ personne du singulier (lui/lei).', answers: ['si sveglia'], explanation: 'si sveglia = il/elle se réveille.' },
      { type: 'mcq', prompt: '« Ci alziamo » veut dire :', options: ['Je me lève', 'Tu te lèves', 'Nous nous levons', 'Ils se lèvent'], answer: 2, explanation: 'noi ci alziamo = nous nous levons.' },
      { type: 'typed', prompt: 'Traduis en italien : « Je prends le petit-déjeuner. »', answers: ['faccio colazione'], explanation: 'Faccio colazione — littéralement « je fais petit-déjeuner ».' },
      { type: 'mcq', prompt: 'Où se placent généralement les adverbes de fréquence en italien ?', options: ['Toujours en début de phrase', 'Après le verbe conjugué', 'Ils n\'existent pas en italien', 'Uniquement en fin de phrase'], answer: 1, explanation: 'Mi alzo sempre presto — l\'adverbe suit le verbe conjugué, comme en français.' },
      { type: 'typed', prompt: 'Traduis en italien : « Je ne prends jamais de petit-déjeuner. »', answers: ['non faccio mai colazione'], explanation: 'Non faccio mai colazione.' },
      { type: 'typed', prompt: 'Conjugue VESTIRSI à la 2ᵉ personne du singulier (tu).', answers: ['ti vesti'], explanation: 'tu ti vesti = tu t\'habilles.' },
      { type: 'mcq', prompt: '« Il weekend mi alzo tardi » veut dire :', options: ['Le week-end, je me lève tôt', 'Le week-end, je me lève tard', 'Je ne me lève jamais le week-end', 'Je me lève tous les jours tard'], answer: 1, explanation: 'tardi = tard.' },
    ],
  },
  {
    title: 'Le passé : essere o avere?',
    content_md: `# Leçon 8 — Le passato prossimo : ESSERE ou AVERE ?

## La grande difficulté n°1 de l'italien

Le passato prossimo (équivalent du passé composé français) se forme avec
**essere** ou **avere** + le participe passé — mais contrairement au
français où « avoir » domine largement, en italien le choix entre les
deux auxiliaires est **systématique et à apprendre par cœur**.

## Former le participe passé

- Verbes en **-are** → **-ato** : parlare → parl**ato**
- Verbes en **-ere** → **-uto** : avere → av**uto**
- Verbes en **-ire** → **-ito** : partire → part**ito**

De nombreux participes passés sont irréguliers : **fare → fatto**,
**dire → detto**, **vedere → visto**, **prendere → preso**, **essere →
stato**, **nascere → nato**.

## Avec AVERE : la majorité des verbes

Les verbes transitifs (qui ont un complément d'objet) et la plupart des
autres verbes prennent **avere** — le participe passé **ne s'accorde
pas** :
- **Ho mangiato una pizza.** (J'ai mangé une pizza.)
- **Abbiamo parlato con Maria.** (Nous avons parlé avec Maria.)
- **Hanno visto il film.** (Ils ont vu le film.)

## Avec ESSERE : verbes de mouvement, changement d'état, réfléchis

Une liste de verbes à connaître par cœur — souvent des verbes de
déplacement ou de changement d'état — prennent **essere**, et le
participe passé **s'accorde en genre et en nombre avec le sujet** :

**andare, venire, partire, arrivare, entrare, uscire, salire, scendere,
tornare, rimanere, diventare, nascere, morire, essere, stare** — et
**tous les verbes réfléchis**.

- **Sono andato/andata al cinema.** (Je suis allé/allée au cinéma —
  andato si tu es un homme, andata si tu es une femme.)
- **Siamo arrivati/arrivate ieri.** (Nous sommes arrivés/arrivées hier.)
- **Mi sono svegliato/svegliata alle sette.** (Je me suis réveillé(e) à
  sept heures — les réfléchis prennent toujours essere.)

⚠️ Piège majeur : contrairement au français où « avoir » est
l'auxiliaire par défaut et « être » l'exception limitée à une quinzaine
de verbes (aller, venir, partir...), en italien la logique est la
**même liste de verbes** mais l'accord du participe est **obligatoire**
avec essere (masculin/féminin, singulier/pluriel) — chose que le
français ne fait pas toujours à l'oral.

## Marqueurs temporels du passé

- **ieri** — hier
- **l'altro ieri** — avant-hier
- **la settimana scorsa** — la semaine dernière
- **il mese/l'anno scorso** — le mois/l'année dernier(e)
- **due giorni fa** — il y a deux jours

## Phrases à retenir

- **Ieri ho parlato con mio fratello.** (Hier, j'ai parlé avec mon
  frère — avere, verbe transitif.)
- **La settimana scorsa siamo andati al cinema.** (La semaine dernière,
  nous sommes allés au cinéma — essere, verbe de mouvement.)
- **Cosa hai fatto questo weekend?** (Qu'as-tu fait ce week-end ? —
  avere + participe irrégulier fatto.)
- **Sono nata nel 1995.** (Je suis née en 1995 — essere, dit par une
  femme, accord au féminin.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'mcq', prompt: 'Quel auxiliaire utilise-t-on pour la majorité des verbes transitifs (manger, parler, voir...) ?', options: ['essere', 'avere', 'stare', 'venire'], answer: 1, explanation: 'Ho mangiato, ho parlato, ho visto — avere pour la majorité des verbes.' },
      { type: 'mcq', prompt: 'Quel auxiliaire utilisent TOUS les verbes réfléchis ?', options: ['avere', 'essere', 'stare', 'fare'], answer: 1, explanation: 'Tous les verbes réfléchis (alzarsi, svegliarsi...) prennent essere au passato prossimo.' },
      { type: 'typed', prompt: 'Écris le participe passé de FARE (faire) — irrégulier.', answers: ['fatto'], explanation: 'fare → fatto, participe passé irrégulier.' },
      { type: 'typed', prompt: 'Écris le participe passé de VEDERE (voir) — irrégulier.', answers: ['visto'], explanation: 'vedere → visto, participe passé irrégulier.' },
      { type: 'mcq', prompt: 'Avec ESSERE, le participe passé :', options: ['Ne change jamais', 'S\'accorde en genre et en nombre avec le sujet', 'S\'accorde seulement au pluriel', 'Devient toujours féminin'], answer: 1, explanation: 'Sono andato (homme) / Sono andata (femme) — accord obligatoire avec essere.' },
      { type: 'typed', prompt: 'Une femme dit « je suis allée au cinéma » — conjugue ANDARE au passato prossimo, io (féminin).', answers: ['sono andata'], explanation: 'Sono andata — essere + participe accordé au féminin.' },
      { type: 'typed', prompt: 'Traduis en italien : « J\'ai parlé avec mon frère. » (avere, verbe transitif)', answers: ['ho parlato con mio fratello'], explanation: 'Ho parlato con mio fratello — avere, pas d\'accord du participe.' },
      { type: 'mcq', prompt: 'Pourquoi « siamo arrivati » utilise essere ?', options: ['Arrivare est un verbe transitif', 'Arrivare est un verbe de mouvement/changement d\'état', 'C\'est une erreur, il faudrait avere', 'Parce que le sujet est pluriel'], answer: 1, explanation: 'arrivare fait partie de la liste des verbes de mouvement qui prennent essere.' },
      { type: 'typed', prompt: 'Écris le participe passé de NASCERE (naître) — irrégulier, prend essere.', answers: ['nato'], explanation: 'nascere → nato. Sono nato/nata = je suis né(e).' },
    ],
  },
  {
    title: 'Le futur et la météo',
    content_md: `# Leçon 9 — Le futur et la météo

## Le futur simple

Contrairement au français qui a un futur bien distinct de l'infinitif,
l'italien forme son futur en modifiant légèrement l'infinitif, avec des
terminaisons **identiques pour les trois groupes** (-are et -ere
fusionnent même leur voyelle finale) :

| | parlare | vivere | partire |
|---|---|---|---|
| io | parler**ò** | viver**ò** | partir**ò** |
| tu | parler**ai** | viver**ai** | partir**ai** |
| lui/lei | parler**à** | viver**à** | partir**à** |
| noi | parler**emo** | viver**emo** | partir**emo** |
| voi | parler**ete** | viver**ete** | partir**ete** |
| loro | parler**anno** | viver**anno** | partir**anno** |

⚠️ Remarque : les verbes en **-are** changent leur « a » en « e » avant
d'ajouter la terminaison (**parlare → parler-ò**, pas *parlar-ò*).

## Futur proche : STARE PER + infinitif

Comme le français « être sur le point de », l'italien a une construction
équivalente : **Sto per uscire.** (Je suis sur le point de sortir.) —
mais on utilise plus couramment le futur simple pour parler de l'avenir,
y compris proche, contrairement au français qui privilégie souvent
« aller » + infinitif.

## Quelques futurs irréguliers courants

Le radical change mais les terminaisons restent identiques : **essere →
sarò**, **avere → avrò**, **potere → potrò**, **dovere → dovrò**,
**volere → vorrò**, **venire → verrò**, **andare → andrò**.

## Faire des projets

- **Che progetti hai per l'estate?** (Quels projets as-tu pour l'été ?)
- **Spero di viaggiare molto quest'anno.** (J'espère voyager beaucoup
  cette année.)
- **Un giorno voglio visitare il Giappone.** (Un jour, je veux visiter
  le Japon.)
- **Domani inizierò un corso d'italiano.** (Demain, je commencerai un
  cours d'italien.)

## Le temps qu'il fait (il tempo)

- **C'è il sole. / È soleggiato.** (Il fait soleil.)
- **Fa caldo / freddo.** (Il fait chaud / froid.)
- **C'è vento.** (Il y a du vent.)
- **Piove.** (Il pleut.)
- **Nevica.** (Il neige.)
- **È nuvoloso.** (Le temps est nuageux.)
- **Che tempo fa oggi?** (Quel temps fait-il aujourd'hui ?)

⚠️ Comme en français et en espagnol, on utilise **fare** (faire) pour la
chaleur/le froid/le vent, mais **piovere** et **nevicare** sont des
verbes à part entière pour la pluie et la neige — jamais *fa pioggia*.

## Phrases à retenir

- **Questo weekend mi riposerò.** (Ce week-end, je vais me reposer.)
- **Se farà bel tempo, andremo in spiaggia.** (S'il fait beau, nous
  irons à la plage.)
- **L'anno prossimo vivrò a Milano.** (L'année prochaine, je vivrai à
  Milan.)
- **Domani pioverà nel pomeriggio.** (Demain, il pleuvra l'après-midi.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue PARLARE au futur simple, 1ʳᵉ personne du singulier (io).', answers: ['parlerò'], explanation: 'parlerò — le « a » de parlare devient « e » avant la terminaison.' },
      { type: 'mcq', prompt: 'Au futur simple, les terminaisons des verbes -ARE et -ERE sont :', options: ['Complètement différentes', 'Identiques une fois le a de -are changé en e', 'Identiques à l\'infinitif', 'Impossibles à distinguer'], answer: 1, explanation: 'parlerò/viverò partagent les mêmes terminaisons, seul le radical diffère.' },
      { type: 'typed', prompt: 'Conjugue ESSERE au futur simple, 1ʳᵉ personne du singulier (io) — irrégulier.', answers: ['sarò'], explanation: 'sarò — radical irrégulier sar-.' },
      { type: 'typed', prompt: 'Conjugue AVERE au futur simple, 1ʳᵉ personne du singulier (io) — irrégulier.', answers: ['avrò'], explanation: 'avrò — radical irrégulier avr-.' },
      { type: 'typed', prompt: 'Traduis en italien : « Il pleut. »', answers: ['piove'], explanation: 'Piove — verbe à part entière (piovere), pas de construction avec fare.' },
      { type: 'typed', prompt: 'Traduis en italien : « Il fait chaud. »', answers: ['fa caldo'], explanation: 'Fa caldo — construction avec fare pour la météo générale.' },
      { type: 'mcq', prompt: 'Comment dit-on « Il neige » ?', options: ['Fa neve', 'Nevica', 'È neve', 'Sta neve'], answer: 1, explanation: 'Nevica — verbe nevicare, comme piovere pour la pluie.' },
      { type: 'typed', prompt: 'Traduis en italien : « Demain, il pleuvra l\'après-midi. »', answers: ['domani pioverà nel pomeriggio'], explanation: 'Domani pioverà nel pomeriggio — futur simple de piovere.' },
    ],
  },
  {
    title: 'Comparatifs, directions et voyage',
    content_md: `# Leçon 10 — Comparatifs, directions et voyage

## Le comparatif

| Construction | Exemple | Traduction |
|---|---|---|
| **più ... di** (plus que) | Roma è più grande di Firenze. | Rome est plus grande que Florence. |
| **meno ... di** (moins que) | Questo hotel è meno caro di quello. | Cet hôtel est moins cher que celui-là. |
| **così ... come / tanto ... quanto** (aussi que) | È così alta come suo fratello. | Elle est aussi grande que son frère. |

⚠️ Comparatifs irréguliers : **buono → migliore** (meilleur, pas *più
buono*), **cattivo → peggiore** (pire), **grande → maggiore** (plus
grand/âgé), **piccolo → minore** (plus petit/jeune).

## Le superlatif

- **il/la più ... di** — le/la plus ... de : **È la città più bella
  d'Italia.** (C'est la plus belle ville d'Italie.)
- **-issimo/a** — suffixe qui intensifie, comme « très » : **È
  facilissimo.** (C'est très facile.)

## Se repérer en ville

- **Dov'è la stazione?** (Où est la gare ?)
- **Come si arriva a...?** (Comment va-t-on à... ?)
- **Sempre dritto.** (Tout droit.)
- **Giri a destra / a sinistra.** (Tournez à droite / à gauche.)
- **È vicino / lontano.** (C'est près / loin.)
- **È accanto a / di fronte a / dietro la chiesa.** (C'est à côté de /
  en face de / derrière l'église.)
- **Prenda la prima strada a destra.** (Prenez la première rue à
  droite.)

## À l'hôtel

- **Ho una prenotazione a nome di...** (J'ai une réservation au nom
  de...)
- **Avete una camera libera?** (Avez-vous une chambre libre ?)
- **Una camera doppia/singola, per favore.** (Une chambre double/
  simple, s'il vous plaît.)
- **A che ora è la colazione?** (À quelle heure est le petit-déjeuner ?)
- **A che ora si deve lasciare la camera?** (À quelle heure faut-il
  quitter la chambre ?)

## À l'aéroport

- **Dov'è il check-in?** (Où est l'enregistrement ?)
- **Il mio volo parte alle dieci.** (Mon vol part à dix heures.)
- **Ho perso la valigia.** (J'ai perdu ma valise.)
- **Dove ritiro i bagagli?** (Où récupère-t-on les bagages ?)

## Phrases à retenir

- **Questo ristorante è migliore di quello di ieri.** (Ce restaurant est
  meilleur que celui d'hier.)
- **Giri a sinistra alla prossima strada.** (Tournez à gauche à la
  prochaine rue.)
- **Come si arriva al museo da qui?** (Comment va-t-on au musée depuis
  ici ?)

## Récapitulatif du cours

Avec ces 10 leçons, tu as désormais : la prononciation, les bases de la
conversation, la grammaire essentielle (articles, verbes réguliers/
irréguliers, avere, verbes réfléchis), le point le plus dur (essere vs
avere au passé), le futur, les comparaisons, et le vocabulaire pour te
débrouiller au restaurant, en ville, à l'hôtel et en voyage.
Congratulazioni, hai ora un livello A2-B1!`,
    questions: [
      { type: 'typed', prompt: 'Traduis en italien : « Rome est plus grande que Florence. »', answers: ['roma è più grande di firenze'], explanation: 'più ... di = plus ... que.' },
      { type: 'mcq', prompt: 'Quel est le comparatif irrégulier de « buono » (bon) ?', options: ['più buono', 'migliore', 'meno buono', 'buonissimo'], answer: 1, explanation: 'migliore est le comparatif irrégulier de buono — jamais « più buono ».' },
      { type: 'typed', prompt: 'Traduis en italien : « Elle est aussi grande que son frère. » (così...come)', answers: ['è così alta come suo fratello'], explanation: 'così ... come = aussi ... que.' },
      { type: 'mcq', prompt: '« È la città più bella d\'Italia » utilise :', options: ['un comparatif', 'un superlatif', 'un diminutif', 'un impératif'], answer: 1, explanation: 'il/la più ... di = superlatif (la plus ... de).' },
      { type: 'typed', prompt: 'Traduis en italien : « Tournez à gauche. »', answers: ['giri a sinistra'], explanation: 'Giri a sinistra — forme de politesse.' },
      { type: 'mcq', prompt: '« È di fronte alla chiesa » veut dire :', options: ['C\'est derrière l\'église', 'C\'est à côté de l\'église', 'C\'est en face de l\'église', 'C\'est loin de l\'église'], answer: 2, explanation: 'di fronte a = en face de.' },
      { type: 'typed', prompt: 'Traduis en italien : « Avez-vous une chambre libre ? »', answers: ['avete una camera libera'], explanation: 'Avete una camera libera?' },
      { type: 'typed', prompt: 'Traduis en italien : « Mon vol part à dix heures. »', answers: ['il mio volo parte alle dieci'], explanation: 'Il mio volo parte alle dieci.' },
      { type: 'mcq', prompt: 'Quel est le comparatif irrégulier de « piccolo » (petit) ?', options: ['più piccolo', 'minore', 'peggiore', 'piccolissimo'], answer: 1, explanation: 'minore = plus petit/plus jeune, comparatif irrégulier.' },
    ],
  },
];

module.exports = { LESSONS };
