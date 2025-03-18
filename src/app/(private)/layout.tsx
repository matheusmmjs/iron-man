import type React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Sidebar } from "@/components/layout/sidebar"
import { verifyAuth } from "@/lib/auth"

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/sign-in")
  }

  try {
    const user = await verifyAuth(token)

    if (!user) {
      redirect("/sign-in")
    }

    return (
      <div className="flex min-h-screen">
        <Sidebar user={user} />
        <main className="flex-1">{children}</main>
      </div>
    )
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error)
    redirect("/sign-in")
  }
}
