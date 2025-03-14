import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { AgendaCalendar } from "./agenda-calendar";
import { ClientList } from "./client-list";

export default function Schedule() {
  return (
    <div className="flex h-screen flex-col"> {/* Define a altura fixa da tela */}
      {/* Main Content */}
      <div className="flex-1 space-y-4 p-4 sm:ml-14 lg:ml-16 xl:ml-20 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Agenda</h2>
          {/* <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
            </Button>
          </div> */}
        </div>
        {/* Tabs */}
        <Tabs defaultValue="calendario" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>
          {/* Calendário */}
          <TabsContent value="calendario" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7 h-[calc(100vh-200px)] overflow-y-auto"> {/* Altura fixa e rolagem interna */}
                <CardHeader>
                  <CardTitle>Agenda Semanal</CardTitle>
                  <CardDescription>Visualize e gerencie todos os agendamentos da semana.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <AgendaCalendar />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Clientes */}
          <TabsContent value="clientes" className="space-y-4">
            <div className="h-[calc(100vh-200px)] overflow-y-auto"> {/* Altura fixa e rolagem interna */}
              <ClientList />
            </div>
          </TabsContent>
          {/* Relatórios */}
          <TabsContent value="relatorios" className="space-y-4">
            <div className="h-[calc(100vh-200px)] overflow-y-auto"> {/* Altura fixa e rolagem interna */}
              <Overview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}