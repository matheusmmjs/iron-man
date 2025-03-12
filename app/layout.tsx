import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Studio Pilates',
  description: 'Sistema de gestão para studios de pilates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
