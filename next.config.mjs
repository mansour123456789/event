/** @type {import('next').NextConfig} */
const nextConfig = {
  /* La racine renvoie vers le français, langue par défaut du séminaire. */
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: false }];
  },

  images: {
    /*
      Images distantes autorisées. Next les récupère côté serveur, les
      convertit en WebP et les met en cache : le visiteur les reçoit depuis
      ce site, pas depuis Wikimedia. Wikimedia n'est donc sollicité qu'une
      fois par image, ce qui respecte sa demande de ne pas la surcharger.
    */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

export default nextConfig;
