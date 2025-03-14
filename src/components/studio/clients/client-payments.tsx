"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import Link from "next/link"

interface Payment {
  id: string
  amount: string
  date: string
  dueDate: string
  method: string
  status: string
  description: string
}

interface ClientPaymentsProps {
  payments: Payment[]
  clientId: string
}

export function ClientPayments({ payments, clientId }: ClientPaymentsProps) {
  const getStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Histórico de Pagamentos</h3>
        <Link href={`/studio/payments/new?client=${clientId}`}>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pagamento
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-[300px]">
        {payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">{payment.description}</div>
                    <div className="text-sm text-muted-foreground">Método: {payment.method}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{payment.amount}</div>
                    <div className="text-sm text-muted-foreground">Vencimento: {payment.dueDate}</div>
                    {getStatusBadge(payment.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Nenhum pagamento encontrado para este cliente.</div>
        )}
      </ScrollArea>
    </div>
  )
}
