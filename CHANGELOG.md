# Changelog

## 2026-11-24 (4)

- `docs/templates/`: comentário de resolução no Jira e emails de pedido de aprovação, de confirmação e fecho e de anúncio em TEST.
- Segurança: GitHub Action gitleaks (`setup/github/workflows/gitleaks.yml`), `.gitleaks.toml` (exceção para as eSpaceKeys) e `CODEOWNERS`.
- `setup/instalar.cmd`: copia `prompts/` para `.claude/commands/` e `setup/github/` para `.github/`.

## 2026-11-24 (3)

- `docs/00-glossario.md`: siglas e termos.
- `docs/09-modelo-de-dados.md`: entidades principais extraídas do `SGPI2_DATAMODEL` em DEV, só de leitura. Inclui as regras de eliminação de um PP (Protect e cascatas).
- `prompts/`: fluxos `registar-pedido`, `resolver-suporte` e `validar`, que também servem como comandos do Claude Code.
- Playbook: os campos SICGEST estão na análise do PP; aviso sobre o `CurrentAnalysisId` e as cascatas ao eliminar; `PROMOTER.Id` = utilizador (SGPI-49).

## 2026-11-24 (2)

- Regra: o desenvolvimento é feito sempre em DEV; TEST e PROD só por promoção a partir de DEV (`CLAUDE.md`, `docs/02`, `05`, `06`).

## 2026-11-24

- Criação do repositório: `CLAUDE.md`, `docs/01`–`08`, servidor `servicestudio-open-mcp` e exemplos de configuração.
- Notas verificadas no código: `PaymentRequestsEdit` (Delete), `AnalysisExecPPFeedbackTextEdit` (é preciso `IsDirector=True` para o parecer do diretor) e `PromoterInfo`.
- Triagem inicial dos 39 tickets abertos no Jira SGPI.
- Por confirmar: os hosts de TEST e PROD; os ecrãs `ProjectEdit` e `PromoterEdit_Popup`; o módulo `SGPI2_SURVEY`.
