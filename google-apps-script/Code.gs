/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  GOOGLE APPS SCRIPT - PORTFOLIO CONTACT FORM BACKEND             ║
 * ║  Recipient: BALAKRISHNAN S (balasathish658@gmail.com)            ║
 * ║  Target Sheet: 1rxnJNKvj8wR1mjrVXm7w7uu43WVot3LrhvaVVcv4sow      ║
 * ║  Includes: Name, Email, Mobile No, Message, Timestamp            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

const RECIPIENT_EMAIL = "balasathish658@gmail.com";
const SPREADSHEET_ID = "1rxnJNKvj8wR1mjrVXm7w7uu43WVot3LrhvaVVcv4sow";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

    // If the sheet is empty, set clean formatted headers
    if (sheet.getLastRow() === 0) {
      const headers = ["Name", "Email", "Mobile No", "Message", "Time (IST)"];
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#7B2CFF");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    let payload = {};
    if (e && e.parameter && (e.parameter.name || e.parameter.email || e.parameter.phone || e.parameter.message)) {
      payload = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const name = (payload.name || "").trim() || "Anonymous Sender";
    const email = (payload.email || "").trim() || "No Email Provided";
    const phone = (payload.phone || "").trim() || "Not Provided";
    const message = (payload.message || "").trim() || "No Message Provided";
    const timestamp = new Date();
    const formattedDateIST = Utilities.formatDate(timestamp, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'");

    // Appends in order: [Name, Email, Mobile No, Message, Time]
    sheet.appendRow([name, email, phone, message, formattedDateIST]);

    // Send Gmail Notification to Balakrishnan
    try {
      const subject = `🚀 New Portfolio Inquiry: ${name} (${phone})`;
      const plainBody = `Name: ${name}\nEmail: ${email}\nMobile: ${phone}\nDate: ${formattedDateIST}\n\nMessage:\n${message}\n\nGoogle Sheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 2px solid #7B2CFF; border-radius: 16px; background-color: #090014; color: #FFFFFF;">
          <h2 style="color: #A855F7; margin-top: 0;">New Contact Form Submission</h2>
          <hr style="border: 1px solid rgba(192,132,252,0.3); margin: 20px 0;" />
          <p><strong style="color: #C084FC;">Name:</strong> ${name}</p>
          <p><strong style="color: #C084FC;">Email:</strong> <a href="mailto:${email}" style="color: #A855F7;">${email}</a></p>
          <p><strong style="color: #C084FC;">Mobile No:</strong> <a href="tel:${phone}" style="color: #A855F7; font-weight: bold;">${phone}</a></p>
          <p><strong style="color: #C084FC;">Submission Time:</strong> ${formattedDateIST}</p>
          <div style="margin-top: 15px; padding: 16px; background-color: #1B1035; border-radius: 10px; border-left: 4px solid #7B2CFF;">
            <strong style="color: #C084FC;">Message / Scope:</strong>
            <p style="white-space: pre-wrap; margin-top: 8px; color: #FFFFFF; font-size: 15px; line-height: 1.5;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit" style="display: inline-block; padding: 12px 24px; background: #7B2CFF; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: bold; box-shadow: 0 4px 15px rgba(123,44,255,0.5);">Open Google Sheet</a>
          </div>
        </div>
      `;

      GmailApp.sendEmail(RECIPIENT_EMAIL, subject, plainBody, {
        htmlBody: htmlBody,
        replyTo: email
      });
    } catch (mailErr) {
      Logger.log("Email Notification Warning: " + mailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Recorded successfully!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    owner: "BALAKRISHNAN S",
    sheet: "1rxnJNKvj8wR1mjrVXm7w7uu43WVot3LrhvaVVcv4sow (Mobile Enabled)"
  })).setMimeType(ContentService.MimeType.JSON);
}
