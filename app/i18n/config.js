/*
  Les trois langues du site. Le code sert de segment d'URL (/fr, /en, /ar),
  `dir` bascule la mise en page en arabe, et `htmlLang` alimente l'attribut
  lang pour les lecteurs d'écran et le référencement.
*/

export const LOCALES = [
  { code: "fr", nom: "Français", court: "FR", dir: "ltr", htmlLang: "fr" },
  { code: "en", nom: "English", court: "EN", dir: "ltr", htmlLang: "en" },
  { code: "ar", nom: "العربية", court: "AR", dir: "rtl", htmlLang: "ar" },
];

export const LOCALE_DEFAUT = "fr";

export const CODES = LOCALES.map((l) => l.code);

export function estLocale(code) {
  return CODES.includes(code);
}

export function infosLocale(code) {
  return LOCALES.find((l) => l.code === code) || LOCALES[0];
}
