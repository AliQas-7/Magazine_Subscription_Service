const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  base_price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Magazine', magazineSchema);
