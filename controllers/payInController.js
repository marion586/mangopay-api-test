// src/controllers/payInController.js
const payInService = require('../services/payInService');

/**
 * Controller to create a direct bank wire PayIn
 */
const createPayIn = async (req, res) => {
  try {
    const payInData = req.body; // PayIn data from request body
    const createdPayIn = await payInService.createPayIn(payInData);

    if (!createdPayIn) {
      return res.status(500).json({ message: 'Failed to create PayIn.' });
    }

    return res.status(201).json(createdPayIn);
  } catch (error) {
    console.error('Error in createPayIn:', error);
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

/**
 * Controller to retrieve a direct bank wire PayIn
 */
const getPayIn = async (req, res) => {
  try {
    const { payInId } = req.params; // PayIn ID from URL params
    const payInDetails = await payInService.getPayIn(payInId);

    if (!payInDetails) {
      return res.status(404).json({ message: 'PayIn not found.' });
    }

    return res.status(200).json(payInDetails);
  } catch (error) {
    console.error('Error in getPayIn:', error);
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

module.exports = {
    getPayIn,createPayIn
}