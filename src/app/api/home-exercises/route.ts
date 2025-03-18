import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Em produção, isso seria conectado ao Prisma
const homeExercises = [
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

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await verifyAuth(token)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || user.tenantId

    const filteredExercises = homeExercises.filter((exercise) => exercise.tenantId === tenantId)

    return NextResponse.json(filteredExercises)
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
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

    // Em produção, isso seria salvo no banco de dados
    const newExercise = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || "",
      type: body.type,
      url: body.url,
      thumbnail: body.thumbnail || `/placeholder.svg?height=200&width=300`,
      difficulty: body.difficulty || "BEGINNER",
      duration: body.duration || null,
      bodyArea: body.bodyArea || null,
      status: body.status || "DRAFT",
      tenantId: user.tenantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.userId,
      updatedBy: user.userId,
    }

    homeExercises.push(newExercise)

    return NextResponse.json(newExercise, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar exercício:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
