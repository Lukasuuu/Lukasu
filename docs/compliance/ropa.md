# Registro de Operações de Tratamento (ROPA)

## Operação 1: Gestão de Utilizadores
| Campo | Valor |
|---|---|
| Finalidade | Autenticação e gestão de contas |
| Base legal | Execução de contrato (art. 7, V LGPD) |
| Dados | Nome, email, telefone, NIF |
| Retenção | 5 anos após encerramento da conta |
| Medidas | RLS, MFA, criptografia |

## Operação 2: Agendamentos
| Campo | Valor |
|---|---|
| Finalidade | Gestão de marcações de serviços |
| Base legal | Execução de contrato |
| Dados | Nome do cliente, serviço, data/hora, preço |
| Retenção | 10 anos (obrigação fiscal) |
| Medidas | RLS, logs de auditoria |

## Operação 3: Pagamentos
| Campo | Valor |
|---|---|
| Finalidade | Processamento de pagamentos |
| Base legal | Execução de contrato |
| Dados | Dados de cartão (tokenizado via Stripe) |
| Retenção | Conforme Stripe |
| Medidas | PCI DSS (Stripe), tokens |

## Operação 4: Comunicações
| Campo | Valor |
|---|---|
| Finalidade | Notificações e marketing |
| Base legal | Consentimento (art. 7, I LGPD) |
| Dados | Email, telefone |
| Retenção | Até revogação do consentimento |
| Medidas | Opt-out em todas as comunicações |

## Operação 5: Analytics
| Campo | Valor |
|---|---|
| Finalidade | Melhoria do serviço |
| Base legal | Interesse legítimo |
| Dados | Dados anonimizados de uso |
| Retenção | 2 anos |
| Medidas | Anonimização, agregação |
