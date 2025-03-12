'use client';

import { PlusIcon } from '@heroicons/react/24/outline';

export default function NewAppointmentButton() {
  return (
    <button
      onClick={() => {
        // Aqui virá a lógica de criar novo atendimento
        alert('Em desenvolvimento');
      }}
      className="btn btn-primary"
    >
      <PlusIcon className="w-5 h-5" />
      Novo Atendimento
    </button>
  );
} 