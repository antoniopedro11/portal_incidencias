"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Interface para tipagem das incidências
interface Incidencia {
  id: string;
  titulo: string;
  descricao: string;
  estado: string;
  prioridade: string;
  createdAt: string;
  updatedAt: string;
  criadorId: string;
  criador: {
    id: string;
    name: string;
    email: string;
  };
}

export default function IncidenciasPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/incidencias");
    }
  }, [status, router]);

  // Buscar incidências da API
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
      } catch (error) {
        console.error("Erro ao buscar incidências:", error);
        setErro(error instanceof Error ? error.message : "Erro ao buscar incidências");
      } finally {
        setCarregando(false);
      }
    };
    
    buscarIncidencias();
  }, [status]);

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
          <h2 className="text-lg font-medium">Erro ao carregar incidências</h2>
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Minhas Incidências</h1>
        <Link 
          href="/incidencias/nova" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Nova Incidência
        </Link>
      </div>

      {incidencias.length === 0 ? (
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-medium mb-2">Nenhuma incidência encontrada</h2>
          <p className="text-muted-foreground mb-6">Você ainda não registrou nenhuma incidência.</p>
          <Link 
            href="/incidencias/nova" 
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Registrar primeira incidência
          </Link>
        </div>
      ) : (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{incidencia.id.substring(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{incidencia.titulo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        incidencia.estado === 'Resolvida' ? 'bg-green-100 text-green-800' :
                        incidencia.estado === 'Em análise' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {incidencia.estado}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(incidencia.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/incidencias/${incidencia.id}`} className="text-primary hover:text-primary/80 font-medium">
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 