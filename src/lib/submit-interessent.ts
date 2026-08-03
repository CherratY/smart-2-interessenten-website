import { z } from "zod";

export const interessentSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
});

export type Interessent = z.infer<typeof interessentSchema>;

/**
 * Sendet den Eintrag direkt an dein eigenes Google Apps Script Web App.
 * Keine Lovable-Dienste, keine Datenbank, kein Server-Key noetig.
 * URL wird als VITE_SHEETS_WEBHOOK_URL gesetzt (Vercel > Environment Variables).
 */
export async function submitInteressent(data: Interessent) {
  const url = import.meta.env['VITE_SHEETS_WEBHOOK_URL'] as string | undefined;
  if (!url) throw new Error("missing_webhook_url");

  const payload = interessentSchema.parse(data);

  await fetch(url, {
    method: "POST",
    // text/plain vermeidet den CORS-Preflight, den Apps Script nicht beantwortet
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
  });

  return { ok: true as const };
}
