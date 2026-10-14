import localFont from "next/font/local";
export const neue = localFont({ src: [
  { path: "../public/fonts/PPNeueMontreal-Light.otf", weight: "300" },
  { path: "../public/fonts/PPNeueMontreal-Regular.otf", weight: "400" },
  { path: "../public/fonts/PPNeueMontreal-Semibold.otf", weight: "600" },
], variable: "--font-neue", display: "swap" });
export const book = localFont({ src: "../public/fonts/PPNeueMontrealText-Book.otf", variable: "--font-book", display: "swap" });
export const kode = localFont({ src: "../public/fonts/KodeMono-Regular.ttf", variable: "--font-kode", display: "swap" });
