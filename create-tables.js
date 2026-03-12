const fs = require('fs');
const path = require('path');

function loadEnvFromFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eqIndex = line.indexOf('=');
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

loadEnvFromFile('.env.local');
loadEnvFromFile('.env');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing env. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only).'
  );
  process.exit(1);
}

const SQL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS lecture_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lecture_id TEXT NOT NULL,
    lecture_title TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );`,
  
  `CREATE TABLE IF NOT EXISTS research_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_url TEXT NOT NULL,
    video_title TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    interest_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );`,
  
  `CREATE TABLE IF NOT EXISTS psych_test_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    test_id TEXT NOT NULL,
    test_title TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    answers INTEGER[] NOT NULL,
    total_score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );`,
  
  `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );`,
  
  `ALTER TABLE lecture_registrations ENABLE ROW LEVEL SECURITY;`,
  `ALTER TABLE research_registrations ENABLE ROW LEVEL SECURITY;`,
  `ALTER TABLE psych_test_results ENABLE ROW LEVEL SECURITY;`,
  `ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;`,
  
  `DROP POLICY IF EXISTS "Allow public insert" ON lecture_registrations;`,
  `CREATE POLICY "Allow public insert" ON lecture_registrations FOR INSERT TO anon WITH CHECK (true);`,
  
  `DROP POLICY IF EXISTS "Allow public insert" ON research_registrations;`,
  `CREATE POLICY "Allow public insert" ON research_registrations FOR INSERT TO anon WITH CHECK (true);`,
  
  `DROP POLICY IF EXISTS "Allow public insert" ON psych_test_results;`,
  `CREATE POLICY "Allow public insert" ON psych_test_results FOR INSERT TO anon WITH CHECK (true);`,
  
  `DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;`,
  `CREATE POLICY "Allow public insert" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);`,
];

async function executeSql(sql) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return true;
  } catch (err) {
    return false;
  }
}

async function setupDatabase() {
  console.log('🚀 開始建立 Supabase 資料庫表...\n');
  
  let successCount = 0;
  
  for (let i = 0; i < SQL_STATEMENTS.length; i++) {
    const stmt = SQL_STATEMENTS[i];
    const display = stmt.substring(0, 60).replace(/\n/g, ' ');
    process.stdout.write(`[${i + 1}/${SQL_STATEMENTS.length}] ${display}... `);
    
    const success = await executeSql(stmt);
    
    if (success) {
      console.log('✅');
      successCount++;
    } else {
      console.log('⚠️');
    }
  }
  
  console.log(`\n✨ 完成！成功執行 ${successCount}/${SQL_STATEMENTS.length} 個語句`);
  
  // 驗證表是否建立成功
  console.log('\n🔍 驗證資料庫連接...');
  if (!ANON_KEY) {
    console.log('⚠️  未設定 NEXT_PUBLIC_SUPABASE_ANON_KEY，略過連線驗證。');
    return;
  }
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    SUPABASE_URL,
    ANON_KEY
  );
  
  try {
    const { data, error } = await supabase
      .from('lecture_registrations')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.error('❌ 資料表仍未建立。請確保 Supabase 連接正常。');
    } else {
      console.log('✅ 資料表已成功建立！報名功能現在應該可以正常使用。');
    }
  } catch (err) {
    console.error('❌ 驗證失敗:', err.message);
  }
}

setupDatabase().catch(console.error);
