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
      <body>
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
