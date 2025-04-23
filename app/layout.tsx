import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { AlertProvider } from "@/components/ui/CustomAlert";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Generala Online - Juega con Amigos",
  description:
    "Disfruta de la clásica Generala en línea. Crea salas, juega con amigos y compite en partidas emocionantes.",
  keywords: [
    "Generala",
    "Juego de Dados",
    "Multijugador",
    "Juego Online",
    "Generala con Amigos",
  ],
  openGraph: {
    title: "Generala Online - Juega con Amigos",
    description:
      "Disfruta de la clásica Generala en línea. Crea salas, juega con amigos y compite en partidas emocionantes.",
    url: "https://lagenerala.vercel.app",
    type: "website",
    images: [
      {
        url: "https://lagenerala.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Generala Online",
      },
    ],
  },
  alternates: {
    canonical: "https://lagenerala.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${poppins.variable} antialiased`}>
        <AlertProvider>
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </AlertProvider>
      </body>
    </html>
  );
}
