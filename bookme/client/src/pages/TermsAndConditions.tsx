import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  const lastUpdate = 'Abril de 2026';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Termos e Condições</h1>
          <p className="text-foreground/60 mb-10 text-sm">Última atualização: {lastUpdate} — Em vigor desde: {lastUpdate}</p>

          <div className="space-y-8 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Identificação do Prestador</h2>
              <div className="bg-card border border-border rounded-lg p-4 text-sm space-y-1">
                <p><strong className="text-foreground/90">Designação:</strong> BookMe Portugal</p>
                <p><strong className="text-foreground/90">NIF:</strong> 123456789</p>
                <p><strong className="text-foreground/90">Morada fiscal:</strong> Portugal</p>
                <p><strong className="text-foreground/90">Email:</strong> <a href="mailto:contacto@bookme.pt" className="text-blue-400">contacto@bookme.pt</a></p>
                <p><strong className="text-foreground/90">Telefone:</strong> +351 932 349 452</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Definições</h2>
              <ul className="space-y-2 text-sm">
                {[
                  ['BookMe', 'A plataforma SaaS de marcações/agendamentos desenvolvida e comercializada pelo prestador identificado no ponto 1'],
                  ['Utilizador', 'Pessoa singular ou coletiva que cria uma conta e utiliza a plataforma BookMe para gerir o seu negócio'],
                  ['Cliente Final', 'Pessoa que utiliza o sistema de booking público para marcar um serviço junto de um Utilizador'],
                  ['Serviço', 'O software BookMe disponibilizado online mediante subscrição'],
                  ['Plano', 'Nível de subscrição contratado (Grátis, Pro ou Business)'],
                  ['Marcação', 'Reserva de um serviço feita por um Cliente Final junto de um Utilizador'],
                ].map(([term, def], i) => (
                  <li key={i} className="flex gap-3">
                    <strong className="text-foreground/90 w-32 flex-shrink-0">{term}:</strong>
                    <span className="text-foreground/70">{def}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Objeto do Contrato</h2>
              <p>
                Os presentes Termos e Condições regulam o acesso e a utilização da plataforma BookMe,
                um software como serviço (SaaS) de gestão de marcações e agendamentos online, que permite
                a qualquer negócio receber marcações de clientes, gerir calendário, equipa e pagamentos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Acesso e Registo</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>O acesso ao BookMe requer a criação de uma conta com dados verdadeiros e completos</li>
                <li>O Utilizador deve ter pelo menos 18 anos de idade ou capacidade legal para celebrar contratos</li>
                <li>É permitida apenas uma conta por pessoa ou negócio</li>
                <li>O Utilizador é responsável pela confidencialidade das suas credenciais de acesso</li>
                <li>Qualquer acesso não autorizado deve ser comunicado imediatamente para contacto@bookme.pt</li>
                <li>Ao registar-se, o Utilizador pode optar por um período de experiência de 14 dias em qualquer plano pago</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Planos e Preços</h2>
              <p className="mb-4">Todos os planos pagos incluem um período de experiência de 14 dias grátis. Após o trial, os preços incluem IVA à taxa legal em vigor (23%).</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground/90 font-semibold">Plano</th>
                      <th className="text-left py-2 pr-4 text-foreground/90 font-semibold">Preço c/ IVA</th>
                      <th className="text-left py-2 pr-4 text-foreground/90 font-semibold">Sem IVA</th>
                      <th className="text-left py-2 text-foreground/90 font-semibold">IVA (23%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Pro Mensal', '€29/mês', '€23,58', '€5,42'],
                      ['Business Mensal', '€59/mês', '€47,97', '€11,03'],
                      ['Pro Anual', '€290/ano', '€235,77', '€54,23'],
                      ['Business Anual', '€590/ano', '€479,67', '€110,33'],
                    ].map(([plan, total, net, vat], i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 pr-4 text-foreground/90 font-medium">{plan}</td>
                        <td className="py-2 pr-4 text-foreground/80">{total}</td>
                        <td className="py-2 pr-4 text-foreground/60">{net}</td>
                        <td className="py-2 text-foreground/60">{vat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Pagamento e Período de Experiência</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Todos os planos pagos incluem um <strong>período de experiência de 14 dias grátis</strong></li>
                <li>Durante o trial, o cartão não é cobrado e o Utilizador pode cancelar sem qualquer custo</li>
                <li>Após os 14 dias, o cartão é cobrado automaticamente pelo valor do plano escolhido</li>
                <li>Os pagamentos são processados de forma segura pelo Stripe</li>
                <li>Métodos aceites: cartão de crédito/débito Visa, Mastercard, American Express; SEPA Direct Debit</li>
                <li>A faturação é efetuada no início de cada período (mensal ou anual) conforme o plano</li>
                <li>A subscrição renova automaticamente no final de cada período, salvo cancelamento prévio</li>
                <li>Os preços podem ser alterados com aviso prévio de 30 dias por email</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Período de Experiência (Trial)</h2>
              <p className="mb-3">
                Todos os planos pagos incluem um <strong className="text-white">período de experiência de 14 dias grátis</strong>,
                durante o qual o Utilizador pode usar todas as funcionalidades do plano escolhido sem qualquer custo.
              </p>
              <p className="mb-3">
                Durante o trial, o Utilizador pode cancelar a qualquer momento sem qualquer custo ou compromisso.
                Não é necessário indicar motivo para o cancelamento durante o período de experiência.
              </p>
              <p className="mb-3">
                Para cancelar durante o trial, aceda ao Stripe Customer Portal ou envie email para{' '}
                <a href="mailto:contacto@bookme.pt" className="text-blue-400 hover:text-blue-300">contacto@bookme.pt</a>
                com o assunto <em>"Cancelar trial"</em>.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-sm">
                <strong className="text-green-400">✓ Sem surpresas:</strong> Após os 14 dias de trial, a subscrição é
                renovada automaticamente e cobrada pelo plano escolhido. O Utilizador será notificado por email
                3 dias antes do fim do trial com a opção de cancelar.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cancelamento</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>O Utilizador pode cancelar a subscrição a qualquer momento através do Stripe Customer Portal</li>
                <li>Após cancelamento, o acesso é mantido até ao fim do período já pago</li>
                <li>Não são efetuados reembolsos proporcionais (exceto exercício do direito de arrependimento)</li>
                <li>Os dados são mantidos durante 30 dias após o cancelamento, sendo depois eliminados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Uso Aceitável</h2>
              <p className="mb-3">O Utilizador compromete-se a não utilizar o BookMe para:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Enviar spam ou mensagens não solicitadas</li>
                <li>Publicar ou transmitir conteúdo ilegal, ofensivo ou fraudulento</li>
                <li>Realizar engenharia reversa ou tentar extrair o código fonte</li>
                <li>Criar contas falsas ou usar o serviço em nome de terceiros sem autorização</li>
                <li>Sobrecarregar os servidores de forma abusiva (ataques DoS)</li>
                <li>Violar direitos de propriedade intelectual de terceiros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Propriedade Intelectual</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>O BookMe e todos os seus componentes são propriedade exclusiva do prestador identificado no ponto 1</li>
                <li>O Utilizador retém a propriedade dos seus dados (clientes, marcações, serviços)</li>
                <li>É concedida ao Utilizador uma licença de uso não exclusiva, não transferível e revogável</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Disponibilidade do Serviço</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Objetivo de 99,9% de disponibilidade mensal</li>
                <li>Manutenções programadas são comunicadas com 48 horas de antecedência por email</li>
                <li>Não garantimos disponibilidade absoluta nem assumimos responsabilidade por interrupções não programadas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Limitação de Responsabilidade</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>O BookMe não é responsável por perdas indiretas, lucros cessantes ou danos consequentes</li>
                <li>A responsabilidade máxima do BookMe está limitada ao valor pago pelo Utilizador nos últimos 12 meses</li>
                <li>O BookMe não é responsável pelos dados introduzidos pelos Utilizadores nem pelos seus clientes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Proteção de Dados</h2>
              <p>
                O tratamento de dados pessoais é regulado pela nossa{' '}
                <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Política de Privacidade</a>.
                O BookMe atua como responsável pelo tratamento dos dados dos Utilizadores e como subcontratante
                para os dados dos Clientes Finais. Um Acordo de Processamento de Dados (DPA) está disponível
                mediante pedido para contacto@bookme.pt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Suspensão e Rescisão</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>O BookMe reserva-se o direito de suspender ou encerrar contas que violem estes Termos</li>
                <li>Em caso de violação grave, a suspensão pode ser imediata sem aviso prévio</li>
                <li>Em casos não graves, será dado aviso prévio de 15 dias com possibilidade de correção</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Alterações aos Termos</h2>
              <p>
                Reservamo-nos o direito de alterar estes Termos e Condições. Para alterações materiais,
                notificamos por email com 30 dias de antecedência. A continuação da utilização após a
                data de entrada em vigor das alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">16. Resolução de Litígios</h2>
              <p className="mb-3">
                Em caso de litígio, as partes comprometem-se a tentar uma resolução amigável no prazo de 30 dias.
              </p>
              <p className="mb-3">
                Na impossibilidade de resolução amigável, o Utilizador pode recorrer à plataforma europeia de
                resolução de litígios em linha:{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  ec.europa.eu/consumers/odr
                </a>
              </p>
              <p>
                Também pode recorrer a centros de arbitragem de conflitos de consumo devidamente autorizados em Portugal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">17. Lei Aplicável e Foro</h2>
              <p>
                Estes Termos e Condições são regidos pela lei portuguesa. Para efeitos de resolução de
                litígios, é competente o Tribunal da Comarca de Lisboa, sem prejuízo das normas
                imperativas de proteção dos consumidores.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
