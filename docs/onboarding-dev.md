# Onboarding — Novo Engenheiro BookMe

## Bem-vindo!

Esta e a documentacao para novos engenheiros que vao trabalhar no BookMe.

## Setup Inicial

### 1. Contas Necessarias
- [ ] GitHub (acesso ao repo Lukasuuu/Lukasuuu)
- [ ] Supabase (acesso ao projeto)
- [ ] Stripe (acesso ao dashboard, modo teste)
- [ ] Vercel (acesso ao projeto)
- [ ] Resend (acesso a API)
- [ ] Twilio (opcional, para SMS)

### 2. Ambiente Local

```bash
# Clonar repo
git clone https://github.com/Lukasuuu/Lukasuuu.git
cd Lukasuuu/bookme

# Instalar pnpm
npm install -g pnpm

# Instalar dependencias
pnpm install

# Configurar .env.local
cp .env.example .env.local
# Pedir chaves ao tech lead

# Verificar credenciais
node scripts/verify-env.js

# Correr em dev
pnpm dev
```

### 3. Workflow de Desenvolvimento

```bash
# 1. Criar branch
git checkout -b feat/nome-da-feature

# 2. Fazer alteracoes
# ...

# 3. Verificar antes de commit
pnpm lint
pnpm typecheck
pnpm test

# 4. Commit
# Husky vai correr lint-staged automaticamente
git commit -m "feat: descricao da feature"

# 5. Push e criar PR
git push origin feat/nome-da-feature
# Criar PR no GitHub (template automatico)
```

### 4. Estrutura de Codigo

```
client/src/
  components/     # Componentes reutilizaveis
    ui/           # shadcn/ui (nao editar diretamente)
  pages/          # Paginas (1 por rota)
  contexts/       # Contexts React
  hooks/          # Custom hooks
  stores/         # Zustand stores
  lib/            # Utilidades
  i18n/           # Traducoes
  test/           # Test utilities
```

### 5. Padroes de Codigo

- **TypeScript:** Sempre. Nenhum `any` sem justificacao.
- **Componentes:** Funcionais com hooks.
- **Estilo:** Tailwind CSS. Classes em ordem: layout, spacing, colors, effects.
- **Formularios:** RHF + Zod. Validacao no cliente e servidor.
- **API:** TanStack Query. Cache invalidation explicita.
- **Commits:** Conventional Commits em ingles.

### 6. Testes

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

### 7. Deploy

- **Preview:** Automatico em cada PR (Vercel)
- **Producao:** Merge para main (requer approval)

### 8. Recursos Uteis

- [CLAUDE.md](../bookme/CLAUDE.md) — Guia completo do projeto
- [Architecture](architecture.md) — Diagrama de arquitetura
- [Runbook](runbook.md) — Playbooks de incidentes
- [Stack Frontend](../../.claude/CLAUDE.md) — Preferencias de stack

## Duvidas?

Abre uma issue no GitHub ou pergunta no canal #dev do Discord.
