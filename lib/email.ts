import nodemailer from "nodemailer";

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
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.info("EMAIL_NOT_CONFIGURED", { to, projectTitle, startUrl });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const subject = `研究同意書確認｜${projectTitle}`;

  await transporter.sendMail({
    from: `Ho-Se Research <${gmailUser}>`,
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
}