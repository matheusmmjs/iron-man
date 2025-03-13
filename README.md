# 🧘‍♀️ PilatesFlow

Sistema de gerenciamento para estúdios de Pilates, desenvolvido para otimizar o controle de alunos, agendamentos e pagamentos.

## 📱 Módulos

### Clientes
- Cadastro completo de alunos
- Histórico de aulas
- Avaliações físicas
- Fichas de evolução

### Agenda
- Agendamento de aulas
- Controle de turmas
- Notificações automáticas
- Histórico de presença

### Financeiro
- Controle de mensalidades
- Histórico de pagamentos
- Relatórios financeiros
- Gestão de pacotes

### Avaliações
- Avaliação postural
- Histórico de medidas
- Evolução do aluno
- Relatórios de progresso

## 🚀 Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Prisma
- PostgreSQL
- Docker

## ⚙️ Configuração

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- pnpm

### Variáveis de Ambiente
Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pilatesflow?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/pilatesflow.git
cd pilatesflow
```

2. Instale as dependências
```bash
pnpm install
```

3. Inicie o banco de dados
```bash
docker-compose up -d
```

4. Execute as migrações
```bash
pnpm prisma migrate dev
```

5. Inicie o servidor
```bash
pnpm dev
```

## 🐳 Docker

```yaml
version: '3'
services:
  postgres:
    image: postgres:latest
    container_name: pilatesflow-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: pilatesflow
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📁 Estrutura do Projeto

```
pilatesflow/
├── src/
│   ├── app/          # Rotas e páginas
│   │   ├── clients/  # Gestão de alunos
│   │   ├── schedule/ # Agendamentos
│   │   ├── payments/ # Financeiro
│   │   └── reviews/  # Avaliações
│   ├── components/   # Componentes reutilizáveis
│   ├── lib/         # Configurações
│   └── styles/      # Estilos globais
├── prisma/          # Banco de dados
└── public/          # Arquivos estáticos
```

## 📝 Scripts

```bash
pnpm dev           # Ambiente de desenvolvimento
pnpm build         # Build de produção 
pnpm start         # Servidor de produção
pnpm lint         # Verificação de código
pnpm test         # Executa testes
```

## 🤝 Contribuição

1. Faça o fork
2. Crie sua branch (`git checkout -b feature/NovaMelhoria`)
3. Commit (`git commit -m 'Adiciona nova melhoria'`)
4. Push (`git push origin feature/NovaMelhoria`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- Seu Nome - [GitHub](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Equipe do Next.js
- Comunidade Shadcn/ui
- Contribuidores do PrismaThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
