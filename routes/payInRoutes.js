// src/routes/payInRoutes.js
const express = require('express');
const payInController = require('../controllers/payInController');

const router = express.Router();

// Route to create a direct bank wire PayIn
router.post('/', payInController.createPayIn);

// Route to retrieve a specific direct bank wire PayIn
router.get('/:payInId', payInController.getPayIn);
router.post('/direct-card-payin', payInController.createDirectCardPayInController);


module.exports = router;
