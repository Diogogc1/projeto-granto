@echo off

cd backend

echo Instalando dependencias necessárias para o backend...

pip install flask
pip install flask_cors
pip install -U spacy
python -m spacy download pt_core_news_sm
pip install PyPDF2

cd ../frontend

echo Instalando dependencias necessárias para o frontend..

npm install

pause
