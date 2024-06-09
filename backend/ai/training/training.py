import json
import sys
import os
import random
import spacy

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from utils.txt import read_text_file
from utils.pdf import extract_text_from_pdf
from spacy.training.example import Example

nlp = spacy.load("pt_core_news_sm")

if "textcat_multilabel" not in nlp.pipe_names:
    textcat = nlp.add_pipe("textcat_multilabel", last=True)
else:
    textcat = nlp.get_pipe("textcat_multilabel")

textcat.add_label("trabalho")
textcat.add_label("aluguel")
textcat.add_label("prestacao_servico")
textcat.add_label("venda/compra")
textcat.add_label("confidencialidade")
textcat.add_label("parceria")

train_data = []

lines = read_text_file("./training_data/document_cats.txt")

json_data = {"training_cats": json.loads(lines)}

for item in json_data["training_cats"]:
    text = extract_text_from_pdf("./training_data/documents/" + item["name"] + ".pdf")
    annotations = item["cats"]
    cats_dict = {label: score for label, score in annotations.items()}
    train_data.append((text, {"cats": cats_dict}))  

optimizer = nlp.begin_training()
print("Starting training...")

for i in range(20):
    random.shuffle(train_data)
    for text, annotations in train_data:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        nlp.update([example], drop=0.5)
    print("Iteration sucessful: " + str(i))

print("Training finished. Saving new model.")

nlp.to_disk("model_contracts")

print("New model sucessfully saved.")