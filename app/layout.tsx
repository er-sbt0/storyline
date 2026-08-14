import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond, Literata } from "next/font/google";
import "./globals.css";

// Display — headings, wordmark, buttons, story titles.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body — Spanish, always. The reader must never leave doubt which language
// the eye is in.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Utility — every word of English: rail, metadata, chips, nav.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Storyline — read a story you already know, in Spanish",
  description:
    "Learn Spanish by reading famous children's stories in Spanish only. You know how they end; English waits in the margin until you ask for it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${literata.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="bg-paper text-ink min-h-full">{children}</body>
    </html>
  );
}
