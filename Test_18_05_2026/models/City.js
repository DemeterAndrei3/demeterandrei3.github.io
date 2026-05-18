// models/City.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  country: { type: String, required: true },
  iso: { type: String, required: true },
  capital: { type: Boolean, default: false }
});

module.exports = mongoose.model('City', citySchema, 'cities');

