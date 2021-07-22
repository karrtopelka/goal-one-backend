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
  const slut = new Slut(req.body.name, req.body.price, req.body.img);
  await slut.save();
  res.redirect('/sluts');
});

module.exports = router;
