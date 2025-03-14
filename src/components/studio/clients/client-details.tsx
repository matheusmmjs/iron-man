import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  address: string
  status: string
  birthDate: string
  createdAt: string
  objective: string
  medicalConditions: string
}

interface ClientDetailsProps {
  client: Client
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "INACTIVE":
        return <Badge variant="secondary">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const birthDate = new Date(client.birthDate)
  const age = new Date().getFullYear() - birthDate.getFullYear()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge(client.status)}
              <span className="text-sm text-muted-foreground">
                Cliente desde {format(new Date(client.createdAt), "MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Informações Pessoais</h3>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm col-span-2">{client.email}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">Telefone:</span>
                  <span className="text-sm col-span-2">{client.phone}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">CPF:</span>
                  <span className="text-sm col-span-2">{client.cpf}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">Endereço:</span>
                  <span className="text-sm col-span-2">{client.address}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">Data de Nascimento:</span>
                  <span className="text-sm col-span-2">
                    {format(birthDate, "dd/MM/yyyy", { locale: ptBR })} ({age} anos)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Informações Clínicas</h3>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">Objetivo:</span>
                  <span className="text-sm col-span-2">{client.objective}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-sm font-medium">Condições Médicas:</span>
                  <span className="text-sm col-span-2">{client.medicalConditions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
