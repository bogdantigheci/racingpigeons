const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = mongoose.Schema(
  {
    ringId: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      maxlength: 10000,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 25,
    },
    breed: {
      type: String,
      required: true,
      maxlength: 50,
    },
    breeder: {
      type: String,
      required: true,
      maxlength: 50,
    },
    shipping: {
      required: true,
      type: Boolean,
    },
    available: {
      required: true,
      type: Boolean,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
    reviewed: {
      type: String,
      default: 'In review',
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = { Request };
