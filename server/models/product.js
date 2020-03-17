const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    ringId: {
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
    price: {
      required: true,
      type: Number,
      maxlength: 25
    },
    breed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Breed',
      required: true
    },
    breeder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Breeder',
      required: true
    },
    shipping: {
      required: true,
      type: Boolean
    },
    available: {
      required: true,
      type: Boolean
    },
    publish: {
      required: true,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
