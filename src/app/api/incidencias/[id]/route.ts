import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET - Obter uma incidência específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = params;

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

    // Buscar a incidência
    const incidencia = await prisma.incidencia.findUnique({
      where: { id },
      include: {
        criador: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!incidencia) {
      return NextResponse.json(
        { error: 'Incidência não encontrada' },
        { status: 404 }
      );
    }

    // Verificar permissões: apenas o criador da incidência ou administradores podem vê-la
    const isAdmin = user.role === "ADMIN" || user.role === "admin";
    const isCreator = incidencia.criadorId === user.id;

    if (!isAdmin && !isCreator) {
      return NextResponse.json(
        { error: 'Acesso negado: você não tem permissão para ver esta incidência' },
        { status: 403 }
      );
    }

    return NextResponse.json(incidencia);
  } catch (error) {
    console.error('Erro ao buscar incidência:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar incidência' },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar uma incidência
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
    const { titulo, descricao, estado, prioridade } = data;

    // Verificar se a incidência existe
    const incidencia = await prisma.incidencia.findUnique({
      where: { id },
      include: {
        criador: true,
      },
    });

    if (!incidencia) {
      return NextResponse.json(
        { error: 'Incidência não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o usuário é o criador da incidência
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar permissões para atualizar o estado
    const isAdmin = user.role === "ADMIN" || user.role === "admin";
    const updateData: any = {
      titulo: titulo || incidencia.titulo,
      descricao: descricao || incidencia.descricao,
      prioridade: prioridade || incidencia.prioridade,
    };
    
    // Apenas administradores podem atualizar o estado da incidência
    if (estado && estado !== incidencia.estado) {
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Apenas administradores podem alterar o estado das incidências' },
          { status: 403 }
        );
      }
      updateData.estado = estado;
    } else {
      updateData.estado = incidencia.estado;
    }

    // Atualizar incidência
    const incidenciaAtualizada = await prisma.incidencia.update({
      where: { id },
      data: updateData,
    });

    // Criar notificação se o estado foi alterado
    if (estado && estado !== incidencia.estado) {
      try {
        // Criar notificação para o criador da incidência
        await prisma.notificacao.create({
          data: {
            tipo: 'sistema',
            titulo: 'Alteração de Estado da Incidência',
            conteudo: `O estado da sua incidência "${incidencia.titulo}" foi alterado para "${estado}".`,
            usuarioId: incidencia.criadorId,
            incidenciaId: incidencia.id
          }
        });
      } catch (notificationError) {
        // Apenas log do erro, não impede a atualização da incidência
        console.error('Erro ao criar notificação:', notificationError);
      }
    }

    return NextResponse.json(incidenciaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar incidência:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar incidência' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir uma incidência
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

    // Verificar se a incidência existe
    const incidencia = await prisma.incidencia.findUnique({
      where: { id },
      include: {
        criador: true,
      },
    });

    if (!incidencia) {
      return NextResponse.json(
        { error: 'Incidência não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o usuário é o criador da incidência
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Excluir incidência
    await prisma.incidencia.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Incidência excluída com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao excluir incidência:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir incidência' },
      { status: 500 }
    );
  }
} 