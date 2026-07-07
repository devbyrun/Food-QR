/**
 * ติดตั้งร้านสบายพุงครั้งแรก
 * 1) แก้ ADMIN_* ด้านล่าง
 * 2) กด Run ฟังก์ชัน firstInstall
 * 3) ดู Execution log เพื่อเปิด Google Sheet ทั้ง 2 ไฟล์
 */
const INSTALL = {
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'CHANGE_ME_1234',
  ADMIN_NAME: 'เจ้าของร้าน'
};

function firstInstall() {
  if (INSTALL.ADMIN_PASSWORD === 'CHANGE_ME_1234') {
    throw new Error('กรุณาเปลี่ยน INSTALL.ADMIN_PASSWORD ใน Install.gs ก่อนติดตั้ง');
  }

  const result = createSystemSpreadsheets(
    INSTALL.ADMIN_USERNAME,
    INSTALL.ADMIN_PASSWORD,
    INSTALL.ADMIN_NAME
  );

  if (typeof TELEGRAM_DATA !== 'undefined' && TELEGRAM_DATA.some(item => item.telegramToken || item.chatID)) {
    result.telegram = setTelegramConfig(TELEGRAM_DATA);
  }

  console.log(JSON.stringify(result, null, 2));
  return result;
}

/**
 * ใช้กรณีมี Google Sheet 2 ไฟล์อยู่แล้ว
 * ใส่ ID แล้วกด Run ฟังก์ชัน installWithExistingSheets
 */
const EXISTING_SHEETS = {
  AUTH_SHEET_ID: 'PUT_AUTH_SHEET_ID_HERE',
  DATA_SHEET_ID: 'PUT_DATA_SHEET_ID_HERE'
};

function installWithExistingSheets() {
  if (EXISTING_SHEETS.AUTH_SHEET_ID.indexOf('PUT_') === 0 ||
      EXISTING_SHEETS.DATA_SHEET_ID.indexOf('PUT_') === 0) {
    throw new Error('กรุณาใส่ Sheet ID ทั้ง 2 อันใน Install.gs');
  }
  if (INSTALL.ADMIN_PASSWORD === 'CHANGE_ME_1234') {
    throw new Error('กรุณาเปลี่ยน INSTALL.ADMIN_PASSWORD ใน Install.gs ก่อนติดตั้ง');
  }

  setSpreadsheetIds(EXISTING_SHEETS.AUTH_SHEET_ID, EXISTING_SHEETS.DATA_SHEET_ID);
  const result = setupSystem(INSTALL.ADMIN_USERNAME, INSTALL.ADMIN_PASSWORD, INSTALL.ADMIN_NAME);
  if (typeof TELEGRAM_DATA !== 'undefined' && TELEGRAM_DATA.some(item => item.telegramToken || item.chatID)) {
    setTelegramConfig(TELEGRAM_DATA);
  }
  console.log(result);
  return result;
}
