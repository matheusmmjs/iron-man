"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const locales = {
  "pt-BR": ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  id: number
  title: string
  start: Date
  end: Date
  clientId: string
}

interface ScheduleCalendarProps {
  events: Event[]
}

export function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const viewClientProfile = (clientId: string) => {
    router.push(`/studio/clients/${clientId}`)
  }

  const messages = {
    allDay: "Dia inteiro",
    previous: "Anterior",
    next: "Próximo",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Não há eventos neste período.",
  }

  return (
    <div>
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          onSelectEvent={handleSelectEvent}
          messages={messages}
          culture="pt-BR"
          views={["month", "week", "day"]}
          defaultView="week"
        />
      </div>

      {/* Diálogo de detalhes do evento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.start && format(selectedEvent.start, "dd/MM/yyyy HH:mm")} -
              {selectedEvent?.end && format(selectedEvent.end, "HH:mm")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => selectedEvent && viewClientProfile(selectedEvent.clientId)} variant="outline">
              Ver Perfil do Cliente
            </Button>
            <div className="flex justify-between">
              <Button variant="outline">Remarcar</Button>
              <Button variant="destructive">Cancelar Sessão</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
