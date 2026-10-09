// Queen E's Heirr: website form handler.
// Emails every request to the shop and logs it in one Google Sheet (created automatically), one tab per form.

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
          const isList = /mailing list/i.test(subject);
          const unsubUrl = unsubscribeUrl_(replyTo);
          const plain = isList
            ? (name ? "Hi " + name + ",\n\n" : "Hello,\n\n") + "You're on the Queen E's Heirr mailing list. Thank you! We'll send occasional news about new flavors, classes, and recipes. Unsubscribe any time: " + unsubUrl + "\n\nQueen E's Heirr\nhttps://queenesheirr.com\n" + TO + "\n"
            : (name ? "Hi " + name + ",\n\n" : "Hello,\n\n") +
            "Thank you for reaching out to Queen E's Heirr. We received your request and will reply by email soon.\n\n" +
            "Here is a copy of what you sent, for your records:\n\n" + lines.join("\n\n") +
            "\n\nSubmitted: " + when + "\n\nQueen E's Heirr\nhttps://queenesheirr.com\n" + TO + "\n";
          MailApp.sendEmail({
            to: replyTo,
            replyTo: TO,
            name: "Queen E's Heirr",
            subject: isList ? "Welcome to the Queen E's Heirr list" : "We received your request: " + subject,
            body: plain,
            htmlBody: confirmationHtml_(name, subject, keys, fields, when, isList, unsubUrl),
          });
        }
      } catch (ignore) {}
    }

    // One tab per form (named after the form), one column per field.
    const ss = spreadsheet_();
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
    if (/mailing list/i.test(subject) && replyTo) addSubscriber_(String(fields.name || "").slice(0, 100), replyTo);
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
function confirmationHtml_(name, subject, keys, fields, when, isList, unsubUrl) {
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
      '<div style="font:italic 14px ' + serif + ';color:' + gold + ';margin-top:4px">Curating Culture &amp; Confections</div>' +
    '</td></tr>' +
    '<tr><td style="height:5px;background:' + gold + ';font-size:0;line-height:0">&nbsp;</td></tr>' +
    '<tr><td style="padding:32px 30px 8px">' +
      '<div style="font:700 24px ' + serif + ';color:' + forest + '">Thank you' + (name ? ', ' + esc_(name) : '') + '! &#128081;</div>' +
      '<p style="font:16px/1.6 ' + sans + ';color:#0e2012;margin:14px 0 0">' + (isList ? 'You are on the list! We will send occasional news about new flavors, class dates, and recipes.' : 'We received your request and a real person will reply by email soon. Keep this message handy &mdash; it is your copy of what you sent.') + '</p>' +
    '</td></tr>' +
    '<tr><td style="padding:18px 30px 6px">' +
      '<div style="font:700 13px ' + sans + ';letter-spacing:.12em;text-transform:uppercase;color:' + muted + ';margin-bottom:8px">' + (isList ? 'Your signup' : 'Your request') + ' &middot; ' + esc_(subject) + '</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + cream + ';border:1px solid ' + linen + ';border-radius:12px">' + rows + '</table>' +
      '<div style="font:12px ' + sans + ';color:' + muted + ';margin-top:8px">Submitted ' + esc_(when) + '</div>' +
    '</td></tr>' +
    '<tr><td style="padding:22px 30px 6px">' +
      '<div style="font:700 18px ' + serif + ';color:' + forest + ';margin-bottom:6px">' + (isList ? 'Good to know' : 'What happens next') + '</div>' +
      '<p style="font:15px/1.6 ' + sans + ';color:#0e2012;margin:0">' + (isList ? 'Changed your mind? You can <a href="' + esc_(unsubUrl || "#") + '" style="color:' + forest + ';font-weight:600">unsubscribe here</a> any time, and you will be removed right away.' : 'We read every request personally and respond within a few business days. If something above needs fixing, just reply to this email.') + '</p>' +
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
    '<tr><td align="center" style="background:' + forest + ';padding:16px 24px;font:12px/1.6 ' + sans + ';color:#cfd8cd">You are receiving this because you submitted a form at queenesheirr.com.' + (isList && unsubUrl ? ' <a href="' + esc_(unsubUrl) + '" style="color:#d4af37">Unsubscribe</a>' : '') + '<br>&copy; Queen E\'s Heirr, LLC</td></tr>' +
  '</table></div>';
}

// One spreadsheet for every form, created on first use (one tab per form). Its link is in the script's properties.
function spreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("SHEET_ID");
  if (id) { try { return SpreadsheetApp.openById(id); } catch (err) { /* recreate below */ } }
  const ss = SpreadsheetApp.create("Queen E's Heirr - Website Submissions");
  props.setProperty("SHEET_ID", ss.getId());
  return ss;
}

// Run this once from the editor to authorize spreadsheet access and see the spreadsheet's link in the log.
function setup() {
  Logger.log(spreadsheet_().getUrl());
}

// ---------- Mailing list ----------
// "Subscribers" tab: Subscribed on | Name | Email | Status (subscribed / unsubscribed) | Updated

function subscribersSheet_() {
  const ss = spreadsheet_();
  let sh = ss.getSheetByName("Subscribers");
  if (!sh) {
    sh = ss.insertSheet("Subscribers");
    sh.appendRow(["Subscribed on", "Name", "Email", "Status", "Updated"]);
  }
  return sh;
}

function findSubscriberRow_(sh, email) {
  const vals = sh.getDataRange().getValues();
  for (let i = 1; i < vals.length; i++) if (String(vals[i][2]).toLowerCase() === email.toLowerCase()) return i + 1;
  return 0;
}

function addSubscriber_(name, email) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = subscribersSheet_();
    const safe = function (v) { v = String(v).slice(0, 200); return /^[=+\-@]/.test(v) ? "'" + v : v; };
    const row = findSubscriberRow_(sh, email);
    if (row) { sh.getRange(row, 4, 1, 2).setValues([["subscribed", new Date()]]); }
    else sh.appendRow([new Date(), safe(name), email, "subscribed", new Date()]);
  } finally { lock.releaseLock(); }
}

function secret_() {
  const props = PropertiesService.getScriptProperties();
  let k = props.getProperty("UNSUB_SECRET");
  if (!k) { k = Utilities.getUuid() + Utilities.getUuid(); props.setProperty("UNSUB_SECRET", k); }
  return k;
}

function token_(email) {
  const sig = Utilities.computeHmacSha256Signature(email.toLowerCase(), secret_());
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, "");
}

function unsubscribeUrl_(email) {
  return ScriptApp.getService().getUrl() + "?a=unsub&e=" + encodeURIComponent(email) + "&t=" + token_(email);
}

// Called by the confirmation page's button (google.script.run). Only works with a valid signed token.
function unsubscribe_(email, t) {
  if (!email || t !== token_(email)) return false;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = subscribersSheet_();
    const row = findSubscriberRow_(sh, email);
    if (row) sh.getRange(row, 4, 1, 2).setValues([["unsubscribed", new Date()]]);
    return true;
  } finally { lock.releaseLock(); }
}

// Opening the link shows a page with a button, so email link scanners can't unsubscribe anyone by accident.
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.a !== "unsub" || !p.e || !p.t) return HtmlService.createHtmlOutput("Queen E's Heirr form service.");
  const email = String(p.e).slice(0, 200), t = String(p.t);
  const j = function (v) { return JSON.stringify(v).replace(/</g, "\\u003c"); };
  const html = '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<body style="margin:0;background:#fcfaf7;font-family:Helvetica,Arial,sans-serif;color:#0e2012">' +
    '<div style="max-width:480px;margin:48px auto;background:#fff;border:1px solid #e5dbd1;border-radius:18px;overflow:hidden;text-align:center">' +
    '<div style="background:#1b3b22;color:#fff;padding:24px;font:700 24px Georgia,serif">Queen E\'s Heirr</div>' +
    '<div style="height:5px;background:#d4af37"></div><div style="padding:28px 24px">' +
    '<h2 id="h" style="font-family:Georgia,serif;color:#1b3b22;margin:0 0 10px">Unsubscribe from our emails?</h2>' +
    '<p id="m" style="line-height:1.6">' + esc_(email) + '</p>' +
    '<button id="b" style="background:#1b3b22;color:#fff;border:2px solid #d4af37;border-radius:999px;padding:12px 28px;font:700 15px Helvetica,Arial,sans-serif;cursor:pointer">Yes, unsubscribe me</button>' +
    '</div></div><script>' +
    'document.getElementById("b").onclick=function(){this.disabled=true;google.script.run' +
    '.withSuccessHandler(function(ok){document.getElementById("h").textContent=ok?"You are unsubscribed":"That link is not valid";' +
    'document.getElementById("m").textContent=ok?"You will not receive any more emails from us. Sorry to see you go!":"Please email info@queenesheirr.com and we will remove you.";' +
    'document.getElementById("b").style.display="none";})' +
    '.withFailureHandler(function(){document.getElementById("m").textContent="Something went wrong. Please email info@queenesheirr.com.";})' +
    '.unsubscribe_(' + j(email) + ',' + j(t) + ');};</script>';
  return HtmlService.createHtmlOutput(html).setTitle("Unsubscribe - Queen E's Heirr");
}

// To email the list: fill in the "Newsletter" tab (B1 = subject, B2 = message text), then run sendNewsletter.
// Sends one email per person who is still "subscribed", each with their own unsubscribe link.
function sendNewsletter() {
  const ss = spreadsheet_();
  let nl = ss.getSheetByName("Newsletter");
  if (!nl) {
    nl = ss.insertSheet("Newsletter");
    nl.getRange("A1:A2").setValues([["Subject"], ["Message"]]);
    nl.getRange("B1").setValue("Your subject here");
    nl.getRange("B2").setValue("Write your message here.");
    Logger.log("Created the Newsletter tab. Fill in B1 and B2, then run sendNewsletter again.");
    return;
  }
  const subject = String(nl.getRange("B1").getValue()).trim();
  const message = String(nl.getRange("B2").getValue()).trim();
  if (!subject || !message) throw new Error("Fill in B1 (subject) and B2 (message) on the Newsletter tab.");
  const rows = subscribersSheet_().getDataRange().getValues().slice(1).filter(function (r) { return r[3] === "subscribed" && r[2]; });
  if (rows.length > MailApp.getRemainingDailyQuota()) throw new Error("Not enough daily email quota for " + rows.length + " subscribers. Try again tomorrow.");
  rows.forEach(function (r) {
    const email = String(r[2]), name = String(r[1] || "").split(" ")[0];
    const url = unsubscribeUrl_(email);
    MailApp.sendEmail({
      to: email, replyTo: TO, name: "Queen E's Heirr", subject: subject,
      body: (name ? "Hi " + name + ",\n\n" : "") + message + "\n\n--\nQueen E's Heirr | https://queenesheirr.com\nUnsubscribe: " + url + "\n",
      htmlBody: '<div style="font:16px/1.6 Helvetica,Arial,sans-serif;color:#0e2012;max-width:560px">' + (name ? "<p>Hi " + esc_(name) + ",</p>" : "") +
        "<p>" + esc_(message) + "</p><hr style=\"border:0;border-top:1px solid #e5dbd1\"><p style=\"font-size:13px;color:#5c6b5a\">Queen E's Heirr &middot; <a href=\"https://queenesheirr.com\">queenesheirr.com</a><br><a href=\"" + esc_(url) + "\">Unsubscribe</a></p></div>",
    });
  });
  Logger.log("Sent to " + rows.length + " subscribers.");
}
