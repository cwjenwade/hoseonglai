import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  if (!process.env.RESEND_API_KEY) {
    console.info("EMAIL_NOT_CONFIGURED", {
      to,
      projectTitle,
      startUrl,
    });
    return;
  }

  const subject = `研究參與連結｜${projectTitle}`;

  const { error } = await resend.emails.send({
    from: "Ho-Se Research <onboarding@resend.dev>",
    to,
    subject,
    html: `
      <p>${name} 您好：</p>
      <p>感謝您參與 <strong>${projectTitle}</strong> 心理研究。</p>
      <p>請點擊以下連結開始心理測驗：</p>
      <p><a href="${startUrl}">${startUrl}</a></p>
      <br/>
      <p>Ho-Se 團隊 敬上</p>
    `,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}