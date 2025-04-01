"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Notificacao {
  id: string;
  tipo: string;
  titulo: string;
  conteudo: string;
  lida: boolean;
  incidenciaId?: string;
  createdAt: string;
}

export function NotificacaoDropdown() {
  const { data: session } = useSession();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Calcular o número de notificações não lidas
  const naoLidas = notificacoes.filter(n => !n.lida).length;

  // Buscar notificações
  useEffect(() => {
    const buscarNotificacoes = async () => {
      if (!session) return;
      
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
    
    // Atualizar notificações a cada minuto
    const interval = setInterval(buscarNotificacoes, 60000);
    
    return () => clearInterval(interval);
  }, [session]);

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

  // Formatar data relativa
  const formatarDataRelativa = (data: string) => {
    const dataNotificacao = new Date(data);
    const agora = new Date();
    const diffMs = agora.getTime() - dataNotificacao.getTime();
    const diffMin = Math.round(diffMs / 60000);
    
    if (diffMin < 1) return "agora";
    if (diffMin < 60) return `${diffMin} min atrás`;
    
    const diffHoras = Math.floor(diffMin / 60);
    if (diffHoras < 24) return `${diffHoras}h atrás`;
    
    const diffDias = Math.floor(diffHoras / 24);
    if (diffDias === 1) return "ontem";
    if (diffDias < 7) return `${diffDias} dias atrás`;
    
    return dataNotificacao.toLocaleDateString('pt-BR');
  };

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-0 h-8 w-8 rounded-full">
          <Bell className="h-5 w-5" />
          {naoLidas > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {naoLidas > 9 ? '9+' : naoLidas}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {naoLidas > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs text-primary hover:text-primary/80"
              onClick={marcarTodasComoLidas}
            >
              Marcar todas como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {carregando ? (
          <div className="py-6 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Carregando notificações...</p>
          </div>
        ) : erro ? (
          <div className="py-6 text-center">
            <p className="text-sm text-red-600">{erro}</p>
          </div>
        ) : notificacoes.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">Nenhuma notificação.</p>
          </div>
        ) : (
          <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
            {notificacoes.map((notificacao) => (
              <DropdownMenuItem 
                key={notificacao.id}
                className={`p-3 cursor-pointer ${!notificacao.lida ? 'bg-primary/5' : ''}`}
                onClick={() => marcarComoLida(notificacao.id)}
              >
                <div className="w-full">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {notificacao.titulo}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatarDataRelativa(notificacao.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notificacao.conteudo}
                  </p>
                  {notificacao.incidenciaId && (
                    <Link 
                      href={`/incidencias/${notificacao.incidenciaId}`} 
                      className="mt-1 text-xs text-primary hover:underline inline-block"
                    >
                      Ver incidência
                    </Link>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <div className="p-2">
          <Link href="/notificacoes">
            <Button variant="ghost" size="sm" className="w-full text-xs justify-center">
              Ver todas as notificações
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 