# 02 · Fluxo de pedidos

## Como chegam os pedidos

| Origem | Canal | Primeiro registo |
|---|---|---|
| Tickets de suporte (promotores, técnicos, service desk) | Email para `service-desk@turismodeportugal.pt` | OTRS do TdP: <https://it-suporte.turismodeportugal.pt/otrs/index.pl> (não precisa de VPN) |
| User stories e pedidos de desenvolvimento ou correção | Email do Rui Veloso ou de outra pessoa do TdP | OTRS do TdP |
| Cópia para a equipa Bool | `equipaturismodeportugal@bool.pt` / emails para a equipa | **Jira SGPI**, copiado pela equipa |

O Jira da Bool é a fonte de trabalho da equipa: <https://bool-turismodeportugal.atlassian.net/jira/software/projects/SGPI/boards/1/backlog>

## Regra de registo no Jira

Para cada email de ticket, ou cada email do TdP com um pedido de desenvolvimento ou correção:

1. **Ver se já existe no Jira.** Procurar o n.º do ticket OTRS (por exemplo `2026101595000183`), o n.º do processo (`P0xxxxx`), o NIF ou palavras do assunto. O JQL está em [03-jira.md](03-jira.md).
2. **Se não existir, criar a issue** no projeto SGPI e marcá-la como **a precisar de refinamento**: estado `Backlog` e a label de refinamento que a equipa estiver a usar. Sem essa label definida, usar `needs-refinement`.
3. Na descrição, pôr a origem (n.º do ticket OTRS, quem pediu e a data), o pedido original e o n.º do processo.
4. Não duplicar: o mesmo assunto chega muitas vezes por 2 ou 3 canais. Junta-se tudo numa só issue.

## Ciclo de um pedido de suporte (correção de dados)

1. Fazer a triagem com o guia ([07-playbook-suporte.md](07-playbook-suporte.md), secção 0).
2. Identificar o ecrã de administração e o método.
3. Fazer a validação prévia: estado do processo, SICGEST, PDFs já gerados.
4. **Pedir aprovação antes de mexer em PROD.**
5. Corrigir, guardando evidência do antes e do depois (prints) no ticket.
6. Pedir confirmação a quem abriu o ticket e fechar.

## Ciclo de um desenvolvimento

1. Refinar o pedido (análise) e fazer a estimativa.
2. O TdP aprova a estimativa.
3. Desenvolver em DEV. As alterações de código passam por *Compare and Merge*.
4. Passar a TEST e anunciar ao Rui Veloso.
5. Passar a PROD a partir das 18h.
