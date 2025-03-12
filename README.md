# Sistema de Gestão para Studios de Pilates

Sistema completo para gestão de studios de pilates, com foco em acompanhamento de alunos, gestão de aulas e evolução dos praticantes.

## Índice
1. [Visão Geral](#visão-geral)
2. [Começando](#começando)
3. [Módulos do Sistema](#módulos-do-sistema)
4. [Funcionalidades Adicionais](#funcionalidades-adicionais-sugeridas)
5. [Roadmap](#roadmap-de-implementação)
6. [Diferenciais](#diferenciais-competitivos)
7. [Documentação Técnica](#documentação-técnica)

## Visão Geral

Este é um projeto [Next.js](https://nextjs.org) desenvolvido com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), focado em criar uma solução completa para gestão de studios de pilates.

### Principais Características
- Sistema completo de gestão
- Interface moderna e responsiva
- Integração com WhatsApp
- Sistema de gamificação
- Acompanhamento em tempo real
- Relatórios detalhados

## Começando

### Pré-requisitos
- Node.js 18.17 ou superior
- Docker e Docker Compose
- PostgreSQL (ou Docker)
- Yarn ou npm

### Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd [nome-do-projeto]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Inicie o banco de dados (usando Docker):
```bash
docker-compose up -d
```

5. Execute as migrações do banco:
```bash
npx prisma migrate dev
```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Desenvolvimento

Você pode começar a editar a página modificando `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente a fonte [Geist](https://vercel.com/font).

## Módulos do Sistema

### 1. Módulo de Clientes
- Cadastro completo de clientes
- Histórico de frequência
- Documentos e termos
- Fotos do cliente (antes/depois)
- Histórico médico
- Objetivos e metas

### 2. Módulo de Avaliação Física
- Avaliação postural com fotos
- Medidas antropométricas
- Testes de flexibilidade
- Histórico de avaliações
- Gráficos de evolução
- Relatórios comparativos
- Registro de dores e limitações
- Planejamento de exercícios baseado na avaliação

### 3. Módulo de Agendamento
- Agenda por profissional
- Agendamento recorrente
- Controle de faltas e reposições
- Notificações automáticas (WhatsApp/Email)
- Lista de espera
- Gestão de horários disponíveis
- Calendário integrado
- Histórico de aulas realizadas

#### 3.1 Evolução das Aulas (Submódulo)
- Registro de exercícios realizados
- Anotações do professor
- Progressão de carga/dificuldade
- Fotos/vídeos dos exercícios
- Observações importantes
- Feedback do aluno
- Planejamento da próxima aula

### 4. Módulo de Pagamentos
- Controle de mensalidades
- Pacotes de aulas
- Pagamentos avulsos
- Integração com gateways de pagamento
- Geração de boletos
- Controle de inadimplência
- Relatórios financeiros
- Comissão dos professores

### 5. Módulo de Aulas Online
- Biblioteca de vídeos
- Categorização por nível/objetivo
- Links únicos por aluno
- Controle de visualização
- Sistema de gamificação
  - Pontos por vídeo assistido
  - Níveis de evolução
  - Conquistas desbloqueáveis
  - Ranking de dedicação
  - Recompensas personalizadas
- Feedback dos alunos
- Estatísticas de engajamento

### 6. Módulo de Relatórios e Analytics
- Dashboard geral
- Métricas de retenção
- Análise de frequência
- Relatórios financeiros
- Performance dos professores
- Evolução dos alunos
- Horários mais populares
- Taxa de ocupação

### 7. Módulo de Comunicação
- Integração com WhatsApp
- Envio de lembretes
- Comunicados importantes
- Aniversariantes do mês
- Campanhas de retenção
- Chat interno
- Pesquisas de satisfação

## Funcionalidades Adicionais Sugeridas

### App Mobile para Alunos
- Agendamento de aulas
- Visualização de evolução
- Acesso aos vídeos
- Pagamentos
- Chat com professores

### Portal do Professor
- Agenda do dia
- Fichas dos alunos
- Registro de evolução
- Chat com alunos
- Relatórios de turma

### Integrações
- Google Calendar
- WhatsApp Business API
- Gateways de Pagamento
- Sistemas contábeis
- Plataformas de vídeo

## Roadmap de Implementação

### Fase 1 - Fundação
1. Módulo de Clientes
2. Agendamento básico
3. Controle financeiro simples

### Fase 2 - Expansão
1. Avaliação física
2. Evolução das aulas
3. Pagamentos integrados

### Fase 3 - Engajamento
1. Aulas online
2. Gamificação
3. App mobile básico

### Fase 4 - Otimização
1. Analytics avançado
2. Integrações
3. Automações

## Diferenciais Competitivos
- Interface intuitiva
- Foco em evolução do aluno
- Sistema de gamificação
- Integração completa entre módulos
- Relatórios detalhados
- Acompanhamento em tempo real
- Personalização por studio

## Requisitos Técnicos
- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- TailwindCSS
- Docker
- AWS (ou similar)
- WhatsApp Business API
- Gateway de Pagamentos
- CDN para vídeos

## Documentação Técnica

### Stack Tecnológica
- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Node.js, Prisma
- **Banco de Dados**: PostgreSQL
- **Infraestrutura**: Docker, AWS
- **Integrações**: WhatsApp Business API, Gateway de Pagamentos, CDN

### Recursos Adicionais

Para aprender mais sobre Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.

Você pode verificar [o repositório do Next.js no GitHub](https://github.com/vercel/next.js/) - sua contribuição e feedback são bem-vindos!

### Deploy

A maneira mais fácil de fazer deploy da sua aplicação Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Consulte nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## Contribuindo

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Suporte

Para suporte, envie um email para [seu-email@dominio.com] ou abra uma issue no GitHub.
