import { PaymentsTable } from "@/components/studio/payments/payments-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

// Dados de exemplo
const payments = [
  {
    id: "1",
    client: "Ana Silva",
    clientId: "1",
    amount: "R$ 450,00",
    date: "05/03/2025",
    dueDate: "05/03/2025",
    method: "Cartão de Crédito",
    status: "pago",
    description: "Mensalidade Março/2025",
    invoice: "INV-2025-0301",
  },
  {
    id: "2",
    client: "Carlos Oliveira",
    clientId: "2",
    amount: "R$ 600,00",
    date: "15/02/2025",
    dueDate: "15/03/2025",
    method: "Transferência Bancária",
    status: "pendente",
    description: "Trimestral (Mar/2025 - Mai/2025)",
    invoice: "INV-2025-0302",
  },
  {
    id: "3",
    client: "Mariana Santos",
    clientId: "3",
    amount: "R$ 250,00",
    date: "01/01/2025",
    dueDate: "01/03/2025",
    method: "Pendente",
    status: "atrasado",
    description: "Mensalidade Março/2025",
    invoice: "INV-2025-0303",
  },
]

export default function PaymentsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pagamentos</CardTitle>
        <Link href="/studio/payments/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pagamento
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <PaymentsTable payments={payments} />
      </CardContent>
    </Card>
  )
}
