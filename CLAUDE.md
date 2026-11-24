# CLAUDE.md — Projeto SGPI · Turismo de Portugal (Bool)

Este repositório é o **contexto partilhado** para sessões do Claude (Claude Code, Cowork ou chat) que trabalhem no projeto SGPI do Turismo de Portugal. Não contém código da aplicação: contém o que um agente precisa de saber para ler pedidos, investigar no Service Studio e validar no browser.

## Lê primeiro (ordem)

1. [`docs/01-contexto.md`](docs/01-contexto.md): contrato, equipa, interlocutores e regras acordadas no kickoff.
2. [`docs/02-fluxo-de-pedidos.md`](docs/02-fluxo-de-pedidos.md): de onde vêm os pedidos (email → OTRS → Jira) e como os registar.
3. [`docs/03-jira.md`](docs/03-jira.md): como ler user stories e tarefas no Jira SGPI (JQL, estados, tipos, labels).
4. [`docs/04-mcp-setup.md`](docs/04-mcp-setup.md): configurar os servidores MCP (Atlassian, OutSystems/Service Studio, servicestudio-open).
5. [`docs/05-service-studio.md`](docs/05-service-studio.md): módulos SGPI, como abrir e ler, e regras de edição.
6. [`docs/06-validacao-browser.md`](docs/06-validacao-browser.md): abrir a aplicação e o Service Center no browser para validar.
7. [`docs/07-playbook-suporte.md`](docs/07-playbook-suporte.md): como se resolve cada tipo de pedido de suporte (ecrãs de administração).
8. [`docs/08-triagem-tickets.md`](docs/08-triagem-tickets.md): triagem atual do backlog e o que já foi verificado no código.

Lê só o que a tarefa pede: um pedido de suporte precisa de 02, 03, 05 e 07; uma validação precisa de 06.

## Regras para o agente (obrigatórias)

- **Por defeito, só leitura.** Não alterar dados, código, tickets nem estados sem pedido explícito de quem está na sessão.
- **Código OutSystems:** editar só com pedido explícito. Toda a alteração passa por `omlMerge` e é revista pelo developer em *Compare and Merge*. Nunca usar `omlPublish` sem ordem expressa.
- **Produção:** correções de dados em PROD precisam de aprovação **antes**; depois pede-se confirmação a quem abriu o ticket. Deploys para PROD só a partir das 18h.
- **Novos desenvolvimentos:** estimativa aprovada pelo TdP antes de começar. Novas funcionalidades são anunciadas ao Rui Veloso quando chegam a TEST.
- **Pedidos do Rui Veloso têm prioridade.**
- **Nunca escrever segredos** (passwords, tokens, VPN, dados pessoais de promotores além do necessário) neste repositório nem em tickets.
- Responder ao utilizador em **português europeu**.

## Manter este repositório atualizado

Quando uma sessão descobrir algo durável (um ecrã novo, um campo, uma armadilha, uma URL, uma decisão), atualiza o ficheiro certo em `docs/` e regista em [`CHANGELOG.md`](CHANGELOG.md). Ver [`CONTRIBUTING.md`](CONTRIBUTING.md).
