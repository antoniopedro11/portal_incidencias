# Portal de Incidências

Um sistema moderno e eficiente para registro e acompanhamento de incidências, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Funcionalidades

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
git clone https://github.com/seu-usuario/portal-incidencias.git
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

## Estrutura do Projeto

```
portal-incidencias/
├── src/
│   ├── app/                # Diretório App Router 
│   │   ├── incidencias/    # Rotas de incidências
│   │   │   ├── [id]/       # Página de detalhes da incidência
│   │   │   ├── nova/       # Página para criar nova incidência
│   │   │   └── page.tsx    # Página de listagem de incidências
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal da aplicação
│   │   └── page.tsx        # Página inicial
│   ├── components/         # Componentes reutilizáveis
│   └── lib/                # Funções utilitárias e hooks
├── public/                 # Arquivos estáticos
├── tailwind.config.js      # Configuração do Tailwind CSS
├── postcss.config.js       # Configuração do PostCSS
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, fique à vontade para entrar em contato:

- Email: seu-email@exemplo.com
- Website: [seu-website.com](https://seu-website.com)
- LinkedIn: [linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil) 