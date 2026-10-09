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
          const when = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) + " (Central)";
          const plain = (name ? "Hi " + name + ",\n\n" : "Hello,\n\n") +
            "Thank you for reaching out to Queen E's Heirr. We received your request and will reply by email soon.\n\n" +
            "Here is a copy of what you sent, for your records:\n\n" + lines.join("\n\n") +
            "\n\nSubmitted: " + when + "\n\nQueen E's Heirr\nhttps://queenesheirr.com\n" + TO + "\n";
          MailApp.sendEmail({
            to: replyTo,
            replyTo: TO,
            name: "Queen E's Heirr",
            subject: "We received your request: " + subject,
            body: plain,
            htmlBody: confirmationHtml_(name, subject, keys, fields, when),
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

function esc_(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>");
}

// Branded HTML confirmation. All visitor-supplied text is escaped.
function confirmationHtml_(name, subject, keys, fields, when) {
  const forest = "#1b3b22", gold = "#d4af37", goldDark = "#aa8c2c", cream = "#fcfaf7", linen = "#e5dbd1", muted = "#5c6b5a";
  const serif = "Georgia, 'Times New Roman', serif", sans = "Helvetica, Arial, sans-serif";
  const rows = keys.map(function (k) {
    const v = String(fields[k] || "").slice(0, 2000);
    if (!v) return "";
    return '<tr><td style="padding:10px 14px;border-bottom:1px solid ' + linen + ';font:600 12px ' + sans + ';letter-spacing:.06em;text-transform:uppercase;color:' + goldDark + ';width:34%;vertical-align:top">' + esc_(k.replace(/_/g, " ")) + '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid ' + linen + ';font:15px/1.5 ' + sans + ';color:#0e2012;vertical-align:top">' + esc_(v) + '</td></tr>';
  }).join("");
  const link = function (href, text) { return '<a href="' + href + '" style="color:' + forest + ';font-weight:600;text-decoration:none">' + text + '</a>'; };
  return '' +
  '<div style="margin:0;padding:24px 12px;background:' + cream + '">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ' + linen + ';border-radius:18px;overflow:hidden">' +
    '<tr><td align="center" style="background:' + forest + ';padding:30px 24px 22px">' +
      '<img src="https://queenesheirr.com/images/logo.jpg" alt="Queen E\'s Heirr" width="84" height="84" style="border-radius:50%;border:3px solid ' + gold + ';display:block;margin:0 auto 12px">' +
      '<div style="font:700 26px ' + serif + ';color:#ffffff;letter-spacing:.02em">Queen E\'s Heirr</div>' +
      '<div style="font:italic 14px ' + serif + ';color:' + gold + ';margin-top:4px">Small-batch jams, pickles &amp; good manners</div>' +
    '</td></tr>' +
    '<tr><td style="height:5px;background:' + gold + ';font-size:0;line-height:0">&nbsp;</td></tr>' +
    '<tr><td style="padding:32px 30px 8px">' +
      '<div style="font:700 24px ' + serif + ';color:' + forest + '">Thank you' + (name ? ', ' + esc_(name) : '') + '! &#128081;</div>' +
      '<p style="font:16px/1.6 ' + sans + ';color:#0e2012;margin:14px 0 0">We received your request and a real person will reply by email soon. Keep this message handy &mdash; it is your copy of what you sent.</p>' +
    '</td></tr>' +
    '<tr><td style="padding:18px 30px 6px">' +
      '<div style="font:700 13px ' + sans + ';letter-spacing:.12em;text-transform:uppercase;color:' + muted + ';margin-bottom:8px">Your request &middot; ' + esc_(subject) + '</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + cream + ';border:1px solid ' + linen + ';border-radius:12px">' + rows + '</table>' +
      '<div style="font:12px ' + sans + ';color:' + muted + ';margin-top:8px">Submitted ' + esc_(when) + '</div>' +
    '</td></tr>' +
    '<tr><td style="padding:22px 30px 6px">' +
      '<div style="font:700 18px ' + serif + ';color:' + forest + ';margin-bottom:6px">What happens next</div>' +
      '<p style="font:15px/1.6 ' + sans + ';color:#0e2012;margin:0">We read every request personally and respond within a few business days. If something above needs fixing, just reply to this email.</p>' +
    '</td></tr>' +
    '<tr><td align="center" style="padding:22px 30px 8px">' +
      '<a href="https://queenesheirr.com/shop/" style="display:inline-block;background:' + forest + ';color:#ffffff;font:700 15px ' + sans + ';text-decoration:none;padding:13px 28px;border-radius:999px;border:2px solid ' + gold + '">Browse the shop</a>' +
    '</td></tr>' +
    '<tr><td style="padding:24px 30px 30px">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + '#f7f1d8' + ';border-radius:12px">' +
        '<tr><td style="padding:18px 20px;font:15px/1.9 ' + sans + ';color:#0e2012">' +
          '<div style="font:700 13px ' + sans + ';letter-spacing:.12em;text-transform:uppercase;color:' + goldDark + ';margin-bottom:6px">Stay in touch</div>' +
          '&#9993;&nbsp; ' + link("mailto:" + TO, TO) + '<br>' +
          '&#127760;&nbsp; ' + link("https://queenesheirr.com", "queenesheirr.com") + '<br>' +
          '&#128247;&nbsp; ' + link("https://instagram.com/queenesheirr", "@queenesheirr on Instagram") + '<br>' +
          '&#128153;&nbsp; ' + link("https://facebook.com/queenesheirr", "Queen E\'s Heirr on Facebook") +
        '</td></tr>' +
      '</table>' +
    '</td></tr>' +
    '<tr><td align="center" style="background:' + forest + ';padding:16px 24px;font:12px/1.6 ' + sans + ';color:#cfd8cd">You are receiving this because you submitted a form at queenesheirr.com.<br>&copy; Queen E\'s Heirr, LLC</td></tr>' +
  '</table></div>';
}
