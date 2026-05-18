// scripts/seedCities.js
const mongoose = require('mongoose');
const City = require('../models/City');

mongoose.connect('mongodb://localhost:27017/orase', { useNewUrlParser: true, useUnifiedTopology: true });

const cities = [
  { city: 'Tokyo', lat: 35.6897, lng: 139.6922, country: 'Japan', iso: 'JPN', capital: true },
  { city: 'Bucuresti', lat: 44.4268, lng: 26.1025, country: 'Romania', iso: 'RO', capital: true },
  { city: 'Jakarta', lat: -6.175, lng: 106.8275, country: 'Indonesia', iso: 'IDN', capital: true },
  { city: 'Delhi', lat: 28.61, lng: 77.23, country: 'India', iso: 'IND', capital: false },
  { city: 'Guangzhou', lat: 23.13, lng: 113.26, country: 'China', iso: 'CHN', capital: false },
  { city: 'Mumbai', lat: 19.0761, lng: 72.8775, country: 'India', iso: 'IND', capital: false },
  { city: 'Manila', lat: 14.5958, lng: 120.9772, country: 'Philippines', iso: 'PHL', capital: true },
  { city: 'Shanghai', lat: 31.2286, lng: 121.4747, country: 'China', iso: 'CHN', capital: false },
  { city: 'New York', lat: 40.7128, lng: -74.0060, country: 'United States', iso: 'US', capital: false },
  { city: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'United States', iso: 'US', capital: false },
 //////////////////////////////////////////////////////////////
  { city: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'United States', iso: 'US', capital: false },
  { city: 'London', lat: 51.5074, lng: -0.1278, country: 'United Kingdom', iso: 'UK', capital: true },
  { city: 'Manchester', lat: 53.4808, lng: -2.2426, country: 'United Kingdom', iso: 'UK', capital: false },
  { city: 'Paris', lat: 48.8566, lng: -2.3522, country: 'France', iso: 'FR', capital: true },
  { city: 'Marseille', lat: 43.2965, lng: 5.3698, country: 'France', iso: 'FR', capital: false },
  { city: 'Berlin', lat: 52.5200, lng: 13.4050, country: 'Germany', iso: 'DE', capital: true },
  { city: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia', iso: 'AU', capital: false },
  { city: 'Canberra', lat: -35.2809, lng: 149.1300, country: 'Australia', iso: 'AU', capital: true },
  { city: 'Melbourne', lat: -37.8136, lng: 144.9631, country: 'Australia', iso: 'AU', capital: false },
  { city: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, country: 'Brazil', iso: 'BR', capital: false },    
];

(async () => {
  await City.deleteMany({});
  await City.insertMany(cities);
  console.log('Cities inserted');
  process.exit();
})();
