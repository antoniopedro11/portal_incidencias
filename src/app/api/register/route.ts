import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  console.log("Recebida requisição de registro");
  try {
    const body = await request.json();
    console.log("Corpo da requisição:", { ...body, password: "***" });
    const { email, name, password } = body;

    if (!email || !name || !password) {
      console.log("Campos obrigatórios faltando");
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se o email já está em uso
    console.log("Verificando se email já existe:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Email já em uso");
      return NextResponse.json(
        { message: 'Email já está em uso' },
        { status: 400 }
      );
    }

    console.log("Criptografando senha");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Criando novo usuário");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("Usuário criado com sucesso:", user.id);
    const { password: _, ...result } = user;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 