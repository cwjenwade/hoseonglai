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

const [userId, email, newPassword] = process.argv.slice(2);

if (!userId || !email || !newPassword) {
  console.error(
    "Usage: node scripts/set-admin-password.mjs <auth.users.id> <email> <newPassword>",
  );
  process.exit(1);
}

if (newPassword.length < 8) {
  console.error("Password too short (min 8 characters). Aborting.");
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

const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
  userId,
  {
    email,
    password: newPassword,
  },
);

if (updateError) {
  console.error("FAILED_TO_SET_PASSWORD", updateError);
  process.exit(1);
}

const { data: adminRow, error: adminError } = await supabase
  .from("admin_users")
  .upsert({ user_id: userId, email }, { onConflict: "user_id" })
  .select("user_id, email, created_at")
  .single();

if (adminError) {
  console.error("FAILED_TO_UPSERT_ADMIN_USERS", adminError);
  process.exit(1);
}

console.log("OK");
console.log({ user: updatedUser.user?.id, admin_users: adminRow });
