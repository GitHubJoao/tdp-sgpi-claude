# 05 · Service Studio: módulos SGPI

**Ambiente de desenvolvimento:** `outsystems-dev.turismodeportugal.pt`. O ambiente tem 229 aplicações e cerca de 527 módulos.

## Módulos da aplicação SGPI (todos Traditional Web)

| Módulo | Key (eSpaceKey) | Conteúdo |
|---|---|---|
| SGPI2_DATAMODEL | `d2f37d9c-91d1-4bd9-b7f0-ec6983127095` | Entidades, estáticas, serviços expostos (por exemplo para o SICGEST) |
| SGPI2_BUSINESSLAYER | `5a255460-6630-406f-b0ab-6f8d2270b152` | Lógica de negócio, regras de despesas, contratos |
| SGPI2_ADMINISTRATION | `9cddc592-8843-4c43-8f00-5c9a17238c3f` | **Ecrãs de administração e de correção de dados** (fluxos `Tests`, `Execution`, `Administracao`, `Backoffice`) |
| SGPI2_ANALYSIS | `39593be6-c953-44b5-8cf0-d9c02c3681df` | Análise técnica, pareceres, prémios (AwardCD, AwardClosure) |
| SGPI2_HIRING | `d45b7415-60a0-42aa-832a-546429c0e0ee` | Contratação, minutas (`<Linha>_ContractDraft`) |
| SGPI2_EXECUTION | `405b78ca-16d3-46c1-a59c-d67debef6aab` | Execução, pedidos de pagamento |
| SGPI2_PROMOTER | `ae26a8a7-df5a-48f0-863c-70919a4a7de8` | Área do promotor |
| SGPI2_SURVEY | `0d79ede1-8015-43a0-9f6a-b2e0199cc3bf` | Formulários de sustentabilidade LAQO, prémios de desempenho |
| SGPI2_INTEGRATION | `0e94864c-19da-48c7-a2c3-b1b40cb2f67e` | Integrações: SICGEST, SIRCAminimis/AD&C, AT/SS, MgC, IAPMEI |
| SGPI2_REPORTS | `dca2c09a-d4d5-4cc2-8dd9-a39ab3e91337` | Relatórios e listagens |
| SGPI2_PRESENTATION | `5bee2955-e596-4142-b849-78f8a0c1315b` | Tema e layout |

Se uma key mudar ou faltar um módulo, procurar com `searchApps` e `{ "application": "SGPI" }`.

## Como trabalhar

1. `servicestudio-open.openModule({ eSpaceKey })` para abrir. Também se pode passar `elementKey` para ir diretamente a uma action ou a um ecrã.
2. `outsystems.listOpenModules` até o módulo aparecer com `isOpen: true`.
3. Ler o módulo com:
   - `getScreenNamesTraditional` / `getScreenTraditional`. São os ecrãs Traditional: **não** usar `getScreen` nem `getScreenNames`.
   - `getActionNames` (`server`) / `getServerAction`
   - `getDataModel` (no `SGPI2_DATAMODEL`). A resposta é grande.
   - `runQuery`, só para leitura e só com pedido explícito. Atenção ao ambiente.
4. As respostas grandes são gravadas em ficheiro. Para encontrar `CreateScreenAction`, `SetVariable`, entidades e atributos, extrair com `grep` ou `python`.

## Regras de edição

- **Só com pedido explícito.** Por defeito, as sessões são de leitura.
- `startOmlEditSession` → `applyModelApiCode` (várias vezes) → `omlMerge`. O developer revê em *Compare and Merge*.
- Nunca usar `omlPublish` sem ordem expressa. Nunca publicar em PROD a partir do agente.
- Antes de reiniciar o Service Studio, recuperar o trabalho que ainda não foi feito merge: o arranque limpa a pasta `%TEMP%\ServiceStudio.MCPServer`.
- As alterações feitas à mão no Service Studio durante uma cadeia de edições **não são vistas** pelo agente. Para voltar a sincronizar, usar `omlReset` ou `omlMerge`.

## Notas técnicas verificadas

As notas por ecrã estão em [07-playbook-suporte.md](07-playbook-suporte.md#notas-verificadas-no-código).
