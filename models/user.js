const { Schema, model } = require('mongoose');

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        slutId: {
          type: Schema.Types.ObjectId,
          ref: 'Slut',
          required: true,
        },
      },
    ],
  },
});

user.methods.addToCart = function (slut) {
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => c.slutId.toString() === slut._id.toString());

  if (idx >= 0) {
    items[idx].count = this.cart.items[idx].count + 1;
  } else {
    items.push({
      slutId: slut._id,
      count: 1,
    });
  }

  this.cart = { items };
	return this.save();
};

module.exports = model('User', user);
