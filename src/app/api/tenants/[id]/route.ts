import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
let tenants = [
  {
    id: "1",
    name: "Estúdio Pilates Central",
    subdomain: "central",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tenant = tenants.find((t) => t.id === params.id)

    if (!tenant) {
      return NextResponse.json({ error: "Tenant não encontrado" }, { status: 404 })
    }

    return NextResponse.json(tenant)
  } catch (error) {
    console.error("Erro ao buscar tenant:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const tenantIndex = tenants.findIndex((t) => t.id === params.id)

    if (tenantIndex === -1) {
      return NextResponse.json({ error: "Tenant não encontrado" }, { status: 404 })
    }

    // Validação básica
    if (!body.name || !body.subdomain) {
      return NextResponse.json({ error: "Nome e subdomínio são obrigatórios" }, { status: 400 })
    }

    // Atualizar tenant
    const updatedTenant = {
      ...tenants[tenantIndex],
      name: body.name,
      subdomain: body.subdomain,
      updatedAt: new Date().toISOString(),
    }

    tenants[tenantIndex] = updatedTenant

    return NextResponse.json(updatedTenant)
  } catch (error) {
    console.error("Erro ao atualizar tenant:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const tenantIndex = tenants.findIndex((t) => t.id === params.id)

    if (tenantIndex === -1) {
      return NextResponse.json({ error: "Tenant não encontrado" }, { status: 404 })
    }

    // Remover tenant
    tenants = tenants.filter((t) => t.id !== params.id)

    return NextResponse.json({ message: "Tenant removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover tenant:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
