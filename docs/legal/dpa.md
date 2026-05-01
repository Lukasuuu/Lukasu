# Data Processing Agreement (DPA)

## 1. Partes
**Controlador:** [NOME_EMPRESA], NIF [NIF], sede em [MORADA_FISCAL]
**Processador:** BookMe Platform (operado pelo Controlador)

## 2. Objeto
Processamento de dados pessoais de clientes e utilizadores da plataforma BookMe para fins de agendamento e gestão de serviços.

## 3. Categorias de Dados
- Dados de identificação (nome, email, telefone)
- Dados de agendamento (horários, serviços, preferências)
- Dados de pagamento (processados via Stripe, não armazenados localmente)

## 4. Finalidades
- Gestão de marcações e calendários
- Comunicação com clientes
- Processamento de pagamentos
- Análise estatística (anonimizada)

## 5. Subprocessadores
- Supabase (hospedagem e base de dados)
- Stripe (processamento de pagamentos)
- Resend (envio de emails)
- Twilio (notificações SMS/WhatsApp)

## 6. Medidas de Segurança
- TLS 1.3 em todas as comunicações
- RLS (Row Level Security) na base de dados
- Autenticação MFA disponível
- Logs de auditoria completos

## 7. Direitos do Titular
O Controlador garante os direitos do titular nos termos do artigo 18 da LGPD:
- Confirmação e acesso
- Correção
- Anonimização, bloqueio ou eliminação
- Portabilidade
- Eliminação do consentimento

## 8. Incidentes
Notificação à ANPD e aos titulares em até 72h após deteção.

---
Assinado em: [DATA]
Versão: 1.0
