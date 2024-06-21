import re
import spacy
import os

def validate_info(info, regex):
    return re.match(regex, info) is not None

def return_orgs(text):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
    orgs = []
    for token in doc:
        if token.ent_type_ == "ORG":
            orgs.append(token.text)
    orgs = list(set(orgs))
    return orgs

def return_validity(text):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
    context_dates = [ent.text for ent in doc.ents if ent.label_ == "DATE"]
    date_pattern = re.compile(r'\b\d{2}/\d{2}/\d{4}\b')
    regex_dates = date_pattern.findall(text)
    all_dates = context_dates + regex_dates
    return all_dates

def return_cnpjs(text, mode):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
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

def return_real_values(text, mode):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
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

def return_cats(text):
    model_path = os.path.abspath("./ai/training/model_contracts")
    nlp = spacy.load(model_path)
    doc = nlp(text)
    return doc.cats
