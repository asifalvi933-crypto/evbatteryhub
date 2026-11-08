export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evbatteryhub.in"
).replace(/\/+$/, "");

export const SITE_NAME = "EV Battery Hub India";

// Change if your homepage uses different section IDs
export const CALCULATOR_HREF = "/#home";
export const LEAD_FORM_HREF = "/#lead-form";

// Updated with your direct WhatsApp number (91 + 6395948240)
const WA_NUMBER = "916395948240";

export const whatsAppLink = (message: string): string | null =>
  WA_NUMBER ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}` : null;
