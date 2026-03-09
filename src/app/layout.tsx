import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import MainLayoutClient from "@/components/layout/MainLayoutClient";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Te Cambio Tu Carro",
  description: "Compra y venta de vehículos. Catálogo y Remates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} font-display bg-background-light dark:bg-background-dark text-text-main antialiased selection:bg-primary selection:text-white`}>
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
      </body>
    </html>
  );
}
