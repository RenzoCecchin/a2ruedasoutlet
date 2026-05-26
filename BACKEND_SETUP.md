# Setup del Backend Seguro - A2 Ruedas Outlet

## ✅ Lo que fue implementado

### 1. **Infraestructura de Base de Datos**
- ✓ Mongoose ORM configurado para MongoDB Atlas
- ✓ Schema de User con validaciones y métodos
- ✓ Schema de Order para gestionar pedidos
- ✓ Índices de performance configurados

### 2. **Autenticación Segura**
- ✓ Contraseñas hasheadas con bcryptjs (10 rounds)
- ✓ JWT tokens (15 min) + Refresh tokens (7 días)
- ✓ Rate limiting (5 intentos fallidos = 15 min bloqueo)
- ✓ Middleware de autenticación

### 3. **Recuperación de Contraseña**
- ✓ Tokens criptográficos de un solo uso (1 hora expiration)
- ✓ Envío por email con SendGrid
- ✓ Validación segura de tokens hasheados

### 4. **Email Verification**
- ✓ Verificación de email en registro
- ✓ Tokens de verificación (24 horas)
- ✓ Usuarios no verificados no pueden hacer login

### 5. **Endpoints Seguros**
- POST `/api/auth/register` - Registro con email verification
- POST `/api/auth/verify-email` - Verificar email
- POST `/api/auth/login` - Login con JWT
- POST `/api/auth/forgot-password` - Solicitar reset (email)
- POST `/api/auth/reset-password` - Confirmar reset
- POST `/api/auth/refresh-token` - Refrescar token
- GET `/api/auth/me` - Datos del usuario actual
- PUT `/api/users/me` - Actualizar perfil

---

## 🚀 Instrucciones de Setup

### 1. Instalar Node.js
```bash
# En macOS (con Homebrew)
brew install node

# En Ubuntu/Debian
sudo apt update && sudo apt install nodejs npm

# En Windows
# Descargar de https://nodejs.org/
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno

Copiar `.env.example` a `.env` y rellenar:

```bash
cp .env.example .env
```

Editar `.env`:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/a2ruedas_db

# JWT Secrets (generar con: openssl rand -base64 32)
JWT_SECRET=tu_secret_jwt_aqui_32_caracteres
JWT_REFRESH_SECRET=tu_refresh_secret_aqui_32_caracteres

# SendGrid
SENDGRID_API_KEY=SG.tu_api_key_aqui
EMAIL_FROM=noreply@tu-dominio.com
EMAIL_FROM_NAME=A2 Ruedas Outlet

# Mercado Libre (ya configurado, cambiar si es necesario)
ML_APP_ID=6903992046026037
ML_CLIENT_SECRET=pPyYRkovAZEg2xAYN6rYxCR2y28UrNcf

# Frontend
FRONTEND_URL=http://localhost:5173

# Admin inicial
ADMIN_EMAIL=Mica@motos.com
ADMIN_PASSWORD=changeme_produccion
```

### 4. Crear MongoDB Atlas

1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratuita
3. Crear cluster (Tier: M0 - Gratis)
4. En "Database Access": Crear usuario DB
5. En "Network Access": Permitir todas las IPs (0.0.0.0/0)
6. Copiar connection string a `.env`

### 5. Configurar SendGrid (Opcional - Desarrollo)

**En desarrollo**, los emails se imprimen en consola. Para producción:

1. Ir a https://sendgrid.com
2. Crear cuenta gratuita
3. Crear API Key
4. Copiar a `.env`

### 6. Migrar Usuarios Existentes

```bash
npm run migrate-users
```

Este comando:
- Lee `server-data.json` (si existe)
- Hashea las contraseñas con bcryptjs
- Crea nuevo usuario admin
- Migralos a MongoDB

### 7. Iniciar Servidor

**Modo Desarrollo:**
```bash
npm run dev
```

Abre dos terminales:
- Terminal 1: `npm run dev` (inicia Vite frontend + Express backend)
- Backend corre en `http://localhost:3001`
- Frontend corre en `http://localhost:5173`

---

## 🔐 Características de Seguridad

### ✓ Contraseñas
- Hasheadas con bcryptjs (10 rounds, costo ~0.1-0.2s)
- Nunca en plaintext en BD
- Nunca en logs o localStorage
- Validación de complejidad (mín 8 chars)

### ✓ Sesiones
- JWT con expiración corta (15 min)
- Refresh tokens seguros (7 días)
- Token guard en todos los endpoints de usuario

### ✓ Rate Limiting
- 5 intentos fallidos = bloqueo de 15 min
- Evita brute force attacks

### ✓ Email
- Recuperación: token criptográfico + 1 hora expiration
- Verificación: token único + 24 horas expiration
- SendGrid en producción, consola en desarrollo

### ✓ CORS
- Restringido a `FRONTEND_URL` solamente
- No permite credenciales cross-origin

### ✓ Validación
- Joi schema validation en todos los endpoints
- Email único en BD
- Formato de email validado

---

## 📊 Estructura de Base de Datos

### User Document
```mongodb
{
  _id: ObjectId,
  name: "Juan Pérez",
  email: "juan@example.com",
  passwordHash: "$2a$10$...bcrypt", // ¡HASHEADA!
  role: "admin" | "customer",
  favorites: ["product_id_1", ...],
  isVerified: true,
  verificationToken: undefined,
  verificationExpires: undefined,
  resetTokenHash: "$2a$10$...", // Hash del token reset
  resetTokenExpires: ISODate("2026-05-25T18:00:00Z"),
  loginAttempts: 0,
  lockUntil: undefined,
  createdAt: ISODate("2026-05-25T10:00:00Z"),
  updatedAt: ISODate("2026-05-25T10:00:00Z")
}
```

---

## 🧪 Testing Manual

### 1. Registro
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "SecurePass123"
  }'
```

### 2. Verificar Email
Busca el token en los logs y:
```bash
curl -X POST http://localhost:3001/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "token": "token_aqui"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123"
  }'
```

Recibirás:
```json
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com",
    "role": "customer"
  }
}
```

### 4. Usar Token
```bash
curl -H "Authorization: Bearer eyJhbGc..." \
  http://localhost:3001/api/auth/me
```

### 5. Recuperar Contraseña
```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Check consola por el reset token.

### 6. Reset Contraseña
```bash
curl -X POST http://localhost:3001/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "token": "token_del_email",
    "newPassword": "NuevaPass123"
  }'
```

---

## 📝 Notas Importantes

1. **Credenciales Mercado Libre**: Están en `.env` pero son públicas en código anterior. Considera regenerarlas en producción.

2. **Email en Desarrollo**: Los emails se imprimen en consola. No necesitas SendGrid para desarrollar.

3. **MongoDB Gratis**: Atlas ofrece cluster M0 gratuitamente (512MB).

4. **Contraseña Admin**: Cambiar en `.env` `ADMIN_PASSWORD` antes de producción.

5. **Secrets**: Generar con:
   ```bash
   openssl rand -base64 32
   ```

6. **Frontend**: Ya actualizado para usar JWT y nuevos endpoints.

---

## 🐛 Troubleshooting

### MongoDB connection error
- Revisar MONGODB_URI en .env
- Confirmar IP en MongoDB Atlas Network Access
- Confirmar credentials son correctas

### SendGrid errors
- Verificar SENDGRID_API_KEY es válida
- Cambiar a dev mode (no configurar API key)

### Port 3001 ya en uso
```bash
lsof -i :3001  # Ver qué está usando puerto
kill -9 <PID>  # Matar proceso
```

### JWT expired errors
- Token expira en 15 min, usar refresh token
- Logout/login de nuevo

---

## 📚 Stack Tecnológico

- **Backend**: Express.js
- **BD**: MongoDB + Mongoose
- **Autenticación**: JWT + bcryptjs
- **Email**: Nodemailer + SendGrid
- **Validación**: Joi
- **Rate Limiting**: express-rate-limit
- **Security**: CORS, Headers, Password hashing

---

## ✅ Checklist Pre-Producción

- [ ] MongoDB Atlas cluster creado
- [ ] SendGrid configurado con API key
- [ ] `.env` completamente rellenado
- [ ] Contraseña admin cambiada
- [ ] JWT secrets generados (openssl rand -base64 32)
- [ ] Usuarios migradores de JSON a BD
- [ ] Tests de login/registro/reset password hechos
- [ ] SSL/HTTPS habilitado en Vercel
- [ ] CORS whitelist configurado correctamente
- [ ] Logs de auditoría configurados

