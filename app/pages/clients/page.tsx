'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Client, ClientFormData } from '../types/client';
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClientFormData>();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ClientFormData) => {
    try {
      const url = editingClient
        ? `/api/clients?id=${editingClient.id}`
        : '/api/clients';
      
      const response = await fetch(url, {
        method: editingClient ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        setIsAddingClient(false);
        setEditingClient(null);
        fetchClients();
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsAddingClient(true);
    Object.keys(client).forEach((key) => {
      if (key === 'dateOfBirth' && client[key]) {
        setValue('dateOfBirth', client[key]);
      } else {
        setValue(key as keyof ClientFormData, client[key as keyof Client]);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      const response = await fetch(`/api/clients?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingClient(false);
    setEditingClient(null);
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie os clientes do seu studio
          </p>
        </div>
        {!isAddingClient && (
          <button
            onClick={() => setIsAddingClient(true)}
            className="btn btn-primary"
          >
            <PlusIcon className="w-5 h-5" />
            Adicionar Cliente
          </button>
        )}
      </div>

      {isAddingClient ? (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Nome</label>
                <input
                  {...register('name', { required: 'Nome é obrigatório' })}
                  placeholder="Nome completo"
                />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label>Email</label>
                <input
                  {...register('email', { 
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  type="email"
                  placeholder="email@exemplo.com"
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label>Telefone</label>
                <input
                  {...register('phone')}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label>Data de Nascimento</label>
                <input
                  {...register('dateOfBirth')}
                  type="date"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingClient ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th className="text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    Carregando...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum cliente cadastrado
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td className="font-medium">{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <span className={`badge ${client.active ? 'badge-success' : 'badge-error'}`}>
                        {client.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-1 text-gray-500 hover:text-blue-600"
                          title="Editar cliente"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-1 text-gray-500 hover:text-red-600"
                          title="Excluir cliente"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 