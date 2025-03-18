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

    const plan = await prisma.plan.findUnique({
      where: {
        id: params.id,
        isActive: true,
      },
    })

    if (!plan) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 })
    }

    // Verificar se o plano pertence ao tenant do usuário
    if (plan.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Erro ao buscar plano:", error)
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
    if (!body.name || !body.price || !body.sessions || !body.duration) {
      return NextResponse.json({ error: "Nome, preço, sessões e duração são obrigatórios" }, { status: 400 })
    }

    // Verificar se o plano existe e pertence ao tenant do usuário
    const existingPlan = await prisma.plan.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPlan) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 })
    }

    if (existingPlan.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const plan = await prisma.plan.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description || existingPlan.description,
        sessions: Number.parseInt(body.sessions),
        price: Number.parseFloat(body.price),
        duration: Number.parseInt(body.duration),
        updatedBy: user.userId,
      },
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Erro ao atualizar plano:", error)
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

    // Verificar se o plano existe e pertence ao tenant do usuário
    const existingPlan = await prisma.plan.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPlan) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 })
    }

    if (existingPlan.tenantId !== user.tenantId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Soft delete - apenas marca como inativo
    await prisma.plan.update({
      where: {
        id: params.id,
      },
      data: {
        isActive: false,
        updatedBy: user.userId,
      },
    })

    return NextResponse.json({ message: "Plano removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover plano:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
