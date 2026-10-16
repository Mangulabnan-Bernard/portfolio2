import type { Metadata, Viewport } from 'next';
import PortfolioChrome from '@/components/portfolio/PortfolioChrome';
import PostHogProvider from '@/components/PostHogProvider';
import Pwa from '@/components/Pwa';
import SecretTrigger from '@/components/SecretTrigger';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const title = 'Bernard C. Mangulabnan — Full Stack Web and Mobile Developer';
const description = 'Bernard Mangulabnan builds thoughtful web and mobile products where good engineering meets a clear, human experience.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s — Bernard Mangulabnan' },
  description,
  manifest: '/manifest.json',
  openGraph: { title, description, url: SITE_URL, siteName: 'Bernard C. Mangulabnan', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b1112' },
    { media: '(prefers-color-scheme: light)', color: '#f7f8f3' },
  ],
  colorScheme: 'dark light',
};

const themeBootScript = `(function(){try{var saved=localStorage.getItem('portfolio-v4-theme');if(!saved){var old=localStorage.getItem('theme');saved=old==='light'?'light':'dark'}document.documentElement.dataset.theme=saved==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" data-heart-design="2">
      <head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head>
      <body>
        <PostHogProvider>
          <PortfolioChrome>{children}</PortfolioChrome>
          <Pwa />
          <SecretTrigger />
        </PostHogProvider>
      </body>
    </html>
  );
}
