"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Plus } from "lucide-react"
import Link from "next/link"

interface Session {
  id: string
  title: string
  date: Date
  instructor: string
  status: string
  notes: string
}

interface ClientSessionsProps {
  sessions: Session[]
  clientId: string
}

export function ClientSessions({ sessions, clientId }: ClientSessionsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Concluída</Badge>
      case "scheduled":
        return <Badge variant="outline">Agendada</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Histórico de Sessões</h3>
        <Link href={`/studio/schedule?client=${clientId}`}>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nova Sessão
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-[300px]">
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">{session.title}</div>
                    <div className="text-sm text-muted-foreground">{session.instructor}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{format(session.date, "dd/MM/yyyy", { locale: ptBR })}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(session.date, "HH:mm", { locale: ptBR })}
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                </div>
                {session.notes && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Observações:</span> {session.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Nenhuma sessão encontrada para este cliente.</div>
        )}
      </ScrollArea>
    </div>
  )
}
