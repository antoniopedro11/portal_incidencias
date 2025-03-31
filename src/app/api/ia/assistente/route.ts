import { NextRequest, NextResponse } from "next/server";
import { assistenteVirtual } from "@/lib/openai";
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
    const { pergunta } = body;

    // Validação dos campos
    if (!pergunta) {
      return NextResponse.json(
        { error: "A pergunta é obrigatória" },
        { status: 400 }
      );
    }

    // Enviar para o assistente virtual
    const resposta = await assistenteVirtual(pergunta);

    // Retornar a resposta
    return NextResponse.json({ resposta }, { status: 200 });
    
  } catch (error) {
    console.error("Erro no assistente virtual:", error);
    return NextResponse.json(
      { error: "Erro ao processar a pergunta" },
      { status: 500 }
    );
  }
} 