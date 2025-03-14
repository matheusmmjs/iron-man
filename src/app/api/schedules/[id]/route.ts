import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
let schedules = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const schedule = schedules.find((s) => s.id === params.id)

    if (!schedule) {
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(schedule)
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const scheduleIndex = schedules.findIndex((s) => s.id === params.id)

    if (scheduleIndex === -1) {
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 })
    }

    // Validação básica
    if (!body.title || !body.start || !body.end || !body.clientId) {
      return NextResponse.json(
        { error: "Título, horário de início, horário de término e cliente são obrigatórios" },
        { status: 400 },
      )
    }

    // Atualizar agendamento
    const updatedSchedule = {
      ...schedules[scheduleIndex],
      title: body.title,
      start: body.start,
      end: body.end,
      status: body.status || schedules[scheduleIndex].status,
      notes: body.notes || schedules[scheduleIndex].notes,
      clientId: body.clientId,
      updatedAt: new Date().toISOString(),
    }

    schedules[scheduleIndex] = updatedSchedule

    return NextResponse.json(updatedSchedule)
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const scheduleIndex = schedules.findIndex((s) => s.id === params.id)

    if (scheduleIndex === -1) {
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 })
    }

    // Remover agendamento
    schedules = schedules.filter((s) => s.id !== params.id)

    return NextResponse.json({ message: "Agendamento removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover agendamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
