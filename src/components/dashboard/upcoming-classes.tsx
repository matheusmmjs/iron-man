"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados de exemplo
const upcomingClasses = [
  {
    id: "1",
    title: "Pilates Individual",
    client: {
      id: "1",
      name: "Ana Silva",
      imageUrl: "/placeholder.svg?height=32&width=32",
    },
    instructor: "Dra. Juliana Mendes",
    date: new Date(2023, 5, 15, 10, 0),
    status: "confirmada",
  },
  {
    id: "2",
    title: "Pilates em Grupo",
    client: {
      id: "2",
      name: "Carlos Oliveira",
      imageUrl: "/placeholder.svg?height=32&width=32",
    },
    instructor: "Dr. Ricardo Santos",
    date: new Date(2023, 5, 15, 14, 0),
    status: "confirmada",
  },
  {
    id: "3",
    title: "Avaliação",
    client: {
      id: "3",
      name: "Mariana Santos",
      imageUrl: "/placeholder.svg?height=32&width=32",
    },
    instructor: "Dra. Juliana Mendes",
    date: new Date(2023, 5, 16, 9, 0),
    status: "pendente",
  },
]

export function UpcomingClasses() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-green-500">Confirmada</Badge>
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {upcomingClasses.map((session) => (
          <div key={session.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={session.client.imageUrl} alt={session.client.name} />
                <AvatarFallback>
                  {session.client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{session.title}</p>
                <p className="text-sm text-muted-foreground">{session.client.name}</p>
                <p className="text-xs text-muted-foreground">{session.instructor}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-sm font-medium">{format(session.date, "dd/MM/yyyy", { locale: ptBR })}</div>
              <div className="text-sm text-muted-foreground">{format(session.date, "HH:mm", { locale: ptBR })}</div>
              {getStatusBadge(session.status)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
