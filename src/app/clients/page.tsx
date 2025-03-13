import { revalidateTag } from "next/cache";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Users } from "lucide-react";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Clients() {
  async function getClient() {
    "use server";

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`, {
      cache: "force-cache",
      next: {
        tags: ["create-client"],
      }
    });
    
    return response.json();
  }

  async function createClient(formData: FormData) {
    "use server";

    const data = Object.fromEntries(formData.entries());
    const clientData = {
      cpf: String(data.cpf),
      name: String(data.name),
      email: String(data.email),
      phone: String(data.phone),
      address: String(data.address),
      birthDate: new Date(String(data.birthDate)).toISOString(),
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`, {
      method: "POST",
      body: JSON.stringify(clientData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("create-client");
  }

  const clients = await getClient();

  return (
    <main className="sm:ml-14 p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Novo Cliente
            </CardTitle>
            <UserPlus className="w-6 h-6" />
          </div>
        </CardHeader>
        <CardContent>
          <form action={createClient} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Input 
                name="cpf"
                type="text"
                placeholder="Digite o CPF"
                required
              />
            </div>
            <div className="space-y-2">
              <Input 
                name="name"
                type="text"
                placeholder="Digite o nome"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Digite o email"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                name="phone"
                type="text"
                placeholder="Digite o telefone"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                name="address"
                type="text"
                placeholder="Digite o endereço"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                name="birthDate"
                type="date"
                placeholder="Digite a data de nascimento"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Cadastrar Cliente
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Lista de Clientes
            </CardTitle>
            <Users className="w-6 h-6" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto">
            <DataTable columns={columns} data={clients} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}