import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
const schedules = [
  {
    id: "1",
    title: "Pilates Individual",
    start: "2025-03-13T10:00:00.000Z",
    end: "2025-03-13T11:00:00.000Z",
    status: "SCHEDULED",
    notes: "Foco em exercícios para escoliose",
    clientId: "1",
    userId: "1",
    tenantId: "1",
    createdAt: "2025-03-01T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Pilates em Grupo",
    start: "2025-03-13T14:00:00.000Z",
    end: "2025-03-13T15:00:00.000Z",
    status: "SCHEDULED",
    notes: "",
    clientId: "2",
    userId: "1",
    tenantId: "1",
    createdAt: "2025-03-01T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Avaliação",
    start: "2025-03-14T09:00:00.000Z",
    end: "2025-03-14T10:00:00.000Z",
    status: "SCHEDULED",
    notes: "Primeira avaliação",
    clientId: "3",
    userId: "1",
    tenantId: "1",
    createdAt: "2025-03-01T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z",
  },
]

export async function GET(request: Request) {
  try {
    // Em produção, filtrar por tenantId do usuário autenticado
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || "1"
    const clientId = searchParams.get("clientId")

    let filteredSchedules = schedules.filter((schedule) => schedule.tenantId === tenantId)

    if (clientId) {
      filteredSchedules = filteredSchedules.filter((schedule) => schedule.clientId === clientId)
    }

    return NextResponse.json(filteredSchedules)
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.title || !body.start || !body.end || !body.clientId) {
      return NextResponse.json(
        { error: "Título, horário de início, horário de término e cliente são obrigatórios" },
        { status: 400 },
      )
    }

    // Em produção, isso seria salvo no banco de dados
    const newSchedule = {
      id: Date.now().toString(),
      title: body.title,
      start: body.start,
      end: body.end,
      status: body.status || "SCHEDULED",
      notes: body.notes || "",
      clientId: body.clientId,
      userId: body.userId || "1",
      tenantId: body.tenantId || "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    schedules.push(newSchedule)

    return NextResponse.json(newSchedule, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
