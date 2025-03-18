import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Em produção, isso seria conectado ao Prisma
let homeExercises = [
  {
    id: "1",
    title: "Alongamento para Coluna",
    description: "Série de alongamentos para aliviar tensão na coluna após o dia de trabalho",
    type: "VIDEO",
    url: "https://www.youtube.com/watch?v=example1",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "BEGINNER",
    duration: 15,
    bodyArea: "Coluna",
    status: "PUBLISHED",
    tenantId: "1",
    createdAt: "2023-05-10T00:00:00.000Z",
    updatedAt: "2023-05-10T00:00:00.000Z",
    createdBy: "1",
    updatedBy: "1",
  },
  {
    id: "2",
    title: "Fortalecimento de Core",
    description: "Exercícios para fortalecer a musculatura abdominal e lombar",
    type: "VIDEO",
    url: "https://www.youtube.com/watch?v=example2",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "INTERMEDIATE",
    duration: 20,
    bodyArea: "Abdômen",
    status: "PUBLISHED",
    tenantId: "1",
    createdAt: "2023-06-15T00:00:00.000Z",
    updatedAt: "2023-06-15T00:00:00.000Z",
    createdBy: "1",
    updatedBy: "1",
  },
  {
    id: "3",
    title: "Guia de Mobilidade Articular",
    description: "PDF com guia completo de exercícios de mobilidade para praticar em casa",
    type: "PDF",
    url: "https://example.com/mobilidade.pdf",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "BEGINNER",
    bodyArea: "Articulações",
    status: "DRAFT",
    tenantId: "1",
    createdAt: "2023-07-20T00:00:00.000Z",
    updatedAt: "2023-07-20T00:00:00.000Z",
    createdBy: "1",
    updatedBy: "1",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await verifyAuth(token)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const exercise = homeExercises.find((e) => e.id === params.id)

    if (!exercise) {
      return NextResponse.json({ error: "Exercício não encontrado" }, { status: 404 })
    }

    // Verificar se o exercício pertence ao tenant do usuário
    if (exercise.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    return NextResponse.json(exercise)
  } catch (error) {
    console.error("Erro ao buscar exercício:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await verifyAuth(token)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()

    // Validação básica
    if (!body.title || !body.url || !body.type) {
      return NextResponse.json({ error: "Título, URL e tipo são obrigatórios" }, { status: 400 })
    }

    // Verificar se o exercício existe e pertence ao tenant do usuário
    const existingExercise = homeExercises.find((e) => e.id === params.id)

    if (!existingExercise) {
      return NextResponse.json({ error: "Exercício não encontrado" }, { status: 404 })
    }

    if (existingExercise.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Atualizar exercício
    const updatedExercise = {
      ...existingExercise,
      title: body.title,
      description: body.description || existingExercise.description,
      type: body.type,
      url: body.url,
      thumbnail: body.thumbnail || existingExercise.thumbnail,
      difficulty: body.difficulty || existingExercise.difficulty,
      duration: body.duration || existingExercise.duration,
      bodyArea: body.bodyArea || existingExercise.bodyArea,
      status: body.status || existingExercise.status,
      updatedAt: new Date().toISOString(),
      updatedBy: user.userId,
    }

    homeExercises = homeExercises.map((e) => (e.id === params.id ? updatedExercise : e))

    return NextResponse.json(updatedExercise)
  } catch (error) {
    console.error("Erro ao atualizar exercício:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await verifyAuth(token)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar se o exercício existe e pertence ao tenant do usuário
    const existingExercise = homeExercises.find((e) => e.id === params.id)

    if (!existingExercise) {
      return NextResponse.json({ error: "Exercício não encontrado" }, { status: 404 })
    }

    if (existingExercise.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Remover exercício
    homeExercises = homeExercises.filter((e) => e.id !== params.id)

    return NextResponse.json({ message: "Exercício removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover exercício:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
