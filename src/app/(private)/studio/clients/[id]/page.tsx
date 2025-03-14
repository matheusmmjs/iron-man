import { ClientDetails } from "@/components/studio/clients/client-details"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Pencil } from "lucide-react"
import Link from "next/link"
import { ClientEvolution } from "@/components/studio/clients/client-evolution"
import { ClientSessions } from "@/components/studio/clients/client-sessions"
import { ClientPayments } from "@/components/studio/clients/client-payments"

// Dados de exemplo - em produção, isso viria do banco de dados
const clients = {
  "1": {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    address: "Rua das Flores, 123 - São Paulo, SP",
    status: "ACTIVE",
    birthDate: "1990-05-15T00:00:00.000Z",
    createdAt: "2023-01-10T00:00:00.000Z",
    objective: "Fortalecimento e correção postural",
    medicalConditions: "Escoliose leve",
  },
  "2": {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 91234-5678",
    cpf: "987.654.321-00",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    status: "ACTIVE",
    birthDate: "1985-08-22T00:00:00.000Z",
    createdAt: "2023-02-15T00:00:00.000Z",
    objective: "Recuperação de lesão no joelho",
    medicalConditions: "Pós-cirúrgico de menisco",
  },
  "3": {
    id: "3",
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    phone: "(11) 99876-5432",
    cpf: "456.789.123-00",
    address: "Rua Augusta, 500 - São Paulo, SP",
    status: "INACTIVE",
    birthDate: "1978-11-10T00:00:00.000Z",
    createdAt: "2022-06-20T00:00:00.000Z",
    objective: "Condicionamento físico geral",
    medicalConditions: "Hipertensão controlada",
  },
}

// Dados de evolução
const evolutions = {
  "1": [
    {
      id: 1,
      date: "10/03/2025",
      notes:
        "Cliente apresentou melhora significativa na postura. Exercícios de fortalecimento da cadeia posterior estão mostrando resultados positivos.",
      professional: "Dra. Juliana Mendes",
    },
    {
      id: 2,
      date: "24/02/2025",
      notes:
        "Iniciamos trabalho específico para escoliose. Cliente relatou desconforto leve após a sessão anterior, ajustamos a intensidade dos exercícios.",
      professional: "Dra. Juliana Mendes",
    },
  ],
  "2": [
    {
      id: 1,
      date: "12/03/2025",
      notes: "Progresso na recuperação do joelho. Aumentamos a carga nos exercícios de fortalecimento do quadríceps.",
      professional: "Dr. Ricardo Santos",
    },
  ],
  "3": [
    {
      id: 1,
      date: "05/01/2025",
      notes: "Última sessão antes da pausa. Cliente relatou satisfação com os resultados obtidos até o momento.",
      professional: "Dra. Juliana Mendes",
    },
  ],
}

// Dados de sessões
const sessions = {
  "1": [
    {
      id: "1",
      title: "Pilates Individual",
      date: new Date(2023, 5, 15, 10, 0),
      instructor: "Dra. Juliana Mendes",
      status: "completed",
      notes: "Foco em exercícios para escoliose",
    },
    {
      id: "2",
      title: "Pilates Individual",
      date: new Date(2023, 5, 8, 10, 0),
      instructor: "Dra. Juliana Mendes",
      status: "completed",
      notes: "Avaliação postural realizada",
    },
  ],
  "2": [
    {
      id: "1",
      title: "Pilates Individual",
      date: new Date(2023, 5, 12, 14, 0),
      instructor: "Dr. Ricardo Santos",
      status: "completed",
      notes: "Exercícios específicos para joelho",
    },
  ],
  "3": [
    {
      id: "1",
      title: "Avaliação",
      date: new Date(2023, 1, 5, 9, 0),
      instructor: "Dra. Juliana Mendes",
      status: "completed",
      notes: "Avaliação inicial",
    },
  ],
}

// Dados de pagamentos
const payments = {
  "1": [
    {
      id: "1",
      amount: "R$ 450,00",
      date: "05/03/2025",
      dueDate: "05/03/2025",
      method: "Cartão de Crédito",
      status: "pago",
      description: "Mensalidade Março/2025",
    },
    {
      id: "2",
      amount: "R$ 450,00",
      date: "05/02/2025",
      dueDate: "05/02/2025",
      method: "Cartão de Crédito",
      status: "pago",
      description: "Mensalidade Fevereiro/2025",
    },
  ],
  "2": [
    {
      id: "1",
      amount: "R$ 600,00",
      date: "15/02/2025",
      dueDate: "15/03/2025",
      method: "Transferência Bancária",
      status: "pendente",
      description: "Trimestral (Mar/2025 - Mai/2025)",
    },
  ],
  "3": [
    {
      id: "1",
      amount: "R$ 250,00",
      date: "01/01/2025",
      dueDate: "01/03/2025",
      method: "Pendente",
      status: "atrasado",
      description: "Mensalidade Março/2025",
    },
  ],
}

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Aguarde a resolução de `params`

  const client = clients[id];
  const clientEvolutions = evolutions[id] || [];
  const clientSessions = sessions[id] || [];
  const clientPayments = payments[id] || [];

  if (!client) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Cliente não encontrado</h2>
          <p className="text-muted-foreground mb-4">O cliente solicitado não existe ou foi removido.</p>
          <Link href="/studio/clients">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para lista de clientes
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/studio/clients">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </Link>
        <Link href={`/studio/clients/${id}/edit`}>
          <Button size="sm">
            <Pencil className="mr-2 h-4 w-4" /> Editar
          </Button>
        </Link>
      </div>
      <ClientDetails client={client} />
      <Tabs defaultValue="evolution" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="evolution" className="mt-4">
          <Card className="p-4">
            <ClientEvolution evolutions={clientEvolutions} clientId={id} />
          </Card>
        </TabsContent>
        <TabsContent value="sessions" className="mt-4">
          <Card className="p-4">
            <ClientSessions sessions={clientSessions} clientId={id} />
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <Card className="p-4">
            <ClientPayments payments={clientPayments} clientId={id} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
