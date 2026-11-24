# 01 · Contexto do projeto

## Contrato

- **Cliente:** Turismo de Portugal, I.P. (TdP)
- **Fornecedor:** Bool – Software Consulting Portugal
- **Objeto:** desenvolvimento aplicacional e manutenção do **SGPI**, o Sistema de Gestão de Projetos de Investimento, desenvolvido em OutSystems 11 (Traditional Web).
- **Modelo:** uma bolsa de **3.670 horas**, consumida à medida dos pedidos.
- **Kickoff:** 19/11/2026.

## Equipa Bool

| Pessoa | Papel |
|---|---|
| João Nobre | Gestor de projeto |
| João Brito | Programador |
| Tiago Pinto | Analista funcional |

Email da equipa para receber tickets: `equipaturismodeportugal@bool.pt`.

## Interlocutores do TdP

| Pessoa | Papel |
|---|---|
| Rui Veloso | Diretor Coordenador, Direção de Competitividade das Empresas. Gestor de projeto do lado do TdP. **Os pedidos dele têm prioridade.** |
| Celina Ladeiro, Gonçalo Domingos | Direção. Podem enviar tickets. |
| Rui Esteves | Responsável pela área de Tecnologias |
| Ana Sofia Silva | Área financeira e de tecnologia (infraestrutura, desenvolvimento) |
| João Cardoso | Equipa técnica do TdP. Fez a maioria das publicações recentes dos módulos SGPI. |
| Fátima Santos | Apoio à contratação |

## Acordos do kickoff (19/11/2026)

- Há um PDS (ponto de situação) a cada 15 dias com o Rui Veloso, por Google Meet.
- Os pedidos do Rui Veloso têm prioridade.
- Os deploys para PROD fazem-se **a partir das 18h**.
- Os tickets são resolvidos e só depois se pede aprovação. Os de baixo risco podem avançar.
- As correções de dados em Produção são **aprovadas antes**. Depois de feitas, pede-se confirmação a quem abriu o ticket.
- Os novos desenvolvimentos precisam de uma estimativa aprovada antes de começar.
- As novas funcionalidades são anunciadas ao Rui Veloso quando estiverem em TEST.
- A equipa pode usar IA.
- Não há congelamento de alterações em dezembro.

## Reporte

Todos os meses há um relatório de horas, por tarefa e por tipo de atividade: Análise, Desenvolvimento, Testes/QA, Gestão de Projeto, Reuniões, Documentação, Suporte/Correções e Deploy. O relatório mostra também o custo por hora e o valor do contrato que falta consumir. Os ficheiros de registo e de consolidação estão no Google Drive da Bool, na pasta *Turismo de Portugal*.

## Documentação de transição (do prestador anterior)

O Rui Veloso enviou-a por email a 15/11/2026, no assunto *"RE: Email da equipa Bool"*:

- Guia de resolução dos pedidos de suporte (v0.11). O resumo operacional está em [07-playbook-suporte.md](07-playbook-suporte.md).
- Estados do processo (v0.11)
- Arquitetura técnica do SGPI (v0.11)
- Guia de criação de uma nova linha no SGPI
- Pedidos de suporte em aberto

A lista consolidada de tickets por tratar chegou a 19/11/2026, no ficheiro `Lista de Tickets_SGPI_VersãoConsolidada.xlsx`. Os tickets dessa lista têm o prefixo WRD-xxx ou XLS-xxx e já estão no Jira.

> Os documentos originais são do cliente e **não** estão neste repositório. Para os consultar, procurar no Gmail ou no Drive.
