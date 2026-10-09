// Queen E's Heirr: website form handler.
// Emails every request to the shop and logs it in the Google Sheet this script is attached to.

const TO = "info@queenesheirr.com";
const SHEET_NAME = "Requests";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const fields = data.fields || {};
    if (fields.website) return out_({ ok: true }); // honeypot: bots fill this hidden field

    const subject = String(data.subject || "Website request").replace(/[\r\n]+/g, " ").slice(0, 100);
    const keys = Object.keys(fields).filter(function (k) { return k !== "website"; }).slice(0, 30);
    const lines = keys.map(function (k) {
      return k.replace(/_/g, " ") + ": " + String(fields[k]).slice(0, 4000);
    });
    const replyTo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email || "") ? fields.email : "";

    const opts = {
      to: TO,
      subject: "[queenesheirr.com] " + subject,
      body: lines.join("\n\n") + "\n\nPage: " + String(data.page || "").slice(0, 200),
    };
    if (replyTo) opts.replyTo = replyTo;
    MailApp.sendEmail(opts);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      const safe = function (v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }; // block spreadsheet formula injection
      sheet.appendRow([new Date(), safe(subject), safe(lines.join(" | ").slice(0, 45000))]);
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false });
  }
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
