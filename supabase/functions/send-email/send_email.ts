import { Resend } from "resend";
import { ResponseHelper } from "./response-helper.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

export const sendEmailHandler = async (
  _request: Request,
): Promise<Response> => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "franco.g@orderfast.com.ar", // Asegúrate de que este sea el email con el que te registraste en Resend
      subject: "Hello World",
      html: "<strong>it works!</strong>",
    });

    if (error) {
      return ResponseHelper.error(error, 400);
    }

    return ResponseHelper.success(data);
  } catch (error: unknown) {
    return ResponseHelper.error(error);
  }
};
