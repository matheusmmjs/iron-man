import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
let payments = [
  {
    id: "1",
    amount: 450.0,
    date: "2025-03-05T00:00:00.000Z",
    dueDate: "2025-03-05T00:00:00.000Z",
    status: "PAID",
    method: "Cartão de Crédito",
    description: "Mensalidade Março/2025",
    clientId: "1",
    tenantId: "1",
    createdAt: "2025-03-05T00:00:00.000Z",
    updatedAt: "2025-03-05T00:00:00.000Z",
  },
  {
    id: "2",
    amount: 600.0,
    date: "2025-02-15T00:00:00.000Z",
    dueDate: "2025-03-15T00:00:00.000Z",
    status: "PENDING",
    method: "Transferência Bancária",
    description: "Trimestral (Mar/2025 - Mai/2025)",
    clientId: "2",
    tenantId: "1",
    createdAt: "2025-02-15T00:00:00.000Z",
    updatedAt: "2025-02-15T00:00:00.000Z",
  },
  {
    id: "3",
    amount: 250.0,
    date: "2025-01-01T00:00:00.000Z",
    dueDate: "2025-03-01T00:00:00.000Z",
    status: "OVERDUE",
    method: "Pendente",
    description: "Mensalidade Março/2025",
    clientId: "3",
    tenantId: "1",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const payment = payments.find((p) => p.id === params.id)

    if (!payment) {
      return NextResponse.json({ error: "Pagamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Erro ao buscar pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const paymentIndex = payments.findIndex((p) => p.id === params.id)

    if (paymentIndex === -1) {
      return NextResponse.json({ error: "Pagamento não encontrado" }, { status: 404 })
    }

    // Validação básica
    if (!body.amount || !body.dueDate || !body.clientId) {
      return NextResponse.json({ error: "Valor, data de vencimento e cliente são obrigatórios" }, { status: 400 })
    }

    // Atualizar pagamento
    const updatedPayment = {
      ...payments[paymentIndex],
      amount: body.amount,
      date: body.date || payments[paymentIndex].date,
      dueDate: body.dueDate,
      status: body.status || payments[paymentIndex].status,
      method: body.method || payments[paymentIndex].method,
      description: body.description || payments[paymentIndex].description,
      clientId: body.clientId,
      updatedAt: new Date().toISOString(),
    }

    payments[paymentIndex] = updatedPayment

    return NextResponse.json(updatedPayment)
  } catch (error) {
    console.error("Erro ao atualizar pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentIndex = payments.findIndex((p) => p.id === params.id)

    if (paymentIndex === -1) {
      return NextResponse.json({ error: "Pagamento não encontrado" }, { status: 404 })
    }

    // Remover pagamento
    payments = payments.filter((p) => p.id !== params.id)

    return NextResponse.json({ message: "Pagamento removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
