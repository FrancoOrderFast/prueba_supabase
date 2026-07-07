import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

export default {
  fetch: withSupabase(
    { auth: ["publishable", "secret"] },
    async (req: Request) => {
      try {
        // Obtenemos los datos del body
        const { to, subject, html } = await req.json();

        if (!to || !subject || !html) {
          return Response.json(
            { error: "Faltan campos requeridos (to, subject, html)" },
            { status: 400 },
          );
        }

        if (!RESEND_API_KEY) {
          return Response.json(
            { error: "RESEND_API_KEY no está configurado en el entorno" },
            { status: 500 },
          );
        }

        // Hacemos el request a Resend para enviar el correo
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Pruebas <onboarding@resend.dev>", // Cambiar si tienes dominio verificado
            to: [to],
            subject: subject,
            html: html,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          return Response.json({ success: true, data });
        } else {
          return Response.json({ success: false, error: data }, {
            status: 400,
          });
        }
      } catch (error) {
        return Response.json(
          { error: error },
          { status: 500 },
        );
      }
    },
  ),
};
