export default function IncidenciasPage() {
  // Dados simulados de incidências
  const incidencias = [
    {
      id: 1,
      titulo: "Problema com login",
      descricao: "Não consigo fazer login no sistema após a atualização",
      status: "Em análise",
      prioridade: "Alta",
      dataCriacao: "2023-07-15",
      atualizadoEm: "2023-07-16"
    },
    {
      id: 2,
      titulo: "Erro ao gerar relatório",
      descricao: "O sistema apresenta um erro quando tento gerar o relatório mensal",
      status: "Aberto",
      prioridade: "Média",
      dataCriacao: "2023-07-10",
      atualizadoEm: "2023-07-10"
    },
    {
      id: 3,
      titulo: "Lentidão no módulo de vendas",
      descricao: "O módulo de vendas está extremamente lento nos últimos dias",
      status: "Resolvido",
      prioridade: "Baixa",
      dataCriacao: "2023-07-01",
      atualizadoEm: "2023-07-08"
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Minhas Incidências</h1>
        <a 
          href="/incidencias/nova" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Nova Incidência
        </a>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Prioridade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {incidencias.map((incidencia) => (
                <tr key={incidencia.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{incidencia.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{incidencia.titulo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      incidencia.status === 'Resolvido' ? 'bg-green-100 text-green-800' :
                      incidencia.status === 'Em análise' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {incidencia.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      incidencia.prioridade === 'Alta' ? 'bg-red-100 text-red-800' :
                      incidencia.prioridade === 'Média' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incidencia.prioridade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{incidencia.dataCriacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href={`/incidencias/${incidencia.id}`} className="text-primary hover:text-primary/80 font-medium">
                      Detalhes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 