import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Limpa o cookie de autenticação
    const response = NextResponse.json({ message: 'Logout realizado com sucesso' });
    
    // Define o cookie para expirar imediatamente
    response.cookies.set('auth-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar logout' },
      { status: 500 }
    );
  }
} 