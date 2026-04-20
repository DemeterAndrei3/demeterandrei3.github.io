const express = require('express');
const router = express.Router();
const { users } = require('../db');
const bcrypt = require('bcrypt');
const md5 = require('md5');

// GET /register
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// POST /register
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await users.createUser({ email, name, password });
    // pornesc sesiunea
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    req.session.views = 0; // pentru zona protejata
    res.redirect('/shop');
  } catch (err) {
    res.render('register', { error: err.message });
  }
});

// GET /login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.findByEmail(email);
  if (!user) {
    return res.render('login', { error: 'Credentiale invalide' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.render('login', { error: 'Credentiale invalide' });
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  req.session.views = 0;

  res.redirect('/shop');
});

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Pagina cu avatar + numar de accesari (cerinta suplimentara)
router.get('/profile', (req, res) => {
  // numar de accesari al acestei pagini, in sesiune
  if (!req.session.profileViews) {
    req.session.profileViews = 0;
  }
  req.session.profileViews++;

  let gravatarUrl = null;
  if (req.session.user && req.session.user.email) {
    const hash = md5(req.session.user.email.trim().toLowerCase());
    gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
  }

  res.render('profile', {
    user: req.session.user || null,
    gravatarUrl,
    profileViews: req.session.profileViews
  });
});

module.exports = router;
