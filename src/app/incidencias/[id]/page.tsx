"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Interface para tipagem da incidência
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

export default function IncidenciaDetalhe({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [incidencia, setIncidencia] = useState<Incidencia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizando, setAtualizando] = useState(false);
  const [novoEstado, setNovoEstado] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [atualizadoComSucesso, setAtualizadoComSucesso] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [carregandoComentarios, setCarregandoComentarios] = useState(false);
  
  // @ts-ignore - Corrigindo o problema de tipagem
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "admin";

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/incidencias/${params.id}`);
    }
  }, [status, router, params.id]);

  // Buscar detalhes da incidência
  useEffect(() => {
    const buscarIncidencia = async () => {
      if (status !== "authenticated") return;
      
      try {
        setCarregando(true);
        const response = await fetch(`/api/incidencias/${params.id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Falha ao buscar detalhes da incidência");
        }
        
        const data = await response.json();
        setIncidencia(data);
        setNovoEstado(data.estado);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        setErro(error instanceof Error ? error.message : "Erro ao buscar detalhes da incidência");
      } finally {
        setCarregando(false);
      }
    };
    
    buscarIncidencia();
  }, [status, params.id]);

  // Buscar comentários da incidência
  useEffect(() => {
    const buscarComentarios = async () => {
      if (status !== "authenticated" || !incidencia) return;
      
      try {
        setCarregandoComentarios(true);
        const response = await fetch(`/api/incidencias/${params.id}/comentarios`);
        
        if (!response.ok) {
          throw new Error("Falha ao buscar comentários");
        }
        
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      } finally {
        setCarregandoComentarios(false);
      }
    };
    
    buscarComentarios();
  }, [status, params.id, incidencia]);

  // Adicionar comentário
  const adicionarComentario = async () => {
    if (!incidencia || !comentario.trim()) return;
    
    try {
      const response = await fetch(`/api/incidencias/${params.id}/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto: comentario,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao adicionar comentário");
      }
      
      const novoComentario = await response.json();
      setComentarios([...comentarios, novoComentario]);
      setComentario("");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  // Atualizar estado da incidência
  const atualizarEstado = async () => {
    if (!incidencia || novoEstado === incidencia.estado) return;
    
    try {
      setAtualizando(true);
      setMensagemErro("");
      setAtualizadoComSucesso(false);
      
      const response = await fetch(`/api/incidencias/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: novoEstado,
          comentario: comentario.trim() ? comentario : undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Falha ao atualizar incidência");
      }
      
      // Atualizar o estado local da incidência
      setIncidencia({
        ...incidencia,
        estado: novoEstado,
        updatedAt: new Date().toISOString()
      });
      
      // Se houver comentário, adicionar à lista
      if (comentario.trim()) {
        // Recarregar comentários
        const comentariosResponse = await fetch(`/api/incidencias/${params.id}/comentarios`);
        if (comentariosResponse.ok) {
          const comentariosData = await comentariosResponse.json();
          setComentarios(comentariosData);
        }
        setComentario("");
      }
      
      // Mostrar mensagem de sucesso
      setAtualizadoComSucesso(true);
      
      // Recarregar a página após um pequeno delay
      setTimeout(() => {
        router.refresh();
      }, 2000);
      
    } catch (error) {
      console.error("Erro ao atualizar incidência:", error);
      setMensagemErro(error instanceof Error ? error.message : "Erro ao atualizar incidência");
    } finally {
      setAtualizando(false);
    }
  };

  // Excluir incidência
  const excluirIncidencia = async () => {
    if (!confirm("Tem certeza que deseja excluir esta incidência?")) return;
    
    try {
      setAtualizando(true);
      const response = await fetch(`/api/incidencias/${params.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Falha ao excluir incidência");
      }
      
      router.push("/incidencias");
      
    } catch (error) {
      console.error("Erro ao excluir incidência:", error);
      setErro(error instanceof Error ? error.message : "Erro ao excluir incidência");
      setAtualizando(false);
    }
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
          <h2 className="text-lg font-medium">Erro ao carregar detalhes</h2>
          <p className="mt-2">{erro}</p>
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Tentar novamente
            </button>
            <Link 
              href="/incidencias" 
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Voltar para lista
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar mensagem se incidência não for encontrada
  if (!incidencia) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium">Incidência não encontrada</h2>
          <p className="mt-2">A incidência que você está procurando não existe ou foi removida.</p>
          <Link 
            href="/incidencias" 
            className="mt-4 inline-block px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Voltar para lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link 
          href="/incidencias" 
          className="text-primary hover:text-primary/80 font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Voltar para lista
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{incidencia.titulo}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                incidencia.prioridade === 'Alta' ? 'bg-red-100 text-red-800' :
                incidencia.prioridade === 'Média' ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800'
              }`}>
                {incidencia.prioridade}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-muted-foreground text-sm mb-2">
                Criado por <span className="font-medium text-foreground">{incidencia.criador.name || incidencia.criador.email}</span> em {new Date(incidencia.createdAt).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-muted-foreground text-sm">
                Última atualização: {new Date(incidencia.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Descrição</h2>
              <div className="bg-muted/30 rounded-md p-4">
                <p className="whitespace-pre-wrap">{incidencia.descricao}</p>
              </div>
            </div>
          </div>

          {/* Comentários */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Comentários</h2>
            
            {carregandoComentarios ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : comentarios.length > 0 ? (
              <div className="space-y-4">
                {comentarios.map((comentario) => (
                  <div key={comentario.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        {comentario.autor.name ? comentario.autor.name[0].toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">
                            {comentario.autor.name || comentario.autor.email}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comentario.createdAt).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comentario.texto}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Nenhum comentário ainda. Seja o primeiro a comentar!
              </p>
            )}
            
            <div className="mt-4">
              <div className="relative">
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Adicione um comentário..."
                  className="w-full p-3 border border-input rounded-md min-h-[80px] resize-none bg-background"
                />
                <button
                  onClick={adicionarComentario}
                  disabled={!comentario.trim()}
                  className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="m22 2-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Painel lateral */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Status da Incidência</h2>
            
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                incidencia.estado === 'Resolvida' ? 'bg-green-100 text-green-800' :
                incidencia.estado === 'Em análise' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {incidencia.estado}
              </span>
            </div>
            
            {isAdmin ? (
              <div className="mt-4">
                <label htmlFor="estado" className="block text-sm font-medium mb-2">
                  Atualizar Status
                </label>
                <select
                  id="estado"
                  value={novoEstado}
                  onChange={(e) => setNovoEstado(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-4 py-2"
                >
                  <option value="Aberta">Aberta</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Resolvida">Resolvida</option>
                </select>
                
                <div className="mt-3">
                  <label htmlFor="comentario-estado" className="block text-sm font-medium mb-2">
                    Adicionar Comentário (opcional)
                  </label>
                  <textarea
                    id="comentario-estado"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Explique a razão da mudança de estado..."
                    className="w-full rounded-md border border-input bg-background px-4 py-2 min-h-[80px] resize-none"
                  ></textarea>
                </div>
                
                {mensagemErro && (
                  <p className="mt-2 text-sm text-red-600">{mensagemErro}</p>
                )}
                
                {atualizadoComSucesso && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      Estado atualizado com sucesso!
                    </p>
                  </div>
                )}
                
                <button
                  onClick={atualizarEstado}
                  disabled={atualizando || novoEstado === incidencia.estado}
                  className="mt-3 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
                >
                  {atualizando ? "Atualizando..." : "Atualizar Status"}
                </button>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  Apenas administradores podem alterar o estado das incidências. 
                  Entre em contato com um administrador se precisar atualizar o status.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Ações</h2>
            
            <div className="space-y-2">
              <button
                onClick={excluirIncidencia}
                disabled={atualizando}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {atualizando ? "Processando..." : "Excluir Incidência"}
              </button>
              
              <Link
                href="/incidencias"
                className="block text-center w-full border border-input bg-muted px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Voltar para lista
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 