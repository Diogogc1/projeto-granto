# Projeto Backend com Flask 🐍

Este é um projeto backend construído em Python usando o framework Flask. Ele inclui uma inteligência artificial para análise de documentos, desenvolvida com o SpaCy, e um frontend simples para testes.

## 🗂 Estrutura do Projeto

- **server.py**: Arquivo principal que roda o servidor Flask.
- **main.py**: Contém a inteligência artificial para análise de documentos, utilizando o SpaCy.
- **training/**: Pasta que contém o modelo treinado para os contratos, bem como um arquivo txt que contém as classificações de cada documento de exemplo para usar de exemplos para o modelo, e também os documentos de exemplo em si (toda a parte dos documentos de exemplo deve ser adicionada ao .gitignore quando o projeto vier a ficar público para a Granto).
- **frontend-tests/**: Pasta que contém um frontend simples para testes.

## 🔧 Instruções de Instalação

Caso o script `install.bat` localizado na pasta raiz do projeto não tenha sido executado, siga os passos abaixo para instalar as dependências do backend:

1. **Instale o Flask:**
    ```bash
    pip install flask
    ```

2. **Instale o plugin do Flask para CORS (Cross-Origin Resource Sharing):**
    ```bash
    pip install flask_cors
    ```

3. **Instale o SpaCy:**
    ```bash
    pip install -U spacy
    ```

4. **Baixe o modelo de linguagem do SpaCy:**
    ```bash
    python -m spacy download pt_core_news_sm
    ```
5. **Instale o PyPDF2 para extração de textos de PDFs:**
    ```bash
    pip install PyPDF2
    ```

## 🚀 Executando o Backend

Para rodar o servidor Flask, use o comando abaixo:

```bash
flask --app server run
