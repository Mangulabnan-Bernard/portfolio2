import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Pwa from '@/components/Pwa';
import { SITE_URL } from '@/lib/site';
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const siteUrl = SITE_URL;

const title = "Bernard C. Mangulabnan — Web Developer | Next.js, React, TypeScript";
const description =
  "Web Developer passionate about building user-friendly, visually appealing websites and web apps. Proficient in HTML, CSS, JavaScript, React, Next.js, Node.js, and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  manifest: '/manifest.json',
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Bernard C. Mangulabnan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#00e5a0",
};

// Applies the saved theme before paint so there's no flash of the default theme.
const themeBootScript = `(function(){try{var t=localStorage.getItem('theme');if(t&&t!=='green'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <Nav />
        {children}
        <Footer />
        <Pwa />
      </body>
    </html>
  );
}
