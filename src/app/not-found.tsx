"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function NotFound() {
  const router = useRouter()
  const [previousPath, setPreviousPath] = useState<string>("/")

  useEffect(() => {
    // Pega o caminho anterior do histórico de navegação
    const prevPath = document.referrer
    if (prevPath && prevPath.includes(window.location.origin)) {
      setPreviousPath(new URL(prevPath).pathname)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg text-muted-foreground">
          Ops! Página não encontrada
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          {previousPath !== "/" && (
            <Button 
              variant="default"
              asChild
            >
              <Link href="/">
                Ir para o início
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
