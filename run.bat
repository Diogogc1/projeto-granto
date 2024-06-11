@echo off

echo Testeeee

cd frontend

start cmd /k "npm start"

cd ../backend

start cmd /k "flask --app server run"

start msedge http://localhost:3000/