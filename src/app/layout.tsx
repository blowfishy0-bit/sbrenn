import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Sophie Brenner — Product & Immersive Designer",
  description:
    "Portfolio of Sophie Brenner, Product & Immersive Designer with a Pratt BFA in Digital Arts, based in New York.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SEPWC9WVPV" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SEPWC9WVPV');
        `}} />
      </head>
      <body>
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
