# Supabase 資料庫設定說明

## 1. 環境變數設定

請先到 `.env.local` 填入你的 Supabase Project URL：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Na8YOzbo2uwM22Nxf9u7Sw_MrbiTDCQ
```

**如何找到 Project URL？**
1. 登入 [Supabase Dashboard](https://supabase.com/dashboard)
2. 選擇你的專案
3. 前往 Settings > API
4. 複製 `Project URL`（格式像：`https://xxxxx.supabase.co`）

---

## 2. 建立資料表

請到 Supabase Dashboard 執行以下步驟：

1. 點選左側選單的 **SQL Editor**
2. 點 **New query**
3. 複製 `supabase-schema.sql` 的內容並貼上
4. 點 **Run** 執行

這會建立三個資料表：
- `lecture_registrations` - 講座報名
- `research_registrations` - 研究報名
- `psych_test_results` - 心理測驗結果

---

## 3. 設定 Row Level Security (RLS)

為了讓前端可以新增資料，需要設定 RLS policy：

### 方法 A：使用 SQL（推薦）

在 SQL Editor 執行：

\`\`\`sql
-- 允許任何人新增講座報名
ALTER TABLE lecture_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON lecture_registrations
  FOR INSERT TO anon WITH CHECK (true);

-- 允許任何人新增研究報名
ALTER TABLE research_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON research_registrations
  FOR INSERT TO anon WITH CHECK (true);

-- 允許任何人新增心理測驗結果
ALTER TABLE psych_test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON psych_test_results
  FOR INSERT TO anon WITH CHECK (true);
\`\`\`

### 方法 B：使用圖形介面

1. 點選 **Authentication > Policies**
2. 對每個資料表點 **New Policy**
3. 選 **Enable insert access for all users**
4. 儲存

---

## 4. 測試連線

完成以上步驟後，重新啟動開發伺服器：

\`\`\`bash
npm run dev
\`\`\`

然後：
1. 前往 `/fortune-arrives` 測試講座報名
2. 前往 `/heartfelt-momentum` 測試研究報名
3. 前往 `/collaborative-prosperity` 測試心理測驗

---

## 5. 查看資料

回到 Supabase Dashboard：
1. 點 **Table Editor**
2. 選擇對應的資料表
3. 就能看到使用者提交的資料

---

## 常見問題

**Q: 提交時出現 "Failed to fetch" 錯誤？**  
A: 檢查 `.env.local` 的 URL 是否正確，並確認已重新啟動開發伺服器。

**Q: 提交時出現 "new row violates row-level security policy" 錯誤？**  
A: 表示 RLS policy 未正確設定，請參考步驟 3 重新設定。

**Q: 我想限制只有登入使用者才能提交？**  
A: 需要實作 Supabase Auth，並修改 policy 從 `anon` 改為 `authenticated`。
