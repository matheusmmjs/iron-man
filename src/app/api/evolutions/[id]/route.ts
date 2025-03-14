import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
let evolutions = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const evolution = evolutions.find((e) => e.id === params.id)

    if (!evolution) {
      return NextResponse.json({ error: "Evolução não encontrada" }, { status: 404 })
    }

    return NextResponse.json(evolution)
  } catch (error) {
    console.error("Erro ao buscar evolução:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const evolutionIndex = evolutions.findIndex((e) => e.id === params.id)

    if (evolutionIndex === -1) {
      return NextResponse.json({ error: "Evolução não encontrada" }, { status: 404 })
    }

    // Validação básica
    if (!body.notes || !body.clientId) {
      return NextResponse.json({ error: "Anotações e cliente são obrigatórios" }, { status: 400 })
    }

    // Atualizar evolução
    const updatedEvolution = {
      ...evolutions[evolutionIndex],
      date: body.date || evolutions[evolutionIndex].date,
      notes: body.notes,
      clientId: body.clientId,
      professional: body.professional || evolutions[evolutionIndex].professional,
      updatedAt: new Date().toISOString(),
    }

    evolutions[evolutionIndex] = updatedEvolution

    return NextResponse.json(updatedEvolution)
  } catch (error) {
    console.error("Erro ao atualizar evolução:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const evolutionIndex = evolutions.findIndex((e) => e.id === params.id)

    if (evolutionIndex === -1) {
      return NextResponse.json({ error: "Evolução não encontrada" }, { status: 404 })
    }

    // Remover evolução
    evolutions = evolutions.filter((e) => e.id !== params.id)

    return NextResponse.json({ message: "Evolução removida com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover evolução:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
