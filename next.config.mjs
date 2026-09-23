/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    Export statique : Next.js génère du HTML/CSS/JS pur dans "out/".
    Vercel détecte automatiquement ce mode et sert les fichiers depuis out/.
    Le redirect / → /fr est géré par vercel.json.
  */
  output: "export",

  images: {
    /* Requis en mode export statique (pas de serveur d'optimisation). */
    unoptimized: true,
  },
};

export default nextConfig;

