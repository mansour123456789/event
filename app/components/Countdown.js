"use client";

import { useEffect, useState } from "react";

const CIBLE = new Date("2026-12-09T09:00:00+01:00").getTime();

function restant() {
  const diff = Math.max(0, CIBLE - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    jours: Math.floor(s / 86400),
    heures: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    secondes: s % 60,
  };
}

export default function Countdown({ t }) {
  // null au premier rendu : le serveur et le client affichent la même chose.
  const [temps, setTemps] = useState(null);

  useEffect(() => {
    setTemps(restant());
    const id = setInterval(() => setTemps(restant()), 1000);
    return () => clearInterval(id);
  }, []);

  const unites = [
    { cle: "jours", label: t.jours },
    { cle: "heures", label: t.heures },
    { cle: "minutes", label: t.minutes },
    { cle: "secondes", label: t.secondes },
  ];

  return (
    <div className="countdown" aria-label={t.label}>
      {unites.map((u) => (
        <div className="countdown__cell" key={u.cle}>
          <strong>
            {temps === null ? "--" : String(temps[u.cle]).padStart(2, "0")}
          </strong>
          <span>{u.label}</span>
        </div>
      ))}
    </div>
  );
}
