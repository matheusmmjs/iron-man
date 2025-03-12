'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Força um reload completo da página para limpar todo o estado
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`text-sm text-gray-500 hover:text-gray-900 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-150 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Saindo...' : 'Sair'}
    </button>
  );
} 