# LGPD / GDPR Compliance Checklist

## Consentimento
- [x] Banner de cookies com categorias (Essencial, Analytics, Marketing)
- [ ] Consentimento granular por finalidade
- [ ] Registro de consentimento (timestamp, versão, escopo)
- [ ] Retirada de consentimento (1-clique)

## Direitos do Titular (DSR)
- [ ] Endpoint `/api/dsr/export` — exportação de dados (JSON/PDF)
- [ ] Endpoint `/api/dsr/delete` — exclusão de dados (soft delete + anonimização)
- [ ] Endpoint `/api/dsr/portability` — portabilidade de dados
- [ ] Painel do usuário para gerenciar DSR

## Documentação
- [x] Política de Privacidade (PrivacyPolicy.tsx)
- [x] Termos de Uso (TermsAndConditions.tsx)
- [ ] DPA (Data Processing Agreement) — docs/legal/dpa.md
- [ ] ROPA (Registro de Operações) — docs/compliance/ropa.md
- [ ] SOC 2 Roadmap — docs/compliance/soc2.md

## Técnico
- [x] RLS (Row Level Security) no Supabase
- [ ] Criptografia em trânsito (TLS 1.3)
- [ ] Criptografia em repouso (AES-256)
- [ ] Logs de auditoria (audit_events)
- [ ] Retenção de dados (automática após X anos)
- [ ] Anonimização de dados de teste

## Organizacional
- [ ] Nomeação de DPO
- [ ] Treinamento de equipe
- [ ] Incident Response Plan
- [ ] DPO Contact: [EMAIL_DPO]
