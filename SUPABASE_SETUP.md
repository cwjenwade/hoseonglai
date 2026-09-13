# Supabase 資料庫設定說明

## 1. 環境變數設定

請先到 `.env.local` 填入你的 Supabase Project URL：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Na8YOzbo2uwM22Nxf9u7Sw_MrbiTDCQ

# 只在伺服器端使用（不要加 NEXT_PUBLIC_ 前綴）
SUPABASE_SERVICE_ROLE_KEY=你的_SUPABASE_SERVICE_ROLE_KEY

NEXT_PUBLIC_SITE_URL=http://localhost:3000

```

**如何找到 Project URL？**
1. 登入 [Supabase Dashboard](https://supabase.com/dashboard)
2. 選擇你的專案
3. 前往 Settings > API
4. 複製 `Project URL`（格式像：`https://xxxxx.supabase.co`）

---

## 2. 建立資料表與安全政策

請到 Supabase Dashboard 執行以下步驟：

1. 點選左側選單的 **SQL Editor**
2. 點 **New query**
3. 依檔名順序套用 [supabase/migrations](supabase/migrations) 內尚未執行的 migration
4. 點 **Run** 執行

目前資料庫使用的主要資料表：
- `lecture_registrations` - 講座報名
- `research_registrations` - 研究報名
- `psych_test_results` - 心理測驗結果

以及：
- `group_registrations` - 團體報名
- `newsletter_subscribers` - 電子報訂閱
- `url_shortcuts` - 既有短連結（/r/[shortCode]）
- `admin_users` - 後台 admin allowlist

---

## 3. 設定 Row Level Security (RLS)

本專案的權限模型：
- 公開頁面：透過伺服器 API 寫入講座、團體與電子報資料；匿名角色不可直接讀寫個資表。
- 研究參與：由各研究的 Google Form 收集，網站不再接收研究報名或心理測驗資料。
- 後台：使用 Supabase Auth 登入後，只有在 `admin_users` 表中的帳號才能讀取資料。

請只以 migrations 作為資料庫結構與權限的唯一來源；不要執行舊版 SQL 檔或建立匿名 `INSERT` 政策。

---

## 3.5 套用 migration（推薦：Supabase CLI）

如果你使用本 repo 的 migrations（[supabase/migrations](supabase/migrations)），建議用 Supabase CLI 將 migration 推到你的 Supabase 專案。

1. 登入（會開啟瀏覽器授權）：

\`\`\`bash
supabase login
\`\`\`

2. link 專案（本 repo 的 project ref 在 [supabase/config.toml](supabase/config.toml)）：

\`\`\`bash
supabase link --project-ref eeupyvtuzusehtyuecgd
\`\`\`

3. 推送 migrations 到資料庫（會提示你輸入 Database password）：

\`\`\`bash
supabase db push
\`\`\`

（如果你不使用 CLI，也可以依序把尚未套用的 migration 內容貼到 Supabase SQL Editor 執行。）

---

## 4. 測試連線

完成以上步驟後，重新啟動開發伺服器：

\`\`\`bash
npm run dev
\`\`\`

然後：
1. 前往 `/fortune-arrives` 測試講座報名
2. 前往 `/togetherness` 測試團體報名
3. 前往 `/collaborative-prosperity` 確認研究詳情頁的 Google Form 連結

---

## 5. 查看資料

回到 Supabase Dashboard：
1. 點 **Table Editor**
2. 選擇對應的資料表
3. 就能看到使用者提交的資料

若要啟用後台：
1. 在 Supabase Authentication 建立一個 admin 帳號（email/password）
2. 在 SQL Editor 執行：

\`\`\`sql
insert into public.admin_users (user_id, email)
values ('<auth.users.id>', '<admin-email>');
\`\`\`

接著就可以用 `/admin` 登入並查看資料。

如果你忘記密碼：
- 方式 A（最簡單）：Supabase Dashboard → Authentication → Users → 找到該使用者 → 送出 password recovery / reset
- 方式 B（本機腳本；需要 SUPABASE_SERVICE_ROLE_KEY）：

\`\`\`bash
node scripts/set-admin-password.mjs <auth.users.id> <admin-email> <newPassword>
\`\`\`

可選：用 service role 快速授權 admin（本機執行；需要 SUPABASE_SERVICE_ROLE_KEY）

\`\`\`bash
node scripts/grant-admin.mjs <auth.users.id> <admin-email>
\`\`\`

---

## 6. 佈署環境變數（重要）

請在部署平台（例如 Vercel/Render/Fly 等）的「Server-side environment variables」設定：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`（server-only，用於受控的伺服器端資料寫入）
- `NEXT_PUBLIC_SITE_URL`

提醒：`SUPABASE_SERVICE_ROLE_KEY` 不能加 `NEXT_PUBLIC_`，也不能出現在前端程式碼或瀏覽器環境。


---

## 常見問題

**Q: 提交時出現 "Failed to fetch" 錯誤？**  
A: 檢查 `.env.local` 的 URL 是否正確，並確認已重新啟動開發伺服器。

**Q: 提交時出現 "new row violates row-level security policy" 錯誤？**  
A: 表示 RLS policy 未正確設定，請參考步驟 3 重新設定。

**Q: 我想限制只有登入使用者才能提交？**  
A: 需要實作 Supabase Auth，並修改 policy 從 `anon` 改為 `authenticated`。
