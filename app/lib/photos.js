import fs from "node:fs";
import path from "node:path";

/*
  Emplacements photo du site.

  Deux sources possibles pour chaque emplacement :

  1. un fichier déposé dans public/photos/ — prioritaire ;
  2. à défaut, une image libre de Wikimedia Commons (ci-dessous).

  Déposer un fichier du bon nom remplace donc automatiquement l'image
  distante, sans toucher au code. Si ni l'un ni l'autre n'existe, la section
  se met en page sans photo plutôt que d'afficher un cadre vide.
*/

const DOSSIER = path.join(process.cwd(), "public", "photos");
const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];

export const EMPLACEMENTS = {
  gammarth: "Le lieu — à côté du texte",
  seminaire: "Le lieu — bande en bas de section",
  routes: "Au programme — bande en bas de section",
};

/*
  Images de repli, toutes sur Wikimedia Commons et sous licence libre.
  On pointe la miniature 1280 px et non l'original : Wikimedia le demande
  explicitement, et l'original pèse 5 à 7 Mo.

  ATTENTION — ces licences imposent de créditer l'auteur. Le crédit est
  affiché sous chaque image ; ne le retirez pas sans remplacer l'image.
*/
const COMMONS = "https://upload.wikimedia.org/wikipedia/commons/thumb";

export const DISTANTES = {
  gammarth: {
    url: `${COMMONS}/7/74/Vue_plage_Gammarth_Tunis.jpg/1280px-Vue_plage_Gammarth_Tunis.jpg`,
    alt: "La plage de Gammarth, sur le littoral nord de Tunis",
    auteur: "Manel makdoly",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:Vue_plage_Gammarth_Tunis.jpg",
  },
  /*
    L'emplacement `seminaire` n'a plus d'image distante : il attend une photo
    de l'ATR. Déposez `seminaire.jpg` dans public/photos/ pour le remplir —
    d'ici là, la section se met en page sans cette bande.
  */
  routes: {
    url: `${COMMONS}/c/c3/Rad%C3%A8s-La_Goulette_Bridge.jpg/1280px-Rad%C3%A8s-La_Goulette_Bridge.jpg`,
    alt: "Le pont de Radès–La Goulette, ouvrage emblématique du réseau tunisien",
    auteur: "DrFO.Jr.Tn",
    licence: "CC BY 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:Rad%C3%A8s-La_Goulette_Bridge.jpg",
  },
};

/*
  Vidéos d'ambiance. Une vidéo l'emporte sur l'image du même emplacement.
  Pour la remplacer, déposez un fichier `<nom>.mp4` dans public/photos/ :
  il prendra le dessus sans toucher au code.
*/
const EXTENSIONS_VIDEO = ["mp4", "webm"];

export const VIDEOS = {
  routes: {
    src: "/Drone_shot_over_highways_bridges_202608030554.mp4",
    poster: "/video-routes-poster.jpg",
  },
};

/** Fichier déposé localement, s'il existe. */
function fichierLocal(nom) {
  for (const ext of EXTENSIONS) {
    const fichier = `${nom}.${ext}`;
    if (fs.existsSync(path.join(DOSSIER, fichier))) {
      return `/photos/${fichier}`;
    }
  }
  return null;
}

/**
 * Renvoie l'image d'un emplacement, ou null s'il n'y en a aucune.
 * Un fichier local l'emporte sur l'image distante, et n'exige aucun crédit.
 */
export function image(nom) {
  const local = fichierLocal(nom);
  if (local) {
    return { src: local, alt: null, credit: null };
  }

  const distante = DISTANTES[nom];
  if (!distante) return null;

  return {
    src: distante.url,
    alt: distante.alt,
    credit: {
      auteur: distante.auteur,
      licence: distante.licence,
      licenceUrl: distante.licenceUrl,
      source: distante.source,
    },
  };
}

/**
 * Renvoie la vidéo d'un emplacement, ou null. Un fichier déposé dans
 * public/photos/ l'emporte sur la vidéo par défaut.
 */
export function video(nom) {
  for (const ext of EXTENSIONS_VIDEO) {
    const fichier = `${nom}.${ext}`;
    if (fs.existsSync(path.join(DOSSIER, fichier))) {
      const affiche = fichierLocal(`${nom}-poster`);
      return { src: `/photos/${fichier}`, poster: affiche };
    }
  }

  return VIDEOS[nom] || null;
}
