import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Pwa from '@/components/Pwa';
import PostHogProvider from '@/components/PostHogProvider';
import SecretTrigger from '@/components/SecretTrigger';
import ScrollProgress from '@/components/ScrollProgress';
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

const title = "Bernard C. Mangulabnan — Full Stack Web and Mobile Developer | Next.js, React, TypeScript";
const description =
  "Full Stack Web and Mobile Developer passionate about building user-friendly, visually appealing websites and web apps. Proficient in HTML, CSS, JavaScript, React, Next.js, Node.js, and TypeScript.";

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
  themeColor: "#3b9eff",
};

// Applies the saved theme before paint so there's no flash of the default theme.
const themeBootScript = `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        {/* Apply the saved theme before paint (no flash). Kept in <head> so
            third-party loaders that insert before the first <body> script
            (e.g. PostHog's surveys.js) can't displace it and break hydration. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen">
        <PostHogProvider>
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
          <Pwa />
          <SecretTrigger />
        </PostHogProvider>
      </body>
    </html>
  );
}
