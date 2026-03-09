const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eeupyvtuzusehtyuecgd.supabase.co';
const anonKey = 'sb_publishable_Na8YOzbo2uwM22Nxf9u7Sw_MrbiTDCQ';

console.log('Supabase URL:', supabaseUrl);
console.log('Anon Key:', anonKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, anonKey);

async function diagnoseRLS() {
  console.log('\n🔍 診斷 RLS 策略...\n');
  
  // 1. 檢查表是否存在
  console.log('1️⃣  檢查表是否存在...');
  try {
    const { data, error } = await supabase
      .from('lecture_registrations')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log('❌ 表不存在');
      return;
    }
    console.log('✅ 表存在');
  } catch (err) {
    console.log('❌ 錯誤:', err.message);
    return;
  }
  
  // 2. 直接嘗試插入
  console.log('\n2️⃣  嘗試插入測試數據...');
  try {
    const { data, error } = await supabase
      .from('lecture_registrations')
      .insert({
        lecture_id: 'diag-001',
        lecture_title: '診斷講座',
        user_name: '診斷用戶',
        user_email: `test-${Date.now()}@example.com`,
        user_phone: '0911111111'
      })
      .select();
    
    if (error) {
      console.log('❌ 插入失敗');
      console.log('   錯誤代碼:', error.code);
      console.log('   錯誤訊息:', error.message);
      
      if (error.message.includes('RLS') || error.message.includes('policy')) {
        console.log('\n💡 RLS 策略問題。請檢查：');
        console.log('   - 是否執行了 DROP/CREATE POLICY 語句');
        console.log('   - Policy 名稱是否正確（allow_public_insert）');
        console.log('   - 是否使用了 "WITH CHECK (true)"');
      }
    } else {
      console.log('✅ 插入成功！');
      console.log('   ID:', data[0].id);
      console.log('   Email:', data[0].user_email);
    }
  } catch (err) {
    console.log('❌ 異常:', err.message);
  }
}

diagnoseRLS().catch(console.error);
