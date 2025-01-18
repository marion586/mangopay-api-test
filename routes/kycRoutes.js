const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');


router.post('/', kycController.createKycDocumentController);
router.post('/pages', kycController.uploadKycDocumentPageController);
router.put('/:userId/kyc/documents/:kycDocumentId', kycController.submitKycDocument);

module.exports = router;
