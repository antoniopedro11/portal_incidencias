import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verifica se a rota é administrativa
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    // Se não estiver autenticado, redireciona para login
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }
    
    // Se não for admin, redireciona para página de acesso negado
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  }
  
  return NextResponse.next()
}

// Configura as rotas que serão verificadas pelo middleware
export const config = {
  matcher: [
    '/admin/:path*'
  ],
} 