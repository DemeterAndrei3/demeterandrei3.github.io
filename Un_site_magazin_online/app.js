require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const logger = require('./middleware/logger');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const app = express();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_secret';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(logger);

// home public
app.get('/', (req, res) => {
  res.render('home', {
    user: req.session.user || null,
    theme: req.cookies.theme || 'light'
  });
});

// rute auth
app.use('/', authRoutes);

// zona protejata
app.use('/shop', shopRoutes);

// fallback simplu
app.use((req, res) => {
  res.status(404).send('404 - Pagina nu exista');
});

app.listen(PORT, () => {
  console.log(`Server pornit pe http://localhost:${PORT}`);
});

