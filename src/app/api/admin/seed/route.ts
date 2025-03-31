import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// NOTA: Este endpoint é apenas para desenvolvimento e teste.
// Em produção, isto deveria ser removido ou protegido.
export async function GET() {
  try {
    // Verifica se já existe um usuário admin
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: "admin@example.com",
        role: "ADMIN"
      }
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: "Usuário administrador já existe",
        user: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      });
    }

    // Cria um usuário admin para teste
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const admin = await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
      }
    });

    // Cria alguns usuários comuns para teste
    const regularUser1 = await prisma.user.create({
      data: {
        name: "Usuário Teste 1",
        email: "user1@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "USER",
      }
    });

    const regularUser2 = await prisma.user.create({
      data: {
        name: "Usuário Teste 2",
        email: "user2@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "USER",
      }
    });

    return NextResponse.json({
      message: "Dados iniciais criados com sucesso",
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      users: [
        {
          id: regularUser1.id,
          email: regularUser1.email,
          name: regularUser1.name,
          role: regularUser1.role
        },
        {
          id: regularUser2.id,
          email: regularUser2.email,
          name: regularUser2.name,
          role: regularUser2.role
        }
      ]
    });
  } catch (error) {
    console.error("Erro ao criar dados iniciais:", error);
    return NextResponse.json(
      { error: "Erro ao criar dados iniciais" },
      { status: 500 }
    );
  }
} 