export type ResearchFlowContent = {
  invalidEyebrow: string;
  invalidTitle: string;
  invalidDescription: string;
  invalidBackButtonLabel: string;
  accessEyebrow: string;
  welcomeHeading: string;
  introPrimary: string;
  introSecondary: string;
  confirmButtonLabel: string;
};

export const DEFAULT_RESEARCH_FLOW_CONTENT: ResearchFlowContent = {
  invalidEyebrow: "Invalid link",
  invalidTitle: "連結已失效或無法驗證",
  invalidDescription:
    "此連結可能已過期，或格式不正確。請重新回到研究專案頁面填寫資料，再次取得新的 email 驗證連結。",
  invalidBackButtonLabel: "Back to projects",
  accessEyebrow: "Research Access",
  welcomeHeading: "Welcome back,",
  introPrimary: "你已成功驗證 email，並確認研究同意。現在可以進入「{projectTitle}」的心理測驗頁面。",
  introSecondary:
    "點擊下方按鈕後，系統會帶你前往對應測驗。你也可以稍後再回來，只要此連結尚未過期即可使用。",
  confirmButtonLabel: "Confirm and start assessment",
};
