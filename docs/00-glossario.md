# 00 · Glossário

Termos e siglas que aparecem nos tickets, nos ecrãs e no código do SGPI. Onde está _(a confirmar)_, a expansão ou o sentido exato ainda não foi validado com o TdP. Se souberes, corrige e regista no `CHANGELOG.md`.

## Processo e decisão

| Termo | Significado |
|---|---|
| **Processo / candidatura** | Pedido de apoio de um promotor. Tem um código `Pxxxxxx`, o `PROJECT.Code`. |
| **Linha / medida** | Programa de apoio, por exemplo Linha Crescer Turismo, LAQO, Microcrédito Interior, Portugal Events ou Tesouraria COVID. No código: `S_MEASURE`, `S_LINE_BY_MEASURE`. |
| **Promotor** | Entidade beneficiária. No SGPI, cada promotor é também um utilizador (`PROMOTER.Id` = utilizador). |
| **Técnico gestor** | Técnico do TdP que analisa e acompanha o processo |
| **Apoio jurídico** | Técnico que trata da contratação. É ele que passa o processo para execução. |
| **Diretor** | Dá o parecer e o despacho do diretor sobre a análise e sobre os PP |
| **CD** | Conselho Diretivo do TdP. A *deliberação do CD* é a decisão final. |
| **CC / Conselho de Crédito** | Órgão que despacha pedidos de pagamento. Tem um portal próprio (Portal do Conselho de Crédito). |
| **VCD** | Campo de parecer na análise (`VcdFeedback`) _(a confirmar)_ |
| **Parecer / despacho / deliberação** | Textos de decisão do técnico, do diretor e do CD. No código: `*FeedbackText`. |
| **Elegível / Não elegível** | Resultado da análise de elegibilidade. "Não elegível" é um estado final. |
| **Audiência prévia (art. 121.º CPA)** | Notificação ao promotor antes de uma decisão desfavorável, com 10 dias úteis para responder |
| **Requerimento** | Pedido formal do promotor, por exemplo desistência ou prorrogação (`ADD_REQUEST_RESPONSE`) |

## Contratação

| Termo | Significado |
|---|---|
| **Termo de aceitação / contrato** | Documento assinado pelo promotor depois da decisão de aprovação |
| **Minuta** | Modelo do termo para cada linha. Está no `SGPI2_HIRING` (`<Linha>_ContractDraft`). |
| **Representante / fiador** | Pessoas que outorgam o termo (`HIRING_REPRESENTATIVE`, `HIRING_GUARANTOR`) |

## Execução e pagamentos

| Termo | Significado |
|---|---|
| **PP** | Pedido de pagamento (`EXECUTION_PAYMENT_REQUEST`) |
| **Adiantamento / intercalar / final** | Tipos de PP (`S_EXECUTION_PAYMENT_REQUEST_TYPE`). O intercalar tem um teto de 90 ou 95 %, conforme a linha. |
| **Tranche** | Parcela de pagamento do incentivo |
| **INR / IR** | Incentivo não reembolsável / incentivo reembolsável. Quando o INR se esgota, o restante passa para IR. |
| **ESB** | Equivalente de subvenção bruta. Depende da data do 1.º pagamento. |
| **OP / OD** | Ordem de pagamento / ordem de devolução |
| **Despesa / quitação** | Fatura e o respetivo comprovativo de pagamento (`EXECUTION_EXPENSE`) |
| **PTA / PTRI / PTRF** | Códigos PT2020 dos tipos de PP (`S_EXECUTION_PAYMENT_REQUEST_TYPE.Type_2020`): **PTA** = adiantamentos (simples, contra garantia, com isenção de garantia, contra contrato/TA); **PTRI** = pagamento intercalar; **PTRF** = pagamento final e correção ao encerramento. **D** = devoluções. |
| **ROC / TOC** | Revisor oficial de contas / técnico oficial de contas. Certificam as despesas. |
| **Vistoria** | Verificação no local, na fase de execução (`INSPECTION`) |
| **Encerramento** | Fecho do processo depois do PP final |
| **Prémio de desempenho** | Conversão de parte do incentivo reembolsável em não reembolsável, quando há cumprimento de metas (QREN, PT2020, LAQO, Tesouraria COVID) |

## Integrações e sistemas externos

| Termo | Significado |
|---|---|
| **SICGEST** | Sistema financeiro e contabilístico do TdP para onde seguem os contratos e os pagamentos. Se um PP já foi para o SICGEST, a proposta tem de ser anulada lá primeiro. |
| **MgC** | Sistema que recebe os prémios e as ordens de devolução e tem os planos de reembolso _(expansão a confirmar)_ |
| **AD&C** | Agência para o Desenvolvimento e Coesão. O registo de *minimis* é feito no **SIRCAminimis**. |
| **Minimis** | Auxílios de *minimis*: os apoios a cada empresa têm um limite e têm de ser registados |
| **IAPMEI** | Certificação PME, que define a dimensão da empresa |
| **AT / SS** | Autoridade Tributária / Segurança Social: consulta online da situação contributiva |
| **Q2 / Q3** | Sistemas documentais e de distribuição do TdP (`Q2ProcessKey`, "distribuição no Q3") _(a confirmar)_ |
| **OTRS** | Sistema de tickets do service desk do TdP |

## Identificadores e registos

| Sigla | Significado |
|---|---|
| **NIF / NISS** | Número de identificação fiscal / número de identificação da Segurança Social |
| **CAE** | Classificação Portuguesa de Atividades Económicas, nas revisões 3 e 4 |
| **RNT** | Registo Nacional de Turismo |
| **RCBE** | Registo Central do Beneficiário Efetivo |
| **ENI** | Empresário em nome individual |
| **IES** | Informação Empresarial Simplificada |
| **EEC** | Estratégia de eficiência coletiva. Afeta a taxa de incentivo. |

## Quadros e programas

| Termo | Significado |
|---|---|
| **QREN / PT2020 / PT2030** | Quadros de fundos europeus 2007–13, 2014–20 e 2021–27 |
| **LAQO** | Linha de Apoio à Qualificação da Oferta. Tem edições 2018, 2021 e 2024, formulário de sustentabilidade e protocolo bancário. |
| **Protocolo Bancário (PB)** | Linhas operadas através de bancos. Têm um motor de estados próprio. |
| **FIT 2.0** | Programas de Aceleração e de Inovação Aberta _(expansão a confirmar)_ |
| **Operação conjunta** | Projeto com vários promotores (`I_PROJECT_PROMOTER`). Cada um tem o seu regime de IVA. |

## Projeto e ferramentas

| Termo | Significado |
|---|---|
| **DEV / TEST / PROD** | Ambientes OutSystems. **Só se desenvolve em DEV.** |
| **Service Center** | Consola de cada ambiente: logs, módulos, timers, integrações |
| **Bolsa de horas** | O modelo do contrato: 3.670 horas, consumidas à medida dos pedidos |
| **PDS** | Ponto de situação quinzenal com o Rui Veloso |
| **WRD-xxx / XLS-xxx** | Referências dos tickets na lista consolidada do Rui (19/11/2026) |
| **Onda 1** | Primeira vaga de correções simples (label `onda1-simples`) |
