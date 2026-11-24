# Modelo: comentário de resolução no Jira

Usar no ticket quando a correção estiver feita, antes de pedir confirmação a quem o abriu. Substituir o que está entre `< >` e apagar as linhas que não se aplicam.

---

**Resolução: <SGPI-n> · <processo Pxxxxxx>**

**Ambiente:** <DEV | TEST | PROD> · **Data/hora:** <dd/mm/aaaa hh:mm> · **Executado por:** <nome>
**Aprovação** (obrigatória para correções de dados em PROD): <quem aprovou, por que canal, data>

**Tipo:** <secção do playbook, por exemplo "1. Pedidos de pagamento: eliminar">

**Validação prévia**

- [ ] <ex.: análise do PP sem envio para o SICGEST (`SentToSicGestIn`, `SicGest_DecisionDate` e `SicGest_PayedIn` vazios)>
- [ ] <ex.: sem documentos nem mensagens ligados ao PP>
- [ ] <ex.: PP ainda não despachado no Portal do Conselho de Crédito>

**O que foi feito**

1. <ecrã> → <campo/ação> → <valor antes> → <valor depois>
2. <…>

**Estado antes / depois**

| | Antes | Depois |
|---|---|---|
| <estado do processo / PP> | <…> | <…> |
| <campo alterado> | <…> | <…> |

**Efeitos secundários**: <ex.: despesas apagadas em cascata (n.º); PDF regenerado; nada a fazer no SICGEST>

**Evidência**: prints antes e depois em anexo; <PDF gerado de novo, se aplicável>; Service Center sem erros dos módulos `SGPI2_*` no intervalo <hh:mm–hh:mm>.

**Próximo passo**: pedir confirmação a <quem abriu o ticket> e fechar depois da resposta.
