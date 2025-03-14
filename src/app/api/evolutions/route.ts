import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
const evolutions = [
  {
    id: "1",
    date: "2025-03-10T00:00:00.000Z",
    notes:
      "Cliente apresentou melhora significativa na postura. Exercícios de fortalecimento da cadeia posterior estão mostrando resultados positivos.",
    clientId: "1",
    tenantId: "1",
    professional: "Dra. Juliana Mendes",
    createdAt: "2025-03-10T00:00:00.000Z",
    updatedAt: "2025-03-10T00:00:00.000Z",
  },
  {
    id: "2",
    date: "2025-02-24T00:00:00.000Z",
    notes:
      "Iniciamos trabalho específico para escoliose. Cliente relatou desconforto leve após a sessão anterior, ajustamos a intensidade dos exercícios.",
    clientId: "1",
    tenantId: "1",
    professional: "Dra. Juliana Mendes",
    createdAt: "2025-02-24T00:00:00.000Z",
    updatedAt: "2025-02-24T00:00:00.000Z",
  },
  {
    id: "3",
    date: "2025-03-12T00:00:00.000Z",
    notes: "Progresso na recuperação do joelho. Aumentamos a carga nos exercícios de fortalecimento do quadríceps.",
    clientId: "2",
    tenantId: "1",
    professional: "Dr. Ricardo Santos",
    createdAt: "2025-03-12T00:00:00.000Z",
    updatedAt: "2025-03-12T00:00:00.000Z",
  },
  {
    id: "4",
    date: "2025-01-05T00:00:00.000Z",
    notes: "Última sessão antes da pausa. Cliente relatou satisfação com os resultados obtidos até o momento.",
    clientId: "3",
    tenantId: "1",
    professional: "Dra. Juliana Mendes",
    createdAt: "2025-01-05T00:00:00.000Z",
    updatedAt: "2025-01-05T00:00:00.000Z",
  },
]

export async function GET(request: Request) {
  try {
    // Em produção, filtrar por tenantId do usuário autenticado
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || "1"
    const clientId = searchParams.get("clientId")

    let filteredEvolutions = evolutions.filter((evolution) => evolution.tenantId === tenantId)

    if (clientId) {
      filteredEvolutions = filteredEvolutions.filter((evolution) => evolution.clientId === clientId)
    }

    return NextResponse.json(filteredEvolutions)
  } catch (error) {
    console.error("Erro ao buscar evoluções:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.notes || !body.clientId) {
      return NextResponse.json({ error: "Anotações e cliente são obrigatórios" }, { status: 400 })
    }

    // Em produção, isso seria salvo no banco de dados
    const newEvolution = {
      id: Date.now().toString(),
      date: body.date || new Date().toISOString(),
      notes: body.notes,
      clientId: body.clientId,
      tenantId: body.tenantId || "1",
      professional: body.professional || "Profissional",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    evolutions.push(newEvolution)

    return NextResponse.json(newEvolution, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar evolução:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
