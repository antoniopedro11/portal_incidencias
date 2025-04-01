import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET - Listar todos os comentários de uma incidência
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

    // Verificar se a incidência existe
    const incidencia = await prisma.incidencia.findUnique({
      where: { id },
    });

    if (!incidencia) {
      return NextResponse.json(
        { error: 'Incidência não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o usuário tem permissão para ver os comentários
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
    
    // Verificar se o usuário é admin ou o criador da incidência
    if (!isAdmin && incidencia.criadorId !== user.id) {
      return NextResponse.json(
        { error: 'Acesso negado: você não tem permissão para ver esta incidência' },
        { status: 403 }
      );
    }

    // Buscar comentários da incidência
    const comentarios = await prisma.comentario.findMany({
      where: { incidenciaId: id },
      orderBy: { createdAt: 'asc' },
      include: {
        autor: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comentarios);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar comentários' },
      { status: 500 }
    );
  }
}

// POST - Adicionar um novo comentário a uma incidência
export async function POST(
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
    const { texto } = data;

    // Validar dados
    if (!texto || texto.trim() === '') {
      return NextResponse.json(
        { error: 'O texto do comentário é obrigatório' },
        { status: 400 }
      );
    }

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

    // @ts-ignore - Ignorar erro de tipagem
    const isAdmin = user.role === "ADMIN" || user.role === "admin";
    
    // Verificar se o usuário é admin ou o criador da incidência
    if (!isAdmin && incidencia.criadorId !== user.id) {
      return NextResponse.json(
        { error: 'Acesso negado: você não tem permissão para comentar nesta incidência' },
        { status: 403 }
      );
    }

    // Criar o comentário
    const novoComentario = await prisma.comentario.create({
      data: {
        texto,
        incidenciaId: id,
        autorId: user.id,
      },
      include: {
        autor: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Criar notificação para o criador da incidência (se não for o autor do comentário)
    if (incidencia.criadorId !== user.id) {
      await prisma.notificacao.create({
        data: {
          tipo: 'comentario',
          titulo: 'Novo comentário em sua incidência',
          conteudo: `${user.name || user.email} comentou em sua incidência "${incidencia.titulo}".`,
          usuarioId: incidencia.criadorId,
          incidenciaId: id,
        },
      });
    }

    return NextResponse.json(novoComentario, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar comentário' },
      { status: 500 }
    );
  }
} 