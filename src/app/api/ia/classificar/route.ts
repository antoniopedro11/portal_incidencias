import { NextRequest, NextResponse } from "next/server";
import { classificarIncidencia } from "@/lib/openai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Extrair dados da requisição
    const body = await req.json();
    const { titulo, descricao } = body;

    // Validação dos campos
    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    // Enviar para classificação com IA
    const classificacao = await classificarIncidencia(titulo, descricao);

    // Retornar a classificação
    return NextResponse.json(classificacao, { status: 200 });
    
  } catch (error) {
    console.error("Erro ao classificar incidência:", error);
    return NextResponse.json(
      { error: "Erro ao processar a classificação automática" },
      { status: 500 }
    );
  }
} 