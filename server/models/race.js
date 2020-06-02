const mongoose = require('mongoose');

const raceSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100,
  },
  county: {
    required: true,
    type: String,
    maxlength: 100,
  },
  details: {
    required: true,
    type: String,
    maxlength: 1000,
  },
  club: {
    required: true,
    type: String,
    maxlength: 1000,
  },
  images: {
    type: Array,
    default: [],
  },
  contestants: {
    type: Array,
    default: [],
  },
});

const Race = mongoose.model('Race', raceSchema);

module.exports = { Race };
