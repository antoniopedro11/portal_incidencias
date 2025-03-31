"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ClassificacaoIA } from "@/lib/openai";

export default function NovaIncidenciaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    prioridade: "Média",
    categoria: "Sistema"
  });

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [classificandoIA, setClassificandoIA] = useState(false);
  const [classificacaoIA, setClassificacaoIA] = useState<ClassificacaoIA | null>(null);
  const [mostrarClassificacao, setMostrarClassificacao] = useState(false);

  // Redirecionar para login se não estiver autenticado
  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/incidencias/nova");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar a classificação automática quando o usuário edita os campos
    if (name === "titulo" || name === "descricao") {
      setClassificacaoIA(null);
      setMostrarClassificacao(false);
    }
  };

  const handleClassificacaoAutomatica = async () => {
    if (formData.titulo.trim() === "" || formData.descricao.trim() === "") {
      setErro("Preencha o título e a descrição para usar a classificação automática");
      return;
    }
    
    setClassificandoIA(true);
    setErro("");
    
    try {
      const response = await fetch("/api/ia/classificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Erro ao classificar incidência");
      }
      
      setClassificacaoIA(data);
      setMostrarClassificacao(true);
      
      // Atualiza os campos do formulário com a classificação sugerida
      setFormData(prev => ({
        ...prev,
        categoria: data.categoria,
        prioridade: data.prioridade
      }));
      
    } catch (error) {
      console.error("Erro na classificação automática:", error);
      setErro(error instanceof Error ? error.message : "Erro ao classificar incidência");
    } finally {
      setClassificandoIA(false);
    }
  };

  const aplicarClassificacao = () => {
    if (classificacaoIA) {
      setFormData(prev => ({
        ...prev,
        categoria: classificacaoIA.categoria,
        prioridade: classificacaoIA.prioridade
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    
    try {
      const response = await fetch("/api/incidencias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          prioridade: formData.prioridade,
          categoria: formData.categoria
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar incidência");
      }
      
      console.log("Incidência registrada:", data);
      setSucesso(true);
      
      // Limpar o formulário após alguns segundos
      setTimeout(() => {
        router.push("/incidencias");
      }, 2000);
    } catch (error) {
      console.error("Erro ao registrar incidência:", error);
      setErro(error instanceof Error ? error.message : "Erro ao registrar incidência");
      setSucesso(false);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Nova Incidência</h2>
        <p className="text-muted-foreground text-sm mt-1">Preencha o formulário abaixo com os detalhes da incidência</p>
      </div>
      
      {sucesso ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium">Incidência registrada com sucesso!</h3>
          <p className="mt-2">Sua incidência foi registrada e será analisada pela nossa equipe.</p>
          <p className="mt-2">Redirecionando para a lista de incidências...</p>
        </div>
      ) : null}
      
      {erro ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium">Erro ao registrar incidência</h3>
          <p className="mt-2">{erro}</p>
        </div>
      ) : null}
      
      {mostrarClassificacao && classificacaoIA ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium">Classificação Automática</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Categoria Sugerida:</p>
              <p>{classificacaoIA.categoria}</p>
            </div>
            <div>
              <p className="font-medium">Prioridade Sugerida:</p>
              <p>{classificacaoIA.prioridade}</p>
            </div>
            <div>
              <p className="font-medium">Tempo Estimado:</p>
              <p>{classificacaoIA.tempoEstimado}</p>
            </div>
            <div>
              <p className="font-medium">Departamento Recomendado:</p>
              <p>{classificacaoIA.departamento}</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-medium">Palavras-chave:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {classificacaoIA.palavrasChave.map((palavra, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {palavra}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="bg-card rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">
                Título
              </label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2"
                placeholder="Descreva o problema em poucas palavras"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">
                Descrição Detalhada
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border border-input bg-background px-4 py-2"
                placeholder="Descreva o problema em detalhes. Inclua passos para reproduzir o problema, mensagens de erro, etc."
              />
              <button
                type="button"
                onClick={handleClassificacaoAutomatica}
                disabled={classificandoIA || formData.titulo.trim() === "" || formData.descricao.trim() === ""}
                className="mt-2 bg-secondary text-secondary-foreground px-4 py-2 text-sm rounded-md hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group"
              >
                {classificandoIA ? "Classificando..." : "Classificar Automaticamente"}
                <span className="hidden group-hover:block absolute -top-10 left-0 right-0 bg-gray-800 text-white text-xs rounded p-2 z-10">
                  Requer chave da API OpenAI no arquivo .env.local
                </span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="categoria" className="text-sm font-medium">
                  Categoria
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-4 py-2"
                >
                  <option value="Sistema">Sistema</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Rede">Rede</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="prioridade" className="text-sm font-medium">
                  Prioridade
                </label>
                <select
                  id="prioridade"
                  name="prioridade"
                  value={formData.prioridade}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-4 py-2"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <a
                href="/incidencias"
                className="px-4 py-2 border border-input rounded-md text-sm font-medium"
              >
                Cancelar
              </a>
              <button
                type="submit"
                disabled={enviando || status !== "authenticated"}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enviando ? "Enviando..." : "Registrar Incidência"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 