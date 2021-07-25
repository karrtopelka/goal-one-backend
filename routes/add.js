const { Router } = require('express');
const Slut = require('../models/slut');
const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: ' Add a slut page',
    isAdd: true,
  });
});

router.post('/', async (req, res) => {
  const slut = new Slut({
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
  });

  try {
    await slut.save();
    res.redirect('/sluts');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
