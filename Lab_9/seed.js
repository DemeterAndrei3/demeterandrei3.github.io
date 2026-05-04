const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/onlineShop");

async function seed() {
  await Product.deleteMany({});
  await User.deleteMany({});

  const admin = await User.create({
    username: "admin",
    email: "admin@test.com",
    password: "admin123",
    role: "admin"
  });

  const user = await User.create({
    username: "john",
    email: "john@test.com",
    password: "john123",
    role: "user"
  });

  await Product.insertMany([
    { name: "Laptop", price: 3500, category: "electronics", createdBy: admin._id },
    { name: "Carte JS", price: 80, category: "books", createdBy: user._id },
    { name: "Tricou", price: 50, category: "clothes", createdBy: user._id },
    { name: "Mouse", price: 120, category: "electronics", createdBy: admin._id },
    { name: "Geantă", price: 200, category: "other", createdBy: admin._id }
  ]);

  console.log("Seed done");
  process.exit();
}

seed();
