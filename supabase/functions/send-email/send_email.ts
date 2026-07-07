import { Resend } from "resend";
import { ResponseHelper } from "./response-helper.ts";
import { LoggerHelper } from "./logger-helper.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_EMAIL = Deno.env.get("RESEND_EMAIL");
const resend = new Resend(RESEND_API_KEY);

export const sendEmailHandler = async (
  _request: Request,
): Promise<Response> => {
  LoggerHelper.info("Initiating email send process");
  try {
    const fromEmail = RESEND_EMAIL || "onboarding@resend.dev";
    const toEmail = "franco.g@orderfast.com.ar"; // Tu email registrado en Resend
    const subject = "Hello World";
    const html = "<strong>it works!</strong>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: html,
    });

    if (error) {
      LoggerHelper.error("Resend API returned an error", error);
      return ResponseHelper.error(error);
    }

    LoggerHelper.info("Email sent successfully", data);
    return ResponseHelper.success(data);
  } catch (error: unknown) {
    LoggerHelper.error("Unhandled exception in sendEmailHandler", error);
    return ResponseHelper.error(error);
  }
};
