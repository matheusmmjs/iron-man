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

    const plans = await prisma.plan.findMany({
      where: {
        tenantId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(plans)
  } catch (error) {
    console.error("Erro ao buscar planos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]
    console.log(token)
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

    const plan = await prisma.plan.create({
      data: {
        name: body.name,
        description: body.description || "",
        sessions: Number.parseInt(body.sessions),
        price: Number.parseFloat(body.price),
        duration: Number.parseInt(body.duration),
        isActive: true,
        tenantId: user.tenantId,
        createdBy: user.userId,
        updatedBy: user.userId,
      },
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar plano:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
