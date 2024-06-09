@echo off

cd frontend

start cmd /k "npm run dev"

cd ../backend

start cmd /k "flask --app server run"

start msedge http://localhost:3000/