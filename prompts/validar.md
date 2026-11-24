---
description: Validar uma correção ou alteração SGPI no browser e no Service Center e preparar a evidência para o Jira
argument-hint: "SGPI-<n> [antes|depois]"
---

Validação: $ARGUMENTS

Segue `docs/06-validacao-browser.md`. **Não alterar dados.** No browser só se navega e se lê. Se for preciso fazer login, quem faz é o utilizador.

1. **Contexto.** Ler o ticket (`getJiraIssue`) e o plano de resolução, se existir nos comentários. Saber:
   - o ambiente: DEV, TEST ou PROD (os hosts estão em `docs/06`);
   - o processo (`Pxxxxxx`);
   - o ecrã afetado, na área do técnico ou do promotor;
   - o resultado esperado (critérios de aceitação).
2. **Browser.** Abrir o ecrã afetado no ambiente certo, usando o browser que houver na sessão (Claude in Chrome ou o browser da app).
   - **"antes"**: registar o estado atual (texto, valores, estado do processo) e tirar um print.
   - **"depois"**: recarregar o mesmo ecrã, comparar com o resultado esperado e tirar um print. Se a correção mexeu num documento gerado (o PDF do parecer, do PP ou do termo), confirmar que foi gerado de novo e que reflete a alteração.
3. **Service Center** (`https://<host>/ServiceCenter`), no intervalo de tempo da alteração:
   - Monitoring → **Errors**, filtrado pelos módulos `SGPI2_*`;
   - Monitoring → **Integrations**, se a alteração tiver integração (SICGEST, AD&C, MgC, AT/SS);
   - Factory → módulo → **Versions**, se houve publicação: versão, autor e data.
4. **Resultado.** Apresentar:
   - critério de aceitação → cumprido ou não cumprido, com a evidência;
   - erros ou avisos encontrados;
   - uma proposta de comentário para o Jira, com o que foi feito, o estado antes e depois, os prints e a ligação ao Service Center, se houver.

   **Publicar o comentário só com confirmação do utilizador.**
5. Se a validação estiver concluída, **sugerir o próximo passo**: pedir confirmação a quem abriu o ticket, ou, se ainda estiver em TEST, anunciar ao Rui Veloso. Não enviar emails sem confirmação.
