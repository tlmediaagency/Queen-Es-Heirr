// Queen E's Heirr: website form handler.
// Emails every request to the shop and logs it in the Google Sheet this script is attached to, one tab per form.

const TO = "info@queenesheirr.com";

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

    // Confirmation copy to the person who submitted (best effort; never blocks the request).
    // Limited to one per address per hour so the form can't be used to spam someone.
    if (replyTo) {
      try {
        const cache = CacheService.getScriptCache();
        const key = "conf:" + replyTo.toLowerCase().slice(0, 200);
        if (!cache.get(key)) {
          cache.put(key, "1", 3600);
          const name = String(fields.name || "").replace(/[\r\n]+/g, " ").slice(0, 80);
          MailApp.sendEmail({
            to: replyTo,
            replyTo: TO,
            name: "Queen E's Heirr",
            subject: "We received your request: " + subject,
            body: (name ? "Hi " + name + ",\n\n" : "Hello,\n\n") +
              "Thank you for reaching out to Queen E's Heirr. We received your request and will reply by email soon.\n\n" +
              "Here is a copy of what you sent, for your records:\n\n" +
              lines.join("\n\n") +
              "\n\nSubmitted: " + new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) + " (Central)\n\n" +
              "If anything above needs correcting, just reply to this email.\n\n" +
              "Queen E's Heirr\nhttps://queenesheirr.com\n" + TO + "\n",
          });
        }
      } catch (ignore) {}
    }

    // One tab per form (named after the form), one column per field.
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      const tab = subject.replace(/[\[\]\*\?\:\/\\]/g, " ").slice(0, 90);
      const sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);
      if (sheet.getLastRow() === 0) sheet.appendRow(["Received"].concat(keys.map(function (k) { return k.replace(/_/g, " "); })));
      const header = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
      const safe = function (v) { v = String(v).slice(0, 4000); return /^[=+\-@]/.test(v) ? "'" + v : v; }; // block formula injection
      const row = header.map(function (h, i) {
        if (i === 0) return new Date();
        const k = keys.filter(function (key) { return key.replace(/_/g, " ") === h; })[0];
        return k ? safe(fields[k]) : "";
      });
      sheet.appendRow(row);
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false });
  }
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
