import nodemailer from "nodemailer";

type SendResearchJoinEmailParams = {
  to: string;
  name: string;
  projectTitle: string;
  startUrl: string;
};

// Deprecated: legacy token-flow email retained for historical API compatibility.
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

type SendResearchCompletionEmailParams = {
  to: string;
  name: string;
  participantCode: string;
  projectTitleZh: string;
  projectTitleEn: string;
  principalInvestigator: string;
  researchUnit: string;
  researchDescription: string;
};

export async function sendResearchCompletionEmail({
  to,
  name,
  participantCode,
  projectTitleZh,
  projectTitleEn,
  principalInvestigator,
  researchUnit,
  researchDescription,
}: SendResearchCompletionEmailParams): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.info("EMAIL_NOT_CONFIGURED", { to, projectTitleZh, participantCode });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const subject = `研究完成感謝｜${projectTitleZh}`;

  await transporter.sendMail({
    from: `Ho-Se Research <${gmailUser}>`,
    to,
    subject,
    html: `
      <p>${name} 您好：</p>
      <p>感謝你完成心理量表填答，以下為本次研究同意資訊存檔副本：</p>
      <hr/>
      <p><strong>研究標題（中文）</strong>：${projectTitleZh}</p>
      <p><strong>研究標題（英文）</strong>：${projectTitleEn}</p>
      <p><strong>計劃主持人（PI）</strong>：${principalInvestigator}</p>
      <p><strong>研究單位</strong>：${researchUnit}</p>
      <p><strong>研究事項說明</strong>：${researchDescription}</p>
      <p><strong>受試者代碼</strong>：${participantCode}</p>
      <hr/>
      <p>再次感謝你的參與與支持。</p>
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
  consultationSlots: string[];
  availabilitySlots: string[];
};

export async function sendGroupRegistrationEmail({
  to,
  name,
  groupTitle,
  consultationSlots,
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
  const consultationSlotHtml = consultationSlots
    .map((slot) => `<li style="margin: 4px 0;">${slot}</li>`)
    .join("");
  const slotHtml = availabilitySlots
    .map((slot) => `<li style="margin: 4px 0;">${slot}</li>`)
    .join("");

  await transporter.sendMail({
    from: `Ho-Se Groups <${gmailUser}>`,
    to,
    subject,
    html: `
      <p>${name} 您好：</p>
      <p>我們已收到你對以下團體的資料：</p>
      <p><strong>${groupTitle}</strong></p>
      <p>初談可約時段如下（約 30 分鐘）：</p>
      <ul style="padding-left: 20px;">${consultationSlotHtml}</ul>
      <p>你提供的團體可參與時段如下：</p>
      <ul style="padding-left: 20px;">${slotHtml}</ul>
      <br/>
      <p>我們確認約談時間後會寄信通知，並再以電話與你確認一次。</p>
      <p>Ho-Se 團隊 敬上</p>
    `,
  });
}
