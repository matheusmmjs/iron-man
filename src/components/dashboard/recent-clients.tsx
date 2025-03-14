"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "next/navigation"

// Dados de exemplo
const recentClients = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    createdAt: new Date(2023, 5, 15),
    imageUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    createdAt: new Date(2023, 5, 10),
    imageUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    createdAt: new Date(2023, 5, 5),
    imageUrl: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentClients() {
  const router = useRouter()

  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {recentClients.map((client) => (
          <div key={client.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={client.imageUrl} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(client.createdAt, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push(`/private/studio/clients/${client.id}`)}>
                Ver
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
