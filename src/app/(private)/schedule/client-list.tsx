"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Dados de exemplo
const clients = [
  {
    id: "client-1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    status: "ativo",
    lastSession: "13/03/2025",
    nextSession: "20/03/2025",
    paymentStatus: "em dia",
  },
  {
    id: "client-2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 91234-5678",
    status: "ativo",
    lastSession: "12/03/2025",
    nextSession: "19/03/2025",
    paymentStatus: "pendente",
  },
  {
    id: "client-3",
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    phone: "(11) 99876-5432",
    status: "inativo",
    lastSession: "01/02/2025",
    nextSession: "N/A",
    paymentStatus: "atrasado",
  },
]

export function ClientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  )

  const viewClientProfile = (clientId) => {
    router.push(`/clients/${clientId}`)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "inativo":
        return <Badge variant="secondary">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (status) => {
    switch (status) {
      case "em dia":
        return <Badge className="bg-green-500">Em dia</Badge>
      case "pendente":
        return (
          <Badge variant="outline" className="bg-yellow-500 text-primary-foreground">
            Pendente
          </Badge>
        )
      case "atrasado":
        return <Badge variant="destructive">Atrasado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
        <CardDescription>Gerencie todos os clientes do estúdio de pilates.</CardDescription>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cliente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Novo Cliente</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Sessão</TableHead>
              <TableHead>Próxima Sessão</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{getStatusBadge(client.status)}</TableCell>
                <TableCell>{client.lastSession}</TableCell>
                <TableCell>{client.nextSession}</TableCell>
                <TableCell>{getPaymentBadge(client.paymentStatus)}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => viewClientProfile(client.id)}>
                    Ver Perfil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

