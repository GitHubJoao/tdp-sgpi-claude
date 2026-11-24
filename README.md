# tdp-sgpi-claude

Contexto partilhado para sessões do **Claude** no projeto **SGPI do Turismo de Portugal** (Bool).

Permite a qualquer pessoa da equipa (ou ao próprio Claude):

- ler as **user stories e tarefas** no Jira SGPI;
- ligar ao **Service Studio** pelos servidores MCP, abrir módulos e ler o código;
- abrir **páginas da aplicação e o Service Center** no browser para validar alterações;
- seguir o **playbook de suporte**, com os métodos de correção verificados.

O ponto de entrada para o agente é o [`CLAUDE.md`](CLAUDE.md).

## Como usar numa sessão

### Claude Code

```bash
git clone https://github.com/GitHubJoao/tdp-sgpi-claude.git
cd tdp-sgpi-claude
claude
```

O Claude Code lê o `CLAUDE.md` e o `.mcp.json` automaticamente.

### Claude desktop / Cowork

1. Clonar o repositório para uma pasta local, por exemplo `C:\Users\<utilizador>\tdp-sgpi-claude`.
2. Ligar essa pasta à sessão com o botão **Add folder**, ou anexar o `CLAUDE.md`.
3. Começar com: *"Lê o CLAUDE.md do repositório tdp-sgpi-claude e segue-o."*
4. Configurar os servidores MCP uma vez, conforme o [`docs/04-mcp-setup.md`](docs/04-mcp-setup.md).

### Projeto no claude.ai

Também se pode carregar o `CLAUDE.md` e a pasta `docs/` como conhecimento de um Projeto. Quando o repositório mudar, voltar a carregar os ficheiros alterados.

## Estrutura

```text
CLAUDE.md                      ← instruções para o agente (ler primeiro)
docs/
  01-contexto.md               ← contrato, equipa, acordos
  02-fluxo-de-pedidos.md       ← email → OTRS → Jira
  03-jira.md                   ← JQL, tipos, estados, labels
  04-mcp-setup.md              ← configurar os servidores MCP
  05-service-studio.md         ← módulos SGPI (keys) e como os ler
  06-validacao-browser.md      ← aplicação e Service Center
  07-playbook-suporte.md       ← como resolver cada tipo de pedido + notas verificadas
  08-triagem-tickets.md        ← retrato do backlog e ordem sugerida
tools/servicestudio-open-mcp/  ← servidor MCP para abrir módulos no Service Studio
config/                        ← exemplo de configuração para o Claude desktop
.mcp.json                      ← servidores MCP para o Claude Code
```

## Atualizar

Ver o [`CONTRIBUTING.md`](CONTRIBUTING.md). Em resumo: uma descoberta vai para um ficheiro em `docs/` e uma linha no [`CHANGELOG.md`](CHANGELOG.md), num commit pequeno.

> **Repositório privado.** Não contém código da aplicação, segredos nem documentos originais do cliente.
