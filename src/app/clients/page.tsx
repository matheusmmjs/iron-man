import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function addClient(data: FormData) {
  "use server";
  const cpf = data.get("cpf")?.toString();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const phone = data.get("phone")?.toString();
  const address = data.get("address")?.toString();
  const birthDate = data.get("birthDate") ? new Date(data.get("birthDate")!.toString()) : null;

  if (!cpf || !name || !email) {
      throw new Error("CPF, nome e email são obrigatórios.");
  }

  await prisma.client.upsert({
    where: { cpf },
    update: { name, phone, address, birthDate, email },
    create: { name, email, cpf, phone, address, birthDate },
  });

  revalidatePath("/clients");
}

export async function updateClient(data: FormData) {
  "use server";
  const id = Number(data.get("id"));
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const cpf = data.get("cpf")?.toString();
  const phone = data.get("phone")?.toString();
  const address = data.get("address")?.toString();
  const birthDate = data.get("birthDate") ? new Date(data.get("birthDate")!.toString()) : null;

  if (!id || !name || !email || !cpf) {
    throw new Error("ID, nome, email e CPF são obrigatórios.");
  }

  await prisma.client.update({
    where: { id },
    data: { name, email, phone, address, birthDate },
  });

  revalidatePath("/clients");
}

export async function deleteClient(data: FormData) {
  "use server";
  const cpf = data.get("cpf")?.toString();

  if (!cpf) {
    throw new Error("CPF é obrigatório.");
  }

  await prisma.client.delete({
    where: { cpf },
  });

  revalidatePath("/clients");
}

export default async function Clients() {
  const clients = await prisma.client.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      <form action={addClient} className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Adicionar Cliente</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            className="border rounded-md p-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="border rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            className="border rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            className="border rounded-md p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Adicionar
          </button>
        </div>
      </form>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">CPF</th>
            <th className="border border-gray-200 p-2 text-left">Nome</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
            <th className="border border-gray-200 p-2 text-left">Telefone</th>
            <th className="border border-gray-200 p-2 text-left">Endereço</th>
            <th className="border border-gray-200 p-2 text-left">Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.cpf} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{client.cpf}</td>
              <td className="border border-gray-200 p-2">{client.name}</td>
              <td className="border border-gray-200 p-2">{client.email}</td>
              <td className="border border-gray-200 p-2">{client.phone}</td>
              <td className="border border-gray-200 p-2">{client.address}</td>
              <td className="border border-gray-200 p-2">{client.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}