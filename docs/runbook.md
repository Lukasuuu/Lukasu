# BookMe Runbook — Playbooks de Incidentes

## Incidente 1: API Down

**Sintomas:** 503 errors, timeout em requests

**Diagnostico:**
```bash
# Verificar logs
vercel logs --all

# Verificar Supabase status
curl https://status.supabase.com/

# Testar healthcheck
curl https://api.bookme.pt/health
```

**Resolucao:**
1. Verificar se e problema de deploy recente
2. Rollback para versao anterior: `vercel --rollback`
3. Verificar se Supabase esta online
4. Se necessario, escalar Vercel functions

## Incidente 2: Pagamentos Falhando

**Sintomas:** Stripe checkout nao carrega, webhooks nao processados

**Diagnostico:**
```bash
# Verificar chaves Stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Verificar webhooks no dashboard Stripe
# https://dashboard.stripe.com/webhooks
```

**Resolucao:**
1. Verificar se STRIPE_SECRET_KEY e valida
2. Verificar se webhook endpoint esta correto
3. Verificar se STRIPE_WEBHOOK_SECRET esta configurado
4. Reenviar eventos falhados no dashboard Stripe

## Incidente 3: Base de Dados Lenta

**Sintomas:** Queries demorando > 2s, timeout em requests

**Diagnostico:**
```sql
-- Verificar queries lentas
SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;

-- Verificar locks
SELECT * FROM pg_locks WHERE NOT granted;
```

**Resolucao:**
1. Verificar indexes em tabelas grandes
2. Verificar se ha queries N+1
3. Adicionar caching (Redis)
4. Considerar read replicas (Supabase Pro)

## Incidente 4: Notificacoes Nao Enviadas

**Sintomas:** Emails/SMS nao chegam

**Diagnostico:**
```bash
# Testar Resend
curl https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY"

# Testar Twilio
curl https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

**Resolucao:**
1. Verificar se API keys estao validas
2. Verificar rate limits
3. Verificar se dominio Resend esta verificado
4. Verificar logs de erro no backend

## Incidente 5: Auth Falhando

**Sintomas:** Login nao funciona, sessoes expirando

**Diagnostico:**
```bash
# Verificar Supabase Auth
curl "https://[PROJECT].supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: [ANON_KEY]"
```

**Resolucao:**
1. Verificar se ANON_KEY e valida
2. Verificar se URL configuration esta correta
3. Verificar se auth providers estao configurados
4. Limpar cache de sessoes no frontend

## Contatos de Emergencia

- **Infra:** [EMAIL_CONTACTO]
- **DPO:** [EMAIL_DPO]
- **Stripe:** https://support.stripe.com
- **Supabase:** https://supabase.com/support
