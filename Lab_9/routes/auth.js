const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      res.render("auth/register", { error: "Email sau username deja folosit" });
    } else {
      res.render("auth/register", { error: err.message });
    }
  }
});
