"use client";

import { useState } from "react";

export default function NovaIncidenciaPage() {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    prioridade: "Média",
    categoria: "Sistema"
  });

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    
    // Simulando um envio para uma API
    setTimeout(() => {
      console.log("Incidência enviada:", formData);
      setEnviando(false);
      setSucesso(true);
      
      // Limpar o formulário após alguns segundos
      setTimeout(() => {
        setSucesso(false);
        setFormData({
          titulo: "",
          descricao: "",
          prioridade: "Média",
          categoria: "Sistema"
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Registrar Nova Incidência</h1>
        <p className="text-muted-foreground mt-2">Preencha o formulário abaixo com os detalhes da incidência</p>
      </div>
      
      {sucesso ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium">Incidência registrada com sucesso!</h3>
          <p className="mt-2">Sua incidência foi registrada e será analisada pela nossa equipe.</p>
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
                disabled={enviando}
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