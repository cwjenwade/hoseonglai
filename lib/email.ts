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

type SendLectureRegistrationEmailParams = {
  to: string;
  name: string;
  lectureTitle: string;
  dateLabel?: string;
  time?: string;
  location?: string;
};

export async function sendLectureRegistrationEmail({
  to,
  name,
  lectureTitle,
  dateLabel,
  time,
  location,
}: SendLectureRegistrationEmailParams): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.info("EMAIL_NOT_CONFIGURED", { to, lectureTitle });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const subject = `講座報名確認｜${lectureTitle}`;

  const metaLines = [
    dateLabel ? `日期：${dateLabel}` : "",
    time ? `時間：${time}` : "",
    location ? `地點：${location}` : "",
  ].filter(Boolean);

  await transporter.sendMail({
    from: `Ho-Se Lectures <${gmailUser}>`,
    to,
    subject,
    html: `
      <p>${name} 您好：</p>
      <p>我們已收到你對以下講座的報名：</p>
      <p><strong>${lectureTitle}</strong></p>
      ${metaLines.map((line) => `<p>${line}</p>`).join("")}
      <br/>
      <p>若活動資訊有更新，我們會再寄送通知給你。</p>
      <p>Ho-Se 團隊 敬上</p>
    `,
  });
}

type SendGroupRegistrationEmailParams = {
  to: string;
  name: string;
  groupTitle: string;
  availabilitySlots: string[];
};

export async function sendGroupRegistrationEmail({
  to,
  name,
  groupTitle,
  availabilitySlots,
}: SendGroupRegistrationEmailParams): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.info("EMAIL_NOT_CONFIGURED", { to, groupTitle });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const subject = `團體報名確認｜${groupTitle}`;
  const slotHtml = availabilitySlots
    .map((slot) => `<li style="margin: 4px 0;">${slot}</li>`)
    .join("");

  await transporter.sendMail({
    from: `Ho-Se Groups <${gmailUser}>`,
    to,
    subject,
    html: `
      <p>${name} 您好：</p>
      <p>我們已收到你對以下團體的報名：</p>
      <p><strong>${groupTitle}</strong></p>
      <p>你提供的可訪談時段如下：</p>
      <ul style="padding-left: 20px;">${slotHtml}</ul>
      <br/>
      <p>我們會評估後與你聯繫，安排合適的訪談時間。</p>
      <p>Ho-Se 團隊 敬上</p>
    `,
  });
}