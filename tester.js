const SUPABASE_URL = "http://127.0.0.1:54321"; // URL local por defecto
const ANON_KEY = "PON_AQUI_EL_ANON_KEY_CUANDO_LEVANTES_SUPABASE"; // Supabase te dará esta key al hacer start

async function testSendEmail() {
  console.log("Iniciando prueba de envío de correo...");
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": ANON_KEY,
        "Authorization": `Bearer ${ANON_KEY}` // Para simular auth (si es necesario)
      },
      body: JSON.stringify({
        to: "tu-email@gmail.com", // Pon tu correo real aquí para verificar
        subject: "Prueba desde mi subproyecto local 🚀",
        html: "<h1>¡Funciona!</h1><p>El correo se ha enviado exitosamente desde el entorno de pruebas local de Supabase.</p>"
      })
    });

    const data = await response.json();
    console.log("Status Code:", response.status);
    console.log("Respuesta de la Función:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error al conectar con la Edge Function:", error);
  }
}

testSendEmail();
