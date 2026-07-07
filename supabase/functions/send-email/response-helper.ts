import { LoggerHelper } from "./logger-helper.ts";

export class ResponseHelper {
  static success<T>(data: T, status: number = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  static error(error: unknown, status: number = 500): Response {
    let errorPayload: Record<string, unknown> = {
      error: "Unknown error occurred",
    };

    if (error instanceof Error) {
      errorPayload = { error: error.message };
    } else if (typeof error === "object" && error !== null) {
      errorPayload = { error };
    } else if (typeof error === "string") {
      errorPayload = { error };
    }

    // Si el error original contiene un código de estado (como los de Resend)
    let finalStatus = status;
    if (error && typeof error === "object" && "statusCode" in error) {
      finalStatus = (error as { statusCode?: number }).statusCode || status;
    }

    LoggerHelper.error("Response helper caught an error:", errorPayload);

    return new Response(JSON.stringify(errorPayload), {
      status: finalStatus,
      headers: { "Content-Type": "application/json" },
    });
  }
}
