import { CalendarIcon } from '@heroicons/react/24/outline';
import NewAppointmentButton from './NewAppointmentButton';

export default function AppointmentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie os atendimentos do seu studio
          </p>
        </div>
        <NewAppointmentButton />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center text-gray-500 h-64">
          <div className="text-center">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4" />
            <p>Módulo em desenvolvimento</p>
            <p className="text-sm mt-2">Em breve você poderá gerenciar seus atendimentos aqui!</p>
          </div>
        </div>
      </div>
    </div>
  );
} 