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

    // Atualizar incidência
    const incidenciaAtualizada = await prisma.incidencia.update({
      where: { id },
      data: {
        titulo: titulo || incidencia.titulo,
        descricao: descricao || incidencia.descricao,
        estado: estado || incidencia.estado,
        prioridade: prioridade || incidencia.prioridade,
      },
    });

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