const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/onlineShop")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

app.use("/products", productsRouter);
app.use("/", authRouter);

app.listen(3000, () => console.log("Server running on 3000"));
