# Portal de Incidências

Um sistema moderno e eficiente para registo e acompanhamento de incidências, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Funcionalidades

- ✅ Autenticação completa de utilizadores (registo, login, controlo de sessão)
- ✅ Registo de novas incidências
- ✅ Visualização de incidências registadas
- ✅ Detalhamento de incidências
- ✅ Comentários em incidências
- ✅ Histórico de alterações
- ✅ Interface responsiva
- ✅ Design moderno com Tailwind CSS
- ✅ Modo claro/escuro conforme preferência do utilizador
- ✅ Progressive Web App (PWA) para utilização offline e instalação
- ✅ **Classificação Automática de Incidências com IA**
- ✅ **Assistente Virtual alimentado por Inteligência Artificial**

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para produção
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [NextAuth.js](https://next-auth.js.org/) - Autenticação para Next.js
- [React Hook Form](https://react-hook-form.com/) - Gestão de formulários
- [Zod](https://github.com/colinhacks/zod) - Validação de esquemas
- [Lucide React](https://lucide.dev/) - Ícones bonitos e consistentes
- [OpenAI API](https://openai.com/blog/openai-api) - Integração com IA para classificação e assistência

## Pré-requisitos

Antes de começar, verifique se tem o seguinte instalado no seu sistema:

- Node.js (versão 18.x ou superior)
- npm (versão 9.x ou superior) ou yarn (versão 1.22.x ou superior)
- Chave de API da OpenAI (para os recursos de IA)

## Como Iniciar

1. **Clone o repositório:**

```bash
git clone https://github.com/antoniopedro11/portal_incidencias.git
cd portal-incidencias
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**

Crie um ficheiro `.env.local` na raiz do projeto e adicione:

```
# Prisma
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="seu-segredo-aqui"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="sua-chave-api-openai"
```

4. **Execute o servidor de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

5. **Aceda à aplicação:**

Abra o seu navegador e aceda a [http://localhost:3000](http://localhost:3000).

## Recursos de Inteligência Artificial

O Portal de Incidências incorpora dois recursos principais de IA:

### Classificação Automática de Incidências

Ao criar uma nova incidência, o sistema pode analisar automaticamente o título e a descrição para sugerir:

- **Categoria** mais adequada para o problema
- **Prioridade** recomendada
- **Tempo estimado** para resolução
- **Palavras-chave** relacionadas ao problema
- **Departamento** mais indicado para lidar com a questão

Este recurso ajuda a padronizar o registo de incidências e direcionar os problemas de forma eficiente para as equipas corretas.

### Assistente Virtual

Um chatbot inteligente disponível em todas as páginas do portal que:

- Responde a perguntas sobre como utilizar o sistema
- Auxilia na compreensão dos estados e prioridades das incidências
- Fornece orientações sobre boas práticas de registo de problemas
- Ajuda utilizadores a encontrar recursos e funcionalidades

O assistente é acessível através de um ícone flutuante no canto inferior direito da interface.

## Sistema de Autenticação

O portal conta com um sistema completo de autenticação:

- Registo de novos utilizadores
- Login com email e palavra-passe
- Proteção de rotas para utilizadores autenticados
- Gestão de sessões
- Logout seguro
- Interface intuitiva para testes de autenticação

## Páginas Principais

- **Home** (`/`): Apresentação do portal com recursos e fluxo de trabalho
- **Login** (`/login`): Autenticação de utilizadores existentes
- **Registo** (`/registro`): Criação de novas contas
- **Teste de Autenticação** (`/test`): Verificação do estado de autenticação
- **Incidências** (`/incidencias`): Listagem de todas as incidências
- **Nova Incidência** (`/incidencias/nova`): Formulário para registar novas incidências com classificação automática
- **Detalhes da Incidência** (`/incidencias/[id]`): Visualização completa de uma incidência

## Modo Claro/Escuro

O portal suporta alternância entre os modos claro e escuro:

- Deteção automática da preferência do sistema do utilizador
- Botão de alternância no cabeçalho para troca rápida
- Persistência da preferência usando localStorage
- Design adaptativo que se ajusta a ambos os modos

## Progressive Web App (PWA)

O portal funciona como um Progressive Web App, oferecendo:

- Instalação como aplicação nativa em dispositivos móveis e desktop
- Funcionalidade offline básica com página de fallback
- Cache inteligente para recursos importantes
- Carregamento rápido mesmo em ligações lentas
- Sincronização automática quando a ligação é restabelecida

## Estrutura do Projeto

```
portal-incidencias/
├── src/
│   ├── app/                # Diretório App Router 
│   │   ├── api/            # Rotas de API
│   │   │   ├── auth/       # Endpoints de autenticação
│   │   │   ├── ia/         # Endpoints de IA
│   │   │   └── ...         # Outros endpoints
│   │   ├── incidencias/    # Rotas de incidências
│   │   ├── login/          # Página de login
│   │   ├── registro/       # Página de registo
│   │   ├── test/           # Página de teste de autenticação
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal da aplicação
│   │   └── page.tsx        # Página inicial
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Navbar.tsx      # Barra de navegação
│   │   ├── Footer.tsx      # Rodapé
│   │   ├── ThemeToggle.tsx # Botão de alternar tema
│   │   ├── assistente-virtual.tsx # Componente do assistente virtual
│   │   └── ...             # Outros componentes
│   └── lib/                # Funções utilitárias e hooks
│       ├── auth.ts         # Configuração de autenticação
│       ├── openai.ts       # Funções para integração com a OpenAI
│       └── ...             # Outros utilitários
├── public/                 # Ficheiros estáticos
│   ├── icons/              # Ícones para PWA
│   ├── manifest.json       # Manifesto para PWA
│   ├── sw.js               # Service Worker para funcionalidade offline
│   └── offline.html        # Página de fallback offline
├── tailwind.config.js      # Configuração do Tailwind CSS
├── next.config.js          # Configuração do Next.js
├── postcss.config.js       # Configuração do PostCSS
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## Design e Interface

O Portal de Incidências apresenta uma interface moderna e intuitiva com:

- Design responsivo para desktop e dispositivos móveis
- Elementos visuais consistentes em todas as páginas
- Feedback visual para todas as ações do utilizador
- Validação de formulários com mensagens de erro claras
- Indicadores de carregamento para processos assíncronos
- Paleta de cores profissional e agradável
- Suporte para modo claro e escuro

## Licença

Este projeto está licenciado sob a licença MIT. Veja o ficheiro LICENSE para mais detalhes.

## Contacto

Se tiver alguma dúvida ou sugestão, não hesite em contactar:

- Email: seu-email@exemplo.com
- Website: [seu-website.com](https://seu-website.com)
- LinkedIn: [linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil) 