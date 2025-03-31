# Portal de Incidências

Um sistema moderno e eficiente para registro e acompanhamento de incidências, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Funcionalidades

- ✅ Autenticação completa de usuários (registro, login, controle de sessão)
- ✅ Registro de novas incidências
- ✅ Visualização de incidências cadastradas
- ✅ Detalhamento de incidências
- ✅ Comentários em incidências
- ✅ Histórico de alterações
- ✅ Interface responsiva
- ✅ Design moderno com Tailwind CSS

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para produção
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [NextAuth.js](https://next-auth.js.org/) - Autenticação para Next.js
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Zod](https://github.com/colinhacks/zod) - Validação de esquemas
- [Lucide React](https://lucide.dev/) - Ícones bonitos e consistentes

## Pré-requisitos

Antes de começar, verifique se você tem o seguinte instalado em seu sistema:

- Node.js (versão 18.x ou superior)
- npm (versão 9.x ou superior) ou yarn (versão 1.22.x ou superior)

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

3. **Execute o servidor de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação:**

Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).

## Sistema de Autenticação

O portal conta com um sistema completo de autenticação:

- Registro de novos usuários
- Login com email e senha
- Proteção de rotas para usuários autenticados
- Gerenciamento de sessões
- Logout seguro
- Interface intuitiva para testes de autenticação

## Páginas Principais

- **Home** (`/`): Apresentação do portal com recursos e fluxo de trabalho
- **Login** (`/login`): Autenticação de usuários existentes
- **Registro** (`/registro`): Criação de novas contas
- **Teste de Autenticação** (`/test`): Verificação do status de autenticação
- **Incidências** (`/incidencias`): Listagem de todas as incidências
- **Nova Incidência** (`/incidencias/nova`): Formulário para registrar novas incidências
- **Detalhes da Incidência** (`/incidencias/[id]`): Visualização completa de uma incidência

## Estrutura do Projeto

```
portal-incidencias/
├── src/
│   ├── app/                # Diretório App Router 
│   │   ├── api/            # Rotas de API
│   │   │   ├── auth/       # Endpoints de autenticação
│   │   │   └── ...         # Outros endpoints
│   │   ├── incidencias/    # Rotas de incidências
│   │   ├── login/          # Página de login
│   │   ├── registro/       # Página de registro
│   │   ├── test/           # Página de teste de autenticação
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal da aplicação
│   │   └── page.tsx        # Página inicial
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Navbar.tsx      # Barra de navegação
│   │   ├── Footer.tsx      # Rodapé
│   │   └── ...             # Outros componentes
│   └── lib/                # Funções utilitárias e hooks
├── public/                 # Arquivos estáticos
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
- Feedback visual para todas as ações do usuário
- Validação de formulários com mensagens de erro claras
- Indicadores de carregamento para processos assíncronos
- Paleta de cores profissional e agradável

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, fique à vontade para entrar em contato:

- Email: seu-email@exemplo.com
- Website: [seu-website.com](https://seu-website.com)
- LinkedIn: [linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil) 