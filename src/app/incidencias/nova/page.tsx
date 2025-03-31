"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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