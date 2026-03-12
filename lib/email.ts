import { Resend } from "resend";

type SendResearchJoinEmailParams = {
  to: string;
  name: string;
  projectTitle: string;
  startUrl: string;
};

export async function sendResearchJoinEmail({
  to,
  name,
  projectTitle,
  startUrl,
}: SendResearchJoinEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info("EMAIL_NOT_CONFIGURED", {
      to,
      projectTitle,
      startUrl,
    });
    return;
  }

  const resend = new Resend(apiKey);

  const subject = `研究同意書確認｜${projectTitle}`;

  const { error } = await resend.emails.send({
    from: "Ho-Se Research <onboarding@resend.dev>",
    to,
    subject,
    html: `
      <p>${name} 您好：</p>
      <p>感謝您參與 <strong>${projectTitle}</strong> 心理研究。</p>
      <p>請先點擊以下連結確認研究同意書，確認後即可開始心理測驗：</p>
      <p><a href="${startUrl}">${startUrl}</a></p>
      <br/>
      <p>Ho-Se 團隊 敬上</p>
    `,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}