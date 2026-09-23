import Image from "next/image";
import Header from "../components/Header";
import Countdown from "../components/Countdown";
import Reservation from "../components/Reservation";
import TunisiaFlag from "../components/Flag";
import { image, video } from "../lib/photos";
import VideoBande from "../components/VideoBande";
import { dico, CODES } from "../i18n";
import {
  IconArrow,
  IconCalendar,
  IconCase,
  IconExpo,
  IconMic,
  IconNetwork,
  IconPin,
  IconRoute,
} from "../components/icons";

export function generateStaticParams() {
  return CODES.map((locale) => ({ locale }));
}

/* Ce qui ne se traduit pas : icônes, logos, liens. */
const ICONES_FORMATS = [IconMic, IconCase, IconExpo, IconNetwork, IconRoute];

const LOGOS = [
  { logo: "/logo-atr.png", w: 520, h: 520, lien: null },
  { logo: "/logo-piarc.png", w: 432, h: 296, lien: "https://www.piarc.org" },
  { logo: "/logo-mehat.png", w: 536, h: 368, lien: "https://www.mehat.gov.tn" },
];

/* Les licences Creative Commons imposent de créditer l'auteur. */
function Credit({ credit, mot }) {
  if (!credit) return null;
  return (
    <span className="credit">
      {mot}{" "}
      <a href={credit.source} target="_blank" rel="noreferrer">
        {credit.auteur}
      </a>
      ,{" "}
      <a href={credit.licenceUrl} target="_blank" rel="noreferrer">
        {credit.licence}
      </a>
    </span>
  );
}

export default async function Home({ params }) {
  const { locale } = await params;
  const t = dico(locale);

  const imgLieu = image("gammarth");
  const imgSeminaire = image("seminaire");
  /* Une vidéo l'emporte sur la photo du même emplacement. */
  const vidRoutes = video("routes");
  const imgRoutes = vidRoutes ? null : image("routes");

  return (
    <>
      <Header locale={locale} t={t} />

      <main id="top">
        {/* ------------------------------------------------------------ hero */}
        <section className="hero">
          <div className="hero__photo">
            <Image src="/hero-road.jpg" alt="" fill priority sizes="100vw" />
          </div>

          <TunisiaFlag className="hero__flag" />

          <div className="container hero__inner">
            <div className="hero__lockup">
              <span className="hero__marks">
                {LOGOS.slice(1).map((l) => (
                  <Image
                    key={l.logo}
                    src={l.logo}
                    alt=""
                    width={l.w}
                    height={l.h}
                    priority
                  />
                ))}
                <Image
                  className="hero__mark-atr"
                  src="/logo-atr.png"
                  alt={t.marque.atr}
                  width={520}
                  height={520}
                  priority
                />
              </span>

              <span className="hero__rule" aria-hidden="true" />
              <TunisiaFlag className="hero__chip" title={t.hero.tunisie} />
            </div>

            <p className="hero__org">{t.hero.org}</p>

            <h1>
              {t.hero.titreAvant} <mark>{t.hero.titreMark}</mark>
            </h1>

            <p className="hero__tagline">{t.hero.tagline}</p>
            <p className="hero__lead">{t.hero.lead}</p>

            <div className="hero__actions">
              <a className="btn btn--gold" href="#reserver">
                {t.hero.cta} <IconArrow />
              </a>
              <a className="btn btn--ghost-light" href="#programme">
                {t.hero.ctaSecond}
              </a>
            </div>
          </div>

          <div className="hero__road">
            <div className="hero__lane" aria-hidden="true" />

            <div className="container">
              <div className="hero__facts">
                {t.hero.facts.map((f) => (
                  <div className="hero__fact" key={f.fort}>
                    <strong>{f.fort}</strong>
                    <span>{f.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- strip */}
        <div className="strip">
          <div className="container strip__inner">
            <span className="strip__label">{t.strip.label}</span>
            <span>{t.strip.texte}</span>
            <a className="strip__link" href="#reserver">
              {t.strip.lien} <IconArrow />
            </a>
          </div>
        </div>

        {/* -------------------------------------------------------- séminaire */}
        <section className="band" id="seminaire">
          <div className="container">
            <div className="lede">
              <h2 className="lede__title reveal">{t.seminaire.titre}</h2>
              <div className="lede__body">
                <p>{t.seminaire.lead}</p>
                <a className="link-arrow" href="#infos">
                  {t.seminaire.lien} <IconArrow />
                </a>
              </div>
            </div>

            <div className="split rise">
              {t.seminaire.apports.map((a) => (
                <div className="split__col" key={a.titre}>
                  <h3>{a.titre}</h3>
                  <p>{a.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- système sûr */}
        <section className="couches" id="approche">
          <div className="container couches__grid">
            <div className="couches__text">
              <h2 className="couches__title reveal">{t.couches.titre}</h2>
              <p className="couches__lead">{t.couches.lead}</p>

              <ul className="couches__list rise">
                {t.couches.items.map((c) => (
                  <li className={`couches__item couches__item--${c.key}`} key={c.key}>
                    <h3>{c.titre}</h3>
                    <p>{c.texte}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vue éclatée : la même information, dessinée comme une coupe. */}
            <div className="stack" aria-hidden="true">
              <div className="stack__rig">
                {t.couches.items.map((c, i) => (
                  <div
                    className={`slab slab--${c.key}`}
                    key={c.key}
                    style={{ "--i": i }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- programme */}
        <section className="band band--light" id="programme">
          <div className="container">
            <div className="lede">
              <h2 className="lede__title reveal">{t.programme.titre}</h2>
              <div className="lede__body">
                <p>{t.programme.lead}</p>
              </div>
            </div>

            <ul className="index rise">
              {t.programme.formats.map((f, i) => {
                const Icone = ICONES_FORMATS[i];
                return (
                  <li className="index__row" key={f.titre}>
                    <span className="index__icon">
                      <Icone />
                    </span>
                    <h3 className="index__name">{f.titre}</h3>
                    <p className="index__note">{f.texte}</p>
                  </li>
                );
              })}
            </ul>

            {vidRoutes && (
              <VideoBande
                className="bande--large"
                src={vidRoutes.src}
                poster={vidRoutes.poster}
                titre={t.programme.legendeRoutes}
                libelles={t.video}
              >
                {t.programme.legendeRoutes}
              </VideoBande>
            )}

            {imgRoutes && (
              <figure className="bande bande--large">
                <Image
                  src={imgRoutes.src}
                  alt={imgRoutes.alt || ""}
                  fill
                  sizes="(max-width: 1080px) 100vw, 1052px"
                />
                <figcaption>
                  {t.programme.legendeRoutes}
                  <Credit credit={imgRoutes.credit} mot={t.credit.photo} />
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------- lieu */}
        <section className="band lieu" id="lieu">
          <div className="container">
            <div className={`lieu__grid${imgLieu ? "" : " lieu__grid--seul"}`}>
              <div>
                <h2 className="lede__title reveal">{t.lieu.titre}</h2>
                <p className="lieu__text">{t.lieu.p1}</p>
                <p className="lieu__text">{t.lieu.p2}</p>

                <a className="link-arrow" href="#reserver">
                  {t.lieu.lien} <IconArrow />
                </a>
              </div>

              {imgLieu && (
                <figure className="lieu__photo">
                  <Image
                    src={imgLieu.src}
                    alt={imgLieu.alt || t.lieu.titre}
                    fill
                    sizes="(max-width: 880px) 60vw, 300px"
                  />
                  <Credit credit={imgLieu.credit} mot={t.credit.photo} />
                </figure>
              )}
            </div>

            {/* En bas de la section : le lieu même du séminaire. */}
            {imgSeminaire && (
              <figure className="bande bande--bas">
                <Image
                  src={imgSeminaire.src}
                  alt={imgSeminaire.alt || ""}
                  fill
                  sizes="(max-width: 1080px) 100vw, 1052px"
                />
                <figcaption>
                  {t.lieu.legendeSeminaire}
                  <Credit credit={imgSeminaire.credit} mot={t.credit.photo} />
                </figcaption>
              </figure>
            )}
          </div>

          <div className="lieu__skyline" aria-hidden="true">
            <Image
              src="/skyline-tunis.jpg"
              alt=""
              width={1490}
              height={400}
              sizes="100vw"
            />
          </div>
        </section>

        {/* ------------------------------------------------------------ infos */}
        <section className="band band--light" id="infos">
          <div className="container infos">
            <div>
              <h2 className="lede__title reveal">{t.infos.titre}</h2>

              <dl className="facts rise">
                {t.infos.lignes.map((info) => (
                  <div className="facts__row" key={info.label}>
                    <dt>{info.label}</dt>
                    <dd>
                      <strong>{info.titre}</strong>
                      <span>{info.detail}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="poster">
              <Image
                src="/affiche-seminaire.jpg"
                alt={t.infos.posterAlt}
                width={1240}
                height={1754}
                sizes="(max-width: 1080px) 92vw, 400px"
              />
              <figcaption>{t.infos.posterLegende}</figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------ partenaires */}
        <section className="band" id="partenaires">
          <div className="container">
            <div className="lede">
              <h2 className="lede__title reveal">{t.partenaires.titre}</h2>
              <div className="lede__body">
                <p>{t.partenaires.lead}</p>
              </div>
            </div>

            <div className="partners rise">
              {t.partenaires.items.map((p, i) => {
                const l = LOGOS[i];
                const bloc = (
                  <>
                    <span className="partner__mark">
                      <Image src={l.logo} alt="" width={l.w} height={l.h} />
                    </span>
                    <h3>{p.role}</h3>
                    <p>{p.texte}</p>
                  </>
                );

                return (
                  <article className="partner" key={p.role}>
                    {l.lien ? (
                      <a
                        className="partner__link"
                        href={l.lien}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {bloc}
                      </a>
                    ) : (
                      bloc
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- réservation */}
        <section className="reserver" id="reserver">
          <div className="container">
            <div className="reserver__head">
              <div>
                <h2>{t.reserver.titre}</h2>
                <p>{t.reserver.lead}</p>
              </div>

              <Countdown t={t.compte} />
            </div>

            <Reservation t={t.reserver} />
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- footer */}
      <footer className="footer">
        <div className="footer__rule" />

        <div className="container">
          <div className="footer__marquee">
            <div>
              <p className="footer__event">{t.pied.evenement}</p>
              <p className="footer__when">{t.pied.quand}</p>
            </div>
            <a className="btn btn--gold" href="#reserver">
              {t.nav.reserver} <IconArrow />
            </a>
          </div>

          <div className="footer__grid">
            <div className="footer__about">
              <Image
                className="footer__logo"
                src="/logo-atr.png"
                alt={t.marque.atr}
                width={192}
                height={192}
              />
              <p>{t.pied.baseline}</p>
            </div>

            <div>
              <h4>{t.pied.navigation}</h4>
              <ul>
                <li>
                  <a href="#seminaire">{t.nav.seminaire}</a>
                </li>
                <li>
                  <a href="#approche">{t.nav.approche}</a>
                </li>
                <li>
                  <a href="#programme">{t.nav.programme}</a>
                </li>
                <li>
                  <a href="#lieu">{t.nav.lieu}</a>
                </li>
                <li>
                  <a href="#infos">{t.nav.infos}</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>{t.pied.ressources}</h4>
              <ul>
                <li>
                  <a href="https://www.piarc.org" target="_blank" rel="noreferrer">
                    PIARC ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.mehat.gov.tn" target="_blank" rel="noreferrer">
                    {t.pied.ministere} ↗
                  </a>
                </li>
                <li>
                  <a href="#infos">{t.pied.mentions}</a>
                </li>
                <li>
                  <a href="#infos">{t.pied.confidentialite}</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>{t.pied.contact}</h4>
              <ul className="footer__contact">
                <li>
                  <i>
                    <IconPin width={16} height={16} />
                  </i>
                  <span>{t.pied.adresse}</span>
                </li>
                <li>
                  <i>
                    <IconCalendar width={16} height={16} />
                  </i>
                  <span>{t.pied.dates}</span>
                </li>
                <li>
                  <i>@</i>
                  <a href="mailto:contact@atr.org.tn">contact@atr.org.tn</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <span>
              © {new Date().getFullYear()} {t.pied.droits}
            </span>
            <span>www.piarc-atr2026.tn</span>
          </div>
        </div>
      </footer>
    </>
  );
}
