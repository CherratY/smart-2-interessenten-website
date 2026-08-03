# smart #2 Interessentenliste

Landingpage mit Eintragungsformular (Vorname, Nachname, E-Mail, Telefon).
Die Einträge werden direkt an ein Google Apps Script Web App gesendet und in
deinem Google Sheet gespeichert.

Stack: React 19, TanStack Start (Router + Vite), Tailwind CSS v4, Zod.

## Lokal starten

```sh
npm install
npm run dev
```

App läuft auf http://localhost:8080

## Konfiguration

Eine einzige Umgebungsvariable in `.env` (bzw. in Vercel unter
Settings → Environment Variables):

```
VITE_SHEETS_WEBHOOK_URL=<URL deines Google Apps Script Web Apps>
```

### Google Apps Script

Google Sheet öffnen → Erweiterungen → Apps Script → einfügen:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    .appendRow([d.timestamp, d.first_name, d.last_name, d.email, d.phone]);
  return ContentService.createTextOutput("ok");
}
```

Bereitstellen → Neue Bereitstellung → Web-App, „Ausführen als: Ich“,
„Zugriff: Jeder“ → URL kopieren.

## Deployment (GitHub + Vercel)

```sh
git init
git add .
git commit -m "smart #2 Interessentenliste"
git branch -M main
git remote add origin <dein-github-repo>
git push -u origin main
```

Danach auf vercel.com: Add New → Project → Repo importieren.
Build Command `npm run build`, Environment Variable `VITE_SHEETS_WEBHOOK_URL`
setzen → Deploy.

## Skripte

- `npm run dev` – Entwicklungsserver
- `npm run build` – Produktionsbuild
- `npm run preview` – Build lokal ansehen
- `npm run lint` – ESLint
