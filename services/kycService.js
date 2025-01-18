const getMangopayInstance = require("../utils/mangopayInstance");
const {encodeFileToBase64} =require("../utils/uploadFile")
var path = require('path')
const createKycDocument = async (userId, kycDocument) => {
    try {
        const mangopay = await getMangopayInstance();
        const response = await mangopay.Users.createKycDocument(userId, kycDocument);
        return response;
    } catch (error) {
        console.error('Error creating KYC document:', error);
        throw new Error('Failed to create KYC document');
    }
};

/**
 * Upload a file to a KYC Document
 * @param {string} userId - The unique identifier of the user
 * @param {string} kycDocumentId - The unique identifier of the KYC document
 * @param {string} fileBase64 - Base64 encoded file content
 */



const filePath = path.join(__dirname, '../uploads/example.txt')

const uploadKycDocumentPage = async (userId, kycDocumentId, fileBase64) => {
    try {

        const filebase = encodeFileToBase64(filePath)
   
        const mangopay = await getMangopayInstance();
        

        let myHook = {
            EventType: 'KYC_SUCCEEDED',
            Url: 'http://api.mangopay.local/webhooks/kyc',
            Tag: 'Created using Mangopay NodeJS SDK',
        }

        await mangopay.Hooks.create(myHook)
                .then((response) => {
                console.info(response)
                
                })
                .catch((err) => {
                console.log(err)
                
                })
        await mangopay.Users.createKycPageFromFile(userId, kycDocumentId, filebase);
        return { message: 'File uploaded successfully' };
    } catch (error) {
        console.error('Error uploading KYC document page:', error);
        throw new Error(error.message || 'Failed to upload KYC document page');
    }
};
const submitKycDocumentService = async (userId, kycDocumentId) => {
  const kycDocument = { Id: kycDocumentId, Status: 'VALIDATION_ASKED' };

  try {

    const mangopay = await getMangopayInstance();
    const response = await mangopay.Users.updateKycDocument(userId, kycDocument);
    return response;
  } catch (err) {
    throw new Error('Failed to submit KYC document');
  }
};
module.exports = {
    createKycDocument,
    uploadKycDocumentPage,
    submitKycDocumentService
};
