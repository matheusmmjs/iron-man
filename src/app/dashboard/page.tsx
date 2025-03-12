import Link from "next/link";

export default async function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Link
        href="/clients"
        className="group block border rounded-lg shadow-md p-6 bg-white hover:bg-blue-50 transition"
      >
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          Clientes
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Gerencie seus clientes de forma eficiente.
        </p>
      </Link>

      <Link
        href="/schedule"
        className="group block border rounded-lg shadow-md p-6 bg-white hover:bg-blue-50 transition"
      >
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          Agenda
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Organize seus compromissos e eventos.
        </p>
      </Link>

      <Link
        href="/payments"
        className="group block border rounded-lg shadow-md p-6 bg-white hover:bg-blue-50 transition"
      >
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          Pagamentos
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Controle e visualize os pagamentos realizados.
        </p>
      </Link>

      <Link
        href="/reviews"
        className="group block border rounded-lg shadow-md p-6 bg-white hover:bg-blue-50 transition"
      >
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          Avaliações
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Gerencie e visualize as avaliações dos seus serviços.
        </p>
      </Link>
    </div>
  );
}