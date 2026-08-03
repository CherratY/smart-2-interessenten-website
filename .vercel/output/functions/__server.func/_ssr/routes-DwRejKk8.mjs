import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as ArrowRight, n as Mail, r as Check, t as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DwRejKk8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var smart_2_hero_default = "/assets/smart-2-hero-Dy22FnIU.jpg";
var interessentSchema = objectType({
	first_name: stringType().trim().min(1).max(100),
	last_name: stringType().trim().min(1).max(100),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().min(5).max(30)
});
/**
* Sendet den Eintrag direkt an dein eigenes Google Apps Script Web App.
* Keine Datenbank, kein Server-Key noetig.
* URL wird als VITE_SHEETS_WEBHOOK_URL gesetzt (Vercel > Environment Variables).
*/
async function submitInteressent(data) {
	const url = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SHEETS_WEBHOOK_URL": ""
	}["VITE_SHEETS_WEBHOOK_URL"];
	if (!url) throw new Error("missing_webhook_url");
	const payload = interessentSchema.parse(data);
	await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "text/plain;charset=utf-8" },
		body: JSON.stringify({
			...payload,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		})
	});
	return { ok: true };
}
var schema = objectType({
	first_name: stringType().trim().min(1, "Bitte Vornamen angeben").max(100),
	last_name: stringType().trim().min(1, "Bitte Nachnamen angeben").max(100),
	email: stringType().trim().email("Bitte gültige E-Mail-Adresse angeben").max(255),
	phone: stringType().trim().min(5, "Bitte Telefonnummer angeben").max(30, "Telefonnummer zu lang")
});
var initial = {
	first_name: "",
	last_name: "",
	email: "",
	phone: ""
};
function Index() {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Bitte alle Felder prüfen");
			return;
		}
		setSubmitting(true);
		try {
			await submitInteressent(parsed.data);
			setDone(true);
			setForm(initial);
		} catch {
			toast.error("Eintrag fehlgeschlagen. Bitte erneut versuchen.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-2xl font-bold tracking-tight",
							style: { fontFamily: "Inter, sans-serif" },
							children: ["smart", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-accent",
								children: "#2"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#eintragen",
						className: "hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex",
						children: "Zur Interessentenliste →"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground",
								children: "Neue Generation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl",
								children: "Der nächste smart kommt."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-muted-foreground md:text-xl",
								children: "Bereit für eine neue Generation? Jetzt entdecken und eintragen lassen."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#eintragen",
									className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5",
									children: ["Jetzt Interesse bekunden", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#info",
									className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
									children: "Mehr erfahren"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-soft)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: smart_2_hero_default,
								alt: "Der neue smart #2 – Frontpartie in Weiß",
								className: "h-full w-full object-cover",
								loading: "eager"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "info",
				className: "border-t border-border/60 bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-6 py-16 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-semibold tracking-tight md:text-4xl",
						children: "Sei unter den Ersten, die mehr erfahren"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Der neue smart #2 kommt. Sie möchten keine Neuigkeiten verpassen? Dann tragen Sie sich jetzt in wenigen Schritten in unsere exklusive",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: "#2 Interessentenliste"
							}),
							" ein."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hinterlassen Sie Ihre Kontaktdaten und wir informieren Sie, sobald es Neuigkeiten zum neuen smart #2 gibt. Sobald dieser an unserem Standort in Aachen eingetroffen ist, haben Sie außerdem die Möglichkeit, eine persönliche Probefahrt mit dem Fahrzeug zu vereinbaren." })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "eintragen",
				className: "border-t border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-6 py-16 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-[0.2em] text-accent",
								children: "#2 Interessenten"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-semibold tracking-tight md:text-4xl",
								children: "Jetzt Interesse bekunden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: "Einfach das Formular ausfüllen – wir melden uns bei Ihnen."
							})
						]
					}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-7 w-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl font-semibold",
								children: "Vielen Dank!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: "Sie stehen jetzt auf der #2 Interessentenliste. Wir melden uns, sobald es Neuigkeiten zum neuen smart #2 gibt."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDone(false),
								className: "mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary",
								children: "Weitere Person eintragen"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Vorname",
									value: form.first_name,
									onChange: (v) => setForm((f) => ({
										...f,
										first_name: v
									})),
									autoComplete: "given-name",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Nachname",
									value: form.last_name,
									onChange: (v) => setForm((f) => ({
										...f,
										last_name: v
									})),
									autoComplete: "family-name",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-Mail",
								type: "email",
								value: form.email,
								onChange: (v) => setForm((f) => ({
									...f,
									email: v
								})),
								autoComplete: "email",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Telefonnummer",
								type: "tel",
								value: form.phone,
								onChange: (v) => setForm((f) => ({
									...f,
									phone: v
								})),
								autoComplete: "tel",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitting,
								className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60",
								children: [submitting ? "Wird gesendet…" : "Auf die #2 Interessentenliste", !submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted-foreground",
								children: "Mit dem Absenden willigen Sie ein, dass wir Sie zum smart #2 kontaktieren dürfen."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6 py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-8 md:grid-cols-2 md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
								children: "Ihr Ansprechpartner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-2xl font-semibold tracking-tight",
								children: "Abdelhak Kilani"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "smart Standort Aachen"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 md:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:abdelhak.kilani@mercedes-benz.com",
								className: "inline-flex items-center gap-3 text-sm font-medium hover:text-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "abdelhak.kilani@mercedes-benz.com"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+4915158632723",
								className: "inline-flex items-center gap-3 text-sm font-medium hover:text-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), "0151 58632723"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" smart Aachen · Alle Angaben ohne Gewähr."
						]
					})]
				})
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", required, autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground",
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-accent",
				children: "*"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			required,
			autoComplete,
			className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/40"
		})]
	});
}
//#endregion
export { Index as component };
