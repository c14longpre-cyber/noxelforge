import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

export async function sendMagicLinkEmail(email: string, magicUrl: string): Promise<boolean> {
  const html = "<div style=\"font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#07090f;color:#fff;padding:40px;border-radius:16px;\">" +
    "<div style=\"text-align:center;margin-bottom:32px;\">" +
    "<h1 style=\"color:#3cde6a;margin:16px 0 4px;font-size:24px;\">Your magic link</h1>" +
    "<p style=\"color:rgba(255,255,255,0.5);margin:0;font-size:14px;\">Click below to sign in instantly - no password needed.</p>" +
    "</div>" +
    "<div style=\"text-align:center;margin:32px 0;\">" +
    "<a href=\"" + magicUrl + "\" style=\"background:#3cde6a;color:#07090f;padding:16px 40px;border-radius:12px;font-weight:900;text-decoration:none;font-size:16px;display:inline-block;\">" +
    "Sign in to NOXEL Forge -&gt;" +
    "</a>" +
    "</div>" +
    "<p style=\"color:rgba(255,255,255,0.3);font-size:12px;text-align:center;margin-top:24px;\">" +
    "This link expires in 15 minutes. If you did not request this, you can safely ignore this email." +
    "</p>" +
    "</div>";

  try {
    const result = await getResend().emails.send({
      from: "NOXEL Forge <noreply@noxelforge.com>",
      to: email,
      subject: "Your NOXEL Forge login link",
      html: html,
    });

    if (result.error) {
      console.error("[emailService] Resend returned an error:", JSON.stringify(result.error));
      return false;
    }

    console.log("[emailService] Email sent, id:", result.data?.id);
    return true;
  } catch (err) {
    console.error("[emailService] sendMagicLinkEmail threw:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    return false;
  }
}
