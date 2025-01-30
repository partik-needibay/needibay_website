import { Oxygen } from "next/font/google";
import { Arimo, Quicksand } from "next/font/google";
import { Overpass } from "next/font/google";
import { Readex_Pro } from "next/font/google";
import { Mukta_Vaani } from "next/font/google";
import { Roboto } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { Outfit } from "next/font/google";


export const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const arimo = Arimo({ subsets: ["latin"], weight: ["400", "500"] });
export const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["500"],
});

export const quicksand = Quicksand({ subsets: ["latin"] });

export const overpass = Overpass({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
});

export const mukta = Mukta_Vaani({
  subsets: ["latin"],
  weight: ["200"],
});

export const roboto = Roboto({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});
