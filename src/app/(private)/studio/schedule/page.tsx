"use client"

import { ScheduleCalendar } from "@/components/studio/schedule/schedule-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Dados de exemplo
const events = [
  {
    id: 1,
    title: "Ana Silva - Pilates Individual",
    start: new Date(2025, 2, 13, 10, 0),
    end: new Date(2025, 2, 13, 11, 0),
    clientId: "1",
  },
  {
    id: 2,
    title: "Carlos Oliveira - Pilates em Grupo",
    start: new Date(2025, 2, 13, 14, 0),
    end: new Date(2025, 2, 13, 15, 0),
    clientId: "2",
  },
  {
    id: 3,
    title: "Mariana Santos - Avaliação",
    start: new Date(2025, 2, 14, 9, 0),
    end: new Date(2025, 2, 14, 10, 0),
    clientId: "3",
  },
]

export default function SchedulePage() {
  const pathname = usePathname()

  // Atualiza o valor da tab com base no pathname
  useEffect(() => {
    const tabsList = document.querySelector('button[value="schedule"]')
    if (tabsList) {
      tabsList.click()
    }
  }, [pathname])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Agenda</CardTitle>
        <Link href="/studio/schedule/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <ScheduleCalendar events={events} />
      </CardContent>
    </Card>
  )
}
