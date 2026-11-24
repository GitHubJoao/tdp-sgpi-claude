# 08 · Triagem do backlog

> **Retrato de 24/11/2026.** O Jira é a fonte de verdade. Esta página guarda a análise de esforço e a ordem sugerida; atualiza-a quando os tickets avançarem.

O Rui Veloso pediu (email de 19/11/2026) que se resolva **um caso de cada tipo** e depois se aplique o mesmo método aos restantes.

## Nível 1: correção de dados num ecrã que já existe

| Ticket(s) | Tipo | Método (ver o [playbook](07-playbook-suporte.md)) |
|---|---|---|
| **SGPI-59** (prioridade do Rui) | Texto do parecer do diretor do PP 1, P029922 | `AnalysisExecPPFeedbackTextEdit` com **`IsDirector=True`**. Antes: confirmar que não foi despachado no Portal do Conselho de Crédito e se o Portal lê o texto do SGPI ou guarda uma cópia. Depois: gerar de novo o PDF do PP. |
| SGPI-30, 31, 32, 33, 34 | Eliminar PP | `PaymentRequestsEdit` → Delete. Confirmar que os campos SICGEST estão vazios e que não há despesas ligadas. Começar pelo SGPI-30 (PP a 0%). |
| SGPI-35 | Corrigir valor do PP final | `PaymentRequestsEdit.Value`. Se o valor vier das despesas, é preferível eliminar o PP e o promotor criar outro. |
| SGPI-37 | "Efetuar pagamento" Sim → Não | Encontrar o campo (não aparece em `PaymentRequestsEdit`). |
| SGPI-38, 40 | Repor estado | `ProjectEdit`. Registar o estado antes e depois. |
| SGPI-48, 50, 51 | Designação social | `PromoterInfo` → `PromoterEdit_Popup`. Afeta todas as candidaturas do promotor. |
| SGPI-42 a 47 | LAQO: anular formulários e exceções | `SURVEY/SurveysAdmin`. Inativar, não apagar. |

## Nível 2: fáceis, mas dependem de um anexo ou de diagnóstico

| Ticket(s) | O que falta |
|---|---|
| SGPI-52, 53, 54 | Ir buscar o PDF ao ticket do OTRS e carregá-lo no separador "Contrato" |
| SGPI-55, 56, 57, 58 | Triagem: estado e fase, utilizador e NIF. Responder ao promotor. |
| SGPI-41 | Ver estado, técnico e atribuição |
| SGPI-49 | Confirmar primeiro qual é o campo certo. Há uma 2.ª questão no ticket original. |
| SGPI-39 | Não elegível → Elegível. Ver as notificações já enviadas. |
| SGPI-25, 26 | Resposta da entidade (25) e capturas (26). Provavelmente fecham sem código. |

## Nível 3: investigação ou evolução

| Ticket(s) | Notas |
|---|---|
| SGPI-24 | Estado dos 2 pedidos (adiantamento a 100% + final) |
| SGPI-19, 20, 21, 22, 23 | Investigação (notificações, PP desaparecido, listagem LAQO, IVA nas operações conjuntas, minimis) |
| SGPI-27, 28 | Evoluções. Precisam de estimativa aprovada. |

## Pilotos sugeridos (um por tipo)

1. SGPI-59 (urgente)
2. SGPI-30 (eliminar PP)
3. SGPI-48 (designação)
4. SGPI-45 (LAQO)
5. SGPI-38 (estado)

## Histórico

| Data | Alteração |
|---|---|
| 24/11/2026 | Primeira triagem dos 39 tickets abertos |
