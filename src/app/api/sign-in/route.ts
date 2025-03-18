import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { signAuth } from "@/lib/auth"
import bcrypt from "bcrypt"

// Usuário de exemplo para desenvolvimento
const DEMO_USER = {
  id: "1",
  email: "admin@pilatesflow.com",
  name: "Admin",
  password: "$2b$10$8r0qPVaJPEGEQgWUXQKJIeOmcL7E8/BuZ1ZM3gGmn3ByQBkNqRzT2", // "password123"
  role: "ADMIN",
  tenantId: "1",
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Em produção, buscar usuário do banco de dados
    // Simulando verificação de usuário para desenvolvimento
    if (email !== DEMO_USER.email) {
      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 })
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, DEMO_USER.password)
    if (!passwordMatch) {
      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 })
    }

    // Gerar token JWT
    const token = await signAuth({
      userId: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      role: DEMO_USER.role,
      tenantId: DEMO_USER.tenantId,
    })

    // Definir cookie
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
    })

    return NextResponse.json({ message: "Autenticação bem-sucedida" }, { status: 200 })
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
