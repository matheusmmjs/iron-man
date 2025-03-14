"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

// Dados de exemplo
const events = [
  {
    id: 1,
    title: "Ana Silva - Pilates Individual",
    start: new Date(2025, 2, 13, 10, 0),
    end: new Date(2025, 2, 13, 11, 0),
    clientId: "client-1",
  },
  {
    id: 2,
    title: "Carlos Oliveira - Pilates em Grupo",
    start: new Date(2025, 2, 13, 14, 0),
    end: new Date(2025, 2, 13, 15, 0),
    clientId: "client-2",
  },
  {
    id: 3,
    title: "Mariana Santos - Avaliação",
    start: new Date(2025, 2, 14, 9, 0),
    end: new Date(2025, 2, 14, 10, 0),
    clientId: "client-3",
  },
]

export function AgendaCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const router = useRouter()

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo)
    setIsNewEventDialogOpen(true)
  }

  const viewClientProfile = (clientId) => {
    router.push(`/clients/${clientId}`)
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
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        messages={messages}
        culture="pt-BR"
        views={["month", "week", "day", "agenda"]}
        defaultView="week"
      />

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
            <Button onClick={() => viewClientProfile(selectedEvent?.clientId)} variant="outline">
              Ver Perfil do Cliente
            </Button>
            <div className="flex justify-between">
              <Button variant="outline">Remarcar</Button>
              <Button variant="destructive">Cancelar Sessão</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para novo evento */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription>
              {selectedSlot?.start && format(selectedSlot.start, "dd/MM/yyyy HH:mm")} -
              {selectedSlot?.end && format(selectedSlot.end, "HH:mm")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                Cliente
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client-1">Ana Silva</SelectItem>
                  <SelectItem value="client-2">Carlos Oliveira</SelectItem>
                  <SelectItem value="client-3">Mariana Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Tipo de sessão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Pilates Individual</SelectItem>
                  <SelectItem value="group">Pilates em Grupo</SelectItem>
                  <SelectItem value="evaluation">Avaliação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Observações
              </Label>
              <Textarea className="col-span-3" id="notes" placeholder="Observações para esta sessão" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
