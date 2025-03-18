import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const token = cookies().get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 })
    }

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Erro ao obter token:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
