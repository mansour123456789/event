# Séminaire International ATR × PIARC 2026

Landing page (une seule page) pour le séminaire **« Concevoir et gérer les routes selon
l'approche du Système Sûr »** — 9 au 11 décembre 2026, Hôtel El Mouradi, Gammarth, Tunis.

Le contenu est repris de l'affiche officielle (*First Announcement*) et la charte
graphique suit celle du site de l'ATR.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:5500
```

```bash
npm run build && npm start   # build de production
```

> Le port 5500 est utilisé par défaut (le 8080 est bloqué sur la machine de dev).

## Langues

Le site existe en **français, anglais et arabe**, chaque langue servie par sa
propre URL : `/fr`, `/en`, `/ar`. La racine `/` redirige vers le français.

C'est du **routage par locale**, pas un sélecteur côté client : la page est
rendue par le serveur dans la bonne langue, l'URL est partageable, chaque
version est indexable, et il n'y a aucun clignotement de langue au
chargement. Les trois versions sont prégénérées en statique à la
compilation.

Pour ajouter ou corriger un texte, tout se trouve dans `app/i18n/` :
`fr.js` sert de référence, `en.js` et `ar.js` en reprennent la structure à
l'identique. Aucun texte n'est écrit en dur dans les composants.

### L'arabe

- **Mise en page retournée.** Le CSS est passé en **propriétés logiques**
  (`border-inline-start`, `padding-inline`, …) : la page se mire d'elle-même
  quand `dir="rtl"`. Seules trois choses restent à retourner à la main, et
  le sont dans le bloc `rtl` de `globals.css` : l'origine des
  transformations, le sens du volet de « peinture », et les flèches.
- **Police.** DM Sans et Inter ne couvrent pas l'arabe : **Cairo** prend le
  relais, chargé uniquement pour cette langue.
- **Interlignage.** L'arabe porte des hampes plus hautes que le latin. Le
  fond doré du titre mordait sur la ligne au-dessus ; l'interlignage des
  titres arabes est porté à 1,5.
- **Capitales et interlettrage** sont neutralisés : l'arabe est une écriture
  liée, sans majuscules.

> **À faire relire.** Les traductions anglaise et arabe sont de bonne tenue
> mais n'ont pas été relues par un locuteur natif. Pour un site
> institutionnel, faites-les valider avant mise en ligne — en particulier la
> terminologie technique arabe du Système Sûr.

## Structure

```
app/
  [locale]/
    layout.js            lang, dir, polices, métadonnées par langue
    page.js              la landing page complète
  i18n/
    config.js            les trois locales et leur sens d'écriture
    fr.js en.js ar.js    tous les textes
  globals.css            tokens de design + tous les styles
  components/
    Header.js            en-tête fixe, section active, menu plein écran
    LanguePicker.js      sélecteur de langue avec drapeaux
    Reservation.js       réservation en 4 étapes avec créneaux
    Countdown.js         compte à rebours jusqu'au 9 déc. 2026
    Flag.js              drapeaux Tunisie / France / Royaume-Uni, en vectoriel
    icons.js             icônes SVG inline
  lib/
    photos.js            emplacements photo, locaux ou distants
public/
  logo-atr.png           logo de l'association, fond détouré
  logo-piarc.png         logo de l'Association mondiale de la Route
  logo-mehat.png         logo du Ministère de l'Équipement et de l'Habitat
  affiche-seminaire.jpg  affiche officielle du séminaire
  hero-road.jpg          bande routière du héros, découpée dans l'affiche
  skyline-tunis.jpg      monuments tunisiens au trait, découpés dans l'affiche
  road-coast.jpg         autoroute côtière, découpée dans l'affiche
```

## Visuels de l'association

Le logo fourni était un JPEG sur fond blanc, ce qui obligeait à l'enfermer
dans une boîte blanche partout. Il a été **détourné** (blanc → transparence,
`public/logo-atr.png`) : il se pose maintenant sur n'importe quel fond sans
carré blanc autour. L'original reste à la racine du projet.

Une réserve claire subsiste volontairement derrière le logo dans le héros :
le bleu du logo (`#105090`) est trop proche du bleu nuit du fond pour se
détacher seul. Cette réserve en fait un cartouche d'événement assumé, et non
un accident.

## Emplacements photo

Trois emplacements attendent vos photos. **Déposer un fichier du bon nom dans
`public/photos/` suffit** — aucune modification de code. Voir le LISEZ-MOI
qui s'y trouve pour les noms, cadrages et tailles.

| Fichier     | Emplacement                          | Cadrage  |
| ----------- | ------------------------------------ | -------- |
| `gammarth`  | Le lieu, à côté du texte             | portrait |
| `seminaire` | Le lieu, bande en bas de section     | 16:7     |
| `routes`    | Au programme, bande en bas           | paysage  |

`app/lib/photos.js` gère deux sources par emplacement, dans cet ordre :

1. **un fichier déposé** dans `public/photos/` — prioritaire, sans crédit ;
2. **à défaut, une image libre de Wikimedia Commons** (voir ci-dessous).

Déposer un fichier remplace donc l'image distante automatiquement. Si ni
l'un ni l'autre n'existe, la section se met en page **sans photo** plutôt
que d'afficher un cadre vide.

### Vidéo

L'emplacement `routes` (bas de la section « Au programme ») affiche une
**vidéo de drone** au lieu d'une photo :
`public/Drone_shot_over_highways_bridges_202608030554.mp4`, avec
`video-routes-poster.jpg` en image d'attente. Une vidéo l'emporte toujours
sur la photo du même emplacement.

Deux commandes sont posées en haut de la vidéo — **lecture/pause** et
**son** — du côté opposé au sens de lecture, pour ne jamais recouvrir la
légende. Elles passent donc à gauche en arabe.

`components/VideoBande.js` prend quatre précautions :

- `muted` est posé **par le code**, pas seulement en attribut — sans cela
  certains navigateurs refusent la lecture automatique ;
- si le visiteur a demandé **moins de mouvement**, la vidéo ne démarre pas :
  l'image d'attente s'affiche, à lui d'appuyer sur lecture ;
- **hors écran, la lecture se met en pause** — inutile de consommer batterie
  et processeur pour une vidéo que personne ne regarde. Elle ne reprend que
  si le visiteur n'a pas demandé la pause lui-même ;
- l'état des boutons suit les **événements de la vidéo**, pas seulement les
  clics : il reste juste même si la lecture est interrompue autrement.

Activer le son sur une vidéo en pause la relance — sinon le geste resterait
sans effet audible.

Pour la remplacer, déposez `routes.mp4` dans `public/photos/` : il prend le
dessus sans toucher au code. Le chemin par défaut est dans la table `VIDEOS`
de `app/lib/photos.js`.

### Images distantes actuelles

| Emplacement | Image | Auteur | Licence |
| ----------- | ----- | ------ | ------- |
| `gammarth`  | La plage de Gammarth | Manel makdoly | CC BY-SA 4.0 |
| `seminaire` | L'Hôtel El Mouradi Gammarth | Sami Mlouhi | CC BY-SA 4.0 |
| `routes`    | Le pont de Radès–La Goulette | DrFO.Jr.Tn | CC BY 3.0 |

Ce sont de **vraies photos des lieux concernés**, pas des images génériques :
la baie de Gammarth, l'hôtel qui accueille le séminaire, et le pont dessiné
sur l'affiche elle-même.

> **Le crédit est une obligation légale.** Ces licences imposent de citer
> l'auteur. Le crédit s'affiche sous chaque image et disparaît de lui-même
> dès qu'une photo de l'ATR la remplace. Ne le retirez pas sans retirer
> l'image.

Deux précisions techniques :

- On pointe la **miniature 1280 px**, pas l'original : Wikimedia le demande
  explicitement (les originaux pèsent 5 à 7 Mo et sont soumis à une limite
  de débit).
- `next.config.mjs` autorise `upload.wikimedia.org`. Next récupère l'image
  côté serveur, la convertit en WebP et la met en cache : le visiteur la
  reçoit depuis ce site, et Wikimedia n'est sollicité qu'une fois par image.

## Logos des partenaires

Les logos **PIARC** et **MEHAT** sont découpés dans la rangée de logos en
haut de l'affiche officielle, puis détourés comme celui de l'ATR. Cette
source garantit des versions conformes, sans aller chercher des fichiers
d'origine incertaine sur le web.

Ils servent à deux endroits :

- dans le **héros**, les trois marques partagent un seul cartouche blanc
  (PIARC, MEHAT, ATR) suivi du drapeau ;
- dans la section **partenaires**, chaque logo ouvre sa colonne, à hauteur
  commune et largeur libre pour respecter les proportions de chaque marque.
  PIARC et MEHAT renvoient vers leurs sites.

> **Limite de la source.** Découpés dans une affiche de 595 × 842, ces logos
> font une centaine de pixels de large à l'origine. Ils tiennent aux tailles
> employées ici, mais le petit texte du logo du Ministère reste flou si on
> l'agrandit. Pour une version imprimable, demander les fichiers vectoriels
> aux deux partenaires.

Le **drapeau de la Tunisie** (`components/Flag.js`) est tracé en vectoriel —
champ rouge, disque blanc, croissant et étoile à cinq branches. Il sert deux
fois : en petit à côté du logo, et en grand dans le fond du héros, en
`mix-blend-mode: soft-light` sous un masque radial centré sur le croissant,
pour teinter la photo sans aplat rouge ni bord de rectangle.

## Charte graphique

Les tokens sont définis dans `:root` (`app/globals.css`) :

| Token           | Valeur    | Usage                              |
| --------------- | --------- | ---------------------------------- |
| `--blue`        | `#10529a` | bleu du logo, liens et accents     |
| `--navy`        | `#102b4e` | fonds sombres, titres              |
| `--navy-deep`   | `#0f2a4a` | pied de page                       |
| `--navy-night`  | `#0a1c33` | dégradé sur la photo du héros      |
| `--gold`        | `#c07b1b` | accents, boutons, sur-titres       |
| `--gold-line`   | `#e3a441` | ligne de rive du héros             |
| `--light`       | `#f3f6f9` | sections alternées                 |
| `--radius`      | `3px`     | angles (quasi droits)              |

Titres en **DM Sans 700** avec interlettrage négatif, textes courants en **Inter**.

## Animation

Un seul vocabulaire gestuel, cohérent d'un bout à l'autre : **la page se peint
de gauche à droite**, comme un marquage routier qu'on trace.

- au chargement du héros : le titre s'ouvre, la ligne de rive suit ;
- à l'arrivée de chaque section : le titre se dévoile du même geste (`reveal`),
  les listes et colonnes montent en cascade (`rise`) ;
- au survol : le filet doré se trace sous une colonne ou une ligne d'index ;
- la coupe 3D s'éclate, la photo du lieu dérive en léger travelling.

Tout cela passe par les **animations pilotées par le défilement**
(`animation-timeline: view()` et `scroll()`) : aucun écouteur JavaScript, rien
ne tourne hors écran, et c'est le visiteur qui mène. Tout est doublement gardé
par `@supports` et `prefers-reduced-motion`, et l'état par défaut est l'état
final — vérifié : en annulant toutes les animations, les 26 éléments concernés
restent visibles.

## Le héros

`public/hero-road.jpg` couvre tout le héros en image de fond. Il est découpé
dans l'affiche elle-même (les quatre vues de routes) puis remis à l'échelle :
2048 × 788, soit quasiment la résolution native au cadrage du héros, l'affiche
source ne faisant que 595 × 842.

Le texte tient sur un **double voile** : un dégradé horizontal qui garde le
bleu nuit à gauche et laisse la route apparaître à droite, plus un dégradé
vertical pour la profondeur. En portrait, le voile bascule à la verticale
puisque le texte occupe toute la largeur.

Une **ligne de rive** dorée sépare le bloc de titre des chiffres clés ; elle se
trace au chargement puis poursuit sa course en boucle lente (`laneTravel`).

## Sections

1. **Hero** — titre de l'affiche sur bande routière, chiffres clés sur la chaussée
2. **Bandeau** — première annonce
3. **Le séminaire** — expertise mondiale / ancrage tunisien / transfert de pratiques
4. **Système Sûr** — les quatre couches de protection, en coupe 3D
5. **Au programme** — les 5 formats repris de l'affiche
6. **Le lieu** — Gammarth, avec les monuments tunisiens au trait
7. **Infos pratiques** — dates, lieu, organisateurs, langues + affiche officielle
8. **Partenaires** — ATR, PIARC, MEHAT
9. **Réserver** — compte à rebours + réservation en 4 étapes
10. **Pied de page**

## La coupe 3D

La défense en profondeur est un concept littéralement stratifié : la section
Système Sûr la dessine comme les ingénieurs dessinent une structure de
chaussée, en **vue éclatée**. Quatre dalles (routes, vitesses, véhicules,
secours) empilées en perspective isométrique ; la dalle de surface porte le
même marquage doré que le héros.

C'est du **CSS 3D** (`transform-style: preserve-3d`), pas de WebGL : chaque
dalle est un élément dont `::before` et `::after` forment les deux faces
visibles, extrudées vers le bas. Le résultat reste net à toute résolution et
n'ajoute rien au bundle — la page pèse toujours 109 kB.

Les dalles s'écartent à mesure que la section entre dans l'écran
(`animation-timeline: view()`), sous double garde : `@supports` et
`prefers-reduced-motion`. L'état par défaut est l'état éclaté, donc un
navigateur sans scroll-timeline, ou un visiteur qui refuse le mouvement, voit
la coupe complète et immobile.

Survoler une couche de la légende la désigne dans la coupe, via `:has()` —
aucun JavaScript. La coupe est `aria-hidden` : c'est la légende qui porte le
contenu.

## Parti pris de mise en page

Pas d'encadrés. L'information est séparée par du blanc et des filets, comme
dans un document technique, plutôt que découpée en cartes identiques. Les
titres portent l'identité des sections — il n'y a pas de sur-titre.

## Réservation

`components/Reservation.js` conduit une réservation en quatre étapes :
journées → créneau de visite technique → coordonnées → récapitulatif. Le
récapitulatif se met à jour en direct dans la colonne de droite, et chaque
étape est validée avant de passer à la suivante.

La visite technique n'a lieu que le vendredi 11 : si cette journée n'est pas
retenue, les deux créneaux se désactivent et un encart propose de l'ajouter en
un clic.

**Il n'y a pas de back-end.** À l'envoi, la demande est mise en forme et
ouverte dans la messagerie du visiteur, à destination de `contact@atr.org.tn` ;
le récapitulatif reste affiché pour être copié si la messagerie ne s'ouvre pas.
Deux choses à brancher sur le système de l'ATR :

- les **capacités des créneaux** (`CRENEAUX`, en haut du fichier) sont des
  valeurs d'attente — `40 places` — à remplacer par les disponibilités réelles ;
- l'envoi devrait passer par un point d'entrée serveur plutôt que par `mailto`,
  pour enregistrer la réservation et envoyer une confirmation.

## Navigation

L'en-tête est fixe et transparent au-dessus du héros, puis devient opaque au
défilement — un repère observé en haut de page, pas un écouteur de défilement.
Le lien de la section en cours est souligné d'or (`IntersectionObserver`), et
le fil doré sous la barre suit la progression dans la page en CSS pur
(`animation-timeline: scroll()`). Sur mobile, le menu s'ouvre en pleine page.

## À compléter

Les coordonnées (`+216 71 234 567`, `contact@atr.org.tn`, adresse) et les liens
« Mentions légales » / « Politique de confidentialité » sont des valeurs de
remplacement reprises du site ATR — à remplacer par les informations réelles du
séminaire.
