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
  },
  club: {
    required: true,
    type: String,
    maxlength: 1000
  },
  images: {
    type: Array,
    default: []
  },
  placements: {
    type: Array,
    default: []
  }
});

const Breeder = mongoose.model('Breeder', breederSchema);

module.exports = { Breeder };
