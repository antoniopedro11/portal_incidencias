import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // @ts-ignore - Corrigindo o problema de tipagem
    if (session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Permissão negada" }, { status: 403 });
    }

    const userId = params.id;
    
    // Verifica se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userExists) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Obtém os dados da requisição
    const body = await request.json();
    
    // Valida o role enviado
    if (body.role !== "USER" && body.role !== "ADMIN") {
      return NextResponse.json({ error: "Função inválida" }, { status: 400 });
    }

    // Atualiza o usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: body.role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // @ts-ignore - Corrigindo o problema de tipagem
    if (session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Permissão negada" }, { status: 403 });
    }

    const userId = params.id;
    
    // Verifica se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userExists) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Obtém os dados da requisição
    const body = await request.json();
    
    // Valida o role enviado
    if (body.role !== "USER" && body.role !== "ADMIN") {
      return NextResponse.json({ error: "Função inválida" }, { status: 400 });
    }

    // Atualiza o usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: body.role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
} 