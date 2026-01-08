import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
});

export const metadata: Metadata = {
  title: "Whisper | Premium Movie Database",
  description: "Explore the latest movies and TV series with a premium cinematic experience.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon_io/site.webmanifest",
      },
    ],
  },
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sourceSans3.variable}`}>
      <body className="bg-black text-white antialiased">
        <Suspense fallback={<div className="h-20 bg-transparent" />}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}

