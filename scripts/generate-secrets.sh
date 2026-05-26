#!/bin/bash

# Script para generar variables de entorno seguras para Vercel

echo "🔐 Generando variables de entorno seguras..."
echo ""

echo "JWT_SECRET=$(openssl rand -base64 32)"
echo "JWT_REFRESH_SECRET=$(openssl rand -base64 32)"
echo ""
echo "⚠️  Copia estas variables a Vercel Settings → Environment Variables"
echo "📎 Guarda en lugar seguro, las necesitarás para el deploy"
