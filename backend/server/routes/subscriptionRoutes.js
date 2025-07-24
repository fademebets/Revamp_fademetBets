const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/create-checkout-session', subscriptionController.createCheckoutSession);
router.post('/confirm-subscription', subscriptionController.confirmSubscription);
router.post('/create-customer-portal', subscriptionController.createCustomerPortal);
router.post('/check-yearly', subscriptionController.checkIfYearlySubscriber);


module.exports = router;
