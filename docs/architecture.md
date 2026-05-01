# BookMe Architecture

## Visao Geral

BookMe e uma aplicacao SaaS de agendamentos construida com arquitetura moderna e escalavel.

```mermaid
graph TB
    subgraph "Frontend"
        A[React 19 + Vite]
        B[Tailwind CSS + shadcn/ui]
        C[Zustand + TanStack Query]
        D[Framer Motion + R3F]
    end

    subgraph "Backend"
        E[Express.js API]
        F[Auth Middleware]
        G[Stripe Webhooks]
        H[Notification Service]
    end

    subgraph "Data"
        I[Supabase PostgreSQL]
        J[Supabase Auth]
        K[Supabase Storage]
    end

    subgraph "External"
        L[Stripe]
        M[Resend]
        N[Twilio]
        O[Telegram]
    end

    A <-> E
    E <-> I
    E <-> J
    E <-> L
    E <-> M
    E <-> N
    E <-> O
```

## Componentes Principais

### Frontend
- **Router:** Wouter (leve, compativel com R3F)
- **Estado Global:** Zustand (UI) + TanStack Query (Server state)
- **Formularios:** React Hook Form + Zod
- **Calendario:** Schedule-X (substituindo react-day-picker)
- **Graficos:** Recharts
- **3D:** React Three Fiber + Drei (lazy loaded)

### Backend
- **Servidor:** Express.js com TypeScript
- **Auth:** Supabase Auth (JWT)
- **Validacao:** Zod
- **Pagamentos:** Stripe (Checkout + Portal + Webhooks)
- **Notificacoes:** Resend (email), Twilio (SMS/WhatsApp), Telegram Bot

### Base de Dados
- **PostgreSQL:** Supabase com RLS ativado
- **Tabelas:** businesses, profiles, clients, services, staff, bookings, subscriptions
- **RLS:** Policies por user_id e business_id

## Fluxo de Dados

### Agendamento
1. Cliente escolhe servico e horario
2. Frontend valida com Zod
3. POST /api/bookings
4. Backend verifica conflitos
5. Insere na base de dados
6. Envia notificacoes (email/SMS)
7. Retorna confirmacao

### Pagamento
1. Cliente escolhe plano
2. Frontend cria sessao Stripe
3. Redireciona para Stripe Checkout
4. Webhook checkout.session.completed
5. Atualiza subscription na base de dados
6. Envia email de confirmacao

## Seguranca

- **Auth:** JWT via Supabase, refresh tokens
- **RLS:** Row Level Security em todas as tabelas
- **CORS:** Configurado para dominios especificos
- **Rate Limit:** Express-rate-limit
- **Validacao:** Zod em todas as entradas
- **Secrets:** .env.local (nunca commited)

## Escalabilidade

- **Frontend:** Static hosting (Vercel CDN)
- **API:** Serverless functions (Vercel)
- **Base de Dados:** Supabase (auto-scaling)
- **Storage:** Supabase Storage + R2/S3
- **Cache:** Redis (futuro)

## Monotorizacao

- **Logs:** Pino (backend)
- **Errors:** Sentry (futuro)
- **Performance:** Lighthouse CI
- **Uptime:** Status page (futuro)
