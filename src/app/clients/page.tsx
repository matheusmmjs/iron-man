import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function addClient(data: FormData) {
  "use server";
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();

  if (!name || !email) {
    throw new Error("Nome e email são obrigatórios.");
  }

  await prisma.client.upsert({
    where: { email },
    update: { name },
    create: { name, email },
  });

  revalidatePath("/clients");
}

export async function updateClient(data: FormData) {
  "use server";
  const id = Number(data.get("id"));
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();

  if (!id || !name || !email) {
    throw new Error("ID, nome e email são obrigatórios.");
  }

  await prisma.client.update({
    where: { id },
    data: { name, email },
  });

  revalidatePath("/clients");
}

export async function deleteClient(data: FormData) {
  "use server";
  const id = Number(data.get("id"));

  if (!id) {
    throw new Error("ID é obrigatório.");
  }

  await prisma.client.delete({
    where: { id },
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
            <th className="border border-gray-200 p-2 text-left">ID</th>
            <th className="border border-gray-200 p-2 text-left">Nome</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
            <th className="border border-gray-200 p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{client.id}</td>
              <td className="border border-gray-200 p-2">{client.name}</td>
              <td className="border border-gray-200 p-2">{client.email}</td>
              <td className="border border-gray-200 p-2 text-center">
                <form action={updateClient} className="inline-block">
                  <input type="hidden" name="id" value={client.id} />
                  <input
                    type="text"
                    name="name"
                    defaultValue={client.name}
                    className="border rounded-md p-1 mr-2"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={client.email}
                    className="border rounded-md p-1 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="text-green-500 hover:underline mr-2"
                  >
                    Salvar
                  </button>
                </form>
                <form action={deleteClient} className="inline-block">
                  <input type="hidden" name="id" value={client.id} />
                  <button
                    type="submit"
                    className="text-red-500 hover:underline"
                  >
                    Excluir
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}