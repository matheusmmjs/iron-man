import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignInForm } from "@/components/auth/sign-in-form"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { signAuth } from "@/lib/auth"
import bcrypt from "bcrypt"

// Usuário de exemplo para desenvolvimento
const DEMO_USER = {
  id: "1",
  email: "admin@pilatesflow.com",
  name: "Admin",
  password: "$2a$12$oAk35hdsCY7uNS09SmAwae6mMQIcs/4HzyCIgrrrNDbghoCFZDSmm", // "123456"
  role: "ADMIN",
}

async function signIn(formData: FormData) {
  "use server"

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Em produção, buscar usuário do banco de dados
  // Simulando verificação de usuário para desenvolvimento
  if (email !== DEMO_USER.email) {
    return { success: false, message: "Credenciais inválidas" }
  }

  // Verificar senha
  const passwordMatch = await bcrypt.compare(password, DEMO_USER.password)
  if (!passwordMatch) {
    return { success: false, message: "Credenciais inválidas" }
  }

  // Gerar token JWT
  const token = await signAuth({
    userId: DEMO_USER.id,
    email: DEMO_USER.email,
    name: DEMO_USER.name,
    role: DEMO_USER.role,
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

  redirect("/")
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <SignInForm signIn={signIn} />
    </div>
  )
}
