import { ChartOverview } from "@/components/chart";
import { Sales } from "@/components/sales";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, DollarSign, UserPlus, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de clientes
              </CardTitle>
              <Users className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Total de clientes ativos cadastrados no sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">52</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de pagamentos recebidos
              </CardTitle>
              <DollarSign className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Total de pagamentos recebidos no ultimo mês
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">R$ 8.542,00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de novos clientes
              </CardTitle>
              <UserPlus className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Total de novos clientes ativos no ultimo mês
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de atendimentos
              </CardTitle>
              <CalendarCheck className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Total de atendimentos realizados no ultimo mês
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">63</p>
          </CardContent>
        </Card>

      </section>

      <section className="mt-4 flex flex-col md:flex-row gap-4">
        
        <ChartOverview />
        <Sales />
      </section>
    </main>
  );
}