const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// FORMULAR
router.get("/new", (req, res) => {
  res.render("products/new");
});

// CREATE
router.post("/new", async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: req.session.userId
    });
    await product.save();
    res.redirect("/products");
  } catch (err) {
    res.render("products/new", { error: err.message });
  }
});
