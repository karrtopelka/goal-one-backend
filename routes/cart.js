const { Router } = require('express');
const Cart = require('../models/cart');
const Slut = require('../models/slut');

const router = Router();

router.post('/add', async (req, res) => {
  const slut = await Slut.getById(req.body.id);
  await Cart.add(slut);
  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();
  res.render('cart', {
    title: 'Cart',
    isCart: true,
    sluts: cart.sluts,
    price: cart.price,
  });
});

module.exports = router;
