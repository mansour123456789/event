import { DM_Sans, Inter, Cairo } from "next/font/google";
import "../globals.css";
import { dico, CODES, infosLocale, estLocale } from "../i18n";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

/* DM Sans et Inter ne couvrent pas l'arabe : Cairo prend le relais. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return CODES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = dico(locale);

  return {
    title: t.meta.titre,
    description: t.meta.description,
    metadataBase: new URL("https://www.piarc-atr2026.tn"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(CODES.map((c) => [c, `/${c}`])),
    },
    openGraph: {
      title: t.meta.titre,
      description: t.meta.description,
      images: ["/affiche-seminaire.jpg"],
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const code = estLocale(locale) ? locale : "fr";
  const { dir, htmlLang } = infosLocale(code);

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={`${dmSans.variable} ${inter.variable} ${cairo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
