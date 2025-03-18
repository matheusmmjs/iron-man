import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PilatesFlow - Sistema de gestão para o seu estúdio",
  description: "O melhor sistema de gestão para o seu estúdio com agentes de inteligência artificial",
  openGraph: {
    title: "PilatesFlow - Sistema de gestão para o seu estúdio",
    description: "O melhor sistema de gestão para o seu estúdio com agentes de inteligência artificial",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
