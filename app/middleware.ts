import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que não precisam de autenticação
const publicRoutes = ['/login'];

// Rotas de assets e API que devem ser ignoradas pelo middleware
const bypassRoutes = [
  '/_next',
  '/static',
  '/favicon.ico',
  '/api/auth/login'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass para assets e rotas específicas da API
  if (bypassRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Pegar o token de autenticação
  const authToken = request.cookies.get('auth-token');

  // Se está tentando acessar uma rota pública
  if (publicRoutes.includes(pathname)) {
    // Se já está autenticado, redireciona para home
    if (authToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Se não está autenticado, permite acesso à rota pública
    return NextResponse.next();
  }

  // Para todas as outras rotas, verifica autenticação
  if (!authToken) {
    // Se não está autenticado, redireciona para login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth/login|_next/static|_next/image|favicon.ico).*)'],
}; 