import spacy

nlp = spacy.load("pt_core_news_sm")

def return_real_values(text):
    doc = nlp(text)
    real_values = []

    for token in doc:
        if token.text == "R$":
            real_values.append(token.text + " " + doc[token.i + 1].text) 
            
    return real_values


