const mongoose = require('mongoose');

const breederSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100
  },
  bio: {
    required: true,
    type: String,
    maxlength: 1000
  }
});

const Breeder = mongoose.model('Breeder', breederSchema);

module.exports = { Breeder };
