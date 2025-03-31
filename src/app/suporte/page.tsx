export default function SuportePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="bg-card rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Central de Suporte</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Entre em contato</h2>
            <p className="mb-4">
              Nossa equipe de suporte está disponível para ajudar com quaisquer dúvidas ou problemas que você possa ter.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>suporte@portalincidencias.com.br</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(11) 5555-5555</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Horário de atendimento: Segunda a Sexta, 9h às 18h</span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Formulário de Contato</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full rounded-md border border-input bg-background px-4 py-2" 
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full rounded-md border border-input bg-background px-4 py-2" 
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Assunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full rounded-md border border-input bg-background px-4 py-2" 
                  placeholder="Assunto da mensagem"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full rounded-md border border-input bg-background px-4 py-2" 
                  placeholder="Descreva sua dúvida ou problema em detalhes"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-medium mb-2">Como criar uma nova incidência?</h3>
              <p className="text-muted-foreground">
                Para criar uma nova incidência, faça login na sua conta, clique no botão "Nova Incidência" no menu principal ou na página de listagem de incidências. Preencha o formulário com os detalhes necessários e clique em "Registrar Incidência".
              </p>
            </div>
            
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-medium mb-2">Como atualizar o status de uma incidência?</h3>
              <p className="text-muted-foreground">
                Acesse a página de detalhes da incidência clicando nela na lista de incidências. No painel lateral direito, você encontrará a opção para atualizar o status. Selecione o novo status no menu dropdown e clique em "Atualizar Status".
              </p>
            </div>
            
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-medium mb-2">É possível excluir uma incidência?</h3>
              <p className="text-muted-foreground">
                Sim, é possível excluir uma incidência que você criou. Acesse a página de detalhes da incidência e no painel lateral direito, clique no botão "Excluir Incidência". Será solicitada uma confirmação antes da exclusão.
              </p>
            </div>
            
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-medium mb-2">Esqueci minha senha, como posso recuperá-la?</h3>
              <p className="text-muted-foreground">
                Na página de login, clique em "Esqueceu sua senha?". Você será redirecionado para uma página onde poderá informar seu e-mail. Um link para redefinição de senha será enviado para o e-mail cadastrado.
              </p>
            </div>
            
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-medium mb-2">Como posso visualizar o histórico de uma incidência?</h3>
              <p className="text-muted-foreground">
                Acesse a página de detalhes da incidência. O histórico de alterações, incluindo mudanças de status e atualizações, é exibido na seção "Histórico" na parte inferior da página.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recursos de Ajuda</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Documentação</h3>
              <p className="text-muted-foreground mb-4">
                Acesse nossa documentação completa com guias passo a passo para utilizar todas as funcionalidades do portal.
              </p>
              <a href="#" className="text-primary hover:underline">Ver documentação</a>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Tutoriais em Vídeo</h3>
              <p className="text-muted-foreground mb-4">
                Assista aos nossos tutoriais em vídeo para aprender a utilizar o Portal de Incidências de forma visual.
              </p>
              <a href="#" className="text-primary hover:underline">Ver tutoriais</a>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Webinars</h3>
              <p className="text-muted-foreground mb-4">
                Participe dos nossos webinars mensais onde apresentamos novos recursos e respondemos dúvidas ao vivo.
              </p>
              <a href="#" className="text-primary hover:underline">Ver agenda</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 