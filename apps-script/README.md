# Form handler (Google Apps Script)

1. In Google Sheets (signed in as info@queenesheirr.com) create a new sheet named "Queen E's Requests" (each form gets its own tab inside it).
2. Extensions -> Apps Script. Delete the starter code, paste in `Code.gs`, Save.
3. Deploy -> New deployment -> type "Web app". Execute as: Me. Who has access: Anyone. Deploy, then approve the permissions (send email, edit this spreadsheet).
4. Copy the Web app URL (ends in /exec) into `FORM_ENDPOINT` in `js/config.js`.
5. If you change the code later: Deploy -> Manage deployments -> edit -> New version.
