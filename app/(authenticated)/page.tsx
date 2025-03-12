export default function Home() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Alunos</h2>
              <p className="text-blue-600">Gerenciar alunos e matrículas</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-green-900 mb-2">Aulas</h2>
              <p className="text-green-600">Agendar e gerenciar aulas</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-purple-900 mb-2">Avaliações</h2>
              <p className="text-purple-600">Realizar avaliações físicas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 