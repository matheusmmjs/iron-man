import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
const tenants = [
  {
    id: "1",
    name: "Estúdio Pilates Central",
    subdomain: "central",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(tenants)
  } catch (error) {
    console.error("Erro ao buscar tenants:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.name || !body.subdomain) {
      return NextResponse.json({ error: "Nome e subdomínio são obrigatórios" }, { status: 400 })
    }

    // Em produção, isso seria salvo no banco de dados
    const newTenant = {
      id: Date.now().toString(),
      name: body.name,
      subdomain: body.subdomain,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tenants.push(newTenant)

    return NextResponse.json(newTenant, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar tenant:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
