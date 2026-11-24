# 09 · Modelo de dados (SGPI2_DATAMODEL)

> Extraído em modo de leitura do `SGPI2_DATAMODEL` em DEV, a 24/11/2026: 203 entidades de base de dados e 80 estáticas. Aqui ficam só as entidades que interessam ao suporte. A lista completa obtém-se com `getDataModel`, cuja resposta tem cerca de 4 MB e deve ser processada com um script.
>
> **Regras de eliminação.** **Protect** impede apagar o registo enquanto houver referências a ele. **Delete** apaga em cascata os registos que o referenciam. **Ignore** não faz nada e deixa referências órfãs.

## Visão geral

```text
uSER_MASTER (utilizador) ──1:1── PROMOTER (Id = utilizador!)
                                    │
                         I_PROJECT_PROMOTER (N promotores por projeto, IsMainPromoter)
                                    │
PROJECT ── ProjectStatusId / PreviousProjectStatusId → S_PROJECT_STATUS
   │       LineId → S_LINE_BY_MEASURE (linha/medida)    CurrentAnalysisId → ANALYSIS_PROJECT
   │
   ├── ANALYSIS_PROJECT (análise; pareceres → ANALYSIS_PROJECT_FEEDBACK_TEXT)
   ├── HIRING_* (contratação, minutas, representantes)
   ├── EXECUTION_PAYMENT_REQUEST (PP do promotor) ── CurrentAnalysisId → ANALYSIS_EXECUTION_PAYMENT_REQUEST
   │       └── EXECUTION_EXPENSE (faturas)                     └── pareceres → ANALYSIS_EXECUTION_PAYMENT_REQUEST_FEEDBACK
   ├── DOCUMENT (+ DOCUMENT_BINARY)  ← liga a projeto, análise, PP, despesa, mensagem…
   ├── MESSAGE (mensagens e notificações)
   └── PROJECT_HISTORY (um registo por estado: início e fim)
```

## Processo

**PROJECT**: a candidatura ou processo. O campo `Code` é o n.º do processo (por exemplo `P029922`).

| Atributos | Para quê |
|---|---|
| `ProjectStatusId`, `PreviousProjectStatusId`, `ProjectStatusDate` | Estado atual, estado anterior e data. Ver [Estados](#estados). |
| `LineId` → `S_LINE_BY_MEASURE`, `PhaseId` → `PHASE` | Linha/medida e fase |
| `CurrentAnalysisId` → `ANALYSIS_PROJECT` | Análise em vigor |
| `ManagProjectTechnicianId`, `LegalSupportTechnicianId`, `AnalysisDirectorId`, `Manager` | Técnico gestor, apoio jurídico, diretor da análise, gestor |
| `SicGestStatusId` → `S_SICGEST_STATUS` | Estado no SICGEST |
| `Q2ProcessKey`, `AnalisysReportQ2Key` | Ligação ao sistema Q2 (gestão documental) |

**PROJECT_HISTORY**: registo de todos os passos do processo.

- Atributos: `ProjectId`, `ProjectStatusId`, `AnalysisProjectId`, `StartMoment`/`By`, `EndMoment`/`By`, `PaymentRequestId`.
- Quando se muda o estado à mão, o intervalo do estado anterior tem de ser fechado e o do novo estado aberto. Se não, o histórico fica incoerente.

## Promotor

**PROMOTER**: os dados do promotor.

- O **`Id` é o próprio utilizador** (`uSER_MASTER`, com delete=Delete). Cada promotor é uma conta de utilizador.
- Atributos: `Name`, `NIF`, `IBAN`, `NIB`, `BankId`, `IvaSchemeId`, `CompanySizeId`, `PromoterTypeId`, `PromoterJuridicTypeId`.
- Tem também campos de consulta online (SS, AT, Registo Comercial, RCBE), cada um com o seu documento.
- ⚠️ **"Nome ou Designação Social"**: como o promotor é um utilizador, há **dois nomes**, o `PROMOTER.Name` e o nome do utilizador (`Users.Name`). É a explicação provável para o SGPI-49, em que o cabeçalho está certo e o campo errado. Confirmar no ecrã de dados pessoais qual deles aparece.

**I_PROJECT_PROMOTER**: liga projeto e promotor (`ProjectId`, `PromoterId`, `IsMainPromoter`, `IsMinimis`). Numa operação conjunta, um projeto tem vários promotores.

## Pedidos de pagamento

**EXECUTION_PAYMENT_REQUEST**: o PP submetido pelo promotor.

- Atributos: `ProjectId`, `ProjectPromoterId`, `RequestNumber`, `PaymentRequestTypeId` (adiantamento, intercalar, final…), `Value`, `SubmitedIn`, `PayedValue`, `PayedIn`, `CurrentPaymentRequestStatus`, `PreviousPaymentRequestStatus`, `DocumentId`.
- `CurrentAnalysisId` → `ANALYSIS_EXECUTION_PAYMENT_REQUEST`, com regra **Protect**.

**ANALYSIS_EXECUTION_PAYMENT_REQUEST**: a análise do PP feita pelo técnico, com os dados do SICGEST.

- `ExecutionPaymentRequestId` → `EXECUTION_PAYMENT_REQUEST` (Protect)
- **Campos SICGEST:** `SentToSicGestIn`, `SicGestStatus`, `SicGest_DecisionDate`, `SicGest_PayedIn`, `SicGest_FinancialDocNumber`, `SicGest_RefValuePayed`, `SicGest_NotRefundValuePayed`. **Estão aqui, e não no PP.**
- **Pareceres** (todos → `ANALYSIS_EXECUTION_PAYMENT_REQUEST_FEEDBACK.FeedbackText`):
  - `TechnicianFeedbackText_Id`
  - `DirectorFeedbackText_Id`
  - `SicGest_DirectorFeedBack_Id`
  - `SicGest_CC_CD_FeedBack_Id`
- O sentido de cada parecer (favorável, desfavorável) está em `TechnicianFeedBackId` e `DirectorFeedbackId` → `S_FEEDBACK`.

**EXECUTION_EXPENSE**: despesas e faturas do PP. Referem o PP com **delete=Delete**: apagar o PP apaga as despesas.

### O que acontece ao eliminar um PP

Registos que **impedem** a eliminação (Protect) e têm de ser tratados primeiro:

| Entidade | Referência |
|---|---|
| `DOCUMENT` | `ExecutionPaymentRequestId` / `AnalysisPaymentRequestId` |
| `MESSAGE` | `PaymentRequestId` |
| `EXECUTION_ACQ_DOCUMENT_PAYMENTREQUEST` | — |
| `ANALYSIS_EXECUTION_EXPENSE`, `ANALYSIS_EXECUTION_INVEST_MAP`, `ANALYSIS_EXECUTION_LEASING` | Referências à análise do PP |
| `ANALYSIS_EXECUTION_PAYMENT_REQUEST_ERRORS`, `EXECUTION_DEVOLUTION`, `EXECUTION_REDEPLOYMENT` | Referências à análise do PP |
| `INSPECTION`, `I_ANALYSIS_PAYMENT_REQUEST_DOCUMENT` | Referências à análise do PP |
| `EXECUTION_PAYMENT_REQUEST.CurrentAnalysisId` | ⚠️ Aponta para a análise. Se estiver preenchido, a ação Delete do `PaymentRequestsEdit`, que apaga primeiro a análise, **falha**. |

Registos apagados **em cascata** (Delete), juntamente com o PP:

- `EXECUTION_EXPENSE`, `EXECUTION_LEASING`
- `EXECUTION_FINANCING_BPF`, `EXECUTION_PAY_REQ_CONDITIONS`, `EXECUTION_PRO_RATA`
- `EXECUTION_ROC_TOC_DATA`, `EXECUTION_ROC_TOC_REMARK`
- `ANALISYS_FINANCIAL_STRUCTURE`, `S_SIGNATURE`

Ficam com referências **órfãs** (Ignore): `PROJECT_HISTORY.PaymentRequestId` e `PROJECT_PROCEDURE_HISTORY.PaymentRequestId`.

→ **Antes de eliminar:**

1. Contar os registos das entidades Protect.
2. Confirmar que os campos SICGEST da análise estão vazios.
3. Registar no ticket as despesas que vão ser apagadas em cascata.

## Análise do processo

**ANALYSIS_PROJECT**: uma ou mais análises por processo (`ProjectId`).

- Pareceres → `ANALYSIS_PROJECT_FEEDBACK_TEXT`: `TechnicianFeedbackText_Id`, `DirectorFeedbackText_Id`, `VcdFeedbackText_Id`, `BoardDecisionFeedbackText_Id` (deliberação do CD), `MunicipalFeedbackText_Id`, `SETFeedbackText_Id`, `CompetitionFeedbackText_Id`.
- O sentido de cada parecer está nos `*FeedbackId` correspondentes → `S_FEEDBACK`.

## Documentos e mensagens

**DOCUMENT**: metadados de cada documento. O conteúdo está em `DOCUMENT_BINARY`.

- Liga a: `ProjectId` (Delete), `AnalysisProjectId`, `ExecutionPaymentRequestId`, `AnalysisPaymentRequestId`, `ExecutionExpenseId`, `MessageId` (Delete), `Project_ContractAmendt_Id`, `DocumentTypeId`.
- Um documento sem análise nem PP associado é um documento "órfão" (ver o SGPI-20).

**MESSAGE**: mensagens e notificações. Atributos: `ProjectId`, `PaymentRequestId`, `AnalysisProjectId`, `SentBy`, `SentTo`, `SentIn`, `ReadIn`, `Subject`, `Body`, `ReplyDeadline`, `Closed`, `Draft`, `MessageTypeId`.

- O SGPI-19 pede que se limpe a data de leitura quando é anterior à data de envio. Os dois campos são `ReadIn` e `SentIn`.

## Estados

- **S_PROJECT_STATUS** (estática): os estados do processo **e** os do pedido de pagamento estão na mesma tabela.
- **S_PROJECT_STATUS_PROCESS**: os macroprocessos (candidatura, análise, contratação, execução…).
- **S_STATUS_TRANSITION_OPTION**, **I_PROJECT_STATUS_STEP**, **S_I_PROJECT_STATUS_DEADLINE**: transições, avisos e prazos.
- As transições estão no código (`StatusMachine*`), não em tabelas. Ver *Estados do processo v0.11*, nos documentos de transição.

## Fora deste módulo

- Os formulários de sustentabilidade LAQO e os prémios estão no **`SGPI2_SURVEY`**, não no `SGPI2_DATAMODEL`. Ainda estão por documentar.
- Os utilizadores estão nas entidades de sistema `User`/`uSER_MASTER` e no EnterpriseManager (privilégios, por exemplo `GeneralAdmin`).
