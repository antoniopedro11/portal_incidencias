import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET - Listar todas as notificações do usuário
export async function GET(request: NextRequest) {
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

    // Parâmetros de consulta para filtragem
    const searchParams = request.nextUrl.searchParams;
    const limite = searchParams.get('limite');
    const apenasNaoLidas = searchParams.get('nao_lidas') === 'true';

    // Construir a consulta com filtros opcionais
    const whereClause: any = {
      usuarioId: user.id,
    };
    
    // Filtrar por não lidas, se solicitado
    if (apenasNaoLidas) {
      whereClause.lida = false;
    }

    // Buscar notificações
    const notificacoes = await prisma.notificacao.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      take: limite ? parseInt(limite) : undefined,
      include: {
        incidencia: {
          select: {
            id: true,
            titulo: true,
          }
        }
      }
    });

    return NextResponse.json(notificacoes);
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notificações' },
      { status: 500 }
    );
  }
}

// POST - Criar uma nova notificação
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verificar se o usuário é administrador
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // @ts-ignore - Ignorar erro de tipagem
    const isAdmin = user.role === "ADMIN" || user.role === "admin";
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Apenas administradores podem criar notificações manualmente' }, { status: 403 });
    }

    // Dados da requisição
    const data = await request.json();
    const { tipo, titulo, conteudo, usuarioId, incidenciaId } = data;

    // Validar dados
    if (!tipo || !titulo || !conteudo || !usuarioId) {
      return NextResponse.json(
        { error: 'Tipo, título, conteúdo e ID do usuário são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se o usuário de destino existe
    const usuarioDestino = await prisma.user.findUnique({
      where: { id: usuarioId },
    });

    if (!usuarioDestino) {
      return NextResponse.json(
        { error: 'Usuário de destino não encontrado' },
        { status: 404 }
      );
    }

    // Criar notificação
    const novaNotificacao = await prisma.notificacao.create({
      data: {
        tipo,
        titulo,
        conteudo,
        usuarioId,
        incidenciaId
      },
    });

    return NextResponse.json(novaNotificacao, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao criar notificação' },
      { status: 500 }
    );
  }
} 