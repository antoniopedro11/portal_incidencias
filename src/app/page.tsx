export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Portal de Incidências
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Simplifique o gerenciamento de problemas com nossa plataforma intuitiva e eficiente
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/incidencias/nova" 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-lg hover:bg-primary/90 transition-all"
                >
                  Registrar Nova Incidência
                </a>
                <a 
                  href="/incidencias" 
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium shadow hover:bg-secondary/90 transition-all"
                >
                  Ver Incidências
                </a>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-background rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-muted py-3 px-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-muted-foreground">Portal de Incidências</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">1</div>
                      <div>
                        <h3 className="font-medium">Problema login</h3>
                        <p className="text-xs text-muted-foreground">Em análise • Alta prioridade</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">2</div>
                      <div>
                        <h3 className="font-medium">Erro de relatório</h3>
                        <p className="text-xs text-muted-foreground">Resolvido • Média prioridade</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">3</div>
                      <div>
                        <h3 className="font-medium">Lentidão sistema</h3>
                        <p className="text-xs text-muted-foreground">Aberto • Baixa prioridade</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos do Portal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Registro Simplificado</h3>
              <p className="text-muted-foreground">
                Registre incidências em segundos com nosso formulário otimizado e interface intuitiva.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Acompanhamento Detalhado</h3>
              <p className="text-muted-foreground">
                Histórico completo e comentários para acompanhar cada etapa da resolução.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resolução Rápida</h3>
              <p className="text-muted-foreground">
                Categorização e priorização automática para resolução eficiente de problemas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nosso processo simplificado foi desenhado para tornar o registro e a resolução de incidências mais rápido e eficiente
          </p>
          
          <div className="relative">
            {/* Linha de conexão */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-card rounded-xl p-6 shadow-md text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4 shadow-md">
                  <span className="text-primary-foreground font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Registre a Incidência</h3>
                <p className="text-muted-foreground">
                  Preencha o formulário com os detalhes do problema encontrado, incluindo categoria e prioridade.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-md text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4 shadow-md">
                  <span className="text-primary-foreground font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Acompanhe o Status</h3>
                <p className="text-muted-foreground">
                  Receba atualizações, adicione comentários e acompanhe o progresso da resolução da incidência.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-md text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4 shadow-md">
                  <span className="text-primary-foreground font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Problema Resolvido</h3>
                <p className="text-muted-foreground">
                  Após a resolução, você pode verificar o histórico completo da incidência e as ações tomadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Registre sua primeira incidência agora e experimente como é fácil gerenciar e resolver problemas com nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/incidencias/nova" 
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-lg hover:bg-primary/90 transition-all"
            >
              Registrar Primeira Incidência
            </a>
            <a 
              href="/incidencias" 
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-md font-medium shadow hover:bg-secondary/90 transition-all"
            >
              Explorar Incidências
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 