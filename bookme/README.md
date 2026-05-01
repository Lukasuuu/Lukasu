# BookMe — Enterprise Appointment Scheduling SaaS

> Software de marcações online para salões, clínicas, barbearias, restaurantes e muito mais. Gestão completa de agendamentos, clientes, staff, pagamentos e notificações — num só lugar.

## Stack Tecnica

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Estado | Zustand (UI) + TanStack Query (Server) |
| 3D / Animacao | Three.js + R3F + Framer Motion |
| Backend | NestJS 11 + Prisma 6 + PostgreSQL + Redis |
| Auth | JWT (NestJS) + Supabase Auth (OAuth legado) |
| Pagamentos | Stripe (Checkout + Portal + Webhooks) |
| Email | Resend API |
| Notificacoes | Twilio (SMS) + Telegram Bot + Expo Push |
| Calendario | Schedule-X |
| Testes | Vitest + Playwright (E2E) + Jest (backend) |
| CI/CD | GitHub Actions |
| Deploy | Vercel (frontend) + Render/Railway (backend) |

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

A aplicacao abre em `http://localhost:5173` (Vite dev server).

### Comandos uteis

```bash
# Frontend
pnpm dev            # Vite dev server (localhost:5173)
pnpm build          # Build de producao
pnpm check          # Verificacao TypeScript
pnpm lint           # ESLint
pnpm format         # Prettier
pnpm test           # Testes unitarios (Vitest)
pnpm test:e2e       # Testes E2E (Playwright)
pnpm storybook      # Storybook

# Backend
pnpm --filter @bookme/api start:dev    # NestJS dev server (localhost:4000)
pnpm --filter @bookme/api build        # Build NestJS
pnpm --filter @bookme/api test         # Testes Jest
pnpm --filter @bookme/api test:cov     # Cobertura Jest
pnpm --filter @bookme/api exec prisma migrate dev
pnpm --filter @bookme/api exec prisma generate
pnpm --filter @bookme/api exec prisma studio

# Mobile
pnpm --filter @bookme/mobile start     # Expo dev server
pnpm --filter @bookme/mobile ios       # Expo iOS simulator
pnpm --filter @bookme/mobile android   # Expo Android emulator
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

## Arquitetura (Monorepo)

```
bookme-repo/
├── bookme/                  # Frontend web (React + Vite)
│   ├── client/src/          # Componentes, páginas, hooks, stores
│   ├── e2e/                 # Playwright E2E tests
│   └── server/              # Express server (legado)
├── apps/
│   ├── api/                 # Backend NestJS + Prisma
│   │   ├── src/             # 16 módulos (auth, bookings, payments...)
│   │   └── prisma/          # 12 models
│   └── mobile/              # Expo React Native
│       ├── app/             # Expo Router v4
│       └── src/             # Components, hooks, stores
├── .github/workflows/       # CI/CD
└── pnpm-workspace.yaml      # Monorepo pnpm workspaces
```

```
[Browser] <-> [Vite/React] <-> [NestJS API] <-> [PostgreSQL + Prisma]
                                              |
                                        [Stripe]
                                        [Redis]
                                        [Resend]
```

## Roadmap

- [x] MVP funcional (agendamentos, clientes, servicos, staff)
- [x] Pagamentos Stripe (checkout + portal + webhooks)
- [x] Notificacoes (email, SMS, Telegram)
- [x] Internacionalizacao (pt-BR, en, es)
- [x] Storybook
- [x] Testes unitarios e E2E
- [x] NestJS backend (16 módulos, Prisma, JWT)
- [x] Frontend <-> Backend integration (api.ts)
- [x] Mobile app scaffold (Expo SDK 52)
- [ ] Backend tests 60%+
- [ ] Prisma migrate em produção
- [ ] SOC 2 compliance

## Licenca

MIT © [NOME_EMPRESA]
