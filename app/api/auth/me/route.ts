import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const authToken = cookies().get('auth-token');

    if (!authToken?.value) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authToken.value },
      include: { company: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar autenticação' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 