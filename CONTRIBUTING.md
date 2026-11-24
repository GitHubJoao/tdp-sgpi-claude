# Como manter este repositório

Este repositório é escrito por pessoas e por sessões do Claude. Mantém-no **curto, correto e atual**.

## O que entra

- Factos que duram: URLs, módulos e keys, ecrãs e campos, armadilhas, decisões, convenções do Jira.
- Notas verificadas no código, com **data** e o que foi confirmado. Vão para `docs/07-playbook-suporte.md` → *Notas verificadas no código*.
- Atualizações da triagem (`docs/08-triagem-tickets.md`) quando o backlog muda bastante.

## O que não entra

- Passwords, tokens, credenciais de VPN, cookies.
- Documentos originais do cliente (docx, xlsx, pdf). Em vez deles, referir onde estão.
- Dados pessoais de promotores além do mínimo para identificar um caso (n.º do processo, NIF da entidade).
- Estado do dia a dia de tickets: isso fica no Jira.

## Onde pôr cada coisa

| Descoberta | Ficheiro |
|---|---|
| Pessoas, acordos, contrato | `docs/01-contexto.md` |
| Fluxo de entrada de pedidos | `docs/02-fluxo-de-pedidos.md` |
| JQL, labels, estados do Jira | `docs/03-jira.md` |
| Configuração dos MCP e problemas conhecidos | `docs/04-mcp-setup.md` |
| Módulos, keys, regras de edição | `docs/05-service-studio.md` |
| URLs dos ambientes, Service Center | `docs/06-validacao-browser.md` |
| Método de resolução, ecrã, armadilha | `docs/07-playbook-suporte.md` |
| Ordem de trabalho, esforço | `docs/08-triagem-tickets.md` |
| Regras para o agente | `CLAUDE.md` (alterar com cuidado) |

## Fluxo

1. `git pull` antes de começar.
2. Editar o ficheiro certo e acrescentar uma linha ao `CHANGELOG.md`.
3. Commit pequeno com uma mensagem clara, por exemplo `docs: ProjectEdit grava PROJECT_HISTORY`.
4. `git push`. Se houver conflito, juntar as duas versões; nenhuma substitui a outra.

As sessões do Claude só fazem commit ou push quando quem está na sessão pede.
