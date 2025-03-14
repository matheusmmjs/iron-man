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
    tenantId: "1",
    createdAt: "2023-01-10T00:00:00.000Z",
    updatedAt: "2023-01-10T00:00:00.000Z",
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

export async function GET(request: Request) {
  try {
    // Em produção, filtrar por tenantId do usuário autenticado
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || "1"

    const filteredClients = clients.filter((client) => client.tenantId === tenantId)

    return NextResponse.json(filteredClients)
  } catch (error) {
    console.error("Erro ao buscar clientes:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.name || !body.email || !body.cpf) {
      return NextResponse.json({ error: "Nome, email e CPF são obrigatórios" }, { status: 400 })
    }

    // Em produção, isso seria salvo no banco de dados
    const newClient = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      cpf: body.cpf,
      address: body.address || "",
      birthDate: body.birthDate || new Date().toISOString(),
      objective: body.objective || "",
      medicalConditions: body.medicalConditions || "",
      status: body.status || "ACTIVE",
      tenantId: body.tenantId || "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    clients.push(newClient)

    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar cliente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
