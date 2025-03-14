"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom"

interface SignInFormProps {
  signIn: (formData: FormData) => Promise<{ success: boolean; message: string } | void>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  )
}

export function SignInForm({ signIn }: SignInFormProps) {
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    setError("")
    const result = await signIn(formData)
    if (result && !result.success) {
      setError(result.message)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
          <span className="text-xl font-bold">PF</span>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">PilatesFlow</CardTitle>
          <CardDescription className="text-center">Entre com suas credenciais para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>

            {error && <div className="text-sm text-destructive text-center">{error}</div>}

            <SubmitButton />
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">Versão 1.0.0</p>
        </CardFooter>
      </Card>
    </div>
  )
}
