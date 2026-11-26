# 07 · Playbook de suporte

Este é o resumo operacional do *Guia de resolução dos pedidos de suporte* (v0.11, documento de transição do prestador anterior), com as notas que a equipa Bool verificou no código. O original é do TdP e não está aqui: ver [01-contexto.md](01-contexto.md).

Os ecrãs abaixo são do módulo **SGPI2_ADMINISTRATION**, exceto quando se indica outro módulo.

## 0. Triagem (antes de corrigir)

1. **A candidatura já entrou?** Procurar pelo NIF do promotor e, na LAQO, também pelo NIF do banco.
2. **Em que estado e fase está o processo?** Muitas "falhas" são o comportamento esperado para esse estado:
   - sem técnico atribuído não há mensagens;
   - num processo não elegível ou encerrado não há mensagens nem requerimentos;
   - o termo de aceitação só fica disponível depois de enviada a notificação de elegibilidade.
3. Pedir um print completo e o utilizador com que se entrou.
4. **Com que NIF se entrou e por onde se está a adicionar?** Na LAQO, o banco adiciona o processo por "Adicionar através da Sustentabilidade" e não pelo NIF.
5. **Pedidos repetidos:** juntar e responder uma vez.
6. **É uma questão de negócio?** Enquadramento e elegibilidade são para a área de negócio, não para a equipa do SGPI.

## 1. Pedidos de pagamento (PP)

**Ecrãs:**

- `ExecutionPaymentRequests`
- `PaymentRequestsEdit`: tipo, valor, data de submissão, n.º do pedido e **Delete**
- `PaymentRequestExpenses`: quitação e valores por despesa

**Como resolver:**

- **Mudar o tipo, o estado ou o valor:** nos ecrãs acima.
- **Devolver ao promotor:** remover a análise do PP ou limpar a data de submissão. Depois o técnico devolve com mensagem.
- **Eliminar:** só se o PP **não** seguiu para o SICGEST.
- **Valor pago ou colunas de pagamento:** alterar o valor e os campos SICGEST (pago em, referência, não reembolsável).

**Atenção:**

- Verificar sempre o SICGEST. Se o PP já lá estiver, a proposta tem de ser anulada do lado deles primeiro.
- Se alterares valores, gera de novo o PDF da análise do PP.

## 2. Corrigir o texto de um parecer, despacho ou notificação

| O que corrigir | Ecrã |
|---|---|
| Despacho do diretor ou parecer de um PP | `AnalysisExecPPFeedbackTextEdit` (entra-se por `AnalysisPRFeedbacks`) |
| Parecer ou deliberação da análise | `AnalysisProjectFeedbackTextDetail`, `AnalysisPRFeedbacks` |
| Datas do parecer do diretor ou da deliberação do CD | `ProjectEdit` |
| Notificação ou mensagem enviada | `MessageDetail`. Para apagar uma mensagem enviada por engano: `PromoterMessagesEdit` |
| SICGEST | Gerar de novo o relatório ou PDF e enviá-lo a quem trata do SICGEST |

Confirma a redação exata com quem pediu.

## 3. Termo de aceitação

- **Substituir o termo assinado:** carregar no separador "Contrato" da contratação. Se for preciso, voltar ao estado "Assinatura do contrato pelo promotor".
- **Mudar dados do termo:**
  1. corrigir na origem (`PromoterInfo`, `ANALYSIS/Promoter_GeneralData`, elementos da contratação);
  2. apagar o contrato gerado;
  3. gerar o termo outra vez.
- **Termo em formato editável:** `HIRING/<Linha>_ContractDraft?ProjectId=…&token=2`.
- **Minutas:** estão em `LookupList`. Mudar o texto de uma minuta é uma alteração de código no módulo HIRING e obriga a publicar.
- **Termo em branco ou cortado em vários processos:** é um defeito geral, não um caso isolado. Corrige-se no HIRING ou no BUSINESSLAYER.
- Pede sempre validação à área antes de substituir e guarda o PDF anterior no ticket.

## 4. Mudar o estado do processo

- **Ecrãs:** `ProjectEdit` / `ProjectEdit3`, com o estado pedido e a data certa. Requerimentos (desistência, caducidade): `AddRequestResponses`.
- **Passar para execução:** o processo precisa de ter apoio jurídico atribuído.
- **Reverter um passo:** apagar a análise, o parecer ou o contrato desse passo. Se ficarem, o sistema pode tratar a 1.ª tranche como já paga.
- **Atenção:** mudar o estado à mão **não** corre o que a transição faria (notificações, adiantamento automático, SICGEST, AD&C). Confirma o que fica por fazer e regista no ticket o estado antes e depois.
- Uma deliberação "Não elegível" lançada por engano envia logo o processo para "Notificação de não elegibilidade".

## 5. Uma validação impede a submissão

Lê a mensagem de validação (o "!" de cada módulo) e explica ao utilizador o que falta. Se a regra estiver errada, corrige-a no `CheckSubmit` da linha e publica. Os erros genéricos costumam ser intermitentes: pede para repetir e confirma se a candidatura afinal entrou.

## 6. Dados do promotor

- **Designação, e-mail e contactos:** `PromoterInfo` (lista) → `PromoterEdit_Popup`. **Afeta todas as candidaturas do promotor**, por isso confirma o NIF antes.
- **Promotores do projeto:** `ANALYSIS/Promoter_GeneralData`.
- **Nome do projeto ou evento, datas e termos da decisão:** `ProjectEdit`.
- **NIF pessoal em vez do NIF da empresa:** não se corrige. O promotor faz uma candidatura nova.
- **IBAN:** confirma que muda na contratação e na execução. Se o termo já foi gerado, gera-o outra vez.

## 7. LAQO: formulário de sustentabilidade e pedidos de exceção

- **Ecrãs:** `SURVEY/SurveysAdmin`, `SURVEY/SurveysList`, `SURVEY/SurveyAnswer`.
- **Os formulários não se apagam, inativam-se** (por causa da auditoria).
- **Pontuação duplicada:** limpar as linhas duplicadas, ou pedir um formulário novo e inativar o antigo.
- **Banco sem acesso:** ver se há banco associado. Se o campo estiver a nulo, marcar e desmarcar a associação.

## 8. Mapas de investimento, financiamento e incentivo

`AnalysisFinancialMapEdit`, `AnalysisExecInvestMapEdit` (copia o mapa aprovado para a execução, com os valores confirmados por escrito). Muitas vezes basta gravar outra vez para recalcular. As colunas dos anos dependem das datas das rubricas.

## 9. Registos em lote

- **IVA Congressos:** ecrã `IVA`, com o texto em cada processo.
- **Prémio de desempenho:**
  1. `SURVEY/AnalysisAwardSurveys` e `SURVEY/AwardManagements`;
  2. `ANALYSIS/AwardCD_ConsultationPopup`;
  3. `ANALYSIS/AwardClosure`;
  4. criar e enviar a notificação (art. 121.º CPA, 10 dias úteis);
  5. guardar o PDF no ticket.

## 10. Integrações (SICGEST, AD&C, MgC, IAPMEI, AT/SS)

Ver os logs da integração no Service Center para saber se o SGPI enviou. Se enviou, passar o erro e os dados à equipa do sistema externo. No minimis, a regra tem sido o registo manual pela área; atenção ao risco de duplicação.

## 11. Processo bloqueado na análise

Pôr o estado em "Análise técnica" (ou "Pedido de esclarecimentos"), criar a análise que falta e verificar se o técnico está preenchido.

## 12. Utilizadores, gestores e apoio jurídico

Mudar o técnico, o gestor ou o apoio jurídico (`ProjectTechnicianEdit`, `UserAdministration`), processo a processo ou por script sobre uma lista. Para dar acessos, copiar o perfil de um utilizador de referência.

## 13. Consultas e registos à mão

- **AT/SS:** `INTEGRATION/AT_SS` (lista de NIF → Excel).
- **Requerimentos:** `award`.
- **Devolução por anulação:** criar um pagamento novo, negativo, sem apagar a linha original.

## 14. Dúvidas de utilização

Responder com a explicação e um print. Encaminhar para a área de negócio quando é uma questão de enquadramento.

---

## Notas verificadas no código

Registar aqui o que se confirma ao ler o código (com data e quem confirmou).

### `SGPI2_ADMINISTRATION/PaymentRequestsEdit` (24/11/2026)

- Ações do ecrã: `SearchProjects`, `Save`, `NewManuaPaymentRequest` e **`Delete`**.
- **`Delete`** apaga `ANALYSIS_EXECUTION_PAYMENT_REQUEST` e depois `EXECUTION_PAYMENT_REQUEST`, numa só transação (se falhar, desfaz tudo). **Não** apaga despesas, documentos nem quitações. Se houver registos ligados por FK, a eliminação falha e é preciso tratá-los primeiro.
- O ecrã **não** verifica o SICGEST. Antes de apagar, confirmar à mão que estão vazios os campos `SentToSicGestIn`, `SicGest_DecisionDate` e `SicGest_PayedIn`. Estes campos estão na **análise** do PP (`ANALYSIS_EXECUTION_PAYMENT_REQUEST`), não no PP.
- ⚠️ `EXECUTION_PAYMENT_REQUEST.CurrentAnalysisId` aponta para a análise com regra **Protect**. Se estiver preenchido, apagar a análise primeiro (que é o que o Delete faz) pode falhar. Há também outros registos Protect que bloqueiam (documentos, mensagens), e as despesas (`EXECUTION_EXPENSE`) são apagadas **em cascata**. Ver a lista completa em [09-modelo-de-dados.md](09-modelo-de-dados.md#o-que-acontece-ao-eliminar-um-pp).
- Atributos editáveis relevantes. O ecrã junta os dados do PP e da análise do PP:
  - `Value`, `PayedValue`, `PayedIn`;
  - `SubmitedIn`, `RequestNumber`, `PaymentRequestTypeId`;
  - `DirectorFeedbackDate`, `TechnicianFeedbackDate`.

### `SGPI2_ADMINISTRATION/AnalysisExecPPFeedbackTextEdit` (24/11/2026)

- **Parâmetros:**
  - `AnalysisExecutionPaymentRequestFeedbackId` (obrigatório);
  - `AnalysisExecutionPaymentRequestId`;
  - `IsTechnician`, `IsDirector` (ambos obrigatórios).
- Exige o privilégio `SGPI2_DATAMODEL.GeneralAdmin`.
- O **Gravar** faz `CreateOrUpdate` ao registo de feedback (edita o mesmo Id, sem criar um novo). Depois liga o Id ao PP:
  - `IsTechnician` → `TechnicianFeedbackText_Id`;
  - `IsDirector` → `DirectorFeedbackText_Id`;
  - **se nenhum dos dois for True, liga a `SicGest_CC_CD_FeedBack_Id`.**
- ⚠️ **Para o parecer do diretor, abrir com `IsDirector=True`.** Se não, o parecer fica ligado ao campo errado.
- O texto é editado com CKEditor (até 50.000 caracteres). A data e o estado do PP não mudam.
- O PDF do relatório do PP **não** é gerado de novo por este ecrã.

### `SGPI2_ADMINISTRATION/PromoterInfo` (24/11/2026)

- É uma lista de promotores, com pesquisa (`Keyword`) e exportação para Excel. A edição é feita no `PromoterEdit_Popup`.
- Atributos de `PROMOTER` usados: `Name`, `NIF`, `IBAN`, `NIB`, `IvaSchemeId`, `PromoterTypeId`, `PromoterJuridicTypeId`, entre outros.
- _Por confirmar:_ se o campo "Nome ou Designação Social" que o promotor vê em "Dados pessoais" é o `PROMOTER.Name` ou o nome do utilizador. O modelo de dados mostra que `PROMOTER.Id` **é o utilizador**, por isso existem os dois nomes. É a explicação provável para o SGPI-49, em que o cabeçalho está correto e o campo não.

### `SGPI2_ANALYSIS/Constraints`: submeter o parecer técnico (26/11/2026, SGPI-131)

- O formulário do parecer (Parecer, Informação de serviço nº, Data, condicionantes, **Submeter Parecer**) é o bloco **`Constraints`**, dentro de `TechnicianAnalisys`. O ecrã do diretor (`DirectorAnalysis_Feedback`) é outro.
- **O «!» ao lado de «Submeter Parecer» tem dois casos:**
  1. Há mensagens de validação e o parecer ≠ Não elegível: o «!» é um **link** para um popup com `ValidationMessage` + `FinancingValidationMessage` + `IncentiveValidationMessage`. Estas mensagens são calculadas no `ProjectAnalisys_Block` a partir dos `CheckModule_ProjectData`, `ElegibilityConditions`, `InvestmentMap`, `ProjectBPF`, `FinancingMap` e `Incentive`. Ao submeter aparece *«Só pode submeter o parecer quando não existirem mensagens de erro.»*
  2. Não há mensagens, mas o processo está em **«Pedido de esclarecimentos»** (`ClarificationRequest`): o «!» é só uma imagem com o tooltip *«Só pode submeter o parecer quando fechar os esclarecimentos complementares.»* Resolve-se com «Fechar esclar. comp.» ou repondo «Análise técnica».
- **Outras mensagens:**
  - texto vazio → *«Introduza o texto do parecer»*;
  - falha na `StatusMachine` → *«Erro ao gravar o parecer, contacte a administração»*.
- A **data não é validada**: ao submeter, `TechnicianFeedbackDate` recebe a data atual (`CurrDateTime()`). O mesmo acontece com `DirectorFeedbackDate` no ecrã do diretor.
- **Primeiro passo:** ver o estado do processo em `ProjectEdit`. Se não esclarecer, pedir ao utilizador o print do popup do «!».

### Cálculo do PP e bloqueio por despesas a justificar (25/11/2026, SGPI-85)

- **Onde está:**
  - promotor: `SGPI2_BUSINESSLAYER/PaymentRequest_RecalculateValue`;
  - análise: `SGPI2_EXECUTION/A_PaymentRequest_RecalculateValue`. A regra é a mesma.
- **Como calcula:**
  - `TotalRequested` soma os PP anteriores submetidos e **pagos** (`PayedIn`), com parecer do diretor Elegível e `ExistPayment = True`.
  - `TotalCalculatedValue` soma as despesas × a taxa. Uma despesa só conta se `EXECUTION_EXPENSE.AnalysisExecInvestmentId` for **o Id exato de uma linha atual** do mapa (`IsCurrent`, não apagada, não nova proposta) e se a data do documento estiver dentro do período de execução. A correspondência por designação, tipo e data só se usa no VALORIZAR.
  - Se `TotalCalculatedValue − TotalRequested < 0`, `ExpensesToJustify > 0` e o promotor fica bloqueado.
- ⚠️ **Despesas ligadas a uma versão anterior do mapa deixam de contar.** Isto acontece depois de um ajuste ou de uma nova versão (`Analysis_Exec_Invest_Map_CreateVersion`), e é a causa provável dos casos «o PP não considera a despesa do PP anterior».
- No lado da análise, o ramo «Adiantamento?» só testa o tipo `Adiantamento` simples. Os outros tipos PTA não entram nele.
- **Taxa de incentivo usada no cálculo** (também em `A_InvestmentGetIncentivePercentage`, 26/11/2026, SGPI-88):
  - se existir um `PROJECT_INVEST_ADJUST` (ajuste à decisão) na análise atual, usa `Total_IncentivePercentage`;
  - senão, usa `ANALYSIS_PROJECT.TotalIncentivePercentage` da análise atual (`PROJECT.CurrentAnalysisId`).
  - **Taxa 0** → tudo fica a 0 → `TotalFinal = 0 − já pago < 0` → num PP final é tratado como **devolução**. Ver primeiro se há um ajuste com a taxa vazia, ou uma reanálise sem a taxa gravada (gravar outra vez o mapa).
  - ⚠️ Com vários ajustes, as queries não escolhem o mais recente (o `A_InvestmentGetIncentivePercentage` ordena por Id ascendente) → pode ser usado o primeiro ajuste.
  - Medidas que **não** calculam o PP por despesas (`Final = disponível − pago`): MI_INTERIOR, QREN, Protocolo Bancário (todas as edições), PT2020, REPOR, CGEI, Tesouraria COVID, VALORIZAR (incêndios 2017), contrato do tipo 3. Uma linha fora desta lista e sem despesas dá sempre um valor negativo.
  - Ecrãs: `ADMINISTRATION/ProjectInvestAdjusts`, `ProjectIncentivetaxs`.
- **«Certificação» pode querer dizer outra coisa:** a `SGPI2_BUSINESSLAYER/Execution_CheckCertificationsValidate` só verifica se as certidões **SS e AT** (`I_EXECUTION_BANK_ELEMENTS.SocialSecurityValDate` / `FiscalAdminValDate`) estão válidas hoje. Verificar isto primeiro.

### Por verificar

- `ProjectEdit` / `ProjectEdit3`: o MCP dá "Specified cast is not valid". Falta ver se o ecrã regista o histórico (`PROJECT_HISTORY`).
- `PromoterEdit_Popup`: dá o mesmo erro.
- O módulo `SGPI2_SURVEY` (inativação de formulários LAQO): ainda não foi aberto.
