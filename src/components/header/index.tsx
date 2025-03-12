import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <nav className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>

            <Link 
              href="/clients" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200"
            >
              Clientes
            </Link>

            <Link 
              href="/schedule" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200"
            >
              Agenda
            </Link>

            <Link 
              href="/payments" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200"
            >
              Pagamentos
            </Link>

            <Link 
              href="/reviews" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200"
            >
              Avaliações
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
