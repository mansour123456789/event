import fr from "./fr";
import en from "./en";
import ar from "./ar";
import { LOCALE_DEFAUT, estLocale } from "./config";

const DICTIONNAIRES = { fr, en, ar };

/** Textes d'une locale. Retombe sur le français si le code est inconnu. */
export function dico(code) {
  return DICTIONNAIRES[estLocale(code) ? code : LOCALE_DEFAUT];
}

export * from "./config";
