"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, RotateCcw } from "lucide-react"
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

// Dados de exemplo
const sessionsData = {
  "client-1": [
    {
      id: 1,
      date: new Date(2025, 2, 13),
      time: "10:00",
      type: "Pilates Individual",
      status: "realizada",
      professional: "Dra. Juliana Mendes",
      notes: "Foco em exercícios para escoliose",
    },
    {
      id: 2,
      date: new Date(2025, 2, 20),
      time: "10:00",
      type: "Pilates Individual",
      status: "agendada",
      professional: "Dra. Juliana Mendes",
      notes: "",
    },
    {
      id: 3,
      date: new Date(2025, 2, 27),
      time: "10:00",
      type: "Pilates Individual",
      status: "agendada",
      professional: "Dra. Juliana Mendes",
      notes: "",
    },
  ],
  "client-2": [
    {
      id: 1,
      date: new Date(2025, 2, 13),
      time: "14:00",
      type: "Pilates em Grupo",
      status: "realizada",
      professional: "Dr. Ricardo Santos",
      notes: "Progresso na recuperação do joelho",
    },
    {
      id: 2,
      date: new Date(2025, 2, 19),
      time: "14:00",
      type: "Pilates em Grupo",
      status: "agendada",
      professional: "Dr. Ricardo Santos",
      notes: "",
    },
  ],
  "client-3": [
    {
      id: 1,
      date: new Date(2025, 1, 1),
      time: "09:00",
      type: "Avaliação",
      status: "realizada",
      professional: "Dra. Juliana Mendes",
      notes: "Última sessão antes da pausa",
    },
  ],
}

export function ClientSessions({ clientId }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)

  const sessions = sessionsData[clientId] || []

  // Datas com sessões para destacar no calendário
  const sessionDates = sessions.map((session) => session.date)

  const getStatusBadge = (status) => {
    switch (status) {
      case "realizada":
        return <Badge className="bg-green-500">Realizada</Badge>
      case "agendada":
        return <Badge variant="outline">Agendada</Badge>
      case "cancelada":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleReschedule = (session) => {
    setSelectedSession(session)
    setIsRescheduleDialogOpen(true)
  }

  const confirmReschedule = () => {
    // Aqui seria implementada a lógica para remarcar a sessão
    alert("Sessão remarcada com sucesso!")
    setIsRescheduleDialogOpen(false)
  }

  // Filtrar sessões para a data selecionada
  const sessionsForSelectedDate = sessions.filter(
    (session) =>
      session.date.getDate() === selectedDate.getDate() &&
      session.date.getMonth() === selectedDate.getMonth() &&
      session.date.getFullYear() === selectedDate.getFullYear(),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Calendário de Sessões</CardTitle>
          <CardDescription>Visualize as sessões agendadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            modifiers={{
              booked: sessionDates,
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                backgroundColor: "hsl(var(--primary) / 0.1)",
                color: "hsl(var(--primary))",
              },
            }}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Sessões</CardTitle>
          <CardDescription>Gerenciamento de sessões do cliente</CardDescription>
        </CardHeader>
        <CardContent>
          {sessionsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {sessionsForSelectedDate.map((session) => (
                <div key={session.id} className="flex flex-col border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{session.date.toLocaleDateString("pt-BR")}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
                      <span>{session.time}</span>
                    </div>
                    <div>{getStatusBadge(session.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p>{session.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profissional</p>
                      <p>{session.professional}</p>
                    </div>
                  </div>

                  {session.notes && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Observações</p>
                      <p className="text-sm">{session.notes}</p>
                    </div>
                  )}

                  {session.status === "agendada" && (
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleReschedule(session)}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Remarcar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhuma sessão encontrada para esta data.</div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remarcar Sessão</DialogTitle>
            <DialogDescription>Selecione uma nova data e horário para a sessão.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={selectedSession?.date || new Date()}
                  onSelect={(date) => setSelectedDate(date)}
                  locale={ptBR}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Horário
              </Label>
              <Select defaultValue={selectedSession?.time || "10:00"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmReschedule}>Confirmar Remarcação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

