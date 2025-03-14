import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentClients } from "@/components/dashboard/recent-clients"
import { UpcomingClasses } from "@/components/dashboard/upcoming-classes"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:pt-12">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>

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

// import { ChartOverview } from "@/components/chart";
// import { Sales } from "@/components/sales";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { CalendarCheck, DollarSign, UserPlus, Users } from "lucide-react";

// export default function Dashboard() {
//   return (
//     <main className="sm:ml-14 p-4">
//       <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-center">
//               <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
//                 Total de clientes
//               </CardTitle>
//               <Users className="ml-auto w-4 h-4" />
//             </div>

//             <CardDescription>
//               Total de clientes ativos cadastrados no sistema
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <p className="text-base sm:text-lg font-bold">52</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-center">
//               <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
//                 Total de pagamentos recebidos
//               </CardTitle>
//               <DollarSign className="ml-auto w-4 h-4" />
//             </div>

//             <CardDescription>
//               Total de pagamentos recebidos no ultimo mês
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <p className="text-base sm:text-lg font-bold">R$ 8.542,00</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-center">
//               <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
//                 Total de novos clientes
//               </CardTitle>
//               <UserPlus className="ml-auto w-4 h-4" />
//             </div>

//             <CardDescription>
//               Total de novos clientes ativos no ultimo mês
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <p className="text-base sm:text-lg font-bold">3</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-center">
//               <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
//                 Total de atendimentos
//               </CardTitle>
//               <CalendarCheck className="ml-auto w-4 h-4" />
//             </div>

//             <CardDescription>
//               Total de atendimentos realizados no ultimo mês
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <p className="text-base sm:text-lg font-bold">63</p>
//           </CardContent>
//         </Card>

//       </section>

//       <section className="mt-4 flex flex-col md:flex-row gap-4">
        
//         <ChartOverview />
//         <Sales />
//       </section>
//     </main>
//   );
// }