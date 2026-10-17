import { Resend } from "resend";

// Sender address: its domain must be verified in the Resend account of RESEND_API_KEY
export const EMAIL_FROM = process.env.EMAIL_FROM || "NOXEL Forge <noreply@noxelseo.com>";

// Checked once at startup (this module is loaded with the routes): no key means no email can be sent
const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.warn("[emailService] RESEND_API_KEY is not set: magic link emails are disabled until it is configured.");
}

function getResend() {
  return new Resend(RESEND_API_KEY);
}

// Email templates for both FR and EN
const EMAIL_TEMPLATES = {
  fr: {
    magicLink: {
      subject: "Votre lien de connexion NOXEL Forge",
      title: "Votre lien magique",
      description: "Cliquez ci-dessous pour vous connecter instantanément — pas de mot de passe requis.",
      cta: "Se connecter à NOXEL Forge →",
      expiry: "Ce lien expire dans 15 minutes. Si vous n'avez pas demandé ceci, vous pouvez ignorer sans risque cet e-mail.",
    },
  },
  en: {
    magicLink: {
      subject: "Your NOXEL Forge login link",
      title: "Your magic link",
      description: "Click below to sign in instantly - no password needed.",
      cta: "Sign in to NOXEL Forge →",
      expiry: "This link expires in 15 minutes. If you did not request this, you can safely ignore this email.",
    },
  },
};

function getEmailTemplate(lang: string, template: string): any {
  const templates = EMAIL_TEMPLATES[lang as keyof typeof EMAIL_TEMPLATES] || EMAIL_TEMPLATES.en;
  return templates[template as keyof typeof templates];
}

function buildMagicLinkHTML(magicUrl: string, template: any): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#07090f;color:#fff;padding:40px;border-radius:16px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#3ddc84;margin:16px 0 4px;font-size:24px;">${template.title}</h1>
      <p style="color:rgba(255,255,255,0.5);margin:0;font-size:14px;">${template.description}</p>
    </div>
    <div style="text-align:center;margin:32px 0;">
      <a href="${magicUrl}" style="background:#3ddc84;color:#07090f;padding:16px 40px;border-radius:12px;font-weight:900;text-decoration:none;font-size:16px;display:inline-block;">
        ${template.cta}
      </a>
    </div>
    <p style="color:rgba(255,255,255,0.3);font-size:12px;text-align:center;margin-top:24px;">
      ${template.expiry}
    </p>
  </div>`;
}

export async function sendMagicLinkEmail(email: string, magicUrl: string, lang: string = "en"): Promise<boolean> {
  const template = getEmailTemplate(lang, "magicLink");
  const html = buildMagicLinkHTML(magicUrl, template);

  // Without a key, new Resend() would throw on every attempt: fail cleanly instead
  if (!RESEND_API_KEY) {
    console.error("[emailService] Magic link not sent: RESEND_API_KEY is not set.");
    return false;
  }

  try {
    const result = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: template.subject,
      html: html,
    });

    if (result.error) {
      console.error(`[emailService] Resend returned an error (from: ${EMAIL_FROM}):`, JSON.stringify(result.error));
      return false;
    }

    console.log(`[emailService] Email sent (from: ${EMAIL_FROM}), id:`, result.data?.id);
    return true;
  } catch (err) {
    console.error("[emailService] sendMagicLinkEmail threw:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    return false;
  }
}
