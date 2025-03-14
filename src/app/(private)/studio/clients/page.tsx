import { ClientsTable } from "@/components/studio/clients/clients-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"

// Dados de exemplo - em produção, isso viria do banco de dados
const clients = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    status: "ACTIVE",
    birthDate: "1990-05-15T00:00:00.000Z",
    createdAt: "2023-01-10T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 91234-5678",
    status: "ACTIVE",
    birthDate: "1985-08-22T00:00:00.000Z",
    createdAt: "2023-02-15T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    phone: "(11) 99876-5432",
    status: "INACTIVE",
    birthDate: "1978-11-10T00:00:00.000Z",
    createdAt: "2022-06-20T00:00:00.000Z",
  },
]

export default function ClientsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Clientes</CardTitle>
        <Link href="/studio/clients/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <ClientsTable clients={clients} />
      </CardContent>
    </Card>
  )
}
