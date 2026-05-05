import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import MainLayoutClient from "@/components/layout/MainLayoutClient";

import Script from 'next/script';

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Te Cambio Tu Carro",
  description: "Compra y venta de vehículos. Catálogo y Remates.",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '32x32' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

import FloatingAd from "@/components/home/FloatingAd";
// import TakeoverAd from "@/components/ads/TakeoverAd";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

  return (
    <html lang="es">
      <body className={`${manrope.variable} font-display bg-background-light text-text-main antialiased selection:bg-primary selection:text-white`}>
        {GTM_ID && (
          <>
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </Script>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          </>
        )}
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
        <FloatingAd />
        {/* <TakeoverAd /> */}
      </body>
    </html>
  );
}
