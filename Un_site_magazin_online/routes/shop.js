const express = require('express');
const router = express.Router();
const { products } = require('../db');
const requireLogin = require('../middleware/requireLogin');

// toate rutele de aici sunt protejate
router.use(requireLogin);

// GET /shop
router.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;

  const items = products.getAll();

  res.render('shop/index', {
    user: req.session.user,
    products: items,
    views: req.session.views,
    theme: req.cookies.theme || 'light'
  });
});

// GET /shop/product/:id
router.get('/product/:id', (req, res) => {
  const product = products.getById(req.params.id);
  if (!product) {
    return res.status(404).send('Produs inexistent');
  }

  // setez cookie cu ultima entitate vizualizata
  res.cookie('lastProductId', product.id.toString(), { httpOnly: false });

  res.render('shop/product', {
    user: req.session.user,
    product,
    lastProductId: req.cookies.lastProductId || null,
    theme: req.cookies.theme || 'light'
  });
});

// ruta simpla pentru schimbare tema (cookie)
router.get('/theme/:mode', (req, res) => {
  const mode = req.params.mode === 'dark' ? 'dark' : 'light';
  res.cookie('theme', mode, { httpOnly: false });
  res.redirect('/shop');
});

module.exports = router;
