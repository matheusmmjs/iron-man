"use client"

import { PackagesTable } from "@/components/studio/packages/packages-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Dados de exemplo
const packages = [
  {
    id: "1",
    name: "Plano Mensal - 2x por semana",
    sessions: 8,
    price: "R$ 450,00",
    duration: "1 mês",
    description: "Plano mensal com 2 sessões por semana",
    status: "active",
  },
  {
    id: "2",
    name: "Plano Trimestral - 3x por semana",
    sessions: 36,
    price: "R$ 1.800,00",
    duration: "3 meses",
    description: "Plano trimestral com 3 sessões por semana",
    status: "active",
  },
  {
    id: "3",
    name: "Plano Mensal - 1x por semana",
    sessions: 4,
    price: "R$ 250,00",
    duration: "1 mês",
    description: "Plano mensal com 1 sessão por semana",
    status: "active",
  },
]

export default function PackagesPage() {
  const pathname = usePathname()

  // Atualiza o valor da tab com base no pathname
  useEffect(() => {
    const tabsList = document.querySelector('button[value="packages"]')
    if (tabsList) {
      tabsList.click()
    }
  }, [pathname])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pacotes</CardTitle>
        <Link href="/studio/packages/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pacote
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <PackagesTable packages={packages} />
      </CardContent>
    </Card>
  )
}
