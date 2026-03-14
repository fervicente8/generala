import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { AlertProvider } from "@/components/ui/CustomAlert";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://generala-8zq4.onrender.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
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
    url: "/",
    type: "website",
    siteName: "Generala Online",
    images: [
      {
        url: "/background.png",
        width: 1200,
        height: 630,
        alt: "Generala Online - Juega con amigos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generala Online - Juega con Amigos",
    description: "Disfruta de la clásica Generala en línea. Crea salas, juega con amigos y compite en partidas emocionantes.",
    images: ["/background.png"],
  },
  alternates: {
    canonical: "/",
  },
  themeColor: "#2E4A3D",
  appleWebApp: {
    capable: true,
    title: "Generala",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/dice-icon.png",
    apple: "/dice-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${poppins.variable} antialiased safe-area-x`}>
        <AlertProvider>
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </AlertProvider>
      </body>
    </html>
  );
}
