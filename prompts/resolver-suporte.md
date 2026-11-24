---
description: Preparar a resolução de um ticket de suporte SGPI (triagem, ecrã, validação prévia, plano) sem alterar nada
argument-hint: "SGPI-<n>"
---

Ticket: $ARGUMENTS

**Modo só de leitura.** Não alterar dados, código nem o ticket. O resultado é um plano para o developer executar.

1. **Ler o ticket** com `getJiraIssue`, `view: "evidence"`, e os comentários. Anotar o n.º do processo, o NIF, o ticket OTRS, o pedido e os critérios de aceitação.
2. **Fazer a triagem** com a secção 0 de `docs/07-playbook-suporte.md`. Pode ser comportamento esperado? É uma questão de negócio? É um duplicado?
3. **Identificar o tipo** (secções 1–14 do playbook), o ecrã de administração e o método. Ver as *Notas verificadas no código* e `docs/09-modelo-de-dados.md`, sobretudo as regras de eliminação.
4. **Verificar no código, em DEV e só a ler**, o que ainda não estiver nas notas verificadas:
   - abrir o módulo com `servicestudio-open.openModule` (keys em `docs/05-service-studio.md`);
   - esperar que o `listOpenModules` o mostre com `isOpen: true`;
   - ler o ecrã com `getScreenTraditional` e as ações que ele chama;
   - confirmar quais as entidades e atributos que mudam e que efeitos secundários têm (cascatas, PDFs, SICGEST, histórico, notificações).
5. **Escrever o plano** em português:
   - **Tipo e método** (secção do playbook)
   - **Validação prévia**, com as verificações concretas a fazer antes de mexer (por exemplo: os campos SICGEST da análise estão vazios? há documentos ou mensagens ligados?)
   - **Passos**: ecrã, campo e valor, por ordem
   - **Riscos e efeitos secundários**
   - **Evidência a recolher**: prints antes e depois e o que gerar de novo
   - **Aprovação**: precisa de aprovação antes de PROD? A quem pedir?
   - **Estimativa** de esforço
6. Se aprendeste algo novo e durável (um ecrã, um campo, uma armadilha), **propor** a atualização das *Notas verificadas* em `docs/07-playbook-suporte.md` e do `CHANGELOG.md`. Fazer a alteração só se o utilizador pedir.
