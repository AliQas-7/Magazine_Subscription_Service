const Subscription = require('../models/Subscription');
const Magazine = require('../models/Magazine');
const Plan = require('../models/Plan');

// Create a subscription
exports.createSubscription = async (req, res) => {
  try {
    const { magazine_id, plan_id } = req.body;
    const user_id = req.user.id; // Retrieved from token after authMiddleware

    const existingSubscription = await Subscription.findOne({ user_id, magazine_id, is_active: true });
    if (existingSubscription) return res.status(400).json({ error: 'Active subscription already exists for this magazine.' });

    const magazine = await Magazine.findById(magazine_id);
    const plan = await Plan.findById(plan_id);
    if (!magazine || !plan) return res.status(404).json({ error: 'Magazine or Plan not found.' });

    const price = magazine.base_price * (1 - plan.discount);
    const renewal_date = new Date();
    renewal_date.setMonth(renewal_date.getMonth() + plan.renewalPeriod);

    const subscription = await Subscription.create({ user_id, magazine_id, plan_id, price, renewal_date });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Retrieve active subscriptions for the user
exports.getSubscriptions = async (req, res) => {
  try {
    const user_id = req.user.id; // Retrieved from token after authMiddleware
    const subscriptions = await Subscription.find({ user_id, is_active: true }).populate('magazine_id plan_id');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Modify a subscription
exports.modifySubscription = async (req, res) => {
  try {
    const { subscription_id, new_plan_id } = req.body;
    const user_id = req.user.id; // Retrieved from token after authMiddleware

    const oldSubscription = await Subscription.findOne({ _id: subscription_id, user_id });
    if (!oldSubscription || !oldSubscription.is_active) return res.status(404).json({ error: 'Subscription not found or already inactive.' });

    oldSubscription.is_active = false;
    await oldSubscription.save();

    const newPlan = await Plan.findById(new_plan_id);
    const magazine = await Magazine.findById(oldSubscription.magazine_id);
    if (!newPlan || !magazine) return res.status(404).json({ error: 'New plan or magazine not found.' });

    const price = magazine.base_price * (1 - newPlan.discount);
    const renewal_date = new Date();
    renewal_date.setMonth(renewal_date.getMonth() + newPlan.renewalPeriod);

    const newSubscription = await Subscription.create({
      user_id: oldSubscription.user_id,
      magazine_id: oldSubscription.magazine_id,
      plan_id: new_plan_id,
      price,
      renewal_date,
    });

    res.status(200).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Deactivate a subscription
exports.deactivateSubscription = async (req, res) => {
  try {
    const { subscription_id } = req.body;
    const user_id = req.user.id; // Retrieved from token after authMiddleware

    const subscription = await Subscription.findOne({ _id: subscription_id, user_id });
    if (!subscription || !subscription.is_active) return res.status(404).json({ error: 'Subscription not found or already inactive.' });

    subscription.is_active = false;
    await subscription.save();

    res.status(200).json({ message: 'Subscription deactivated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
