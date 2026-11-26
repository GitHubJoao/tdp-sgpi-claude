# 06 · Validar no browser: aplicação e Service Center

Usar o browser que estiver disponível na sessão: Claude in Chrome (o Chrome do utilizador, já autenticado) ou o browser da app Claude. **Não fazer login com credenciais escritas no chat.** Se for preciso autenticar, o utilizador faz o login ele próprio no browser.

## Ambientes

| Ambiente | Host | Notas |
|---|---|---|
| DEV | `outsystems-dev.turismodeportugal.pt` | **Único ambiente onde se desenvolve.** É o do Service Studio. |
| TEST | _a confirmar_ | É aqui que as novidades se anunciam ao Rui Veloso. |
| PROD | _a confirmar_ | Correções de dados só com aprovação. Deploys a partir das 18h. |

> Quando se souberem os hosts de TEST e PROD, atualizar esta tabela (e o `CHANGELOG.md`).

## Abrir ecrãs da aplicação (Traditional Web)

Formato: `https://<host>/<Módulo>/<Ecrã>.aspx?<parâmetros>`

Exemplos em DEV:

- Administração: `https://outsystems-dev.turismodeportugal.pt/SGPI2_ADMINISTRATION/`
- Pedidos de pagamento (correção): `https://outsystems-dev.turismodeportugal.pt/SGPI2_ADMINISTRATION/PaymentRequestsEdit.aspx`
- Lista de promotores: `https://outsystems-dev.turismodeportugal.pt/SGPI2_ADMINISTRATION/PromoterInfo.aspx`

Os ecrãs de administração verificam o privilégio `SGPI2_DATAMODEL.GeneralAdmin`. Quem não o tiver é enviado para `p_NoPermission`.

Para chegar a um ecrã que recebe Ids (por exemplo `AnalysisExecPPFeedbackTextEdit`), entrar a partir da lista que o chama (`AnalysisPRFeedbacks`) e não escrever o URL com Ids à mão.

## Service Center

`https://<host>/ServiceCenter`

| Para | Onde |
|---|---|
| Erros de um ecrã ou de uma ação | Monitoring → **Errors** (filtrar por módulo `SGPI2_*` e por hora) |
| Chamadas a SICGEST, AD&C (SIRCAminimis), MgC, AT/SS | Monitoring → **Integrations** |
| Timers (por exemplo o registo automático de minimis) | Monitoring → **Timers**; Factory → módulo → Timers |
| Versão publicada de um módulo e quem a publicou | Factory → **Modules** → `SGPI2_*` → Versions |
| Variáveis de configuração (site properties) | Factory → módulo → **Site Properties** |

## O que os logs mostram (e o que não mostram)

- **Validações de negócio não ficam nos logs.** As mensagens mostradas com `Feedback_Message` (por exemplo o «!» do parecer, ou *«Só pode submeter…»*) não deixam registo. Se o Error Log estiver limpo, a causa é quase sempre uma destas validações. Nesse caso, ver o estado e os dados do processo.
- **Só há registo nas exceções:** handlers `AllExceptions` com `LogError = True`. Nestes casos o utilizador vê a mensagem genérica (`Site.ErrorMessage`).
- **Ruído habitual, que se pode ignorar:**
  - `… role required` em GET sem utilizador (o `CheckPermissions` normal);
  - `A POST was made without executing any action!`: submissões a partir de uma página desatualizada (botão "voltar" ou vários separadores). A ação não chega a correr.

## Validar uma correção

1. **Antes:** tirar um print do ecrã afetado (área do técnico ou do promotor) e guardá-lo no ticket.
2. Fazer a correção, com aprovação se for em PROD.
3. **Depois:** recarregar o mesmo ecrã e tirar outro print. Se a correção mexeu num documento gerado (por exemplo o PDF do parecer ou do termo), gerá-lo de novo e confirmar.
4. No Service Center, confirmar que não há erros novos do módulo nesse intervalo e, se houver integração, que o envio foi feito.
5. Anexar os prints ao Jira e pedir confirmação a quem abriu o ticket.
