import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import prisma from "@/lib/prisma"

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

    const agents = await prisma.agent.findMany({
      where: {
        tenantId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(agents)
  } catch (error) {
    console.error("Erro ao buscar agentes:", error)
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
    if (!body.name || !body.context) {
      return NextResponse.json({ error: "Nome e contexto são obrigatórios" }, { status: 400 })
    }

    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        description: body.description || "",
        model: body.model || "gpt-4o",
        context: body.context,
        tone: body.tone || "",
        language: body.language || "Português",
        apiKey: body.apiKey || null,
        isActive: true,
        tenantId: user.tenantId,
        createdBy: user.userId,
        updatedBy: user.userId,
      },
    })

    return NextResponse.json(agent, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar agente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
