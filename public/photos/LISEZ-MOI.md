# Déposez vos photos ici

Nommez le fichier exactement comme indiqué, puis relancez le serveur.
Aucune modification de code n'est nécessaire : la page détecte le fichier
et l'affiche. Tant qu'un fichier est absent, la section concernée se met
en page sans photo — jamais de cadre vide ni d'image floue.

Extensions acceptées : `.jpg` `.jpeg` `.png` `.webp` `.avif`

| Nom du fichier  | Où il apparaît                        | Cadrage conseillé      | Taille minimale |
| --------------- | ------------------------------------- | ---------------------- | --------------- |
| `gammarth`      | « Le lieu », à côté du texte           | portrait (3:4 environ) | 900 × 1200 px   |
| `seminaire`     | « Le lieu », bande en bas de section   | paysage large (16:7)   | 1800 × 790 px   |
| `routes`        | « Au programme », bande en bas         | paysage (3:1,2)        | 1500 × 600 px   |

## Quoi photographier

- **gammarth** — le littoral de Gammarth, l'Hôtel El Mouradi, ou la baie.
  C'est l'image qui donne envie de venir : privilégiez la lumière de fin
  de journée et un cadrage vertical.
- **seminaire** — l'ambiance d'un séminaire : salle en séance, plénière,
  stands d'exposition, échanges entre participants. Une édition précédente
  de l'ATR conviendrait parfaitement.
- **routes** — un ouvrage routier tunisien emblématique, en lien avec la
  visite technique : pont, échangeur, autoroute côtière.

## Points d'attention

- **Droits.** N'utilisez que des photos dont l'ATR détient les droits, ou
  libres de droits. Si des personnes sont reconnaissables sur la photo du
  séminaire, assurez-vous d'avoir leur autorisation.
- **Poids.** Inutile de compresser avant : Next.js redimensionne et
  convertit en WebP automatiquement. Déposez la meilleure qualité dont
  vous disposez.
- **Après dépôt.** En développement, il suffit de recharger la page. En
  production, relancez `npm run build`.
