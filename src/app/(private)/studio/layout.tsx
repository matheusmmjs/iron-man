import type React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:pt-12">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Estúdio</h2>
      </div>

      <Tabs defaultValue="clients" className="space-y-4">
        <div className="overflow-auto">
          <TabsList className="inline-flex h-10">
            <Link href="/studio/clients" passHref>
              <TabsTrigger
                value="clients"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                Clientes
              </TabsTrigger>
            </Link>
            <Link href="/studio/schedule" passHref>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                Agenda
              </TabsTrigger>
            </Link>
            <Link href="/studio/assessments" passHref>
              <TabsTrigger
                value="assessments"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                Avaliações
              </TabsTrigger>
            </Link>
            <Link href="/studio/payments" passHref>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                Pagamentos
              </TabsTrigger>
            </Link>
            <Link href="/studio/packages" passHref>
              <TabsTrigger
                value="packages"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                Pacotes
              </TabsTrigger>
            </Link>
          </TabsList>
        </div>
        {children}
      </Tabs>
    </div>
  )
}
