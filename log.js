const credsRaw = process.env.GDRIVE_CREDENTIALS;

console.log("Credenciais existem?", credsRaw);

const credentials = JSON.parse(credsRaw);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});