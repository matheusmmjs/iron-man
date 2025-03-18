"use client"

import { AssessmentsTable } from "@/components/studio/assessments/assessments-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Dados de exemplo
const assessments = [
  {
    id: "1",
    client: "Ana Silva",
    clientId: "1",
    date: "10/03/2025",
    type: "INITIAL",
    professional: "Dra. Juliana Mendes",
  },
  {
    id: "2",
    client: "Carlos Oliveira",
    clientId: "2",
    date: "15/02/2025",
    type: "FOLLOW_UP",
    professional: "Dr. Ricardo Santos",
  },
  {
    id: "3",
    client: "Mariana Santos",
    clientId: "3",
    date: "05/01/2025",
    type: "REASSESSMENT",
    professional: "Dra. Juliana Mendes",
  },
]

export default function AssessmentsPage() {
  const pathname = usePathname()

  // Atualiza o valor da tab com base no pathname
  useEffect(() => {
    const tabsList = document.querySelector('button[value="assessments"]')
    if (tabsList) {
      tabsList.click()
    }
  }, [pathname])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Avaliações</CardTitle>
        <Link href="/studio/assessments/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nova Avaliação
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <AssessmentsTable assessments={assessments} />
      </CardContent>
    </Card>
  )
}
