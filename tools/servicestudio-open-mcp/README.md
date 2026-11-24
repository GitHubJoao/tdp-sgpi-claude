# servicestudio-open-mcp

Um servidor MCP (stdio) mínimo, sem dependências, com uma única ferramenta: **`openModule`**. Pede ao Service Studio 11 que abra um módulo de um ambiente, tal como o "Open from Environment".

```text
ServiceStudio.exe -downloadAndOpen -eSpaceKey <key> [-elementKey <key>] -url <host>
```

Se o Service Studio já estiver aberto, é essa instância que recebe o pedido.

## Requisitos

- Windows, com o Service Studio 11 instalado
- Node.js 18 ou superior

## Variáveis de ambiente

| Variável | Para que serve |
|---|---|
| `SERVICESTUDIO_EXE` | Caminho para o `ServiceStudio.exe`. Por defeito procura em `C:\Program Files\OutSystems\Service Studio 11\Service Studio\` e em `...\Development Environment 11\...`. |
| `SERVICESTUDIO_HOST` | Host por defeito, por exemplo `outsystems-dev.turismodeportugal.pt` |

## Ferramenta `openModule`

| Parâmetro | Obrigatório | Descrição |
|---|---|---|
| `eSpaceKey` | sim | GUID do módulo. Obtém-se com `searchApps` do MCP oficial. |
| `host` | não | Host do ambiente. Por defeito usa `SERVICESTUDIO_HOST`. |
| `elementKey` | não | Elemento para onde navegar dentro do módulo |

O servidor só aceita GUIDs e hosts válidos, por isso não deixa injetar comandos. A resposta chega logo; o Service Studio demora entre 30 e 60 s a abrir o módulo. Para confirmar, usar `listOpenModules`.

## Testar sem o Service Studio

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
  | SERVICESTUDIO_EXE=/bin/echo node server.js
```
