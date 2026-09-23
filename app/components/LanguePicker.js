"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES } from "../i18n/config";
import { DrapeauLocale } from "./Flag";

/*
  Sélecteur de langue.

  Chaque langue est un vrai lien vers /fr, /en ou /ar : la page est rendue
  côté serveur dans la bonne langue, l'URL est partageable, et il n'y a
  aucun clignotement au chargement. Le menu déroulant n'est là que pour le
  confort — sans JavaScript, les liens restent atteignables.
*/

export default function LanguePicker({ locale, libelle, compact = false }) {
  const [ouvert, setOuvert] = useState(false);
  const boite = useRef(null);
  const courante = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  useEffect(() => {
    if (!ouvert) return undefined;

    const auClic = (e) => {
      if (boite.current && !boite.current.contains(e.target)) setOuvert(false);
    };
    const auClavier = (e) => e.key === "Escape" && setOuvert(false);

    document.addEventListener("mousedown", auClic);
    window.addEventListener("keydown", auClavier);
    return () => {
      document.removeEventListener("mousedown", auClic);
      window.removeEventListener("keydown", auClavier);
    };
  }, [ouvert]);

  if (compact) {
    return (
      <div className="langues langues--liste">
        <p className="langues__titre">{libelle}</p>
        <div className="langues__rangee">
          {LOCALES.map((l) => (
            <a
              key={l.code}
              className={`langues__choix${l.code === locale ? " is-on" : ""}`}
              href={`/${l.code}`}
              lang={l.htmlLang}
              hrefLang={l.htmlLang}
              aria-current={l.code === locale ? "true" : undefined}
            >
              <DrapeauLocale code={l.code} className="langues__drapeau" />
              {l.nom}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="langues" ref={boite}>
      <button
        type="button"
        className="langues__bouton"
        aria-expanded={ouvert}
        aria-haspopup="true"
        aria-label={libelle}
        onClick={() => setOuvert((v) => !v)}
      >
        <DrapeauLocale code={courante.code} className="langues__drapeau" />
        <span>{courante.court}</span>
        <svg className="langues__chevron" viewBox="0 0 12 8" aria-hidden="true">
          <path
            d="M1 1.5 L6 6.5 L11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {ouvert && (
        <div className="langues__menu" role="menu">
          {LOCALES.map((l) => (
            <a
              key={l.code}
              role="menuitem"
              className={`langues__choix${l.code === locale ? " is-on" : ""}`}
              href={`/${l.code}`}
              lang={l.htmlLang}
              hrefLang={l.htmlLang}
              aria-current={l.code === locale ? "true" : undefined}
              onClick={() => setOuvert(false)}
            >
              <DrapeauLocale code={l.code} className="langues__drapeau" />
              {l.nom}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
