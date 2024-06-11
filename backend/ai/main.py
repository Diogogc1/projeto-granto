import spacy
import os

def return_cnpjs(text):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
    cnpjs = []
    for token in doc:
        if token.text == "CNPJ":
            count = 1
            while (count < 100) & (doc[token.i + count].text not in [":", "n", "nº", "n.", "n.º", "nº."]):
                count += 1
            if(count < 100):
                desired_token = doc[token.i + count + 1]
                if desired_token.text == "\n":
                    desired_token = doc[token.i + count + 2]
                cnpjs.append(token.text + " " + desired_token.text)
    return cnpjs

def return_real_values(text):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
    real_values = []
    for token in doc:
        if token.text == "R$":
            desired_token = doc[token.i + 1]
            real_values.append(token.text + " " + desired_token.text) 
            
    return real_values

def return_cats(text):
    model_path = os.path.abspath("./ai/training/model_contracts")
    nlp = spacy.load(model_path)
    doc = nlp(text)
    return doc.cats


