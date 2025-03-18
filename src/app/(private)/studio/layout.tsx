"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()

  const tabs = [
    { value: "clients", label: "Clientes", path: "/studio/clients" },
    { value: "schedule", label: "Agenda", path: "/studio/schedule" },
    { value: "assessments", label: "Avaliações", path: "/studio/assessments" },
    { value: "payments", label: "Pagamentos", path: "/studio/payments" },
    { value: "plans", label: "Planos", path: "/studio/plans" },
  ]

  const getCurrentTab = () => {
    const currentPath = pathname.split("/").pop()
    return tabs.find((tab) => tab.value === currentPath)?.value || "clients"
  }

  const handleTabChange = (value: string) => {
    const tab = tabs.find((tab) => tab.value === value)
    if (tab) {
      router.push(tab.path)
    }
  }

  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Estúdio</h1>

        <div className="overflow-x-auto pb-2">
          <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full grid grid-cols-3 md:grid-cols-5 h-auto">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="py-2">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {children}
    </div>
  )
}
