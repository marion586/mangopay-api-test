// src/services/payInService.js
const getMangopayInstance = require("../utils/mangopayInstance");
/**
 * Service to create a direct bank wire PayIn
 * @param {Object} payInData - PayIn data from the controller
 * @returns {Object} Created PayIn response from Mangopay API
 */
exports.createPayIn = async (payInData) => {
  try {
     const mangopay = await getMangopayInstance();
    const response = await mangopay.PayIns.create(payInData);
    return response;
  } catch (error) {
    console.error('Error in createPayIn service:', error);
    return null;
  }
};
exports.createDirectCardPayIn = async (payinData) => {
  try {
    // Creating the PayIn via the Mangopay API
     const mangopay = await getMangopayInstance();
    const response = await mangopay.PayIns.create(payinData);
    return response;
  } catch (error) {
    console.error('Error creating Direct Card PayIn:', error);
    throw new Error('Failed to create Direct Card PayIn');
  }
};

/**
 * Service to retrieve a direct bank wire PayIn
 * @param {String} payInId - PayIn ID
 * @returns {Object} PayIn details from Mangopay API
 */
exports.getPayIn = async (payInId) => {
  try {
     const mangopay = await getMangopayInstance();
    const response = await mangopay.PayIns.get(payInId);
    return response;
  } catch (error) {
    console.error('Error in getPayIn service:', error);
    return null;
  }
};
