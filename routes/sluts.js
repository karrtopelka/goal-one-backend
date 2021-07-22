const { Router } = require('express');
const Slut = require('../models/slut');
const router = Router();

router.get('/', async (req, res) => {
  const sluts = await Slut.getAll();
  res.render('sluts', {
    title: 'Sluts page',
    isSluts: true,
    sluts,
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }

  const slut = await Slut.getById(req.params.id);

  res.render('slut-edit', {
    title: `Edit ${slut.name}`,
    slut,
  });
});

router.post('/edit', async (req, res) => {
  await Slut.update(req.body);
  res.redirect('/sluts');
});

router.get('/:id', async (req, res) => {
  const slut = await Slut.getById(req.params.id);
  res.render('slut', {
    layout: 'empty',
    title: `Slut ${slut.name}`,
    slut,
  });
});

module.exports = router;
