/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    Export statique pur : Next.js génère des fichiers HTML/CSS/JS dans "out/"
    sans aucune dépendance serveur.
    Le redirect / → /fr est géré par vercel.json.
  */
  output: "export",

  images: {
    /*
      En mode export statique, l'optimisation d'images serveur est désactivée.
      Les images Wikimedia sont chargées directement depuis le navigateur.
    */
    unoptimized: true,
  },

  experimental: {
    /*
      turbotrace : traceur de fichiers écrit en Rust (remplace le traceur JS).
      Beaucoup plus rapide et ne se bloque pas sur les gros projets.
      Résout le freeze à "Collecting build traces" sur Vercel.
    */
    turbotrace: {
      logLevel: "error",
      logDetail: false,
    },

    /*
      Exclure les binaires lourds de @swc et webpack du tracing :
      ils représentent des centaines de MB inutiles à analyser.
    */
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-musl/**",
        "node_modules/@swc/core-linux-x64-gnu/**",
        "node_modules/@swc/core-win32-x64-msvc/**",
        "node_modules/webpack/**",
        "node_modules/next/dist/compiled/webpack/**",
      ],
    },
  },
};

export default nextConfig;
