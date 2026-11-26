import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "inop1a — Experimental Portfolio",
  description:
    "Experimental portfolio of inop1a: FOSS builder, white-hat student, systems tinkerer, and multilingual technologist.",
  applicationName: "inop1a portfolio",
  creator: "inop1a",
  authors: [{ name: "inop1a", url: "https://github.com/Axel-DaMage" }],
  keywords: [
    "inop1a",
    "Axel DaMage",
    "portfolio",
    "open source",
    "white hat",
    "web development",
  ],
  openGraph: {
    title: "inop1a — Experimental Portfolio",
    description:
      "FOSS builder, white-hat student, systems tinkerer, and multilingual technologist.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[#050508] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
