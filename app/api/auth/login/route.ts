import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '@/lib/auth/password';
import { signJWT } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        company: {
          select: {
            name: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const token = signJWT({ userId: user.id, email: user.email });

    cookies().set('auth-token', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company.name
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 