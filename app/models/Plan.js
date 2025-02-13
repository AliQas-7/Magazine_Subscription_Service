const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  renewalPeriod: { type: Number, required: true, min: 1 }, // Cannot be zero
  tier: { type: Number, required: true },
  discount: { type: Number, required: true, min: 0, max: 1 }, // Decimal between 0 and 1
});

module.exports = mongoose.model('Plan', planSchema);
