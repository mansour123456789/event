"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconArrow } from "./icons";
import LanguePicker from "./LanguePicker";

const SECTIONS = ["seminaire", "approche", "programme", "lieu", "infos"];

export default function Header({ locale, t }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(null);
  const sentinel = useRef(null);

  const nav = SECTIONS.map((id) => ({ id, label: t.nav[id] }));

  /* L'en-tête devient opaque dès qu'on quitte le haut de page. Un repère
     observé coûte moins cher qu'un écouteur de défilement. */
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setPinned(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Section courante, pour situer le visiteur dans une page unique. */
  useEffect(() => {
    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* En haut de page, aucune section n'est encore atteinte. */
  useEffect(() => {
    if (!pinned) setActive(null);
  }, [pinned]);

  /* Le menu plein écran fige la page derrière lui. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div ref={sentinel} className="header__sentinel" aria-hidden="true" />

      <header className={`header${pinned ? " header--pinned" : ""}`}>
        <div className="header__inner">
          <a className="header__brand" href="#top">
            <span className="header__plate">
              <Image
                src="/logo-atr.png"
                alt={t.marque.atr}
                width={124}
                height={124}
                priority
              />
            </span>
            <span className="header__brand-text">
              <strong>{t.marque.titre}</strong>
              <span>{t.marque.sous}</span>
            </span>
          </a>

          <nav className="header__nav" aria-label={t.nav.sections}>
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : undefined}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <LanguePicker locale={locale} libelle={t.nav.langue} />

          <a className="btn btn--gold btn--sm header__cta" href="#reserver">
            {t.nav.reserver}
          </a>

          <button
            className="header__burger"
            type="button"
            aria-label={open ? t.nav.fermer : t.nav.ouvrir}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>

        <span className="header__progress" aria-hidden="true" />
      </header>

      <div className={`sheet${open ? " sheet--open" : ""}`} hidden={!open}>
        <nav className="sheet__nav" aria-label={t.nav.menu}>
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sheet__foot">
          <LanguePicker locale={locale} libelle={t.nav.langue} compact />

          <a className="btn btn--gold" href="#reserver" onClick={() => setOpen(false)}>
            {t.nav.reserver} <IconArrow />
          </a>
          <p>{t.pied.quand}</p>
        </div>
      </div>
    </>
  );
}
