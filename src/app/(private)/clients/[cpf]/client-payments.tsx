"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Plus } from "lucide-react"

// Dados de exemplo
const paymentsData = {
  "client-1": [
    {
      id: 1,
      date: "05/03/2025",
      amount: "R$ 450,00",
      method: "Cartão de Crédito",
      status: "pago",
      description: "Mensalidade Março/2025",
      invoice: "INV-2025-0301",
    },
    {
      id: 2,
      date: "05/02/2025",
      amount: "R$ 450,00",
      method: "Cartão de Crédito",
      status: "pago",
      description: "Mensalidade Fevereiro/2025",
      invoice: "INV-2025-0201",
    },
    {
      id: 3,
      date: "05/01/2025",
      amount: "R$ 450,00",
      method: "Pix",
      status: "pago",
      description: "Mensalidade Janeiro/2025",
      invoice: "INV-2025-0101",
    },
  ],
  "client-2": [
    {
      id: 1,
      date: "15/12/2024",
      amount: "R$ 1.800,00",
      method: "Transferência Bancária",
      status: "pago",
      description: "Trimestral (Dez/2024 - Fev/2025)",
      invoice: "INV-2024-1201",
    },
    {
      id: 2,
      date: "15/03/2025",
      amount: "R$ 1.800,00",
      method: "Pendente",
      status: "pendente",
      description: "Trimestral (Mar/2025 - Mai/2025)",
      invoice: "INV-2025-0301",
    },
  ],
  "client-3": [
    {
      id: 1,
      date: "01/01/2025",
      amount: "R$ 250,00",
      method: "Pix",
      status: "pago",
      description: "Mensalidade Janeiro/2025",
      invoice: "INV-2025-0102",
    },
    {
      id: 2,
      date: "01/02/2025",
      amount: "R$ 250,00",
      method: "Pendente",
      status: "atrasado",
      description: "Mensalidade Fevereiro/2025",
      invoice: "INV-2025-0202",
    },
    {
      id: 3,
      date: "01/03/2025",
      amount: "R$ 250,00",
      method: "Pendente",
      status: "atrasado",
      description: "Mensalidade Março/2025",
      invoice: "INV-2025-0302",
    },
  ],
}

export function ClientPayments({ clientId }) {
  const payments = paymentsData[clientId] || []

  const getStatusBadge = (status) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-500">Pago</Badge>
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

  // Calcular totais
  const totalPaid = payments
    .filter((p) => p.status === "pago")
    .reduce(
      (sum, payment) => sum + Number.parseFloat(payment.amount.replace("R$ ", "").replace(".", "").replace(",", ".")),
      0,
    )

  const totalPending = payments
    .filter((p) => p.status === "pendente" || p.status === "atrasado")
    .reduce(
      (sum, payment) => sum + Number.parseFloat(payment.amount.replace("R$ ", "").replace(".", "").replace(",", ".")),
      0,
    )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalPaid.toFixed(2).replace(".", ",")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalPending.toFixed(2).replace(".", ",")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.find((p) => p.status !== "pago")?.date || "N/A"}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>Registro de todos os pagamentos do cliente</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Registrar Pagamento
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recibo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      {payment.status === "pago" ? (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    Nenhum pagamento registrado para este cliente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

