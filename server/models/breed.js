const mongoose = require('mongoose');

const breedSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  description: {
    required: true,
    type: String,
    maxlength: 10000
  },
  images: {
    type: Array,
    default: []
  }
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = { Breed };
