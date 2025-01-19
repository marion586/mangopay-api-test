const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

/**
 * POST route to create a card registration
 * Expects body data: { userId, currency, cardType }
 */
router.post('/', cardController.createCardRegistrationController);
router.put('/', cardController.updateCardRegistration);

module.exports = router;