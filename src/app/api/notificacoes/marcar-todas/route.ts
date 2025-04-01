import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// POST - Marcar todas as notificações como lidas
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Obter usuário atual
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Marcar todas as notificações como lidas
    const resultado = await prisma.notificacao.updateMany({
      where: {
        usuarioId: user.id,
        lida: false
      },
      data: {
        lida: true
      }
    });

    return NextResponse.json({ 
      message: `${resultado.count} notificações marcadas como lidas`,
      count: resultado.count 
    });
  } catch (error) {
    console.error('Erro ao marcar notificações como lidas:', error);
    return NextResponse.json(
      { error: 'Erro ao marcar notificações como lidas' },
      { status: 500 }
    );
  }
} 