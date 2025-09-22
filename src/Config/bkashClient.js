const axios = require("axios");

const baseURL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
const appKey = "sandboxAppKey";
const appSecret = "sandboxAppSecret";
const username = "sandboxUser";
const password = "sandboxPass";

// Generate token
async function getToken() {
  const res = await axios.post(`${baseURL}/token/grant`, {
    app_key: appKey,
    app_secret: appSecret,
  }, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data.id_token;
}

module.exports = { baseURL, appKey, appSecret, username, password, getToken };