# Prueba Supabase - Envío de Correos (Edge Functions)

Este proyecto contiene una configuración local de [Supabase](https://supabase.com) con una Edge Function diseñada para enviar correos electrónicos utilizando [Resend](https://resend.com/).

## Requisitos previos

- Docker o Docker Desktop (necesario para levantar los contenedores locales de Supabase).
- CLI de Supabase instalado (`npm install -g supabase` o usando `npx supabase`).

## Configuración de Variables de Entorno

Debes tener un archivo en la ruta `supabase/.env.local` con las variables de entorno necesarias para la función. Específicamente, necesitas configurar la clave API de Resend:

```env
RESEND_API_KEY=tu_api_key_de_resend
```

## Comandos útiles

### 1. Iniciar los contenedores de Supabase
Para arrancar la base de datos, el panel de control (Studio) y demás servicios localmente:
```bash
npx supabase start
```
*Si tienes problemas de red, puedes usar un network-id personalizado como hiciste anteriormente.*

### 2. Detener los contenedores
Para pausar los contenedores cuando termines de desarrollar:
```bash
npx supabase stop
```

### 3. Probar la Edge Function ("send-email") localmente
Para levantar únicamente el servidor de la Edge Function y poder probarla localmente (sin necesitar todo el stack de Supabase corriendo):
```bash
npx supabase functions serve send-email --env-file ./supabase/.env.local --no-verify-jwt
```
Esto expondrá la función en `http://127.0.0.1:54321/functions/v1/send-email`. 
*(Nota: la bandera `--no-verify-jwt` se utiliza para pruebas rápidas sin pasar el token de autorización)*

## Sobre la Función `send-email`

La función se encuentra en `supabase/functions/send-email/index.ts`. 

- Utiliza **Deno**, por lo tanto no usa `node_modules` ni `package.json`.
- Las dependencias se descargan automáticamente "al vuelo" usando los prefijos `npm:` y `jsr:` definidos en los importes.
- **Ruta principal:** Espera peticiones POST con un cuerpo JSON que incluya:
  ```json
  {
    "to": "correo@destino.com",
    "subject": "Asunto del correo",
    "html": "<p>Contenido del correo</p>"
  }
  ```
