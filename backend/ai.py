import spacy

nlp = spacy.load("pt_core_news_sm")

text = ("""CONTRATO N. XXX/SEHAB/2023
PROCESSO ELETRÔNICO SEI N. 6014.2022/0003235-8
CONTRATANTE: SECRETARIA MUNICIPAL DE HABITAÇÃO - SEHAB
CONTRATADA: FULANA
OBJETO: CONTRATAÇÃO DE EMPRESA ESPECIALIZADA PARA A REFORMA E MELHORIA DO SISTEMA DE GÁS, DO
SISTEMA DE PROTEÇÃO CONTRA DESCARGAS ATMOSFÉRICAS (SPDA) E DE COMBATE AO INCÊNDIO, PARA
OBTENÇÃO DO AUTO DE VISTORIA DO CORPO DE BOMBEIROS (AVCB) DO CONJUNTO HABITACIONA CHÁCARA
BELA VISTA.
VALOR: R$ XXXXXX (POR EXTENSO) na data-base de XXX/2023 (sem desoneração).
Pelo presente instrumento, de um lado a Secretaria Municipal de Habitação – SEHAB, inscrita no CNPJ n.
46.392.106/0001-89, neste ato representada pelo Sr. Milton Vieira Pinto, Secretário Municipal da Habitação, no uso
das atribuições que lhe são conferidas por lei, doravante denominada CONTRANTE, e, de outro lado, a empresa
FULANA, inscrita no CNPJ/MF sob n. XXXXXXXXXXXXXX, sediada na Rua XXXXXXXX, n. XXX, neste ato representada pelo Sr. Beltrano, cargo, portador do RG n. XXXXXXXXX, e inscrito no CPF/MF n. XXXXXXXXXX, doravante designada CONTRATADA, lavram o presente contrato para a execução do objeto em epígrafe, conforme despacho SEI n.
XXXXX, observadas, nos termos do art. 191 da Lei Federal n. 14.133/2021, alterada pela Medida Provisória n.
1167/2023, as normas da Lei Federal n. 8.666/1993, da Lei Municipal n. 13.278/2002, da Lei Municipal n.
14.145/2006, do Decreto Municipal n. 47.014/2006, do Decreto Municipal n. 54.873/2014, do Decreto Municipal n.
62.100/2022, alterada pelo Decreto Municipal n. 62.436/2023, e de demais normas aplicáveis à espécie, do Edital
de Concorrência n. XXX/SEHAB/2023, bem como da proposta da adjudicatária (doc. SEI n. XXXXXXX) e de conformidade com as seguintes cláusulas: O valor global do presente contrato é de R$ X.XXX.XXX,XX (POR EXTENSO), na data-base de XXXX/2023 (sem
desoneração), conforme proposta comercial juntada no documento SEI n. XXXXXXX.
3.2. Para o exercício de 2023, as despesas correspondentes, conforme fixadas no Cronograma Físico-Financeiro n.
XXXXX, onerarão a dotação orçamentária n. XXXXXXXXXXXXXXXXXXXXXXX, suportadas pela Nota de Empenho n.
XXXXX, no valor de R$ XX.XXX.XXX,XX (XXXXXXXX).
3.3. Da composição de preços. A CONTRATADA declara expressamente que o valor previsto nesta cláusula abrange
todos os custos diretos e indiretos relativos à execução do objeto deste contrato; e eventuais alterações de projeto
deverão ser ajustadas na forma da lei. Incluem-se, portanto, as despesas de mão de obra e adequações necessárias, remunerações, ensaios requisitados pela Unidade Fiscalizadora (SEHAB/OBRA); todos os materiais e demais
componentes a serem utilizados, conforme previsto no projeto e nos programas de qualidades referidos neste
contrato; transportes, fretes, elaboração e/ou complementação de projetos executivos, bem como todos os encargos sociais, trabalhistas, securitários, tributários, previdenciários e outros decorrentes ou que venham a ser devidos em razão do objeto ora contratado, despesas indiretas decorrentes de prorrogações de prazo de execução e
alterações de cronogramas físico-financeiros. Ademais, fica certo e ajustado que não caberão à CONTRATANTE
quaisquer outros custos adicionais, diretos ou indiretos""")

doc = nlp(text)


def return_real_values():
    real_values = []

    for token in doc:
        if token.text == "R$":
            real_values.append(token.text + " " + doc[token.i + 1].text) 
            
    return real_values


