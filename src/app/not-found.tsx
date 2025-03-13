import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-lg text-slate-600">Página não encontrada</p>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800 transition-colors duration-200"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
