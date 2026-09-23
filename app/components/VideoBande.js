"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconMute, IconPause, IconPlay, IconSound } from "./icons";

/*
  Bande vidéo d'ambiance, avec deux commandes : lecture/pause et son.

  Quatre précautions :

  1. `muted` est posé par le code, pas seulement en attribut : sans cela,
     certains navigateurs refusent la lecture automatique.
  2. Si le visiteur a demandé moins de mouvement, la vidéo ne démarre pas —
     l'image d'attente s'affiche, à lui d'appuyer sur lecture.
  3. Hors écran, la lecture se met en pause : inutile de consommer batterie
     et processeur pour une vidéo que personne ne regarde. Elle ne reprend
     que si le visiteur n'a pas demandé la pause lui-même.
  4. L'état des boutons suit les événements de la vidéo, pas seulement les
     clics : il reste juste même si la lecture est interrompue autrement.
*/

export default function VideoBande({
  src,
  poster,
  titre,
  libelles,
  children,
  className = "",
}) {
  const ref = useRef(null);
  const [mouvementRefuse, setMouvementRefuse] = useState(false);
  const [enLecture, setEnLecture] = useState(false);
  const [sonCoupe, setSonCoupe] = useState(true);
  /* Intention du visiteur : une pause demandée ne doit pas être défaite par
     le défilement. */
  const souhaiteLecture = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const appliquer = () => {
      setMouvementRefuse(mq.matches);
      souhaiteLecture.current = !mq.matches;
    };
    appliquer();
    mq.addEventListener("change", appliquer);

    /* La propriété, pas seulement l'attribut : c'est elle que lit le
       navigateur pour autoriser la lecture automatique. */
    el.muted = true;

    const surLecture = () => setEnLecture(true);
    const surPause = () => setEnLecture(false);
    const surVolume = () => setSonCoupe(el.muted);

    el.addEventListener("play", surLecture);
    el.addEventListener("pause", surPause);
    el.addEventListener("volumechange", surVolume);

    return () => {
      mq.removeEventListener("change", appliquer);
      el.removeEventListener("play", surLecture);
      el.removeEventListener("pause", surPause);
      el.removeEventListener("volumechange", surVolume);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          if (souhaiteLecture.current) {
            /* la promesse peut être rejetée si le navigateur refuse :
               sans conséquence, l'image d'attente reste affichée */
            el.play().catch(() => {});
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mouvementRefuse]);

  const basculerLecture = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      souhaiteLecture.current = true;
      el.play().catch(() => {});
    } else {
      souhaiteLecture.current = false;
      el.pause();
    }
  }, []);

  const basculerSon = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    /* Activer le son sur une vidéo en pause : on la relance, sinon le geste
       reste sans effet audible. */
    if (!el.muted && el.paused) {
      souhaiteLecture.current = true;
      el.play().catch(() => {});
    }
  }, []);

  return (
    <figure className={`bande bande--video ${className}`.trim()}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={titre}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="videoCmd">
        <button
          type="button"
          className="videoCmd__btn"
          onClick={basculerLecture}
          aria-label={enLecture ? libelles.pause : libelles.lire}
          title={enLecture ? libelles.pause : libelles.lire}
        >
          {enLecture ? <IconPause /> : <IconPlay />}
        </button>

        <button
          type="button"
          className="videoCmd__btn"
          onClick={basculerSon}
          aria-label={sonCoupe ? libelles.activerSon : libelles.couperSon}
          title={sonCoupe ? libelles.activerSon : libelles.couperSon}
          aria-pressed={!sonCoupe}
        >
          {sonCoupe ? <IconMute /> : <IconSound />}
        </button>
      </div>

      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}
