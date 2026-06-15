const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secretul_meu",
    resave: false,
    saveUninitialized: false
}));

app.use("/", authRoutes);
app.use("/", protectedRoutes);

app.listen(3000, () => console.log("Server pornit pe http://localhost:3000"));
