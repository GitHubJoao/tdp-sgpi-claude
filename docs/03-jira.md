# 03 · Jira SGPI: ler user stories e tarefas

- **Site:** `bool-turismodeportugal.atlassian.net`. Pode ser usado como `cloudId` nas ferramentas do Atlassian MCP.
- **Projeto:** `SGPI`
- **Backlog:** <https://bool-turismodeportugal.atlassian.net/jira/software/projects/SGPI/boards/1/backlog>

## Ferramentas (Atlassian MCP)

| Para | Ferramenta |
|---|---|
| Listar ou procurar | `searchJiraIssuesUsingJql`. Usar `view: "evidence"` quando são precisas as descrições. Com muitas issues, a resposta é grande: pedir só `fields: ["summary","status","issuetype","labels"]` e ler as descrições uma a uma. |
| Ler uma issue | `getJiraIssue` com `view: "evidence"` |
| Comentários | `listJiraIssueComments` |
| Criar ou editar | `createJiraIssue` / `editJiraIssue`, **só com pedido explícito** |

## JQL úteis

```text
# Tudo o que está em aberto, mais recente primeiro
project = SGPI AND statusCategory != Done ORDER BY created DESC

# Prontos a desenvolver
project = SGPI AND status = "Pronto a Desenvolver" ORDER BY priority DESC

# Por tipo de correção (labels)
project = SGPI AND labels = eliminar-pp AND statusCategory != Done

# Procurar se um ticket OTRS ou um processo já existe
project = SGPI AND text ~ "2026101595000183"
project = SGPI AND text ~ "P029922"
```

> No JQL, os nomes dos tipos de issue estão em português e podem dar erro de validação (por exemplo `issuetype != Épico`). Nesse caso, filtrar por `key` ou pelos resultados.

## Tipos de issue

| Tipo | Uso |
|---|---|
| Épico | Linhas/medidas (Crescer com o Turismo, LAQO, PT2030, Microcrédito Interior, Tesouraria COVID, Portugal Events, …) e "Suporte e Correctivo" (SGPI-15) |
| Suporte | Pedido de suporte ou de correção de dados |
| Correctivo | Defeito no código, a investigar e corrigir |
| Evolução | Funcionalidade nova. Precisa de estimativa aprovada. |

## Estados em uso

`Backlog` → `Pronto a Desenvolver` → `Em desenvolvimento` → … → `Done`

## Labels (convenção)

| Label | Significado |
|---|---|
| `onda1-simples` | Correções simples da 1.ª vaga, vindas da lista consolidada do Rui (19/11/2026) |
| `epico-sgpi-<n>` | Épico de origem (por exemplo `epico-sgpi-15` = Suporte e Correctivo, `epico-sgpi-12` = LAQO) |
| `prioridade-rui` | Pedido direto do Rui Veloso |
| `eliminar-pp`, `eliminar-corrigir-pp`, `corrigir-campo` | Pedidos de pagamento |
| `repor-estado` | Mudar o estado do processo |
| `corrigir-designação` | Dados do promotor |
| `anular-laqo` | Formulários de sustentabilidade e pedidos de exceção LAQO |
| `carregar-documento` | Carregar ou substituir termos e contratos |
| `corrigir-texto` | Pareceres, despachos e notificações |
| `apoio-funcional` | Dúvida ou diagnóstico, sem correção de dados |

Cada tipo corresponde a uma secção do [playbook de suporte](07-playbook-suporte.md).

## Estrutura da descrição das issues de suporte

As issues seguem este modelo: **Ação**, **Origem** (WRD/XLS e n.º do ticket OTRS), **Pedido original**, **Processo** (aprovação antes de PROD) e, quando existem, **Validação prévia**, **Como fazer** e **Critérios de aceitação**. As issues de investigação (A1 a A10) têm as secções **O que já se sabe**, **Onde investigar** e **Próximo passo**.
