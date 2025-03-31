export default function IncidenciaDetalhadaPage({ params }: { params: { id: string } }) {
  // Dados simulados de uma incidência específica
  const incidencia = {
    id: parseInt(params.id),
    titulo: "Problema com login",
    descricao: "Não consigo fazer login no sistema após a atualização. Sempre que tento inserir minhas credenciais e clicar em 'Entrar', a página é recarregada, mas continuo na tela de login sem nenhuma mensagem de erro.",
    status: "Em análise",
    prioridade: "Alta",
    categoria: "Sistema",
    dataCriacao: "2023-07-15",
    atualizadoEm: "2023-07-16",
    responsavel: "Carlos Silva",
    comentarios: [
      {
        id: 1,
        autor: "Maria Técnica",
        data: "2023-07-15 14:30",
        conteudo: "Estamos analisando o problema. Você poderia informar qual navegador está utilizando?"
      },
      {
        id: 2,
        autor: "Usuário",
        data: "2023-07-15 15:45",
        conteudo: "Estou usando o Chrome versão 115.0.5790.110"
      },
      {
        id: 3,
        autor: "Carlos Silva",
        data: "2023-07-16 09:20",
        conteudo: "Identificamos um problema na última atualização que afeta o login no Chrome. Nossa equipe está trabalhando na correção. Como solução temporária, você pode tentar usar o Firefox ou Edge."
      }
    ],
    historico: [
      {
        data: "2023-07-15 10:20",
        acao: "Incidência criada",
        autor: "Usuário"
      },
      {
        data: "2023-07-15 13:15",
        acao: "Status alterado para 'Em análise'",
        autor: "Sistema"
      },
      {
        data: "2023-07-15 13:18",
        acao: "Atribuído para Carlos Silva",
        autor: "Sistema"
      },
      {
        data: "2023-07-16 09:25",
        acao: "Prioridade alterada para 'Alta'",
        autor: "Carlos Silva"
      }
    ]
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <div className="flex items-center mb-2">
            <a href="/incidencias" className="text-muted-foreground hover:text-primary mr-2">
              ← Voltar
            </a>
            <span className="text-muted-foreground">|</span>
            <span className="ml-2 text-sm text-muted-foreground">Incidência #{incidencia.id}</span>
          </div>
          <h1 className="text-3xl font-bold">{incidencia.titulo}</h1>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            incidencia.status === 'Resolvido' ? 'bg-green-100 text-green-800' :
            incidencia.status === 'Em análise' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {incidencia.status}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            incidencia.prioridade === 'Alta' ? 'bg-red-100 text-red-800' :
            incidencia.prioridade === 'Média' ? 'bg-orange-100 text-orange-800' :
            'bg-green-100 text-green-800'
          }`}>
            {incidencia.prioridade}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Detalhes da incidência */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Detalhes</h2>
            <div className="prose max-w-none">
              <p>{incidencia.descricao}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Categoria:</span>
                <span className="ml-2 font-medium">{incidencia.categoria}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Responsável:</span>
                <span className="ml-2 font-medium">{incidencia.responsavel}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Data de criação:</span>
                <span className="ml-2 font-medium">{incidencia.dataCriacao}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Última atualização:</span>
                <span className="ml-2 font-medium">{incidencia.atualizadoEm}</span>
              </div>
            </div>
          </div>

          {/* Comentários */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Comentários</h2>
            <div className="space-y-4">
              {incidencia.comentarios.map((comentario) => (
                <div key={comentario.id} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{comentario.autor}</span>
                    <span className="text-sm text-muted-foreground">{comentario.data}</span>
                  </div>
                  <p className="text-sm">{comentario.conteudo}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium mb-3">Adicionar comentário</h3>
              <textarea 
                className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm"
                rows={3}
                placeholder="Escreva seu comentário..."
              />
              <div className="mt-2 flex justify-end">
                <button className="bg-primary text-primary-foreground px-3 py-1.5 text-sm rounded-md hover:bg-primary/90 transition-colors">
                  Enviar Comentário
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Ações */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Ações</h2>
            <div className="space-y-2">
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors text-sm font-medium">
                Atualizar Status
              </button>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors text-sm font-medium">
                Alterar Prioridade
              </button>
              <button className="w-full bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors text-sm font-medium">
                Fechar Incidência
              </button>
            </div>
          </div>

          {/* Histórico */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Histórico</h2>
            <div className="space-y-3">
              {incidencia.historico.map((evento, index) => (
                <div key={index} className="border-l-2 border-muted pl-4 py-1">
                  <div className="text-sm font-medium">{evento.acao}</div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{evento.autor}</span>
                    <span>{evento.data}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 