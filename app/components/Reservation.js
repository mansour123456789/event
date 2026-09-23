"use client";

import { useMemo, useState } from "react";
import { IconArrow } from "./icons";

/* ------------------------------------------------------------------------
   DONNÉES À BRANCHER

   Les journées viennent de l'affiche. Les capacités ci-dessous sont des
   valeurs d'attente : à remplacer par les disponibilités réelles servies
   par le back-office de l'ATR. Les libellés, eux, viennent des
   dictionnaires de langue.
   ---------------------------------------------------------------------- */

const CAPACITES = { matin: 40, apresmidi: 40, aucun: null };

const VIDE = {
  prenom: "",
  nom: "",
  email: "",
  organisation: "",
  fonction: "",
  profil: "",
};

export default function Reservation({ t }) {
  const [etape, setEtape] = useState(0);
  const [jours, setJours] = useState([]);
  const [creneau, setCreneau] = useState("");
  const [form, setForm] = useState({ ...VIDE, profil: t.profils[0] });
  const [erreurs, setErreurs] = useState({});
  const [envoye, setEnvoye] = useState(false);

  const visiteRetenue = jours.includes("j11");

  const recap = useMemo(() => {
    const joursChoisis = t.journees.filter((j) => jours.includes(j.id));
    const c = t.creneaux.find((x) => x.id === creneau);
    return { joursChoisis, creneau: c };
  }, [jours, creneau, t]);

  const resume = useMemo(() => {
    const c = t.courriel;
    const lignes = [
      c.entete,
      c.lieu,
      "",
      `${c.nom} : ${form.prenom} ${form.nom}`.trim(),
      `${c.email} : ${form.email}`,
      `${c.organisation} : ${form.organisation}`,
      form.fonction ? `${c.fonction} : ${form.fonction}` : null,
      `${c.profil} : ${form.profil}`,
      "",
      `${c.journees} : ${
        recap.joursChoisis.map((j) => `${j.jour} ${j.date}`).join(", ") || "—"
      }`,
      `${c.visite} : ${
        recap.creneau
          ? recap.creneau.id === "aucun"
            ? c.non
            : `${recap.creneau.libelle} (${recap.creneau.heures})`
          : "—"
      }`,
    ];
    return lignes.filter((l) => l !== null).join("\n");
  }, [form, recap, t]);

  const lienCourriel = `mailto:contact@atr.org.tn?subject=${encodeURIComponent(
    t.courriel.sujet
  )}&body=${encodeURIComponent(resume)}`;

  function basculerJour(id) {
    setJours((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setErreurs((e) => ({ ...e, jours: null }));
  }

  function majForm(champ, valeur) {
    setForm((f) => ({ ...f, [champ]: valeur }));
    setErreurs((e) => ({ ...e, [champ]: null }));
  }

  function valider(index) {
    const e = {};
    if (index === 0 && jours.length === 0) e.jours = t.erreurs.jours;
    if (index === 1 && !creneau) e.creneau = t.erreurs.creneau;
    if (index === 2) {
      if (!form.prenom.trim()) e.prenom = t.erreurs.prenom;
      if (!form.nom.trim()) e.nom = t.erreurs.nom;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = t.erreurs.email;
      if (!form.organisation.trim()) e.organisation = t.erreurs.organisation;
    }
    setErreurs(e);
    return Object.keys(e).length === 0;
  }

  function suivant() {
    if (!valider(etape)) return;
    setEtape((s) => Math.min(s + 1, t.etapes.length - 1));
  }

  function envoyer() {
    setEnvoye(true);
    window.location.href = lienCourriel;
  }

  function recommencer() {
    setEtape(0);
    setJours([]);
    setCreneau("");
    setForm({ ...VIDE, profil: t.profils[0] });
    setErreurs({});
    setEnvoye(false);
  }

  if (envoye) {
    return (
      <div className="resa resa--fait">
        <h3>{t.fait.titre}</h3>
        <p>
          {t.fait.texte} <a href="mailto:contact@atr.org.tn">contact@atr.org.tn</a>.
        </p>

        <pre className="resa__resume">{resume}</pre>

        <div className="resa__actions">
          <a className="btn btn--gold" href={lienCourriel}>
            {t.fait.ouvrir} <IconArrow />
          </a>
          <button className="btn btn--ghost-dark" type="button" onClick={recommencer}>
            {t.fait.recommencer}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="resa">
      <ol className="steps">
        {t.etapes.map((nom, i) => (
          <li
            key={nom}
            className={`steps__item${i === etape ? " is-current" : ""}${
              i < etape ? " is-done" : ""
            }`}
            aria-current={i === etape ? "step" : undefined}
          >
            <span className="steps__num">{i + 1}</span>
            <span className="steps__label">{nom}</span>
          </li>
        ))}
      </ol>

      <div className="resa__grid">
        <div className="resa__panel">
          {etape === 0 && (
            <fieldset className="field">
              <legend>{t.q1}</legend>
              <p className="field__hint">{t.q1Aide}</p>

              <div className="picks">
                {t.journees.map((j) => {
                  const on = jours.includes(j.id);
                  return (
                    <label key={j.id} className={`pick${on ? " is-on" : ""}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => basculerJour(j.id)}
                      />
                      <span className="pick__jour">{j.jour}</span>
                      <span className="pick__date">{j.date}</span>
                    </label>
                  );
                })}
              </div>

              {erreurs.jours && <p className="field__error">{erreurs.jours}</p>}
            </fieldset>
          )}

          {etape === 1 && (
            <fieldset className="field">
              <legend>{t.q2}</legend>
              <p className="field__hint">{t.q2Aide}</p>

              {!visiteRetenue && (
                <p className="field__note">
                  {t.q2Rappel}{" "}
                  <button type="button" onClick={() => basculerJour("j11")}>
                    {t.q2Ajouter}
                  </button>
                </p>
              )}

              <div className="picks">
                {t.creneaux.map((c) => {
                  const places = CAPACITES[c.id];
                  const on = creneau === c.id;
                  const bloque = places !== null && !visiteRetenue;
                  return (
                    <label
                      key={c.id}
                      className={`pick${on ? " is-on" : ""}${bloque ? " is-off" : ""}`}
                    >
                      <input
                        type="radio"
                        name="creneau"
                        checked={on}
                        disabled={bloque}
                        onChange={() => {
                          setCreneau(c.id);
                          setErreurs((e) => ({ ...e, creneau: null }));
                        }}
                      />
                      <span className="pick__jour">{c.libelle}</span>
                      <span className="pick__date">{c.heures}</span>
                      {places !== null && (
                        <span className="pick__places">
                          {places} {t.places}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {erreurs.creneau && <p className="field__error">{erreurs.creneau}</p>}
            </fieldset>
          )}

          {etape === 2 && (
            <fieldset className="field">
              <legend>{t.q3}</legend>
              <p className="field__hint">{t.q3Aide}</p>

              <div className="inputs">
                <Champ
                  id="prenom"
                  label={t.champs.prenom}
                  value={form.prenom}
                  erreur={erreurs.prenom}
                  onChange={(v) => majForm("prenom", v)}
                  autoComplete="given-name"
                />
                <Champ
                  id="nom"
                  label={t.champs.nom}
                  value={form.nom}
                  erreur={erreurs.nom}
                  onChange={(v) => majForm("nom", v)}
                  autoComplete="family-name"
                />
                <Champ
                  id="email"
                  label={t.champs.email}
                  type="email"
                  value={form.email}
                  erreur={erreurs.email}
                  onChange={(v) => majForm("email", v)}
                  autoComplete="email"
                  large
                />
                <Champ
                  id="organisation"
                  label={t.champs.organisation}
                  value={form.organisation}
                  erreur={erreurs.organisation}
                  onChange={(v) => majForm("organisation", v)}
                  autoComplete="organization"
                  large
                />
                <Champ
                  id="fonction"
                  label={t.champs.fonction}
                  value={form.fonction}
                  onChange={(v) => majForm("fonction", v)}
                  autoComplete="organization-title"
                  large
                />

                <div className="input input--large">
                  <label htmlFor="profil">{t.champs.profil}</label>
                  <select
                    id="profil"
                    value={form.profil}
                    onChange={(e) => majForm("profil", e.target.value)}
                  >
                    {t.profils.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          )}

          {etape === 3 && (
            <div className="field">
              <h3 className="field__title">{t.q4}</h3>
              <p className="field__hint">{t.q4Aide}</p>
              <pre className="resa__resume">{resume}</pre>
            </div>
          )}

          <div className="resa__actions">
            {etape > 0 && (
              <button
                className="btn btn--ghost-dark"
                type="button"
                onClick={() => setEtape((s) => s - 1)}
              >
                {t.retour}
              </button>
            )}

            {etape < t.etapes.length - 1 ? (
              <button className="btn btn--gold" type="button" onClick={suivant}>
                {t.continuer} <IconArrow />
              </button>
            ) : (
              <button className="btn btn--gold" type="button" onClick={envoyer}>
                {t.envoyer} <IconArrow />
              </button>
            )}
          </div>
        </div>

        <aside className="ticket" aria-label={t.ticket.titre}>
          <p className="ticket__kicker">{t.ticket.titre}</p>

          <dl className="ticket__list">
            <div>
              <dt>{t.ticket.journees}</dt>
              <dd>
                {recap.joursChoisis.length
                  ? recap.joursChoisis.map((j) => j.jour).join(", ")
                  : t.ticket.aChoisir}
              </dd>
            </div>
            <div>
              <dt>{t.ticket.visite}</dt>
              <dd>
                {recap.creneau
                  ? recap.creneau.id === "aucun"
                    ? t.ticket.nonRetenue
                    : `${recap.creneau.libelle}, ${recap.creneau.heures}`
                  : t.ticket.aChoisir}
              </dd>
            </div>
            <div>
              <dt>{t.ticket.participant}</dt>
              <dd>
                {form.prenom || form.nom
                  ? `${form.prenom} ${form.nom}`.trim()
                  : t.ticket.aRenseigner}
              </dd>
            </div>
            <div>
              <dt>{t.ticket.organisation}</dt>
              <dd>{form.organisation || t.ticket.aRenseigner}</dd>
            </div>
          </dl>

          <p className="ticket__foot">{t.ticket.pied}</p>
        </aside>
      </div>
    </div>
  );
}

function Champ({ id, label, value, onChange, erreur, type = "text", large, autoComplete }) {
  return (
    <div className={`input${large ? " input--large" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={erreur ? "true" : undefined}
        aria-describedby={erreur ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {erreur && (
        <p className="field__error" id={`${id}-err`}>
          {erreur}
        </p>
      )}
    </div>
  );
}
