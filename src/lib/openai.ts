import OpenAI from 'openai';

// Inicializa o cliente OpenAI
const apiKey = process.env.OPENAI_API_KEY;
const isValidApiKey = apiKey && !apiKey.includes('your-api-key-goes-here');

// Interface para os resultados de classificação
export interface ClassificacaoIA {
  categoria: string;
  prioridade: string;
  estado: string;
  tempoEstimado: string;
  palavrasChave: string[];
  departamento: string;
}

/**
 * Classifica automaticamente uma incidência com base no título e descrição
 */
export async function classificarIncidencia(
  titulo: string,
  descricao: string
): Promise<ClassificacaoIA> {
  try {
    // Verifica se a chave de API é válida
    if (!isValidApiKey) {
      console.warn("Nenhuma chave de API OpenAI válida encontrada. Usando classificação padrão.");
      throw new Error("Chave de API OpenAI não configurada. Configure a variável OPENAI_API_KEY no arquivo .env.local");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
    Analise o seguinte relato de incidência e classifique-o:
    
    Título: ${titulo}
    Descrição: ${descricao}
    
    Responda apenas em formato JSON com as seguintes propriedades:
    - categoria: uma das ["Sistema", "Hardware", "Software", "Rede", "Segurança", "Outro"]
    - prioridade: uma das ["Baixa", "Média", "Alta", "Crítica"]
    - estado: deve ser sempre "Aberta" para novas incidências
    - tempoEstimado: uma estimativa de tempo para resolução (ex: "2 dias", "4 horas")
    - palavrasChave: um array com 3 a 5 palavras-chave relacionadas ao problema
    - departamento: qual departamento deve lidar com esta incidência ["TI", "Suporte", "Desenvolvimento", "Infraestrutura", "Segurança"]
    
    Analise cuidadosamente o contexto e escolha os valores mais apropriados.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um analista especializado em classificar incidências de TI." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const response = completion.choices[0].message.content;
    
    if (!response) {
      throw new Error("A API OpenAI retornou uma resposta vazia");
    }

    return JSON.parse(response) as ClassificacaoIA;
  } catch (error) {
    console.error("Erro ao classificar incidência:", error);
    // Retornar classificação padrão em caso de erro
    return {
      categoria: "Sistema",
      prioridade: "Média",
      estado: "Aberta",
      tempoEstimado: "1-3 dias",
      palavrasChave: ["erro", "sistema"],
      departamento: "TI"
    };
  }
}

/**
 * Gera uma resposta do assistente virtual com base na pergunta do usuário
 */
export async function assistenteVirtual(pergunta: string): Promise<string> {
  try {
    // Verifica se a chave de API é válida
    if (!isValidApiKey) {
      console.warn("Nenhuma chave de API OpenAI válida encontrada. Usando resposta padrão.");
      throw new Error("Chave de API OpenAI não configurada. Configure a variável OPENAI_API_KEY no arquivo .env.local");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
    Pergunta do usuário: ${pergunta}
    
    Responda de forma útil, amigável e concisa, como um assistente de suporte técnico 
    especializado em ajudar usuários com incidências e problemas técnicos. 
    Limite sua resposta a 2-3 parágrafos curtos.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Você é um assistente virtual de suporte técnico para o Portal de Incidências. Você ajuda os usuários a entender como usar o sistema e a resolver problemas técnicos. Suas respostas são curtas, diretas e úteis." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    
    if (!response) {
      throw new Error("A API OpenAI retornou uma resposta vazia");
    }

    return response;
  } catch (error) {
    console.error("Erro no assistente virtual:", error);
    return "Desculpe, o assistente virtual está temporariamente indisponível. Para utilizar este recurso, é necessário configurar uma chave de API válida da OpenAI no arquivo .env.local do projeto.";
  }
} 