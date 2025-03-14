import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Remove o cookie de autenticação
    cookies().delete("token")

    return NextResponse.json(
      { message: "Logout realizado com sucesso" }, 
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" }, 
      { status: 500 }
    )
  }
}
