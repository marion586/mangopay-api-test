
const cardService = require('../services/cardService');

/**
 * Controller function to handle the card registration request
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createCardRegistrationController = async (req, res) => {
  const { userId, currency = 'EUR', cardType = 'CB_VISA_MASTERCARD' } = req.body;

  const userCardRegistration = {
    UserId: userId,
    Currency: currency,
    CardType: cardType,
  };

  try {
    const response = await cardService.processCardRegistrationAndTokenization(userCardRegistration);
    res.status(201).json(response); // Respond with the response from Mangopay
  } catch (error) {
    res.status(500).json({ message: 'Error creating card registration', error: error.message });
  }
};
const updateCardRegistration = async (req, res) => {
    try {
        const cardRegistration = req.body;  // Expecting the card registration data in the body
        
        const updatedCardRegistration = await cardService.updateCardRegistration(cardRegistration);

        if (updatedCardRegistration) {
            res.status(200).json({
                message: 'Card registration updated successfully',
                data: updatedCardRegistration
            });
        } else {
            res.status(500).json({ message: 'Failed to update card registration' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
  createCardRegistrationController,
  updateCardRegistration
};