import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

// Em produção, isso seria conectado ao Prisma
let users = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = users.find((u) => u.id === params.id)

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Não retornar a senha
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const userIndex = users.findIndex((u) => u.id === params.id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Validação básica
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json({ error: "Nome, email e função são obrigatórios" }, { status: 400 })
    }

    // Verificar se o email já existe (exceto para o próprio usuário)
    const existingUser = users.find((user) => user.email === body.email && user.id !== params.id)
    if (existingUser) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    // Atualizar usuário
    let updatedUser = {
      ...users[userIndex],
      name: body.name,
      email: body.email,
      role: body.role,
      updatedAt: new Date().toISOString(),
    }

    // Se a senha foi fornecida, atualizá-la
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      updatedUser = {
        ...updatedUser,
        password: hashedPassword,
      }
    }

    users[userIndex] = updatedUser

    // Não retornar a senha
    const { password, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userIndex = users.findIndex((u) => u.id === params.id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Remover usuário
    users = users.filter((u) => u.id !== params.id)

    return NextResponse.json({ message: "Usuário removido com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover usuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
