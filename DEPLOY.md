# Deploy – Generala (Render)

## 1. Base de datos (Neon)

Si todavía no tenés la DB en Neon: [neon.tech](https://neon.tech) → Create project → copiá la **Connection string** (es tu `DATABASE_URL`). La vas a usar en el paso 4.

---

## 2. Subir el código a GitHub

Asegurate de que el repo esté en GitHub y que tengas el `render.yaml` en la raíz (ya está en este proyecto).

---

## 3. Crear el Web Service en Render

1. Entrá a [dashboard.render.com](https://dashboard.render.com) e iniciá sesión (con GitHub si querés).
2. **New +** → **Web Service**.
3. Conectá el repo **generala** (autorizá Render si hace falta).
4. Render puede detectar el `render.yaml` (Blueprint). Si te pregunta **“Apply Blueprint”** o **“Create Web Service from Blueprint”**, elegí eso.  
   Si no aparece el blueprint:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Runtime:** Node
5. En **Environment** agregá estas variables (las que tienen `sync: false` en el blueprint te las va a pedir al aplicar el blueprint; si no, agregalas a mano):

   | Variable | Dónde sacarla |
   |----------|----------------|
   | `DATABASE_URL` | Neon → Connection string (con password) |
   | `NEXTAUTH_SECRET` | Generar: `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | **Después del primer deploy:** `https://tu-app.onrender.com` (la URL que te da Render) |
   | `GOOGLE_CLIENT_ID` | Google Cloud Console → Credentials → Client ID |
   | `GOOGLE_CLIENT_SECRET` | Google Cloud Console → Credentials → Client secret |

6. **Create Web Service** (o **Save** si ya existía). Render va a hacer el primer build y deploy.

---

## 4. Configurar la URL de la app (NEXTAUTH_URL y Google)

1. Cuando termine el primer deploy, Render te da una URL tipo `https://generala-xxxx.onrender.com`.
2. En Render → tu servicio → **Environment** → editá `NEXTAUTH_URL` y poné exactamente esa URL (ej. `https://generala-xxxx.onrender.com`). Guardá (y si hace falta, redeploy).
3. En **Google Cloud Console** ([console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)):
   - Entrá a tu proyecto OAuth → **Authorized redirect URIs**.
   - Agregá: `https://generala-xxxx.onrender.com/api/auth/callback/google` (reemplazá por tu URL real).
   - Guardá.

Con eso, el login con Google debería funcionar en producción.

---

## 5. Resumen de variables en producción

- **DATABASE_URL** → Connection string de Neon.
- **NEXTAUTH_SECRET** → Nuevo secreto solo para producción (`openssl rand -base64 32`).
- **NEXTAUTH_URL** → URL pública de la app en Render (ej. `https://generala-xxxx.onrender.com`).
- **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET** → Mismos que en dev; en la consola de Google agregá la redirect URI de producción.

---

## Nota sobre el plan gratis

En el plan gratis, el servicio se **apaga** tras ~15 min sin visitas. La primera request después de eso puede tardar 30–50 segundos en responder (cold start). Para demos y desarrollo está bien.
