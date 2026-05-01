# SOC 2 Roadmap

## Objetivo
Obter certificação SOC 2 Tipo II até Q4 2026.

## Trust Services Criteria

### 1. Security (CC6.1 - CC6.8)
- [x] Autenticação e autorização (Supabase Auth)
- [x] RLS na base de dados
- [ ] SIEM (Sentry + OpenTelemetry)
- [ ] Penetration testing anual
- [ ] Bug bounty program

### 2. Availability (CC7.1 - CC7.5)
- [ ] Uptime SLA 99.9%
- [ ] Backups diários automatizados
- [ ] Disaster recovery plan
- [ ] RTO < 4h, RPO < 1h

### 3. Processing Integrity (CC8.1 - CC8.4)
- [x] Validação de dados (Zod)
- [x] Logs de auditoria
- [ ] Reconciliação de pagamentos
- [ ] Alertas de anomalias

### 4. Confidentiality (CC9.1 - CC9.3)
- [x] TLS 1.3
- [ ] Criptografia em repouso
- [ ] Classificação de dados
- [ ] NDA com subprocessadores

### 5. Privacy (CC10.1 - CC10.5)
- [x] Banner de cookies
- [x] Política de privacidade
- [ ] DSR endpoint
- [ ] Privacy by design

## Timeline
| Fase | Data | Milestone |
|---|---|---|
| 1 | Q2 2026 | Implementar controles técnicos |
| 2 | Q3 2026 | Documentar processos |
| 3 | Q4 2026 | Auditoria externa |
| 4 | Q1 2027 | Certificação SOC 2 |
