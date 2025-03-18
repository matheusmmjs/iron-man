import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Em produção, isso seria conectado ao Prisma
let courses = [
  {
    id: "1",
    title: "Fundamentos de Pilates",
    description: "Curso introdutório sobre os princípios e fundamentos do método Pilates",
    type: "video",
    url: "https://www.youtube.com/watch?v=dnP71v2hWbo",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "published",
    tenantId: "1",
    createdAt: "2023-05-10T00:00:00.000Z",
    updatedAt: "2023-05-10T00:00:00.000Z",
    createdBy: "1",
    updatedBy: "1",
  },
  {
    id: "2",
    title: "Exercícios para Escoliose",
    description: "Série de exercícios específicos para tratamento de escoliose",
    type: "video",
    url: "https://www.youtube.com/watch?v=dLheZmdjMiY",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "published",
    tenantId: "1",
    createdAt: "2023-06-15T00:00:00.000Z",
    updatedAt: "2023-06-15T00:00:00.000Z",
    createdBy: "1",
    updatedBy: "1",
  },
  {
    id: "3",
    title: "Guia de Alongamentos",
    description: "PDF com guia completo de alongamentos para praticar em casa",
    type: "pdf",
    url: "https://example.com/alongamentos.pdf",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "draft",
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

    const course = courses.find((c) => c.id === params.id)

    if (!course) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 })
    }

    // Verificar se o curso pertence ao tenant do usuário
    if (course.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("Erro ao buscar curso:", error)
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

    // Verificar se o curso existe e pertence ao tenant do usuário
    const existingCourse = courses.find((c) => c.id === params.id)

    if (!existingCourse) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 })
    }

    if (existingCourse.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Atualizar curso
    const updatedCourse = {
      ...existingCourse,
      title: body.title,
      description: body.description || existingCourse.description,
      type: body.type,
      url: body.url,
      thumbnail: body.thumbnail || existingCourse.thumbnail,
      status: body.status || existingCourse.status,
      updatedAt: new Date().toISOString(),
      updatedBy: user.userId,
    }

    courses = courses.map((c) => (c.id === params.id ? updatedCourse : c))

    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error("Erro ao atualizar curso:", error)
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

    // Verificar se o curso existe e pertence ao tenant do usuário
    const existingCourse = courses.find((c) => c.id === params.id)

    if (!existingCourse) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 })
    }

    if (existingCourse.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Remover curso
    courses = courses.filter((c) => c.id !== params.id)

    return NextResponse.json({ message: "Curso removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover curso:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
