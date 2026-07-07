import { Resend } from "resend";
import { renderAsync } from "@react-email/components";
import React from "react";
import { WelcomeEmail } from "./templates/WelcomeEmail.tsx";
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
    let name = "Franco";
    let actionUrl = "https://orderfast.com.ar";

    if (_request.body && _request.headers.get("content-type")?.includes("application/json")) {
      try {
        const body = await _request.clone().json();
        if (body.name) name = body.name;
        if (body.actionUrl) actionUrl = body.actionUrl;
      } catch (e) {
        LoggerHelper.info("Failed to parse request JSON body, using defaults", e);
      }
    }

    const fromEmail = RESEND_EMAIL || "onboarding@resend.dev";
    const toEmail = "franco.g@orderfast.com.ar"; // Tu email registrado en Resend
    const subject = "¡Bienvenido a OrderFast!";

    // Render the React Email template
    const html = await renderAsync(
      React.createElement(WelcomeEmail, {
        name,
        actionUrl,
      })
    );

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
