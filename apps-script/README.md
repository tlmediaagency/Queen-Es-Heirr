# Form handler (Google Apps Script)

1. In Google Sheets (signed in as info@queenesheirr.com) create a new sheet named "Queen E's Requests" (each form gets its own tab inside it).
2. Extensions -> Apps Script. Delete the starter code, paste in `Code.gs`, Save.
3. Deploy -> New deployment -> type "Web app". Execute as: Me. Who has access: Anyone. Deploy, then approve the permissions (send email, edit this spreadsheet).
4. Copy the Web app URL (ends in /exec) into `FORM_ENDPOINT` in `js/config.js`.
5. If you change the code later: Deploy -> Manage deployments -> edit -> New version.

## Spreadsheet and mailing list

The script now creates its own spreadsheet ("Queen E's Heirr - Website Submissions") the first time it runs and
logs every form there, one tab per form (the footer signup goes to the "Mailing list signup" tab).
After pasting new code, run the `setup` function once from the editor (it asks for spreadsheet permission and
logs the sheet's link). Then deploy a new version (Deploy > Manage deployments > pencil > New version).
Each submitter also receives an HTML confirmation email; mailing-list signups get a welcome version.
