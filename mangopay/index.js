const mangopay = require("mangopay2-nodejs-sdk");

module.exports = async (clientId, clientApiKey, baseUrl) => {
  return await new mangopay({
    clientId,
    clientApiKey,
    baseUrl,
  });
};
