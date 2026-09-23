/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    Export statique pur : Next.js génère des fichiers HTML/CSS/JS dans "out/"
    sans aucune dépendance serveur. L'étape "Collecting build traces" est
    complètement ignorée, ce qui résout le blocage sur Vercel.
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
};

export default nextConfig;
