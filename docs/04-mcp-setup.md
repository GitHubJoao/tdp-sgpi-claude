# 04 · Servidores MCP

São precisos três servidores MCP e, opcionalmente, um browser.

| Servidor | Para quê | Onde corre |
|---|---|---|
| **Atlassian MCP** | Ler e criar issues no Jira SGPI | Conector do claude.ai (cloud) |
| **outsystems** (MCP do Service Studio) | Ler e editar o módulo aberto no Service Studio | O próprio Service Studio, em `http://127.0.0.1:41820/mcp` |
| **servicestudio-open** | Abrir um módulo do ambiente no Service Studio | Local (Node), neste repositório: [`tools/servicestudio-open-mcp`](../tools/servicestudio-open-mcp) |
| Browser (Claude in Chrome ou browser da app) | Abrir a aplicação e o Service Center | Local |

Gmail e Google Drive (conectores do claude.ai) são úteis para encontrar emails do TdP e os documentos de transição.

## 1. Atlassian MCP

No claude.ai: **Settings → Connectors → Atlassian**, e autenticar com a conta que tem acesso a `bool-turismodeportugal.atlassian.net`.

## 2. MCP do Service Studio (outsystems)

1. No Service Studio 11, abrir o diálogo **MCP Server** e clicar em **Start**. A porta por defeito é a 41820. Manter *Writing permissions* em **"Manually review changes in Compare and Merge"**.
2. O servidor **não arranca sozinho**: sem ele ligado, o cliente recebe `ConnectionRefused`.
3. Cada ligação pede aprovação no Service Studio (*"allow this agent?"*): o agente chama `createSessionToken` e o developer aprova. **O token tem de ser passado em todas as chamadas.**
4. A skill oficial da OutSystems está em `outsystems11-mcp` (repositório da OutSystems, skill `servicestudio-mcp-oml`). Vale a pena instalá-la para usar `applyModelApiCode`.

## 3. servicestudio-open (abrir módulos)

O MCP oficial **não abre módulos**: só trabalha com os que já estão abertos. Este servidor resolve isso. Chama o Service Studio com o switch que ele já suporta:

```text
ServiceStudio.exe -downloadAndOpen -eSpaceKey <key> [-elementKey <key>] -url <host>
```

Precisa de Node.js 18 ou superior e não tem dependências.

## Configuração por cliente

### Claude desktop / Cowork (Windows)

Em **Settings → Developer → Edit Config** (`%APPDATA%\Claude\claude_desktop_config.json`). Há um exemplo em [`config/claude_desktop_config.example.json`](../config/claude_desktop_config.example.json):

```json
{
  "mcpServers": {
    "outsystems": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:41820/mcp"]
    },
    "servicestudio-open": {
      "command": "node",
      "args": ["C:\\caminho\\para\\tdp-sgpi-claude\\tools\\servicestudio-open-mcp\\server.js"],
      "env": { "SERVICESTUDIO_HOST": "outsystems-dev.turismodeportugal.pt" }
    }
  }
}
```

Depois de alterar, **sair da app por completo** (Quit na barra de tarefas) e voltar a abrir.

### Claude Code

O [`.mcp.json`](../.mcp.json) na raiz do repositório já declara os dois servidores locais. Abrir o Claude Code na pasta do repositório e aprovar os servidores quando for pedido.

## Verificação rápida

1. `servicestudio-open` → `openModule` com a key do `SGPI2_DATAMODEL` (ver [05-service-studio.md](05-service-studio.md)).
2. Esperar 30–60 s (mais em módulos grandes; pode haver diálogos no Service Studio).
3. `outsystems` → `listOpenModules`: o módulo tem de aparecer com `isOpen: true`.

## Problemas conhecidos

| Sintoma | Causa / solução |
|---|---|
| Ferramentas `outsystems__*` não aparecem | O servidor MCP não foi iniciado no Service Studio, ou a app Claude não foi reiniciada depois de editar a config. |
| `createSessionToken` falha com "did not approve" | O pedido de aprovação no Service Studio foi recusado ou não teve resposta. Repetir e aprovar. |
| `getScreenTraditional` dá "Specified cast is not valid" | Acontece em alguns ecrãs (por exemplo `ProjectEdit`, `PromoterEdit_Popup`). Abrir o ecrã no Service Studio à mão ou ler as ações que ele usa. |
| O módulo aparece como `isReference: true` e `isOpen: false` | Ainda está a carregar. Esperar mais e chamar `listOpenModules` outra vez. |
| A app não deixa descarregar o `server.js` pelo chat | É bloqueio do tipo de ficheiro. Usar este repositório (git clone). |
