---
description: Guía para desplegar el frontend de Te Cambio Tu Carro en Render
---

# Despliegue en Render (Next.js)

Para subir el frontend (`website-next`) a Render.com, sigue estos pasos:

1. **Crear Nuevo Servicio**:
   - Ve a tu Dashboard de Render y presiona **New +** -> **Web Service**.
   - Conecta tu repositorio de GitHub.

2. **Configuración Básica**:
   - **Name**: `te-cambio-tu-carro-frontend` (o el que prefieras).
   - **Root Directory**: `website-next` (Importante para que Render sepa dónde están los archivos del frontend).
   - **Environment**: `Node`.
   - **Region**: Selecciona la más cercana (ej. `Ohio (US East)`).

3. **Comandos de Construcción**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

4. **Variables de Entorno (Environment Variables)**:
   *Esto es CRÍTICO para que el sitio cargue datos reales:*
   - `NEXT_PUBLIC_API_URL`: `https://crm-autolote-backend-1.onrender.com/api/v1`
   - `NEXT_PUBLIC_STORE_ID`: `883ccb78-df15-411b-8131-5df61cd1c085`

5. **Plan**:
   - Puedes usar el plan **Free** para probar, pero recuerda que entra en reposo si no hay tráfico. Para producción se recomienda el plan **Starter**.

6. **Deploy**:
   - Presiona **Create Web Service** y espera a que termine el proceso de "Build".

> [!IMPORTANT]
> Asegúrate de que tu backend en Render tenga habilitado el acceso CORS para la URL que te asigne Render al frontend, de lo contrario las peticiones `fetch` fallarán.
