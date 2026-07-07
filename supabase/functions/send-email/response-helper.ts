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

    console.error(errorPayload);
    return new Response(JSON.stringify(errorPayload), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
