const { Router } = require('express');
const Slut = require('../models/slut');

const router = Router();

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();
  res.render('cart', {
    title: 'Cart',
    isCart: true,
    sluts: cart.sluts,
    price: cart.price,
  });
});

router.post('/add', async (req, res) => {
  const slut = await Slut.findById(req.body.id);
  await req.user.addToCart(slut);
  res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  res.status(200).json(cart);
});

module.exports = router;
