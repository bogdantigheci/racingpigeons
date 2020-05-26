const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  user: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  product: {
    type: Array,
    default: [],
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
