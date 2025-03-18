"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, CreditCard, Package } from "lucide-react"

export default function StudioPage() {
  const router = useRouter()

  // Redirecionar para a página de clientes por padrão
  useEffect(() => {
    router.push("/studio/clients")
  }, [router])

  const modules = [
    {
      title: "Clientes",
      description: "Gerenciar cadastro e informações de clientes",
      icon: Users,
      path: "/studio/clients",
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      title: "Agenda",
      description: "Gerenciar agendamentos e sessões",
      icon: Calendar,
      path: "/studio/schedule",
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      title: "Avaliações",
      description: "Realizar e gerenciar avaliações de clientes",
      icon: FileText,
      path: "/studio/assessments",
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-700 dark:text-purple-300",
    },
    {
      title: "Pagamentos",
      description: "Gerenciar pagamentos e financeiro",
      icon: CreditCard,
      path: "/studio/payments",
      color: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-700 dark:text-amber-300",
    },
    {
      title: "Planos",
      description: "Configurar planos e pacotes",
      icon: Package,
      path: "/studio/plans",
      color: "bg-rose-100 dark:bg-rose-900",
      textColor: "text-rose-700 dark:text-rose-300",
    },
  ]

  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Card
            key={module.title}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push(module.path)}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-2 rounded-full ${module.color}`}>
                <module.icon className={`h-5 w-5 ${module.textColor}`} />
              </div>
              <div>
                <CardTitle>{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
