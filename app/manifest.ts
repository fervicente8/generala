import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Generala Online - Juega con Amigos",
    short_name: "Generala",
    description: "Disfruta de la clásica Generala en línea. Crea salas, juega con amigos y compite en partidas emocionantes.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1A1A",
    theme_color: "#2E4A3D",
    orientation: "any",
    scope: "/",
    icons: [
      { src: "/dice-icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/dice-icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/dice-icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["games", "entertainment"],
    lang: "es",
  };
}
