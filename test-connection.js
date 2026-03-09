const { createClient } = require('@supabase/supabase-js');

// 直接使用 Supabase SDK 插入測試數據，驗證連接
async function testConnection() {
  const supabase = createClient(
    'https://eeupyvtuzusehtyuecgd.supabase.co',
    'sb_publishable_Na8YOzbo2uwM22Nxf9u7Sw_MrbiTDCQ'
  );

  console.log('🔍 測試 Supabase 連接...\n');

  // 測試插入講座報名
  try {
    const { data, error } = await supabase
      .from('lecture_registrations')
      .insert({
        lecture_id: 'test-001',
        lecture_title: '測試講座',
        user_name: '測試用戶',
        user_email: 'test@example.com',
        user_phone: '0912345678'
      })
      .select();

    if (error) {
      console.error('❌ 講座報名失敗:', error.message);
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('\n💡 提示: 資料表不存在。需要在 Supabase 儀表板手動運行 SQL:');
        console.log('\n1. 進入 https://app.supabase.com');
        console.log('2. 選擇你的 Project');
        console.log('3. 左側菜單 → SQL Editor');
        console.log('4. 複製粘貼 supabase-schema.sql 的內容執行');
      }
    } else {
      console.log('✅ 講座報名成功，資料已插入:', data[0]);
    }
  } catch (err) {
    console.error('❌ 連接錯誤:', err.message);
  }

  // 測試插入研究報名
  try {
    const { data, error } = await supabase
      .from('research_registrations')
      .insert({
        video_url: 'https://example.com/video',
        video_title: '測試影片',
        user_name: '測試用戶',
        user_email: 'test@example.com',
        interest_note: '測試備註'
      })
      .select();

    if (error) {
      console.error('❌ 研究報名失敗:', error.message);
    } else {
      console.log('✅ 研究報名成功:', data[0]);
    }
  } catch (err) {
    console.error('❌ 連接錯誤:', err.message);
  }
}

testConnection().catch(console.error);
