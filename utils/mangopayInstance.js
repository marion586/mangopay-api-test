const mangopay = require("mangopay2-nodejs-sdk");

const getMangopayInstance = () => {
  return new mangopay({
    clientId: process.env.MANGOPAY_CLIENT_ID,
    clientApiKey: process.env.MANGOPAY_API_KEY,
    baseUrl: process.env.MANGOPAY_BASE_URL,
  });
};

module.exports = getMangopayInstance;
