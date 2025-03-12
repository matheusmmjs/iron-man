import "./globals.css";
import Header from "@/components/header";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de gestão para o seu estúdio",
  description: "O melhor sistema de gestão para o seu estúdio com agentes de inteligência artificial",
  openGraph: {
    title: "Sistema de gestão para o seu estúdio",
    description: "O melhor sistema de gestão para o seu estúdio com agentes de inteligência artificial",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= {cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
      )}>
        <Header />
        
        {children}
      </body>
    </html>
  );
}
