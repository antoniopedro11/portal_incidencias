import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET - Listar todas as incidências ou filtradas por parâmetros
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
    const estado = searchParams.get('estado');
    const prioridade = searchParams.get('prioridade');

    // Construir a consulta com filtros opcionais
    const whereClause: any = {};
    
    // Filtrar por estado, se fornecido
    if (estado) {
      whereClause.estado = estado;
    }
    
    // Filtrar por prioridade, se fornecida
    if (prioridade) {
      whereClause.prioridade = prioridade;
    }

    // Buscar incidências
    const incidencias = await prisma.incidencia.findMany({
      where: whereClause,
      include: {
        criador: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(incidencias);
  } catch (error) {
    console.error('Erro ao buscar incidências:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar incidências' },
      { status: 500 }
    );
  }
}

// POST - Criar uma nova incidência
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

    // Dados da requisição
    const data = await request.json();
    const { titulo, descricao, prioridade } = data;

    // Validar dados
    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: 'Título e descrição são obrigatórios' },
        { status: 400 }
      );
    }

    // Criar incidência
    const novaIncidencia = await prisma.incidencia.create({
      data: {
        titulo,
        descricao,
        prioridade: prioridade || 'Normal',
        criadorId: user.id,
      },
    });

    return NextResponse.json(novaIncidencia, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar incidência:', error);
    return NextResponse.json(
      { error: 'Erro ao criar incidência' },
      { status: 500 }
    );
  }
} 