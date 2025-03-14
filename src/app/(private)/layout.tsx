import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyAuth } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Verificar autenticação no servidor
  const token = (await cookies()).get("token")?.value

  if (!token) {
    redirect("/sign-in")
  }

  const user = await verifyAuth(token)

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

// import "./../globals.css";
// import { Metadata } from "next";
// import { cn } from "@/lib/utils";
// import { Inter } from "next/font/google";
// import { Sidebar } from "@/components/sidebar";

// const inter = Inter({
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "PilatesFlow - Sistema de gestão para o seu estúdio",
//   description: "O melhor sistema de gestão para o seu estúdio com agentes de inteligência artificial",
//   openGraph: {
//     title: "PilatesFlow - Sistema de gestão para o seu estúdio",
//     description: "O melhor sistema de gestão para o seu estúdio com agentes de inteligência artificial",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     nocache: true,
//     googleBot: {
//       index: true,
//       follow: true,
//     }
//   }
// };

// export default function PrivateLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className= {cn(
//           "min-h-screen bg-background font-sans antialiased",
//           inter.className
//       )}>
//         <Sidebar />

//         {children}
//       </body>
//     </html>
//   );
// }
