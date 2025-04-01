"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X, Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

// Interface para tipagem das notificações
interface Notificacao {
  id: string;
  tipo: string;
  titulo: string;
  conteudo: string;
  lida: boolean;
  incidenciaId?: string;
  createdAt: string;
  updatedAt: string;
  incidencia?: {
    id: string;
    titulo: string;
  };
}

export default function NotificacoesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/notificacoes");
    }
  }, [status, router]);

  // Buscar notificações da API
  useEffect(() => {
    const buscarNotificacoes = async () => {
      if (status !== "authenticated") return;
      
      try {
        setCarregando(true);
        const response = await fetch("/api/notificacoes");
        
        if (!response.ok) {
          throw new Error("Falha ao buscar notificações");
        }
        
        const data = await response.json();
        setNotificacoes(data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        setErro(error instanceof Error ? error.message : "Erro ao buscar notificações");
      } finally {
        setCarregando(false);
      }
    };
    
    buscarNotificacoes();
  }, [status]);

  // Marcar notificação como lida
  const marcarComoLida = async (id: string) => {
    try {
      const response = await fetch(`/api/notificacoes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lida: true }),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao atualizar notificação");
      }
      
      // Atualizar estado local
      setNotificacoes(notificacoes.map(n => 
        n.id === id ? { ...n, lida: true } : n
      ));
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  // Excluir notificação
  const excluirNotificacao = async (id: string) => {
    try {
      const response = await fetch(`/api/notificacoes/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Falha ao excluir notificação");
      }
      
      // Remover do estado
      setNotificacoes(notificacoes.filter(n => n.id !== id));
    } catch (error) {
      console.error("Erro ao excluir notificação:", error);
    }
  };

  // Marcar todas como lidas
  const marcarTodasComoLidas = async () => {
    try {
      const response = await fetch("/api/notificacoes/marcar-todas", {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error("Falha ao marcar notificações como lidas");
      }
      
      // Atualizar estado local
      setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
    } catch (error) {
      console.error("Erro ao marcar todas notificações como lidas:", error);
    }
  };

  // Formatar data
  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <h2 className="text-lg font-medium">Erro ao carregar notificações</h2>
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie suas notificações e fique atualizado sobre suas incidências
          </p>
        </div>
        
        {notificacoes.some(n => !n.lida) && (
          <Button 
            variant="outline" 
            onClick={marcarTodasComoLidas}
          >
            <Check className="h-4 w-4 mr-2" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {notificacoes.length > 0 ? (
        <div className="bg-card rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-border">
            {notificacoes.map((notificacao) => (
              <li 
                key={notificacao.id} 
                className={`p-4 ${!notificacao.lida ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className={`mr-3 mt-1 p-1 rounded-full ${
                        notificacao.tipo === 'sistema' ? 'bg-blue-100' :
                        notificacao.tipo === 'comentario' ? 'bg-green-100' :
                        'bg-orange-100'
                      }`}>
                        <BellRing className={`h-4 w-4 ${
                          notificacao.tipo === 'sistema' ? 'text-blue-600' :
                          notificacao.tipo === 'comentario' ? 'text-green-600' :
                          'text-orange-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">
                          {notificacao.titulo}
                          {!notificacao.lida && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
                              Nova
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notificacao.conteudo}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <span>{formatarData(notificacao.createdAt)}</span>
                          {notificacao.incidenciaId && (
                            <Link
                              href={`/incidencias/${notificacao.incidenciaId}`}
                              className="ml-3 text-primary hover:text-primary/80 font-medium"
                            >
                              Ver incidência
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!notificacao.lida && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => marcarComoLida(notificacao.id)}
                        title="Marcar como lida"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => excluirNotificacao(notificacao.id)}
                      title="Excluir notificação"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <BellRing className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Nenhuma notificação encontrada</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Você será notificado quando houver atualizações em suas incidências
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Voltar para o Dashboard
          </Link>
        </div>
      )}
    </div>
  );
} 