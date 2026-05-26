# A2 Ruedas Outlet - Backend Seguro

Aplicación de e-commerce con autenticación profesional, recuperación de contraseña segura y integración con Mercado Libre.

## 🎯 Características

### 🔐 Autenticación Segura
- Contraseñas hasheadas con bcryptjs (10 rounds)
- JWT tokens con refresh automático
- Rate limiting (previene brute force)
- Verificación de email en registro
- Recuperación segura de contraseña con tokens

### 📧 Recuperación de Contraseña
- Token criptográfico de un solo uso
- Envío por email con SendGrid
- Expira en 1 hora
- Enlace seguro para resetear

### 🏠 Base de Datos
- MongoDB Atlas (cloud)
- Mongoose ORM con validaciones
- Índices de performance
- Usuarios, órdenes, favoritos

### 🔗 Integración
- Mercado Libre (sincronización de stock)
- SendGrid (email transaccional)
- CORS configurado
- Rate limiting

---

## 🚀 Quick Start

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

Necesitas:
- **MongoDB URI**: De MongoDB Atlas
- **JWT Secrets**: Generar con `openssl rand -base64 32`
- **SendGrid API Key**: De SendGrid (opcional para desarrollo)

### 3. Migrar usuarios (si vienes de versión anterior)
```bash
npm run migrate-users
```

### 4. Iniciar servidor
```bash
npm run dev
```

- Backend: `http://localhost:3001/api`
- Frontend: `http://localhost:5173`

---

## 📖 Documentación Detallada

Ver [`BACKEND_SETUP.md`](./BACKEND_SETUP.md) para:
- Setup completo paso a paso
- Configuración de MongoDB Atlas
- Configuración de SendGrid
- Testing manual con curl
- Troubleshooting

---

## 🔒 Cambios de Seguridad

| Antes | Ahora |
|-------|-------|
| Contraseñas plaintext | Hasheadas con bcryptjs |
| Credenciales hardcodeadas | Variables de entorno |
| Sin autenticación JWT | JWT + Refresh tokens |
| Código de recuperación 6 dígitos | Token criptográfico único |
| Recuperación en consola | Email con SendGrid |
| localStorage con contraseña | JWT seguro, sin password |

---

## 📦 Tech Stack

- **Backend**: Express.js + Node.js
- **BD**: MongoDB + Mongoose
- **Autenticación**: JWT + bcryptjs
- **Email**: Nodemailer + SendGrid
- **Validación**: Joi
- **Rate Limiting**: express-rate-limit
- **Frontend**: React + TypeScript

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Registro con verification email
- `POST /api/auth/verify-email` - Verificar email
- `POST /api/auth/login` - Login (retorna JWT)
- `POST /api/auth/forgot-password` - Solicitar reset
- `POST /api/auth/reset-password` - Confirmar reset
- `POST /api/auth/refresh-token` - Refrescar JWT
- `GET /api/auth/me` - Datos usuario actual

### Users
- `GET /api/users/:userId/favorites` - Obtener favoritos
- `PUT /api/users/:userId/favorites` - Guardar favoritos
- `PUT /api/users/me` - Actualizar perfil

### Products
- `POST /api/products/sync-stock` - Sincronizar stock ML

---

## 📝 Variables de Entorno

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# JWT
JWT_SECRET=tu-secret-aqui-32-caracteres
JWT_REFRESH_SECRET=otro-secret-32-caracteres

# Email
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@example.com

# Mercado Libre
ML_APP_ID=xxx
ML_CLIENT_SECRET=xxx

# Frontend
FRONTEND_URL=http://localhost:5173
```

---

## 🧪 Testing

Usar Postman, Thunder Client o curl:

```bash
# Registro
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "email": "juan@example.com",
    "password": "SecurePass123"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "SecurePass123"
  }'
```

Ver `BACKEND_SETUP.md` para más ejemplos.

---

## 📊 Estructura del Proyecto

```
src/
├── config/
│   ├── database.ts      # Conexión MongoDB
│   └── email.ts         # Configuración SendGrid
├── middleware/
│   └── auth.ts          # JWT middleware
├── models/
│   ├── User.ts          # Schema usuario
│   └── Order.ts         # Schema orden
├── routes/
│   ├── auth.ts          # Endpoints auth
│   └── users.ts         # Endpoints usuarios
├── services/
│   └── authService.ts   # Lógica autenticación
└── utils/
    ├── validation.ts    # Validaciones Joi
    └── errors.ts        # Error handling

server.js               # Express app
```

---

## ✅ Seguridad

- ✓ Contraseñas hasheadas (bcryptjs)
- ✓ JWT con expiración corta (15 min)
- ✓ Refresh tokens (7 días)
- ✓ Rate limiting (5 intentos = bloqueo 15 min)
- ✓ CORS restrictivo
- ✓ Headers de seguridad
- ✓ Validación en todos los inputs
- ✓ Tokens de reset criptográficos

---

## 🤝 Contribuir

1. Create una rama feature: `git checkout -b feature/nueva-feature`
2. Commit cambios: `git commit -am 'Add feature'`
3. Push: `git push origin feature/nueva-feature`
4. Open un PR

---

## 📄 Licencia

Privada - A2 Ruedas Outlet

---

## 📞 Soporte

Para problemas:
1. Revisar [`BACKEND_SETUP.md`](./BACKEND_SETUP.md) - Troubleshooting
2. Revisar logs de console
3. Verificar variables .env

---

**Última actualización**: Mayo 2026
**Versión**: 2.0 (Backend Seguro)
