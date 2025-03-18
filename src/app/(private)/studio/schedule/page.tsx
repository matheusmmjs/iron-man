"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Views, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "moment/locale/pt-br"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Plus, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

// Configuração do localizer para o react-big-calendar
moment.locale("pt-br")
const localizer = momentLocalizer(moment)

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  clientId: string
  clientName?: string
  status: string
  notes?: string
}

interface Client {
  id: string
  name: string
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState(Views.WEEK)
  const [date, setDate] = useState(new Date())
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)
  const [isEventDetailsDialogOpen, setIsEventDetailsDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    fetchEvents()
    fetchClients()
  }, [])

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      // Simulando dados para exemplo
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Ana Silva - Pilates Individual",
          start: new Date(2025, 2, 13, 10, 0),
          end: new Date(2025, 2, 13, 11, 0),
          clientId: "1",
          clientName: "Ana Silva",
          status: "SCHEDULED",
          notes: "Foco em exercícios para escoliose",
        },
        {
          id: "2",
          title: "Carlos Oliveira - Pilates em Grupo",
          start: new Date(2025, 2, 13, 14, 0),
          end: new Date(2025, 2, 13, 15, 0),
          clientId: "2",
          clientName: "Carlos Oliveira",
          status: "SCHEDULED",
        },
        {
          id: "3",
          title: "Mariana Santos - Avaliação",
          start: new Date(2025, 2, 14, 9, 0),
          end: new Date(2025, 2, 14, 10, 0),
          clientId: "3",
          clientName: "Mariana Santos",
          status: "SCHEDULED",
          notes: "Primeira avaliação",
        },
      ]

      // Ajustar datas para a semana atual
      const today = new Date()
      const mockEventsWithCurrentDates = mockEvents.map((event) => {
        const newStart = new Date(today)
        newStart.setHours(event.start.getHours(), event.start.getMinutes(), 0, 0)
        newStart.setDate(today.getDate() + (event.start.getDay() - today.getDay()))

        const newEnd = new Date(today)
        newEnd.setHours(event.end.getHours(), event.end.getMinutes(), 0, 0)
        newEnd.setDate(today.getDate() + (event.end.getDay() - today.getDay()))

        return {
          ...event,
          start: newStart,
          end: newEnd,
        }
      })

      setEvents(mockEventsWithCurrentDates)
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      // Simulando dados para exemplo
      const mockClients: Client[] = [
        { id: "1", name: "Ana Silva" },
        { id: "2", name: "Carlos Oliveira" },
        { id: "3", name: "Mariana Santos" },
      ]

      setClients(mockClients)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
    }
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsEventDetailsDialogOpen(true)
  }

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end })
    setIsNewEventDialogOpen(true)
  }

  const handleCreateEvent = async (formData: FormData) => {
    if (!selectedSlot) return

    const clientId = formData.get("client") as string
    const client = clients.find((c) => c.id === clientId)
    const sessionType = formData.get("type") as string
    const notes = formData.get("notes") as string

    const newEvent: Event = {
      id: Date.now().toString(),
      title: `${client?.name} - ${sessionType}`,
      start: selectedSlot.start,
      end: selectedSlot.end,
      clientId,
      clientName: client?.name,
      status: "SCHEDULED",
      notes,
    }

    setEvents([...events, newEvent])
    setIsNewEventDialogOpen(false)
  }

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    if (confirm("Tem certeza que deseja cancelar esta sessão?")) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id))
      setIsEventDetailsDialogOpen(false)
    }
  }

  const handleRescheduleEvent = () => {
    // Implementar lógica para reagendar
    setIsEventDetailsDialogOpen(false)
  }

  const eventStyleGetter = (event: Event) => {
    let backgroundColor = "#3182ce" // Azul padrão

    if (event.status === "COMPLETED") {
      backgroundColor = "#38a169" // Verde para sessões concluídas
    } else if (event.status === "CANCELED") {
      backgroundColor = "#e53e3e" // Vermelho para sessões canceladas
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0",
        display: "block",
      },
    }
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

  const CustomToolbar = ({ label, onNavigate, onView }: any) => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onNavigate("TODAY")}>
            Hoje
          </Button>
          <Button variant="outline" size="icon" onClick={() => onNavigate("PREV")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onNavigate("NEXT")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{label}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Selecionar data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  if (date) {
                    onNavigate("DATE", date)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select
            defaultValue={view}
            onValueChange={(value) => {
              setView(value as any)
              onView(value)
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Visualização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Views.MONTH}>Mês</SelectItem>
              <SelectItem value={Views.WEEK}>Semana</SelectItem>
              <SelectItem value={Views.DAY}>Dia</SelectItem>
              <SelectItem value={Views.AGENDA}>Agenda</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" onClick={() => setIsNewEventDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Agenda</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Carregando agenda...</div>
        ) : (
          <div className="h-[700px]">
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
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              defaultView={Views.WEEK}
              eventPropGetter={eventStyleGetter}
              components={{
                toolbar: CustomToolbar,
              }}
              date={date}
              onNavigate={setDate}
              view={view}
              onView={setView as any}
            />
          </div>
        )}
      </CardContent>

      {/* Diálogo de detalhes do evento */}
      <Dialog open={isEventDetailsDialogOpen} onOpenChange={setIsEventDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.start && format(selectedEvent.start, "PPP", { locale: ptBR })} •{" "}
              {selectedEvent?.start && format(selectedEvent.start, "HH:mm", { locale: ptBR })} -{" "}
              {selectedEvent?.end && format(selectedEvent.end, "HH:mm", { locale: ptBR })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="text-sm text-muted-foreground">Cliente</Label>
              <p className="font-medium">{selectedEvent?.clientName}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              <div className="mt-1">
                {selectedEvent?.status === "SCHEDULED" && <Badge variant="outline">Agendada</Badge>}
                {selectedEvent?.status === "COMPLETED" && <Badge className="bg-green-500">Concluída</Badge>}
                {selectedEvent?.status === "CANCELED" && <Badge variant="destructive">Cancelada</Badge>}
              </div>
            </div>

            {selectedEvent?.notes && (
              <div>
                <Label className="text-sm text-muted-foreground">Observações</Label>
                <p className="mt-1">{selectedEvent.notes}</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleRescheduleEvent}>
                Remarcar
              </Button>
              <Button variant="destructive" onClick={handleDeleteEvent}>
                Cancelar Sessão
              </Button>
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
              {selectedSlot?.start && format(selectedSlot.start, "PPP", { locale: ptBR })} •{" "}
              {selectedSlot?.start && format(selectedSlot.start, "HH:mm", { locale: ptBR })} -{" "}
              {selectedSlot?.end && format(selectedSlot.end, "HH:mm", { locale: ptBR })}
            </DialogDescription>
          </DialogHeader>
          <form action={handleCreateEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Cliente
                </Label>
                <Select name="client" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select name="type" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Tipo de sessão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pilates Individual">Pilates Individual</SelectItem>
                    <SelectItem value="Pilates em Grupo">Pilates em Grupo</SelectItem>
                    <SelectItem value="Avaliação">Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Observações
                </Label>
                <Textarea className="col-span-3" id="notes" name="notes" placeholder="Observações para esta sessão" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsNewEventDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Agendar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
