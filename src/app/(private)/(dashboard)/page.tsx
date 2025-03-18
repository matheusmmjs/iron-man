"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentClients } from "@/components/dashboard/recent-clients"
import { UpcomingClasses } from "@/components/dashboard/upcoming-classes"
import { Button } from "@/components/ui/button"
import { MessageSquareText, X } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [showAssistantCard, setShowAssistantCard] = useState(true)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:pt-12">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Destaque do Assistente IA */}
      {showAssistantCard && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareText className="h-6 w-6" />
                Assistente IA de Pilates
              </CardTitle>
              <CardDescription>
                Nosso assistente inteligente pode ajudar você a criar planos de aula personalizados, sugerir exercícios
                específicos para cada cliente e muito mais.
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowAssistantCard(false)} className="mt-1">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Link href="/ai-assistant">
              <Button size="lg" className="w-full sm:w-auto">
                <MessageSquareText className="mr-2 h-5 w-5" />
                Conversar com o Assistente
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+5 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Para esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.240</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Receita mensal ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
            <CardDescription>Últimos clientes cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentClients />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Aulas</CardTitle>
            <CardDescription>Aulas agendadas para hoje e amanhã</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingClasses />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
