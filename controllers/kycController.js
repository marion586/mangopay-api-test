const kycService = require('../services/kycService');

const createKycDocumentController = async (req, res) => {
    const { userId, type, tag } = req.body;

    if (!userId || !type) {
        return res.status(400).json({ error: 'UserId and Type are required fields' });
    }

    const kycDocument = {
        Type: type,
        Tag: tag || 'Created by the NodeJs SDK',
    };
    console.log(kycDocument , userId)
    try {
        const response = await kycService.createKycDocument(userId, kycDocument);
        return res.status(201).json(response);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Failed to create KYC document' });
    }
};

/**
 * Upload a page to a KYC Document
 */
const uploadKycDocumentPageController = async (req, res) => {
    const { userId, kycDocumentId, file } = req.body;

    if (!userId || !kycDocumentId || !file) {
        return res.status(400).json({ error: 'userId, kycDocumentId, and file are required' });
    }

    try {
        const response = await kycService.uploadKycDocumentPage(userId, kycDocumentId, file);
        
        return res.status(204).json(response); // 204 for successful upload
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Failed to upload KYC document page' });
    }
};
const submitKycDocument = async (req, res) => {
  const { userId, kycDocumentId } = req.params;
  const kycDocument = { Id: kycDocumentId, Status: 'VALIDATION_ASKED' };
    console.log(kycDocument)
  try {
    const response = await kycService.uploadKycDocumentPage(userId, kycDocument);
    res.status(200).json(response);
  } catch (err) {
    console.error('Error submitting KYC document:', err);
    res.status(500).json({ error: 'Failed to submit KYC document' });
  }
};


module.exports = {
    createKycDocumentController,
    uploadKycDocumentPageController,
    submitKycDocument
};
