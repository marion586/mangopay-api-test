const express = require('express');
const router = express.Router();

const hooks = router.post('/kyc', async(req, res) => {
  console.log(req.query)
  const event = req.query;
    let myNaturalUser = req.body
const userId = "user_m_01JHWCNGRE4Q4S6ZP600FYMH2R"
  await updateUser( myNaturalUser);
  if (event.EventType === 'KYC_SUCCEEDED') {
    console.log('KYC document validation succeeded:', event);
    // Handle successful validation
  } else if (event.EventType === 'KYC_FAILED') {
    console.log('KYC document validation failed:', event);
    // Handle failed validation
  } else {
    console.log('Unhandled event:', event);
  }

  // Send 200 OK response to Mangopay
  res.status(200).send('OK');
});

module.exports = {hooks}