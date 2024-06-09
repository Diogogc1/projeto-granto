import spacy
import os

def return_real_values(text):
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(text)
    real_values = []

    for token in doc:
        if token.text == "R$":
            real_values.append(token.text + " " + doc[token.i + 1].text) 
            
    return real_values

def return_cats(text):
    model_path = os.path.abspath("./ai/training/model_contracts")
    nlp = spacy.load(model_path)
    doc = nlp(text)
    return doc.cats


