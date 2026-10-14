import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./tokens.css";
import "./ui.css";
import "./home.css";
import "./home-sections.css";
import "./home-footer.css";
import "./auth.css";
import "./workspace.css";
import "./editorial.css";
import "./ai.css";
import "./professional.css";
import { neue, book, kode } from "./fonts";

export const metadata: Metadata = {
  title: { default: "FlameAtlas | Fire behaves differently here", template: "%s | FlameAtlas" },
  description: "Explore the science of fire beyond Earth. A static demonstration of the FlameAtlas research workspace.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${neue.variable} ${book.variable} ${kode.variable}`}>
      <body>{children}</body>
    </html>
  );
}
