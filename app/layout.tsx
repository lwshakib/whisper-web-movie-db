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
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicon_io/favicon.ico", sizes: "any", type: "image/x-icon" },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

import { Suspense } from "react";

/**
 * Global Root Layout.
 * Configures the base HTML structure, application fonts, SEO metadata,
 * and universal UI components like the Navbar.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* 
       Applying custom font variables to the root element allows us to 
       use them consistently throughout the Tailwind theme.
    */
    <html lang="en" className={`${outfit.variable} ${sourceSans3.variable}`}>
      <body className="bg-black text-white antialiased">
        {/* 
            Navbar is wrapped in Suspense to handle useSearchParams hook 
            which requires client-side hydration context in Next.js.
        */}
        <Suspense fallback={<div className="h-20 bg-transparent" />}>
          <Navbar />
        </Suspense>

        {/* Main content area where individual pages will be rendered */}
        <main>{children}</main>
      </body>
    </html>
  );
}
