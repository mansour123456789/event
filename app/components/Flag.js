/*
  Drapeaux tracés en vectoriel : nets à toute taille, aucune requête réseau.
  Chaque drapeau garde ses proportions officielles (2:3 pour la Tunisie et
  la France, 1:2 pour le Royaume-Uni) ; le sélecteur les aligne sur une
  hauteur commune.
*/

const ROUGE_TN = "#e70013";

/* Étoile à cinq branches, pointe en haut, dans l'ouverture du croissant. */
const ETOILE = [
  [520, 242],
  [533.4, 281.6],
  [575.2, 282.1],
  [541.7, 307.0],
  [554.1, 346.9],
  [520, 322.8],
  [485.9, 346.9],
  [498.3, 307.0],
  [464.8, 282.1],
  [506.6, 281.6],
]
  .map((p) => p.join(","))
  .join(" ");

function attrs(title) {
  return {
    role: title ? "img" : "presentation",
    "aria-label": title || undefined,
    "aria-hidden": title ? undefined : "true",
  };
}

/** Drapeau de la Tunisie. */
export default function TunisiaFlag({ title, ...props }) {
  return (
    <svg viewBox="0 0 900 600" {...attrs(title)} {...props}>
      {title && <title>{title}</title>}
      <rect width="900" height="600" fill={ROUGE_TN} />
      <circle cx="450" cy="300" r="200" fill="#fff" />
      <circle cx="450" cy="300" r="155" fill={ROUGE_TN} />
      <circle cx="485" cy="300" r="125" fill="#fff" />
      <polygon points={ETOILE} fill={ROUGE_TN} />
    </svg>
  );
}

/** Drapeau de la France : trois bandes verticales égales. */
export function FranceFlag({ title, ...props }) {
  return (
    <svg viewBox="0 0 900 600" {...attrs(title)} {...props}>
      {title && <title>{title}</title>}
      <rect width="300" height="600" fill="#002395" />
      <rect x="300" width="300" height="600" fill="#fff" />
      <rect x="600" width="300" height="600" fill="#ed2939" />
    </svg>
  );
}

/*
  Union Jack, construction canonique : fond bleu, diagonales blanches, puis
  les diagonales rouges détourées quartier par quartier (c'est ce décalage
  qui donne au drapeau son asymétrie caractéristique), enfin la croix de
  saint Georges.
*/
export function UKFlag({ title, ...props }) {
  return (
    <svg viewBox="0 0 60 30" {...attrs(title)} {...props}>
      {title && <title>{title}</title>}
      <clipPath id="uk-quartiers">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>

      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#uk-quartiers)"
        stroke="#c8102e"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

/** Le drapeau qui représente une locale dans le sélecteur. */
export function DrapeauLocale({ code, ...props }) {
  if (code === "fr") return <FranceFlag {...props} />;
  if (code === "en") return <UKFlag {...props} />;
  return <TunisiaFlag {...props} />;
}
