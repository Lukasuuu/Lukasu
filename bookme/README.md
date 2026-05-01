# BookMe — SaaS de Agendamentos

> Plataforma completa de gestão de marcações para negócios locais.

## Stack Tecnica

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Estado | Zustand (UI) + TanStack Query (Server) |
| 3D / Animacao | Three.js + R3F + Framer Motion |
| Backend | Express.js + TypeScript |
| Base de Dados | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (email/senha + OAuth) |
| Pagamentos | Stripe (Checkout + Webhooks) |
| Email | Resend API |
| Notificacoes | Twilio (SMS) + Telegram Bot |
| Calendario | Schedule-X |
| Testes | Vitest + Playwright |
| CI/CD | GitHub Actions |
| Deploy | Vercel |

## Como Correr Localmente

### Pre-requisitos
- Node.js >= 20
- pnpm >= 9
- Conta Supabase (gratuita)
- Conta Stripe (modo teste)

### Setup

```bash
# 1. Clonar e entrar na pasta
git clone https://github.com/Lukasuuu/Lukasuuu.git
cd Lukasuuu/bookme

# 2. Instalar dependencias
pnpm install

# 3. Configurar variaveis de ambiente
cp .env.example .env.local
# Editar .env.local com as tuas chaves

# 4. Correr em desenvolvimento
pnpm dev
```

A aplicacao abre em `http://localhost:3000`.

### Comandos uteis

```bash
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build de producao
pnpm check        # Verificacao TypeScript
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Testes unitarios (Vitest)
pnpm test:e2e     # Testes E2E (Playwright)
pnpm storybook    # Storybook (UI components)
```

## Estrutura do Projeto

```
bookme/
├── client/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── components/ui/   # shadcn/ui components
│   │   ├── pages/           # Paginas da aplicacao
│   │   ├── contexts/        # React Contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── stores/          # Zustand stores
│   │   ├── i18n/            # Internacionalizacao
│   │   ├── lib/             # Utilidades
│   │   └── test/            # Test utilities
│   └── public/              # Assets estaticos
├── server/
│   └── index.ts             # Backend Express
├── e2e/                     # Playwright E2E tests
├── docs/
│   ├── compliance/          # LGPD/GDPR docs
│   └── legal/               # DPA, termos
├── scripts/
│   ├── verify-env.js        # Verificacao de credenciais
│   └── run-all.sh           # Suite completa de testes
└── terraform/               # Infraestrutura como codigo
```

## Arquitetura

```
[Browser] <-> [Vite/React] <-> [Express API] <-> [Supabase]
                                              |
                                        [Stripe]
                                        [Resend]
                                        [Twilio]
```

## Roadmap

- [x] MVP funcional (agendamentos, clientes, servicos, staff)
- [x] Pagamentos Stripe
- [x] Notificacoes (email, SMS, Telegram)
- [x] Internacionalizacao (pt-BR, en, es)
- [x] Storybook
- [x] Testes unitarios e E2E
- [ ] Mobile app (Expo)
- [ ] Multi-tenant
- [ ] NestJS backend
- [ ] SOC 2 compliance

## Licenca

MIT © [NOME_EMPRESA]
