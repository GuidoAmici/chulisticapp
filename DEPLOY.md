He preparado la aplicación para el **redespliegue final**:

1.  **Base de Datos Restablecida:** He vuelto a configurar PostgreSQL en `backend/prisma/schema.prisma` y restaurado los campos de `tags` y `metadata`.
2.  **Scripts de Construcción:** He actualizado `backend/package.json` para que genere automáticamente el cliente de Prisma durante la construcción en Render.
3.  **Integración de Gemini:** El backend está configurado para usar el token de Google del usuario (OAuth) o la `GEMINI_API_KEY` maestra como respaldo.

### Instrucciones para Render (Backend):
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npx prisma migrate deploy && npm start`
- **Variables de Entorno:**
    - `DATABASE_URL`: Tu URL de PostgreSQL de Render.
    - `PORT`: 4000 (o el que prefieras).
    - `GEMINI_API_KEY`: Tu llave maestra (opcional si usas OAuth).

### Instrucciones para Vercel (Frontend):
- **Build Command:** `npm run build`
- **Root Directory:** `frontend`
- **Variables de Entorno:**
    - `NEXT_PUBLIC_BACKEND_URL`: La URL que te asigne Render.
    - `AUTH_SECRET`: Genera una cadena aleatoria larga.
    - `AUTH_GOOGLE_ID`: Tu Google Client ID.
    - `AUTH_GOOGLE_SECRET`: Tu Google Client Secret.

La estructura ahora es:
- `/frontend`: App de Next.js.
- `/backend`: API de Express con Prisma/Postgres.

¡Listo para subir a GitHub y conectar con Vercel/Render!
