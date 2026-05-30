import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cinzel,
  EB_Garamond,
  Cormorant_SC,
  Almendra,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const almendra = Almendra({
  variable: "--font-almendra",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Game of Thrones Encyclopedia",
    template: "%s | GOT Encyclopedia",
  },
  description:
    "A world-class fan encyclopedia of Westeros — houses, characters, dragons, regions, and the great wars of the Seven Kingdoms.",
  keywords: ["Game of Thrones", "Westeros", "Houses", "Dragons", "Characters"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    cinzelDecorative.variable,
    cinzel.variable,
    ebGaramond.variable,
    cormorantSC.variable,
    almendra.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body className="min-h-full flex flex-col bg-got-obsidian">
        <Navbar />
        <PageTransition>
          <main className="flex-1 relative z-10">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
