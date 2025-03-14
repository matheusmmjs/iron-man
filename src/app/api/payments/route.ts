import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
const payments = [
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

export async function GET(request: Request) {
  try {
    // Em produção, filtrar por tenantId do usuário autenticado
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || "1"
    const clientId = searchParams.get("clientId")

    let filteredPayments = payments.filter((payment) => payment.tenantId === tenantId)

    if (clientId) {
      filteredPayments = filteredPayments.filter((payment) => payment.clientId === clientId)
    }

    return NextResponse.json(filteredPayments)
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.amount || !body.dueDate || !body.clientId) {
      return NextResponse.json({ error: "Valor, data de vencimento e cliente são obrigatórios" }, { status: 400 })
    }

    // Em produção, isso seria salvo no banco de dados
    const newPayment = {
      id: Date.now().toString(),
      amount: body.amount,
      date: body.date || new Date().toISOString(),
      dueDate: body.dueDate,
      status: body.status || "PENDING",
      method: body.method || "",
      description: body.description || "",
      clientId: body.clientId,
      tenantId: body.tenantId || "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    payments.push(newPayment)

    return NextResponse.json(newPayment, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
