import { ArrowLeft, Calendar, CreditCard, Edit, FileText, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ClientEvolution } from "./client-evolution"
import { ClientPayments } from "./client-payments"
import { ClientSessions } from "./client-sessions"

// Dados de exemplo
const clientData = {
  "client-1": {
    id: "client-1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    status: "ativo",
    startDate: "10/01/2023",
    birthDate: "15/05/1985",
    address: "Rua das Flores, 123 - São Paulo, SP",
    objective: "Fortalecimento e correção postural",
    medicalConditions: "Escoliose leve",
    paymentStatus: "em dia",
    plan: "Plano Mensal - 2x por semana",
    nextPayment: "05/04/2025",
    lastPayment: "05/03/2025",
  },
  "client-2": {
    id: "client-2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 91234-5678",
    status: "ativo",
    startDate: "05/03/2023",
    birthDate: "22/08/1990",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    objective: "Reabilitação pós-cirúrgica",
    medicalConditions: "Cirurgia no joelho em 12/2022",
    paymentStatus: "pendente",
    plan: "Plano Trimestral - 3x por semana",
    nextPayment: "15/03/2025",
    lastPayment: "15/12/2024",
  },
  "client-3": {
    id: "client-3",
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    phone: "(11) 99876-5432",
    status: "inativo",
    startDate: "20/06/2022",
    birthDate: "10/11/1978",
    address: "Rua Augusta, 500 - São Paulo, SP",
    objective: "Condicionamento físico geral",
    medicalConditions: "Hipertensão controlada",
    paymentStatus: "atrasado",
    plan: "Plano Mensal - 1x por semana",
    nextPayment: "01/03/2025",
    lastPayment: "01/01/2025",
  },
}

export default function ClientProfilePage({ params }) {
  const clientId = params.id
  const client = clientData[clientId] || {
    id: clientId,
    name: "Cliente não encontrado",
    status: "desconhecido",
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
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/schedule">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Perfil do Cliente</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Informações Pessoais</CardTitle>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <div className="mt-2">{getStatusBadge(client.status)}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                  <p>{client.birthDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Cliente desde</p>
                  <p>{client.startDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Objetivo</p>
                  <p>{client.objective}</p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Plano</p>
                  <p>{client.plan}</p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Status de Pagamento</p>
                  <p>{getPaymentBadge(client.paymentStatus)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes de Contato</CardTitle>
            <CardDescription>Informações para contato com o cliente</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{client.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p className="font-medium">{client.address}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Condições Médicas</p>
              <p className="font-medium">{client.medicalConditions}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evolucao" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          <TabsTrigger value="sessoes">Sessões</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="evolucao">
          <ClientEvolution clientId={clientId} />
        </TabsContent>
        <TabsContent value="sessoes">
          <ClientSessions clientId={clientId} />
        </TabsContent>
        <TabsContent value="pagamentos">
          <ClientPayments clientId={clientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

