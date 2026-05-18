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

