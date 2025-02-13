const express = require('express');
const {
  createSubscription,
  getSubscriptions,
  modifySubscription,
  deactivateSubscription,
} = require('../controllers/SubscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all subscription routes
router.use(authMiddleware);

// Routes
router.post('/', createSubscription);          // Create a new subscription
router.get('/', getSubscriptions);             // Retrieve user subscriptions
router.put('/:id', modifySubscription);        // Update a subscription
router.delete('/:id', deactivateSubscription); // Deactivate a subscription

module.exports = router;
