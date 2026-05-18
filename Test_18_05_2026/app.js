// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const City = require('./models/City');

const app = express();

mongoose.connect('mongodb://localhost:27017/orase', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secretul-tau',
  resave: false,
  saveUninitialized: false
}));

// Middleware simplu de autentificare
function requireLogin(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}


// Rute login/logout (simplificat, user hardcodat)

// Pagina de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Procesare login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Exemplu simplu: user fix
  if (username === 'admin' && password === 'parola') {
    req.session.user = { username };
    return res.redirect('/cities');
  }

  res.render('login', { error: 'Utilizator sau parolă greșite' });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});


//Ruta "/cities"

app.get('/cities', requireLogin, async (req, res) => {
  const cities = await City.find().limit(20);
  res.render('cities', { cities });
});

//Ruta "/city/:id"

// app.js (continuare)

app.get('/city/:id', requireLogin, async (req, res) => {
  const city = await City.findById(req.params.id);
  if (!city) {
    return res.status(404).send('Orașul nu a fost găsit');
  }
  res.render('city', { city });
});


//Ruta "/search" GET + POST

// app.js (continuare)

// Formular de căutare
app.get('/search', requireLogin, (req, res) => {
  res.render('search', { city: null, message: null });
});

// Procesare căutare
app.post('/search', requireLogin, async (req, res) => {
  const { q } = req.body;

  const city = await City.findOne({ city: new RegExp('^' + q + '$', 'i') });

  if (!city) {
    return res.render('search', { city: null, message: 'Orașul nu a fost găsit în baza de date.' });
  }

  res.render('search', { city, message: null });
});


//Pornirea serverului

// app.js (final)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
