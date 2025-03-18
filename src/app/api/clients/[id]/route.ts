import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
const clients = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    address: "Rua das Flores, 123 - São Paulo, SP",
    birthDate: "1990-05-15T00:00:00.000Z",
    objective: "Fortalecimento e correção postural",
    medicalConditions: "Escoliose leve",
    status: "ACTIVE",
    isActive: true,
    tenantId: "1",
    createdAt: "2023-01-10T00:00:00.000Z",
    updatedAt: "2023-01-10T00:00:00.000Z",
    createdBy: "1",
    updatedBy: "1",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 91234-5678",
    cpf: "987.654.321-00",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    birthDate: "1985-08-22T00:00:00.000Z",
    objective: "Recuperação de lesão no joelho",
    medicalConditions: "Pós-cirúrgico de menisco",
    status: "ACTIVE",
    tenantId: "1",
    createdAt: "2023-02-15T00:00:00.000Z",
    updatedAt: "2023-02-15T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    phone: "(11) 99876-5432",
    cpf: "456.789.123-00",
    address: "Rua Augusta, 500 - São Paulo, SP",
    birthDate: "1978-11-10T00:00:00.000Z",
    objective: "Condicionamento físico geral",
    medicalConditions: "Hipertensão controlada",
    status: "INACTIVE",
    tenantId: "1",
    createdAt: "2022-06-20T00:00:00.000Z",
    updatedAt: "2022-06-20T00:00:00.000Z",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = clients.find((c) => c.id === params.id && c.isActive)

    if (!client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const clientIndex = clients.findIndex((c) => c.id === params.id && c.isActive)

    if (clientIndex === -1) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
    }

    // Validação básica
    if (!body.name || !body.email || !body.cpf) {
      return NextResponse.json({ error: "Nome, email e CPF são obrigatórios" }, { status: 400 })
    }

    // Atualizar cliente
    const updatedClient = {
      ...clients[clientIndex],
      name: body.name,
      email: body.email,
      phone: body.phone || clients[clientIndex].phone,
      cpf: body.cpf,
      address: body.address || clients[clientIndex].address,
      birthDate: body.birthDate || clients[clientIndex].birthDate,
      objective: body.objective || clients[clientIndex].objective,
      medicalConditions: body.medicalConditions || clients[clientIndex].medicalConditions,
      status: body.status || clients[clientIndex].status,
      updatedAt: new Date().toISOString(),
      updatedBy: body.updatedBy || "1",
    }

    clients[clientIndex] = updatedClient

    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const clientIndex = clients.findIndex((c) => c.id === params.id && c.isActive)

    if (clientIndex === -1) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
    }

    // Soft delete - apenas marca como inativo
    clients[clientIndex] = {
      ...clients[clientIndex],
      isActive: false,
      updatedAt: new Date().toISOString(),
      updatedBy: body.updatedBy || "1",
    }

    return NextResponse.json({ message: "Cliente removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover cliente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
