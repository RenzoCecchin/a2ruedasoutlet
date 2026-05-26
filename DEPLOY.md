# 🚀 Deploy a Vercel - A2 Ruedas Outlet

## Paso 1: Push a GitHub
```bash
git push origin main
```

## Paso 2: Variables de Entorno en Vercel
En el dashboard de Vercel, agrega estas variables en "Settings → Environment Variables":

```
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/a2ruedas_db
JWT_SECRET=<generar con: openssl rand -base64 32>
JWT_REFRESH_SECRET=<generar con: openssl rand -base64 32>
SENDGRID_API_KEY=SG.xxxx (opcional para dev)
EMAIL_FROM=noreply@a2ruedas.com
EMAIL_FROM_NAME=A2 Ruedas Outlet
FRONTEND_URL=https://a2ruedas-outlet.vercel.app
NODE_ENV=production
ML_APP_ID=6903992046026037
ML_CLIENT_SECRET=pPyYRkovAZEg2xAYN6rYxCR2y28UrNcf
ADMIN_EMAIL=Mica@motos.com
ADMIN_PASSWORD=<cambiar en producción>
ADMIN_NAME=Mica Admin
```

## Paso 3: Conectar GitHub a Vercel
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en "Add New" → "Project"
3. Conecta repositorio GitHub: `RenzoCecchin/a2ruedasoutlet`
4. Elige main branch
5. Framework: "Other" (somos custom)
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Agrega env variables (Paso 2)
9. Click "Deploy"

## Paso 4: MongoDB Atlas Setup (si aún no exists)
1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea cluster FREE tier
3. Crea user: `a2ruedas` con password segura
4. IP Whitelist: Agrega `0.0.0.0/0` (o específica IP de Vercel)
5. Copia connection string y úsala en MONGODB_URI

## Paso 5: SendGrid (opcional)
- Gratis: 100 emails/día
- Ve a [sendgrid.com](https://sendgrid.com)
- Crea API key
- Verifica sender email

## ✅ Post-Deploy Checklist
- [ ] Backend responds: `https://a2ruedas-outlet.vercel.app/api`
- [ ] Database connected: revisa logs de Vercel
- [ ] Auth endpoints working: `/api/auth/register`, `/api/auth/login`
- [ ] Frontend loads at home
- [ ] Email verification works (si SendGrid está setup)
- [ ] Database migration corrida: `npm run migrate-users`

## 🔍 Debugging en Vercel
```bash
# Ver logs
vercel logs <project-name>

# Redeploy
vercel deploy --prod

# Env vars
vercel env ls
```

## 💡 Tips Importantes
- **JWT_SECRET**: Genera 32+ caracteres random, guarda en lugar seguro
- **MONGO**: 0.0.0.0 ip whitelist solo para dev, cambia en producción
- **CORS**: Frontend URL debe estar en FRONTEND_URL env var
- **Rate Limiting**: 5 intentos fallidos = 15 min lock
- **Email Verification**: Obligatoria, usuario no puede login sin verificar

## 🎯 URLs Después de Deploy
- Frontend: `https://a2ruedas-outlet.vercel.app`
- Backend API: `https://a2ruedas-outlet.vercel.app/api`
- Health Check: `https://a2ruedas-outlet.vercel.app/`

## ⚠️ Cambios Necesarios
### Frontend (.env)
```
VITE_API_URL=https://a2ruedas-outlet.vercel.app/api
```

### Credenciales Importantes
- NO commitear `.env` a GitHub
- Úsalo solo local
- Vercel tiene su propio sistema de env vars
