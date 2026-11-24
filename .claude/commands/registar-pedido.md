---
description: Ver se um pedido (email/ticket OTRS) já existe no Jira SGPI e, se não existir, propor a issue em refinamento
argument-hint: "[n.º ticket OTRS | n.º processo | assunto do email]"
---

Pedido a registar: $ARGUMENTS

Segue `docs/02-fluxo-de-pedidos.md` e `docs/03-jira.md`.

1. **Recolher o pedido.**
   - Se $ARGUMENTS for um n.º de ticket, um n.º de processo ou um assunto, procurar o email no Gmail. Procurar em `from:turismodeportugal.pt` e nos emails reencaminhados para `equipaturismodeportugal@bool.pt`.
   - Se não houver argumento, listar os emails do TdP dos últimos 3 dias úteis que tenham pedidos de suporte, desenvolvimento ou correção.
   - Para cada pedido, extrair: n.º do ticket OTRS, n.º do processo (`Pxxxxxx`), NIF, promotor, quem pediu, data e o pedido em si.
2. **Procurar duplicados no Jira**, com o `searchJiraIssuesUsingJql` no projeto SGPI e só com os campos `summary`, `status` e `labels`:
   - `text ~ "<n.º ticket>"`
   - `text ~ "<Pxxxxxx>"`
   - `text ~ "<NIF>"`
   - palavras-chave do assunto

   Lembrar que o mesmo assunto chega muitas vezes por 2 ou 3 canais.
3. **Classificar** o tipo, segundo a secção correspondente de `docs/07-playbook-suporte.md` (PP, texto, termo, estado, promotor, LAQO, …), e o tipo de issue (Suporte, Correctivo ou Evolução).
4. **Apresentar uma tabela** com: pedido | já existe? (issue) | tipo | label proposta | resumo proposto.
5. **Só depois de confirmação explícita do utilizador**, criar as issues em falta:
   - **Estado:** `Backlog`.
   - **Labels:** a de refinamento (`needs-refinement`, se a equipa não tiver definido outra), o tipo e o épico.
   - **Descrição** com o modelo das issues de suporte: **Ação**, **Origem** (ticket OTRS, quem pediu e data), **Pedido original** e **Processo**. O Processo diz que uma correção de dados em PROD precisa de aprovação antes e de confirmação de quem abriu o ticket.
   - Não pôr dados pessoais além do necessário.
6. No fim, listar as issues criadas, com link.
