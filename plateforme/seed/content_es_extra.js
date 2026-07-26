// Contenu des leçons 7 à 10 du cours espagnol — écrites directement ici (pas de fichiers
// statiques miroir, contrairement aux leçons 1-6 qui viennent de COURS D'ESPAGNOL/*.md).
'use strict';

const LESSONS = [
  {
    title: 'Verbes réfléchis et routine quotidienne',
    content_md: `# Leçon 7 — Verbes réfléchis et routine quotidienne

## Les verbes réfléchis (verbos reflexivos)

En espagnol, beaucoup de verbes du quotidien sont **réfléchis** : l'action
revient sur le sujet, et on utilise un pronom réfléchi collé au sens
(**me, te, se, nos, os, se**) devant le verbe conjugué.

| | Espagnol | Français |
|---|---|---|
| yo | **me** levanto | je **me** lève |
| tú | **te** levantas | tu **te** lèves |
| él/ella/usted | **se** levanta | il/elle **se** lève |
| nosotros | **nos** levantamos | nous **nous** levons |
| vosotros | **os** levantáis | vous **vous** levez |
| ellos/ustedes | **se** levantan | ils/elles **se** lèvent |

La structure ressemble au français (pronom réfléchi + verbe), donc le
réflexe n'est pas dépaysant — seule la conjugaison change.

## Les verbes réfléchis les plus utiles

- **levantarse** — se lever
- **despertarse** — se réveiller (diphtongue e→ie : *me despierto*)
- **ducharse** — se doucher
- **lavarse (los dientes)** — se laver (les dents)
- **vestirse** — s'habiller (diphtongue e→i : *me visto*)
- **peinarse** — se coiffer
- **acostarse** — se coucher (diphtongue o→ue : *me acuesto*)
- **dormirse** — s'endormir (diphtongue o→ue : *me duermo*)
- **llamarse** — s'appeler (déjà vu leçon 2 !)

⚠️ Piège : certains de ces verbes sont irréguliers avec diphtongue (comme
*querer* et *poder* vus leçon 6) EN PLUS d'être réfléchis. Les deux
phénomènes se cumulent : **me despierto** (pas *me despierto* sans
diphtongue), **se viste**, **nos acostamos** (pas de diphtongue à
nosotros/vosotros, comme pour les autres verbes à diphtongue).

## La routine quotidienne (la rutina diaria)

- **Me despierto a las siete.** (Je me réveille à sept heures.)
- **Me levanto a las siete y cuarto.** (Je me lève à sept heures et quart.)
- **Me ducho y me visto.** (Je me douche et je m'habille.)
- **Desayuno y salgo de casa.** (Je prends le petit-déjeuner et je sors de la maison.)
- **Trabajo/Estudio por la mañana.** (Je travaille/j'étudie le matin.)
- **Como al mediodía.** (Je mange à midi.)
- **Vuelvo a casa por la tarde.** (Je rentre à la maison l'après-midi.)
- **Ceno a las nueve.** (Je dîne à neuf heures.)
- **Me acuesto a las once.** (Je me couche à onze heures.)

## Les adverbes de fréquence

- **siempre** — toujours
- **normalmente / generalmente** — normalement/généralement
- **a menudo** — souvent
- **a veces** — parfois
- **casi nunca** — presque jamais
- **nunca** — jamais

Ces adverbes se placent en général avant le verbe (contrairement au
français où ils suivent souvent le verbe) : **Siempre me levanto
temprano.** (Je me lève toujours tôt.) **Nunca desayuno.** (Je ne prends
jamais de petit-déjeuner.)

## Phrases à retenir

- **¿A qué hora te levantas normalmente?** (À quelle heure te lèves-tu
  normalement ?)
- **Los fines de semana me levanto tarde.** (Le week-end, je me lève tard.)
- **Antes de acostarme, leo un poco.** (Avant de me coucher, je lis un peu.)
- **Nos duchamos por la mañana.** (Nous nous douchons le matin.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: "Conjugue LEVANTARSE à la 1ʳᵉ personne du singulier (yo).", answers: ['me levanto'], explanation: 'me levanto = je me lève — pronom réfléchi « me » devant le verbe conjugué.' },
      { type: 'typed', prompt: "Conjugue ACOSTARSE à la 1ʳᵉ personne du singulier (yo). Attention à la diphtongue !", answers: ['me acuesto'], explanation: 'me acuesto — diphtongue o→ue comme dans poder, en plus du pronom réfléchi.' },
      { type: 'mcq', prompt: '« Nos duchamos » veut dire :', options: ['Je me douche', 'Tu te douches', 'Nous nous douchons', 'Ils se douchent'], answer: 2, explanation: 'nosotros nos duchamos = nous nous douchons.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Il se réveille à sept heures. » (despertarse, diphtongue e→ie)', answers: ['se despierta a las siete'], explanation: 'se despierta — diphtongue e→ie à la 3e personne.' },
      { type: 'mcq', prompt: 'Où se place généralement l\'adverbe de fréquence en espagnol ?', options: ['Après le verbe, comme en français', 'Avant le verbe conjugué', 'En fin de phrase uniquement', 'Il n\'y a pas de règle'], answer: 1, explanation: 'Siempre me levanto temprano — l\'adverbe précède le verbe, contrairement à l\'usage le plus courant en français.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Je ne prends jamais de petit-déjeuner. »', answers: ['nunca desayuno'], explanation: 'Nunca desayuno — nunca placé avant le verbe.' },
      { type: 'typed', prompt: 'Conjugue VESTIRSE à la 3ᵉ personne du singulier (él/ella). Attention à la diphtongue e→i.', answers: ['se viste'], explanation: 'se viste — diphtongue e→i, comme pedir.' },
      { type: 'mcq', prompt: '« Antes de acostarme » veut dire :', options: ['Après m\'être couché', 'Avant de me coucher', 'Pendant que je me couche', 'Sans me coucher'], answer: 1, explanation: 'antes de + infinitif = avant de.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Les week-ends, je me lève tard. »', answers: ['los fines de semana me levanto tarde'], explanation: 'Los fines de semana me levanto tarde.' },
      { type: 'mcq', prompt: 'Quel pronom réfléchi correspond à « vosotros » ?', options: ['se', 'nos', 'os', 'te'], answer: 2, explanation: 'vosotros os laváis — os est le pronom réfléchi de la 2e personne du pluriel (Espagne).' },
    ],
  },
  {
    title: 'Le passé — le prétérit',
    content_md: `# Leçon 8 — Le passé : le prétérit (pretérito indefinido)

## À quoi sert le prétérit

Le **pretérito indefinido** sert à parler d'actions **terminées** dans le
passé, à un moment précis : hier, la semaine dernière, en 2020... C'est
l'équivalent du passé composé français dans son usage le plus courant
(« j'ai mangé », « je suis allé »), même si la construction grammaticale
est différente (un seul mot en espagnol, pas d'auxiliaire).

## Les verbes réguliers au prétérit

### Groupe -AR — hablar

| | Espagnol |
|---|---|
| yo | habl**é** |
| tú | habl**aste** |
| él/ella/usted | habl**ó** |
| nosotros | habl**amos** |
| vosotros | habl**asteis** |
| ellos/ustedes | habl**aron** |

### Groupes -ER / -IR — comer / vivir

| | comer | vivir |
|---|---|---|
| yo | com**í** | viv**í** |
| tú | com**iste** | viv**iste** |
| él/ella/usted | com**ió** | viv**ió** |
| nosotros | com**imos** | viv**imos** |
| vosotros | com**isteis** | viv**isteis** |
| ellos/ustedes | com**ieron** | viv**ieron** |

⚠️ Piège d'accent : **yo hablé** et **él/ella habló** se distinguent
uniquement par l'accent tonique (et l'accent écrit). Ne les confonds pas
à l'oral comme à l'écrit !

⚠️ Piège n°2 : à la forme **nosotros**, le prétérit des verbes -AR et -IR
est **identique** au présent (**hablamos**, **vivimos**) — seul le
contexte de la phrase indique s'il s'agit du présent ou du passé.

## Les verbes irréguliers indispensables

| | SER / IR (même forme !) | HACER | TENER | ESTAR |
|---|---|---|---|---|
| yo | fui | hice | tuve | estuve |
| tú | fuiste | hiciste | tuviste | estuviste |
| él/ella/usted | fue | hizo | tuvo | estuvo |
| nosotros | fuimos | hicimos | tuvimos | estuvimos |
| vosotros | fuisteis | hicisteis | tuvisteis | estuvisteis |
| ellos/ustedes | fueron | hicieron | tuvieron | estuvieron |

⚠️ Piège majeur : **ser** (être) et **ir** (aller) ont exactement **la
même** conjugaison au prétérit ! Seul le contexte permet de savoir lequel
des deux est utilisé : **Fui a Madrid.** (Je suis allé à Madrid — *ir*)
vs **Fui profesor.** (J'ai été professeur — *ser*).

## Marqueurs temporels du passé

- **ayer** — hier
- **anteayer** — avant-hier
- **la semana pasada** — la semaine dernière
- **el mes/año pasado** — le mois/l'année dernier(e)
- **hace dos días** — il y a deux jours
- **en 2020** — en 2020

## Phrases à retenir

- **Ayer hablé con mi hermano.** (Hier, j'ai parlé avec mon frère.)
- **La semana pasada fuimos al cine.** (La semaine dernière, nous sommes
  allés au cinéma.)
- **¿Qué hiciste el fin de semana?** (Qu'as-tu fait le week-end ?)
- **Tuve mucho trabajo ayer.** (J'ai eu beaucoup de travail hier.)
- **Estuvo en España en 2019.** (Il/elle a été en Espagne en 2019.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Conjugue HABLAR au prétérit, 1ʳᵉ personne du singulier (yo).', answers: ['hablé'], explanation: 'yo hablé — accent obligatoire sur le é final.' },
      { type: 'typed', prompt: 'Conjugue HABLAR au prétérit, 3ᵉ personne du singulier (él/ella).', answers: ['habló'], explanation: 'él/ella habló — accent sur le ó, à ne pas confondre avec « hablo » (présent, sans accent).' },
      { type: 'mcq', prompt: 'Au prétérit, la forme « nosotros » de HABLAR (hablamos) est :', options: ['Différente du présent', 'Identique à la forme du présent', 'Toujours irrégulière', 'Impossible à utiliser'], answer: 1, explanation: 'hablamos est identique au présent et au prétérit pour nosotros — seul le contexte tranche.' },
      { type: 'typed', prompt: 'Conjugue SER ou IR au prétérit, 1ʳᵉ personne du singulier (yo). (les deux verbes partagent cette forme)', answers: ['fui'], explanation: 'fui — forme commune à ser et ir au prétérit.' },
      { type: 'mcq', prompt: '« Fui a Madrid » utilise le prétérit de quel verbe ?', options: ['ser', 'ir', 'estar', 'hacer'], answer: 1, explanation: 'Fui a Madrid = je suis allé à Madrid → verbe ir (aller quelque part).' },
      { type: 'typed', prompt: 'Conjugue TENER au prétérit, 1ʳᵉ personne du singulier (yo).', answers: ['tuve'], explanation: 'tuve — verbe irrégulier au prétérit.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Hier, j\'ai parlé avec mon frère. »', answers: ['ayer hablé con mi hermano'], explanation: 'Ayer hablé con mi hermano.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Qu\'as-tu fait le week-end ? » (utilise hacer)', answers: ['qué hiciste el fin de semana'], explanation: '¿Qué hiciste el fin de semana? — hiciste = prétérit de hacer, tú.' },
      { type: 'mcq', prompt: 'Comment dit-on « la semaine dernière » ?', options: ['la semana próxima', 'la semana pasada', 'esta semana', 'la semana que viene'], answer: 1, explanation: 'la semana pasada = la semaine dernière (pasada = passée).' },
      { type: 'typed', prompt: 'Conjugue COMER au prétérit, 3ᵉ personne du pluriel (ellos).', answers: ['comieron'], explanation: 'ellos comieron — terminaison -ieron pour les verbes -ER/-IR réguliers.' },
      { type: 'mcq', prompt: 'ESTAR au prétérit, 3ᵉ personne du singulier (él/ella) se dit :', options: ['estó', 'estuvo', 'está', 'estaba'], answer: 1, explanation: 'estuvo — forme irrégulière du prétérit d\'estar.' },
    ],
  },
  {
    title: 'Le futur, les projets et la météo',
    content_md: `# Leçon 9 — Le futur, les projets et la météo

## Le futur proche : IR A + infinitif

Comme en français avec « aller » + infinitif, l'espagnol utilise
**ir a + infinitif** pour parler d'un futur proche ou d'une intention.
Tu connais déjà la conjugaison d'*ir* (leçon 6) !

- **Voy a viajar a España.** (Je vais voyager en Espagne.)
- **¿Qué vas a hacer esta noche?** (Qu'est-ce que tu vas faire ce soir ?)
- **Vamos a comer a las dos.** (Nous allons manger à deux heures.)
- **Van a llegar tarde.** (Ils vont arriver en retard.)

## Le futur simple

Pour un futur plus général ou plus formel, l'espagnol a aussi un futur
simple — moins utilisé à l'oral courant que *ir a*, mais à reconnaître.
Bonne nouvelle : les terminaisons sont **les mêmes pour les trois
groupes** -ar/-er/-ir, collées directement à l'infinitif.

| | hablar | comer | vivir |
|---|---|---|---|
| yo | hablar**é** | comer**é** | vivir**é** |
| tú | hablar**ás** | comer**ás** | vivir**ás** |
| él/ella/usted | hablar**á** | comer**á** | vivir**á** |
| nosotros | hablar**emos** | comer**emos** | vivir**emos** |
| vosotros | hablar**éis** | comer**éis** | vivir**éis** |
| ellos/ustedes | hablar**án** | comer**án** | vivir**án** |

⚠️ Quelques verbes irréguliers courants au futur simple gardent les mêmes
terminaisons mais changent de radical : **tener → tendré**, **hacer →
haré**, **poder → podré**, **querer → querré**, **decir → diré**.

## Faire des projets

- **¿Qué planes tienes para el verano?** (Quels projets as-tu pour l'été ?)
- **Espero viajar mucho este año.** (J'espère voyager beaucoup cette année.)
- **Algún día quiero visitar Argentina.** (Un jour, je veux visiter l'Argentine.)
- **Mañana empezaré un curso de español.** (Demain, je commencerai un
  cours d'espagnol.)

## Le temps qu'il fait (el tiempo / el clima)

- **Hace sol.** (Il fait soleil.)
- **Hace calor / frío.** (Il fait chaud / froid.)
- **Hace viento.** (Il y a du vent.)
- **Llueve. / Está lloviendo.** (Il pleut. / Il est en train de pleuvoir.)
- **Nieva. / Está nevando.** (Il neige. / Il est en train de neiger.)
- **Está nublado.** (Le temps est nuageux.)
- **¿Qué tiempo hace hoy?** (Quel temps fait-il aujourd'hui ?)

⚠️ Piège : pour parler du temps qu'il fait, l'espagnol utilise souvent le
verbe **hacer** (faire) là où le français utilise « il fait » — logique
similaire en fait ! Mais pour la pluie et la neige, ce sont des verbes à
part entière (**llover**, **nevar**), pas de « faire » : on ne dit jamais
*hace lluvia*.

## Phrases à retenir

- **Este fin de semana voy a descansar.** (Ce week-end, je vais me reposer.)
- **Si hace buen tiempo, iremos a la playa.** (S'il fait beau, nous irons
  à la plage.)
- **El año que viene viviré en Barcelona.** (L'année prochaine, je vivrai
  à Barcelone.)
- **Mañana lloverá por la tarde.** (Demain, il pleuvra l'après-midi.)

👉 Passe au quiz : reviens sur le tableau de bord de cette leçon.`,
    questions: [
      { type: 'typed', prompt: 'Traduis en espagnol avec IR A + infinitif : « Je vais voyager en Espagne. »', answers: ['voy a viajar a españa'], explanation: 'Voy a viajar a España — futur proche avec ir a + infinitif.' },
      { type: 'mcq', prompt: 'Comment se construit le futur proche en espagnol ?', options: ['estar + gérondif', 'ir a + infinitif', 'ir + gérondif', 'haber + participe'], answer: 1, explanation: 'ir a + infinitif, comme le français « aller » + infinitif.' },
      { type: 'typed', prompt: 'Conjugue HABLAR au futur simple, 1ʳᵉ personne du singulier (yo).', answers: ['hablaré'], explanation: 'hablaré — terminaison -é collée à l\'infinitif complet.' },
      { type: 'typed', prompt: 'Conjugue TENER au futur simple, 1ʳᵉ personne du singulier (yo). Radical irrégulier !', answers: ['tendré'], explanation: 'tendré — radical irrégulier tendr-, mais terminaison régulière -é.' },
      { type: 'mcq', prompt: 'Comment dit-on « Il pleut » en espagnol ?', options: ['Hace lluvia', 'Llueve', 'Es lluvia', 'Está lluvia'], answer: 1, explanation: 'Llueve — verbe à part entière (llover), pas de construction avec hacer pour la pluie.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Il fait chaud. »', answers: ['hace calor'], explanation: 'Hace calor — construction avec hacer, comme pour la météo en général (sauf pluie/neige).' },
      { type: 'mcq', prompt: '« ¿Qué planes tienes para el verano? » veut dire :', options: ['Quel temps fait-il en été ?', 'Quels projets as-tu pour l\'été ?', 'Où pars-tu en été ?', 'Combien coûte l\'été ?'], answer: 1, explanation: 'planes = projets, tienes para el verano = as-tu pour l\'été.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Demain, il pleuvra l\'après-midi. »', answers: ['mañana lloverá por la tarde'], explanation: 'Mañana lloverá por la tarde — futur simple de llover.' },
      { type: 'typed', prompt: 'Conjugue PODER au futur simple, 3ᵉ personne du singulier (él/ella).', answers: ['podrá'], explanation: 'podrá — radical irrégulier podr-.' },
      { type: 'mcq', prompt: 'Comment dit-on « Il neige » ?', options: ['Hace nieve', 'Nieva', 'Es nieve', 'Está nieve'], answer: 1, explanation: 'Nieva — verbe nevar, comme llover pour la pluie.' },
    ],
  },
  {
    title: 'Comparatifs, directions et voyage',
    content_md: `# Leçon 10 — Comparatifs, directions et voyage

## Le comparatif

| Construction | Exemple | Traduction |
|---|---|---|
| **más ... que** (plus que) | Madrid es más grande que Sevilla. | Madrid est plus grande que Séville. |
| **menos ... que** (moins que) | Este hotel es menos caro que aquel. | Cet hôtel est moins cher que celui-là. |
| **tan ... como** (aussi que) | Ella es tan alta como su hermano. | Elle est aussi grande que son frère. |
| **tanto/a(s) ... como** (autant que) | Tengo tanto tiempo como tú. | J'ai autant de temps que toi. |

⚠️ Comparatifs irréguliers à connaître : **bueno → mejor** (meilleur, pas
*más bueno*), **malo → peor** (pire), **grande → mayor** (plus grand/âgé),
**pequeño → menor** (plus petit/jeune).

## Le superlatif

- **el/la más ... de** — le/la plus ... de : **Es la ciudad más bonita
  de España.** (C'est la plus belle ville d'Espagne.)
- **-ísimo/a** — un suffixe qui intensifie, comme « très » : **Es
  facilísimo.** (C'est très facile / super facile.)

## Se repérer en ville (orientarse en la ciudad)

- **¿Dónde está la estación?** (Où est la gare ?)
- **¿Cómo se llega a...?** (Comment va-t-on à... ?)
- **Todo recto.** (Tout droit.)
- **Gire/Dobla a la derecha / a la izquierda.** (Tournez/Tourne à droite / à gauche.)
- **Está cerca / lejos.** (C'est près / loin.)
- **Está al lado de / enfrente de / detrás de la iglesia.** (C'est à côté
  de / en face de / derrière l'église.)
- **Coja/Toma la primera calle a la derecha.** (Prenez/Prends la première
  rue à droite.)

## À l'hôtel (en el hotel)

- **Tengo una reserva a nombre de...** (J'ai une réservation au nom de...)
- **¿Tiene una habitación libre?** (Avez-vous une chambre libre ?)
- **Una habitación doble/individual, por favor.** (Une chambre double/
  simple, s'il vous plaît.)
- **¿A qué hora es el desayuno?** (À quelle heure est le petit-déjeuner ?)
- **¿A qué hora hay que dejar la habitación?** (À quelle heure faut-il
  quitter la chambre ?)

## À l'aéroport (en el aeropuerto)

- **¿Dónde está el mostrador de facturación?** (Où est le comptoir
  d'enregistrement ?)
- **Mi vuelo sale a las diez.** (Mon vol part à dix heures.)
- **He perdido mi maleta.** (J'ai perdu ma valise.)
- **¿Dónde recojo el equipaje?** (Où récupère-t-on les bagages ?)

## Phrases à retenir

- **Este restaurante es mejor que el de ayer.** (Ce restaurant est meilleur
  que celui d'hier.)
- **Gire a la izquierda en la próxima calle.** (Tournez à gauche à la
  prochaine rue.)
- **¿Cómo se llega al museo desde aquí?** (Comment va-t-on au musée
  depuis ici ?)
- **Es la playa más bonita que he visto.** (C'est la plus belle plage que
  j'aie vue.)

## Récapitulatif du cours

Avec ces 10 leçons, tu as désormais : la prononciation, les bases de la
conversation, la grammaire essentielle (articles, verbes réguliers/
irréguliers, ser/estar, verbes réfléchis), le passé, le futur, les
comparaisons, et le vocabulaire pour te débrouiller au restaurant, en
ville, à l'hôtel et en voyage. ¡Felicidades, ya tienes un nivel A2-B1!
(Félicitations, tu as maintenant un niveau A2-B1 !)`,
    questions: [
      { type: 'typed', prompt: 'Traduis en espagnol : « Madrid est plus grande que Séville. »', answers: ['madrid es más grande que sevilla'], explanation: 'más ... que = plus ... que.' },
      { type: 'mcq', prompt: 'Comment dit-on « meilleur » en espagnol (comparatif irrégulier de bueno) ?', options: ['más bueno', 'mejor', 'más mejor', 'buenísimo'], answer: 1, explanation: 'mejor est le comparatif irrégulier de bueno — más bueno est incorrect.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Elle est aussi grande que son frère. » (tan ... como)', answers: ['ella es tan alta como su hermano'], explanation: 'tan ... como = aussi ... que.' },
      { type: 'mcq', prompt: '« Es la ciudad más bonita de España » utilise :', options: ['un comparatif', 'un superlatif', 'un diminutif', 'un impératif'], answer: 1, explanation: 'el/la más ... de = superlatif (la plus ... de).' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Tournez à gauche. » (vouvoiement, gire)', answers: ['gire a la izquierda'], explanation: 'Gire a la izquierda — gire est l\'impératif de politesse de girar.' },
      { type: 'mcq', prompt: 'Comment demande-t-on son chemin poliment ?', options: ['¿Cómo se llega a...?', '¿Qué hora es?', '¿Cuánto cuesta?', '¿Cómo te llamas?'], answer: 0, explanation: '¿Cómo se llega a...? = Comment va-t-on à... ?' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Avez-vous une chambre libre ? »', answers: ['tiene una habitación libre'], explanation: '¿Tiene una habitación libre?' },
      { type: 'mcq', prompt: '« Está enfrente de la iglesia » veut dire :', options: ['C\'est derrière l\'église', 'C\'est à côté de l\'église', 'C\'est en face de l\'église', 'C\'est loin de l\'église'], answer: 2, explanation: 'enfrente de = en face de.' },
      { type: 'typed', prompt: 'Traduis en espagnol : « Mon vol part à dix heures. »', answers: ['mi vuelo sale a las diez'], explanation: 'Mi vuelo sale a las diez.' },
      { type: 'mcq', prompt: 'Quel est le comparatif irrégulier de « pequeño » (petit) ?', options: ['más pequeño', 'menor', 'peor', 'pequeñísimo'], answer: 1, explanation: 'menor = plus petit/plus jeune, comparatif irrégulier.' },
    ],
  },
];

module.exports = { LESSONS };
