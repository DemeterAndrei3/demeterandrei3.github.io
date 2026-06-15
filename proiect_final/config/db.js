const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/authProject");
        console.log("MongoDB conectat");
    } catch (err) {
        console.error("Eroare DB:", err);
    }
}

module.exports = connectDB;
