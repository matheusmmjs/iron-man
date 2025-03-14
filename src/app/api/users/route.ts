import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

// Em produção, isso seria conectado ao Prisma
const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@pilatesflow.com",
    password: "$2b$10$8r0qPVaJPEGEQgWUXQKJIeOmcL7E8/BuZ1ZM3gGmn3ByQBkNqRzT2", // "password123"
    role: "ADMIN",
    tenantId: "1",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Dra. Juliana Mendes",
    email: "juliana@pilatesflow.com",
    password: "$2b$10$8r0qPVaJPEGEQgWUXQKJIeOmcL7E8/BuZ1ZM3gGmn3ByQBkNqRzT2", // "password123"
    role: "INSTRUCTOR",
    tenantId: "1",
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Dr. Ricardo Santos",
    email: "ricardo@pilatesflow.com",
    password: "$2b$10$8r0qPVaJPEGEQgWUXQKJIeOmcL7E8/BuZ1ZM3gGmn3ByQBkNqRzT2", // "password123"
    role: "INSTRUCTOR",
    tenantId: "1",
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-01-03T00:00:00.000Z",
  },
]

export async function GET(request: Request) {
  try {
    // Em produção, filtrar por tenantId do usuário autenticado
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || "1"

    // Não retornar as senhas
    const filteredUsers = users.filter((user) => user.tenantId === tenantId).map(({ password, ...user }) => user)

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.name || !body.email || !body.password || !body.role) {
      return NextResponse.json({ error: "Nome, email, senha e função são obrigatórios" }, { status: 400 })
    }

    // Verificar se o email já existe
    const existingUser = users.find((user) => user.email === body.email)
    if (existingUser) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // Em produção, isso seria salvo no banco de dados
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
      tenantId: body.tenantId || "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Não retornar a senha
    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
