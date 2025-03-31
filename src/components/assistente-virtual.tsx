"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AssistenteVirtual() {
  const { data: session, status } = useSession();
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [historico, setHistorico] = useState<{pergunta: string; resposta: string}[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Rolar para o final quando uma nova mensagem for adicionada
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [historico]);

  const handleEnviarPergunta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pergunta.trim() || status !== "authenticated") {
      return;
    }
    
    setEnviando(true);
    setError("");
    
    try {
      const response = await fetch("/api/ia/assistente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pergunta }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar a pergunta");
      }
      
      // Adicionar ao histórico
      setHistorico(prev => [...prev, { pergunta, resposta: data.resposta }]);
      setResposta(data.resposta);
      setPergunta("");
      
    } catch (error) {
      console.error("Erro no assistente virtual:", error);
      
      // Verificar se é um erro de chave de API
      if (error instanceof Error && error.message.includes("API")) {
        setError("É necessário configurar uma chave de API válida da OpenAI no arquivo .env.local do projeto para usar o assistente virtual.");
      } else {
        setError(error instanceof Error ? error.message : "Erro ao processar a pergunta");
      }
    } finally {
      setEnviando(false);
    }
  };

  // Se não está autenticado, não mostrar o assistente
  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300 ${expanded ? 'w-96 h-96' : 'w-16 h-16'}`}>
      {!expanded ? (
        <button 
          onClick={() => setExpanded(true)}
          className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          title="Assistente Virtual"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </button>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="font-medium">Assistente Virtual</h3>
            <button 
              onClick={() => setExpanded(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-4">
            {historico.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p>Como posso ajudar você hoje?</p>
                <div className="mt-4 space-y-2">
                  <button 
                    onClick={() => setPergunta("Como criar uma nova incidência?")}
                    className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 block w-full"
                  >
                    Como criar uma nova incidência?
                  </button>
                  <button 
                    onClick={() => setPergunta("O que significa cada nível de prioridade?")}
                    className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 block w-full"
                  >
                    O que significa cada nível de prioridade?
                  </button>
                  <button 
                    onClick={() => setPergunta("Como posso acompanhar minhas incidências?")}
                    className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 block w-full"
                  >
                    Como posso acompanhar minhas incidências?
                  </button>
                </div>
                <div className="mt-6 text-xs text-amber-600 dark:text-amber-400">
                  <p>⚠️ Para usar este recurso, é necessário configurar<br/> uma chave de API válida da OpenAI no arquivo .env.local</p>
                </div>
              </div>
            ) : (
              historico.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 ml-auto max-w-[80%]">
                      <p className="text-sm">{item.pergunta}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-lg px-3 py-2 max-w-[80%]">
                      <p className="text-sm">{item.resposta}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
          
          <form onSubmit={handleEnviarPergunta} className="border-t p-3">
            <div className="flex items-center">
              <input
                type="text"
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
                disabled={enviando}
                placeholder="Digite sua pergunta..."
                className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-l-lg px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={enviando || !pergunta.trim()}
                className="bg-primary text-primary-foreground rounded-r-lg px-3 py-2 disabled:opacity-50"
              >
                {enviando ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 