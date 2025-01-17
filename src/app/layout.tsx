import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { imbPlexSans, lilitaOne, nexaRustSansBlack, pressStart } from '@/fonts';
import MainLayout from '@/app/_layout/_MainLayout';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://app.niftyleague.com'),
  title: {
    template: '%s | Nifty League App',
    default: 'Nifty League App',
  },
  description: 'Web3 gaming app brought to you by Nifty League',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Nifty League', 'NFT', 'Gaming', 'Web3', 'Metaverse'],
  authors: [{ name: 'NiftyAndy', url: 'https://niftyleague.com' }],
  creator: 'NiftyAndy',
  publisher: 'Nifty League',
  assets: ['https://app.niftyleague.com/images'],
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Nifty League Web3 App',
    description: 'Web3 gaming app brought to you by Nifty League',
    url: 'https://app.niftyleague.com',
    siteName: 'NiftyLeagueApp',
    images: 'https://niftyleague.com/img/home-banner-desktop.png',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nifty League Web3 App',
    description: 'Follow @NiftyLeague on Twitter',
    // siteId: '1467726470533754880',
    creator: '@NiftyLeague',
    // creatorId: '1467726470533754880',
    images: {
      url: 'https://niftyleague.com/img/home-banner-desktop.png',
      alt: 'Nifty League Banner',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: '#620EDF' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        defer
        src="https://d7ct17ettlkln.cloudfront.net/public/stats.js"
      />

      <Script strategy="lazyOnload" id="clarity-script">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "box6efnxlz");
        `}
      </Script>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-7GJRQ9KGCE" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7GJRQ9KGCE', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <body
        // className={imbPlexSans.className}
        className={`${imbPlexSans.variable} ${nexaRustSansBlack.variable} ${lilitaOne.variable} ${pressStart.variable}`}
        suppressHydrationWarning={true}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
