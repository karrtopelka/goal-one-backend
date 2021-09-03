const { Schema, model } = require('mongoose');

const slut = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Slut', slut);
