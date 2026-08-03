import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
});

export const submitInteressent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    // 1) Persist to Lovable Cloud (backup / source of truth)
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("smart_2_interessenten")
      .insert(data);
    if (error) throw new Error("db_insert_failed");

    // 2) Append row to Google Sheets via Lovable Connector Gateway
    const lovableApiKey = process.env.LOVABLE_API_KEY;
    const sheetsApiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (lovableApiKey && sheetsApiKey && spreadsheetId) {
      try {
        const range = "Interessenten!A:E";
        const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableApiKey}`,
            "X-Connection-Api-Key": sheetsApiKey,
          },
          body: JSON.stringify({
            values: [
              [
                new Date().toISOString(),
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
              ],
            ],
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error(`Google Sheets append failed [${res.status}]: ${body}`);
        }
      } catch (err) {
        console.error("Google Sheets append error:", err);
        // Don't fail the user's submission if Sheets is unreachable
      }
    }

    return { ok: true as const };
  });
