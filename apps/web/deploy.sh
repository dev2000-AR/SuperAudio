#!/bin/bash

echo "🚀 Iniciando deploy de web2..."

# Configurar ruta del proyecto
PROJECT_DIR="/var/www/html/onn/web2"

echo "📁 Entrando a la carpeta del proyecto: $PROJECT_DIR"
cd "$PROJECT_DIR" || { echo "❌ No se pudo entrar al directorio"; exit 1; }

echo "🔍 Eliminando remote origin si existe..."
git remote remove origin 2>/dev/null

echo "➕ Agregando remote correcto..."
git remote add origin https://github.com/GrupoStarTres/web2.git

echo "🔧 Configurando branch main..."
git branch -M main

echo "📦 Agregando archivos..."
git add .

echo "📝 Creando commit..."
git commit -m "Deploy automático desde servidor" || echo "⚠️ Nada que commitear"

echo "⬆️ Subiendo al repositorio..."
git push -u origin main --force

echo "✅ Deploy completado con éxito."
