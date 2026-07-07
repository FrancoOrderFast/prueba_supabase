import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import { sendEmailHandler } from "./send_email.ts";
import { ResponseHelper } from "./response-helper.ts";

export default {
  fetch: withSupabase(
    { auth: ["publishable", "secret"] },
    async (req: Request) => {
      try {
        return await sendEmailHandler(req);
      } catch (error) {
        return ResponseHelper.error(error, 500);
      }
    },
  ),
};
