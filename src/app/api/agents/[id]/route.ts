import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import prisma from "@/lib/prisma"

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

    const agent = await prisma.agent.findUnique({
      where: {
        id: params.id,
        isActive: true,
      },
    })

    if (!agent) {
      return NextResponse.json({ error: "Agente não encontrado" }, { status: 404 })
    }

    // Verificar se o agente pertence ao tenant do usuário
    if (agent.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error("Erro ao buscar agente:", error)
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
    if (!body.name || !body.context) {
      return NextResponse.json({ error: "Nome e contexto são obrigatórios" }, { status: 400 })
    }

    // Verificar se o agente existe e pertence ao tenant do usuário
    const existingAgent = await prisma.agent.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingAgent) {
      return NextResponse.json({ error: "Agente não encontrado" }, { status: 404 })
    }

    if (existingAgent.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const agent = await prisma.agent.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description || existingAgent.description,
        model: body.model || existingAgent.model,
        context: body.context,
        tone: body.tone || existingAgent.tone,
        language: body.language || existingAgent.language,
        apiKey: body.apiKey || existingAgent.apiKey,
        isActive: body.isActive !== undefined ? body.isActive : existingAgent.isActive,
        updatedBy: user.userId,
      },
    })

    return NextResponse.json(agent)
  } catch (error) {
    console.error("Erro ao atualizar agente:", error)
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

    // Verificar se o agente existe e pertence ao tenant do usuário
    const existingAgent = await prisma.agent.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingAgent) {
      return NextResponse.json({ error: "Agente não encontrado" }, { status: 404 })
    }

    if (existingAgent.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Soft delete - apenas marca como inativo
    await prisma.agent.update({
      where: {
        id: params.id,
      },
      data: {
        isActive: false,
        updatedBy: user.userId,
      },
    })

    return NextResponse.json({ message: "Agente removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover agente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
