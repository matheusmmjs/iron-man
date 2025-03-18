import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Em produção, isso seria conectado ao Prisma
const courses = [
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

    const filteredCourses = courses.filter((course) => course.tenantId === tenantId)

    return NextResponse.json(filteredCourses)
  } catch (error) {
    console.error("Erro ao buscar cursos:", error)
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
    const newCourse = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || "",
      type: body.type,
      url: body.url,
      thumbnail: body.thumbnail || `/placeholder.svg?height=200&width=300`,
      status: body.status || "draft",
      tenantId: user.tenantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.userId,
      updatedBy: user.userId,
    }

    courses.push(newCourse)

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar curso:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
