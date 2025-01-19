const getMangopayInstance = require("../utils/mangopayInstance");
const axios = require("axios")
const qs = require('qs'); 
/**
 * Function to create a card registration with Mangopay
 * @param {Object} cardRegistration - The card registration object
 * @returns {Promise<Object>} - The response from Mangopay API
 */
const createCardRegistration = async (cardRegistration) => {
  try {
     const mangopay = await getMangopayInstance();
    const response = await mangopay.CardRegistrations.create(cardRegistration);
    return response;
  } catch (error) {
    console.error("Error creating card registration:", error);
    throw error; // Rethrow the error to be caught in the controller
  }
};


// Step 2: Tokenize Card Details
const tokenizeCard = async (cardRegistrationURL, accessKeyRef, preregistrationData, cardNumber,cardId, cardExpirationDate, cardCvx) => {
    try {
            const data = qs.stringify({
            accessKeyRef: accessKeyRef,
            data: preregistrationData,
            cardNumber: cardNumber,
            cardExpirationDate: cardExpirationDate,
            cardCvx: cardCvx,
        });
        const response = await axios.post(cardRegistrationURL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
          
        });

        // console.info('Card Tokenized:', response.data);
        return {res: response.data ,data , cardId}; // This will return a response that includes the tokenized card details.
    } catch (error) {
        console.error('Error tokenizing card:', error);
        return false;
    }
};

// Main Function
const processCardRegistrationAndTokenization = async (user) => {
    // Step 1: Create a Card Registration
    const cardRegistrationResponse = await createCardRegistration(user);

    if (cardRegistrationResponse && cardRegistrationResponse.CardRegistrationURL && cardRegistrationResponse.PreregistrationData) {
        // Step 2: Tokenize the card by sending the card details
        const { CardRegistrationURL, PreregistrationData } = cardRegistrationResponse;

        const accessKeyRef = cardRegistrationResponse.AccessKey;  // The access key reference from the card registration response
        const cardNumber = '4970105181818183';  // The card number provided by the user
        const cardExpirationDate = '1229'; // The expiration date of the card (MMYY)
        const cardCvx = '123';  // The CVV of the card (the 3-digit number on the back)
        const cardId = cardRegistrationResponse.Id
        // Call the function to tokenize the card
        const tokenizationResponse = await tokenizeCard(CardRegistrationURL, accessKeyRef, PreregistrationData, cardNumber, cardId,cardExpirationDate, cardCvx);

        if (tokenizationResponse) {
            console.info('Card successfully tokenized:', tokenizationResponse);
            return tokenizationResponse;
        } else {
            console.error('Card tokenization failed.');
            return false;
        }
    } else {
        console.error('Card registration failed.');
        return false;
    }
};
const updateCardRegistration = async (cardRegistration) => {
    try {
        const mangopay = await getMangopayInstance();
        // Using MangoPay's SDK to update card registration
        const response = await mangopay.CardRegistrations.update(cardRegistration);
        console.info(response);  // Optionally log the response for debugging
        return response;
    } catch (error) {
        console.error('Error updating card registration:', error);
        return false;
    }
}
module.exports = {
  createCardRegistration,
  processCardRegistrationAndTokenization,
  updateCardRegistration
};