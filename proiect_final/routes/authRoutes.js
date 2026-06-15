const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await User.create({ username, email, password });
        res.redirect("/login");
    } catch (err) {
        res.send("Eroare la înregistrare: " + err);
    }
});

// LOGIN
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("Utilizator inexistent");

    const match = await user.comparePassword(password);
    if (!match) return res.send("Parolă greșită");

    req.session.userId = user._id;
    res.redirect("/dashboard");
});

// LOGOUT
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
