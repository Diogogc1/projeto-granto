import re
import spacy
import os
from datetime import timedelta
from dateutil.parser import parse
from dateutil.relativedelta import relativedelta

# Iniciando as variáveis do NLP e do DOC (texto processado pela IA)
nlp = None
doc = ""

# Iniciando as variáveis do nosso NLP e do caminho do nosso modelo customizado (usado para a parte de classificação de texto da IA)
custom_nlp = None
custom_model_path = os.path.abspath("./ai/training/model_contracts")

# Carregando o modelo da IA. Ele é carregado ao server do backend ser ligado no arquivo 'server.py'
def load_model():
    global nlp
    nlp = spacy.load("pt_core_news_sm")
    
# Carregando o nosso modelo customizado que é treinado para classificar o texto. Ele pode ser encontrado no diretório /training
def load_custom_model():
    global custom_nlp
    custom_nlp = spacy.load(custom_model_path)

# Processando o texto para ser transformado em documento. Ele é feito sempre que um novo arquivo é enviado para a IA processar. É feito apenas uma vez para evitar múltiplos processamentos do mesmo texto, que
# embora seja funcional, diminui o desempenho e o tempo necessário para o usuário aguardar. É melhor já processar apenas uma vez e usá-lo em todas as funções necessárias
def load_doc(text):
    global doc
    doc = nlp(text)

# Função para validar regex, recebe a informação e verifica se o regex se encaixa nela
def validate_info(info, regex):
    return re.match(regex, info) is not None

# Função para retornar as empresas do texto, atualmente utiliza o próprio modelo PT-BR da Spacy para pegar as entidades do tipo "ORG" (empresa) no texto
def return_orgs():
    orgs = []
    for token in doc:
        if token.ent_type_ == "ORG":
            orgs.append(token.text)
    orgs = list(set(orgs))
    return orgs

def extract_dates(text):
    doc = nlp(text)
    
    # Capturar datas com SpaCy
    context_dates = [ent.text for ent in doc.ents if ent.label_ == "DATE"]
    
    # Regex para datas no formato dd/mm/yyyy
    date_pattern = re.compile(r'\b\d{2}/\d{2}/\d{4}\b')
    regex_dates = date_pattern.findall(text)
    
    # Regex para datas no formato '21 de junho de 2024'
    extended_date_pattern = re.compile(r'\b\d{1,2} de \w+ de \d{4}\b')
    extended_regex_dates = extended_date_pattern.findall(text)
    
    return context_dates + regex_dates + extended_regex_dates

def calculate_relative_dates(text):
    # Regex para durações relativas
    relative_patterns = [
        r'(\d+)\s*\(\w+\)\s+(meses|dias|anos)\s+contados\s+a\s+partir\s+de\s+(\d{2}/\d{2}/\d{4})',
        r'(\d+)\s+(meses|dias|anos)\s+de\s+duração\s+a\s+partir\s+de\s+(\d{2}/\d{2}/\d{4})',
        r'validade\s+de\s+(\d+)\s+(meses|dias|anos)\s+iniciando-se\s+em\s+(\d{2}/\d{2}/\d{4})',
        r'execução\s+do\s+contrato\s+por\s+(\d+)\s+(meses|dias|anos),?\s+começando\s+em\s+(\d{2}/\d{2}/\d{4})',
        r'válido\s+por\s+(\d+)\s+(meses|dias|anos)\s+a\s+partir\s+de\s+(\d{2}/\d{2}/\d{4})'
    ]
    
    # Testando os regex
    for pattern in relative_patterns:
        relative_pattern = re.compile(pattern)
        relative_matches = relative_pattern.findall(text)
        
        if relative_matches:
            for match in relative_matches:
                value, unit, start_date_str = match
                value = int(value)
                
                try:
                    start_date = parse(start_date_str, dayfirst=False) 
                except ValueError:
                    continue
                
                if unit == 'meses':
                    final_date = start_date + relativedelta(months=value)
                elif unit == 'dias':
                    final_date = start_date + timedelta(days=value)
                elif unit == 'anos':
                    final_date = start_date + relativedelta(years=value)
                else:
                    continue
                
                return final_date.strftime('%d/%m/%Y')
    
    return None

def return_validity(text):
    # Calcular data relativa se houver
    relative_date = calculate_relative_dates(text)
    
    if relative_date:
        return relative_date
    
    # Extrair todas as datas
    all_dates = extract_dates(text)
    
    if not all_dates:
        return "Nenhuma data encontrada"
    
    # Tentar parsear as datas
    parsed_dates = []
    for date_str in all_dates:
        try:
            parsed_date = parse(date_str, fuzzy=True, dayfirst=True)
            parsed_dates.append(parsed_date)
        except (ValueError, TypeError):
            continue
    
    if not parsed_dates:
        return "Nenhuma data válida encontrada"
    
    # Se não houver data relativa, retornar a primeira data encontrada
    return parsed_dates[0].strftime('%d/%m/%Y')

# Função para retornar os CNPJs do texto. Se o modo 'preciso/exato' estiver ativado, será utilizado REGEX para verificar se o CNPJ está nos padrões
def return_cnpjs(mode):
    cnpjs = []
    for token in doc:
        if token.text == "CNPJ":
            count = 1
            while (count < 100) and (doc[token.i + count].text not in [":", "n", "nº", "n.", "n.º", "nº."]):
                count += 1
            if count < 100:
                desired_token = doc[token.i + count + 1]
                if desired_token.text == "\n":
                    desired_token = doc[token.i + count + 2]
                valid_cnpj = True
                if mode == "exact":
                    valid_cnpj = validate_info(desired_token.text, r"([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")
                if valid_cnpj:
                    cnpjs.append(token.text + " " + desired_token.text)
    return cnpjs

# Função para retornar valores reais no texto. Se o modo 'preciso/exato' estiver ativado, será utilizado REGEX para verificar se o valor real está nos padrões 
def return_real_values(mode):
    real_values = []
    for token in doc:
        if token.text == "R$":
            desired_token = doc[token.i + 1]
            valid_real_value = True
            if mode == "exact":
                valid_real_value = validate_info(desired_token.text, r"^(([1-9]\d{0,2}(\.\d{3})*)|(([1-9]\.\d*)?\d))(\,\d\d)?$")
            if valid_real_value:
                real_values.append(token.text + " " + desired_token.text)
    return real_values

# Função que retorna as classificações do texto, como um objeto. Ela utiliza o nosso modelo customizado para classificações
def return_cats(text):
    model_path = os.path.abspath("./ai/training/model_contracts")
    cats_nlp = spacy.load(model_path)
    cats_doc = cats_nlp(text)
    return cats_doc.cats
