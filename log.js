require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");

const credentials = process.env.GDRIVE_CREDENTIALS
  ? JSON.parse(process.env.GDRIVE_CREDENTIALS)
  : JSON.parse(fs.readFileSync("credentials.json"));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

async function run() {
  const client = await auth.getClient();

  const sheets = google.sheets({ version: "v4", auth: client });

  const agora = "local " + new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "A:A",
    valueInputOption: "RAW",
    requestBody: {
      values: [[agora]]
    }
  });

  console.log("Hora registrada:", agora);
}

run();