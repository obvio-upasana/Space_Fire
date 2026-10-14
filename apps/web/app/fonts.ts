import localFont from "next/font/local";
export const neue = localFont({
  src: [
    { path: "../public/fonts/PPNeueMontreal-Light.otf", weight: "300" },
    { path: "../public/fonts/PPNeueMontreal-Regular.otf", weight: "400" },
    { path: "../public/fonts/PPNeueMontreal-Semibold.otf", weight: "600" },
  ],
  variable: "--font-neue",
  display: "swap",
});
export const book = localFont({
  src: "../public/fonts/PPNeueMontrealText-Book.otf",
  variable: "--font-book",
  display: "swap",
});
export const kode = localFont({
  src: "../public/fonts/KodeMono-Regular.ttf",
  variable: "--font-kode",
  display: "swap",
});

export const figtree = localFont({
  src: "../public/fonts/Figtree-Latin.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
});
export const newsreader = localFont({
  src: "../public/fonts/Newsreader-Latin.woff2",
  weight: "400 700",
  variable: "--font-newsreader",
  display: "swap",
});
