const { createClient } = require('@supabase/supabase-js');
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing env. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only).'
  );
  process.exit(1);
}

// 使用 service role key 執行 SQL
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

async function setupDatabase() {
  const sqlStatements = [
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
    
    `CREATE INDEX IF NOT EXISTS idx_lecture_registrations_email ON lecture_registrations(user_email);`,
    `CREATE INDEX IF NOT EXISTS idx_research_registrations_email ON research_registrations(user_email);`,
    `CREATE INDEX IF NOT EXISTS idx_psych_test_results_email ON psych_test_results(user_email);`,
    `CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);`,
    `CREATE INDEX IF NOT EXISTS idx_lecture_registrations_created ON lecture_registrations(created_at DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_research_registrations_created ON research_registrations(created_at DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_psych_test_results_created ON psych_test_results(created_at DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created ON newsletter_subscribers(created_at DESC);`,
    
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

  for (let i = 0; i < sqlStatements.length; i++) {
    const stmt = sqlStatements[i];
    console.log(`\n[${i + 1}/${sqlStatements.length}] 執行: ${stmt.substring(0, 50)}...`);
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: stmt });
      
      if (error) {
        // 嘗試用 query 參數
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'POST',
          headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: stmt })
        });
        
        if (!response.ok) {
          console.error(`❌ 失敗: ${response.status} ${response.statusText}`);
          console.error(await response.text());
        } else {
          console.log('✅ 成功');
        }
      } else {
        console.log('✅ 成功');
      }
    } catch (err) {
      console.error(`❌ 錯誤: ${err.message}`);
    }
  }
  
  console.log('\n🎉 資料庫設定完成！');
}

setupDatabase().catch(console.error);
