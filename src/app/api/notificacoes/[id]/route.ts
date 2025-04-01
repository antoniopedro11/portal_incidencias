import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET - Obter uma notificação específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Obter o usuário atual
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const { id } = params;

    // Buscar a notificação
    const notificacao = await prisma.notificacao.findUnique({
      where: { id },
    });

    if (!notificacao) {
      return NextResponse.json(
        { error: 'Notificação não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se a notificação pertence ao usuário atual
    if (notificacao.usuarioId !== user.id) {
      // @ts-ignore - Ignorar erro de tipagem
      const isAdmin = user.role === "ADMIN" || user.role === "admin";
      
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Acesso negado: você não tem permissão para ver esta notificação' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(notificacao);
  } catch (error) {
    console.error('Erro ao buscar notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notificação' },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar uma notificação (marcar como lida)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();
    const { lida } = data;

    // Verificar se a notificação existe
    const notificacao = await prisma.notificacao.findUnique({
      where: { id },
    });

    if (!notificacao) {
      return NextResponse.json(
        { error: 'Notificação não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o usuário é o dono da notificação ou um administrador
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // @ts-ignore - Ignorar erro de tipagem
    const isAdmin = user.role === "ADMIN" || user.role === "admin";
    
    if (notificacao.usuarioId !== user.id && !isAdmin) {
      return NextResponse.json(
        { error: 'Acesso negado: você não tem permissão para atualizar esta notificação' },
        { status: 403 }
      );
    }

    // Atualizar notificação
    const notificacaoAtualizada = await prisma.notificacao.update({
      where: { id },
      data: {
        lida: lida !== undefined ? lida : notificacao.lida,
      },
    });

    return NextResponse.json(notificacaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar notificação' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir uma notificação
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = params;

    // Verificar se a notificação existe
    const notificacao = await prisma.notificacao.findUnique({
      where: { id },
    });

    if (!notificacao) {
      return NextResponse.json(
        { error: 'Notificação não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o usuário é o dono da notificação ou um administrador
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // @ts-ignore - Ignorar erro de tipagem
    const isAdmin = user.role === "ADMIN" || user.role === "admin";
    
    if (notificacao.usuarioId !== user.id && !isAdmin) {
      return NextResponse.json(
        { error: 'Acesso negado: você não tem permissão para excluir esta notificação' },
        { status: 403 }
      );
    }

    // Excluir notificação
    await prisma.notificacao.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Notificação excluída com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao excluir notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir notificação' },
      { status: 500 }
    );
  }
} 