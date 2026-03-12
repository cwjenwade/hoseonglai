import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

function loadEnvFromFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex <= 0) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

const [userId, email] = process.argv.slice(2);

if (!userId) {
  console.error("Usage: node scripts/grant-admin.mjs <auth.users.id> [email]");
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  loadEnvFromFile(".env.local");
  loadEnvFromFile(".env");
}

const finalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const finalServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!finalSupabaseUrl || !finalServiceRoleKey) {
  console.error(
    "Missing env. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(finalSupabaseUrl, finalServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const payload = {
  user_id: userId,
  ...(email ? { email } : {}),
};

const { data, error } = await supabase
  .from("admin_users")
  .upsert(payload, { onConflict: "user_id" })
  .select("user_id, email, created_at")
  .single();

if (error) {
  console.error("FAILED", error);
  process.exit(1);
}

console.log("OK", data);
