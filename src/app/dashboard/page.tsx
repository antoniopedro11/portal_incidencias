"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Interface para tipagem das incidências
interface Incidencia {
  id: string;
  titulo: string;
  estado: string;
  prioridade: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para estatísticas
interface Estatisticas {
  total: number;
  abertas: number;
  emAnalise: number;
  resolvidas: number;
  altaPrioridade: number;
  mediaPrioridade: number;
  baixaPrioridade: number;
  ultimaSemana: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    total: 0,
    abertas: 0,
    emAnalise: 0,
    resolvidas: 0,
    altaPrioridade: 0,
    mediaPrioridade: 0,
    baixaPrioridade: 0,
    ultimaSemana: 0,
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [status, router]);

  // Buscar incidências e calcular estatísticas
  useEffect(() => {
    const buscarIncidencias = async () => {
      if (status !== "authenticated") return;
      
      try {
        setCarregando(true);
        const response = await fetch("/api/incidencias");
        
        if (!response.ok) {
          throw new Error("Falha ao buscar incidências");
        }
        
        const data = await response.json();
        setIncidencias(data);
        
        // Calcular estatísticas
        const stats: Estatisticas = {
          total: data.length,
          abertas: data.filter((inc: Incidencia) => inc.estado === "Aberta").length,
          emAnalise: data.filter((inc: Incidencia) => inc.estado === "Em análise").length,
          resolvidas: data.filter((inc: Incidencia) => inc.estado === "Resolvida").length,
          altaPrioridade: data.filter((inc: Incidencia) => inc.prioridade === "Alta").length,
          mediaPrioridade: data.filter((inc: Incidencia) => inc.prioridade === "Média").length,
          baixaPrioridade: data.filter((inc: Incidencia) => inc.prioridade === "Baixa").length,
          ultimaSemana: calcularIncidenciasUltimaSemana(data),
        };
        
        setEstatisticas(stats);
      } catch (error) {
        console.error("Erro ao buscar incidências:", error);
        setErro(error instanceof Error ? error.message : "Erro ao buscar incidências");
      } finally {
        setCarregando(false);
      }
    };
    
    buscarIncidencias();
  }, [status]);

  // Função para calcular incidências criadas na última semana
  const calcularIncidenciasUltimaSemana = (data: Incidencia[]) => {
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return data.filter((inc: Incidencia) => {
      const dataCriacao = new Date(inc.createdAt);
      return dataCriacao >= umaSemanaAtras;
    }).length;
  };

  // Obter as últimas 5 incidências
  const ultimasIncidencias = [...incidencias]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Função para renderizar o gráfico de barras simples para estados
  const renderizarGraficoEstados = () => {
    const total = estatisticas.total > 0 ? estatisticas.total : 1; // Evitar divisão por zero
    
    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <div className="w-24 text-sm">Abertas</div>
          <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full"
              style={{ width: `${(estatisticas.abertas / total) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 text-sm text-right">{estatisticas.abertas}</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-24 text-sm">Em análise</div>
          <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(estatisticas.emAnalise / total) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 text-sm text-right">{estatisticas.emAnalise}</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-24 text-sm">Resolvidas</div>
          <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(estatisticas.resolvidas / total) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 text-sm text-right">{estatisticas.resolvidas}</div>
        </div>
      </div>
    );
  };

  // Função para renderizar o gráfico de barras simples para prioridades
  const renderizarGraficoPrioridades = () => {
    const total = estatisticas.total > 0 ? estatisticas.total : 1; // Evitar divisão por zero
    
    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <div className="w-24 text-sm">Alta</div>
          <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${(estatisticas.altaPrioridade / total) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 text-sm text-right">{estatisticas.altaPrioridade}</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-24 text-sm">Média</div>
          <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${(estatisticas.mediaPrioridade / total) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 text-sm text-right">{estatisticas.mediaPrioridade}</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-24 text-sm">Baixa</div>
          <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(estatisticas.baixaPrioridade / total) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 text-sm text-right">{estatisticas.baixaPrioridade}</div>
        </div>
      </div>
    );
  };

  // Mostrar tela de carregamento
  if (status === "loading" || carregando) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Mostrar erro se houver
  if (erro) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
          <h2 className="text-lg font-medium">Erro ao carregar dashboard</h2>
          <p className="mt-2">{erro}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Visão Geral</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Estatísticas e resumo das incidências
        </p>
      </div>

      {/* Cards com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-muted-foreground text-sm">Total de Incidências</h2>
          <p className="text-3xl font-bold mt-2">{estatisticas.total}</p>
          <div className="mt-2 text-sm">
            <span className="text-primary">{estatisticas.ultimaSemana}</span> na última semana
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-muted-foreground text-sm">Incidências Abertas</h2>
          <p className="text-3xl font-bold mt-2">{estatisticas.abertas}</p>
          <div className="mt-2 text-sm">
            <span className={`${estatisticas.abertas > estatisticas.resolvidas ? 'text-yellow-500' : 'text-green-500'}`}>
              {estatisticas.abertas > 0 ? 
                Math.round((estatisticas.abertas / estatisticas.total) * 100) : 0}%
            </span> do total
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-muted-foreground text-sm">Em Análise</h2>
          <p className="text-3xl font-bold mt-2">{estatisticas.emAnalise}</p>
          <div className="mt-2 text-sm">
            <span className="text-blue-500">
              {estatisticas.emAnalise > 0 ? 
                Math.round((estatisticas.emAnalise / estatisticas.total) * 100) : 0}%
            </span> do total
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-muted-foreground text-sm">Resolvidas</h2>
          <p className="text-3xl font-bold mt-2">{estatisticas.resolvidas}</p>
          <div className="mt-2 text-sm">
            <span className="text-green-500">
              {estatisticas.resolvidas > 0 ? 
                Math.round((estatisticas.resolvidas / estatisticas.total) * 100) : 0}%
            </span> do total
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Incidências por Estado</h2>
          {renderizarGraficoEstados()}
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Incidências por Prioridade</h2>
          {renderizarGraficoPrioridades()}
        </div>
      </div>

      {/* Últimas incidências */}
      <div className="bg-card rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Últimas Incidências</h2>
          <Link
            href="/incidencias"
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Ver todas
          </Link>
        </div>

        {ultimasIncidencias.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Título</th>
                  <th className="text-left py-3 px-4 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 font-medium">Prioridade</th>
                  <th className="text-left py-3 px-4 font-medium">Data</th>
                  <th className="text-right py-3 px-4 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {ultimasIncidencias.map((incidencia) => (
                  <tr key={incidencia.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">{incidencia.titulo}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        incidencia.estado === 'Resolvida' ? 'bg-green-100 text-green-800' :
                        incidencia.estado === 'Em análise' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {incidencia.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        incidencia.prioridade === 'Alta' ? 'bg-red-100 text-red-800' :
                        incidencia.prioridade === 'Média' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incidencia.prioridade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(incidencia.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/incidencias/${incidencia.id}`}
                        className="text-primary hover:text-primary/80"
                      >
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Nenhuma incidência encontrada</p>
            <Link
              href="/incidencias/nova"
              className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Criar nova incidência
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 