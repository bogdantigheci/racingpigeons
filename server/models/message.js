const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    name: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };
