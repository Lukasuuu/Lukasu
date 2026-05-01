# BookMe API

Backend enterprise em NestJS 11 + Prisma 6 + PostgreSQL.

## Quick Start

### 1. PostgreSQL

**Opcao A — Docker (recomendado):**
```bash
docker run --name bookme-db \
  -e POSTGRES_PASSWORD=bookme \
  -e POSTGRES_USER=bookme \
  -e POSTGRES_DB=bookme \
  -p 5432:5432 \
  -d postgres:16
```

**Opcao B — Instalacao local:**
- **Windows:** [Download PostgreSQL](https://www.postgresql.org/download/windows/) ou `winget install PostgreSQL.PostgreSQL`
- **macOS:** `brew install postgresql@16 && brew services start postgresql@16`
- **Linux:** `sudo apt install postgresql-16 && sudo systemctl start postgresql`

### 2. Setup

```bash
# Copiar .env
cp .env.example .env
# Editar .env com os teus valores

# Instalar dependencias
pnpm install

# Criar base de dados e rodar migrations
pnpm db:migrate

# Gerar Prisma Client
pnpm db:generate

# (Opcional) Seed de dados
pnpm db:seed
```

### 3. Desenvolvimento

```bash
# Dev server com hot-reload (localhost:4000)
pnpm start:dev

# Build
pnpm build

# Testes
pnpm test
pnpm test:cov
pnpm test:e2e
```

### 4. Documentacao API

Com o server a correr: http://localhost:4000/api/docs

## Scripts Disponiveis

| Script | Descricao |
|--------|-----------|
| `pnpm start:dev` | Dev server com watch |
| `pnpm build` | Build de producao |
| `pnpm test` | Testes Jest |
| `pnpm test:cov` | Cobertura de testes |
| `pnpm db:migrate` | Criar/aplicar migrations |
| `pnpm db:generate` | Gerar Prisma Client |
| `pnpm db:studio` | Prisma Studio (UI do DB) |
| `pnpm db:seed` | Popular DB com dados iniciais |

## Estrutura

```
src/
├── auth/           # JWT auth (login, register, me)
├── bookings/       # Agendamentos
├── payments/       # Stripe checkout/portal
├── webhooks/       # Stripe webhooks
├── users/          # Gestao de utilizadores
├── tenants/        # Multi-tenant
├── catalog/        # Servicos/catalogo
├── availability/   # Disponibilidade
├── notifications/  # Notificacoes
├── integrations/   # Integracoes externas
├── audit/          # Logs de auditoria
├── admin/          # Painel admin
├── search/         # Pesquisa
├── storage/        # Upload de ficheiros
├── health/         # Health checks
├── prisma/         # Prisma schema + client
└── main.ts         # Entry point
```
