const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// 1. Middleware custom

const LoggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};


// 2. Express setup

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(LoggerMiddleware);


// 3. MongoDB connection

const uri = 'mongodb://student:h3T-bYhx-uW8@192.168.37.37:27017/sandbox';
const options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(uri, options)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));


// 4. Mongoose Models

//In loc sa accesezi colectiile manual:
//db.collection("onebook")
// Acum ai modele:
const OneBook = mongoose.model("OneBook", new mongoose.Schema({
    authors: String,
    title: String
}));

const Curriculum = mongoose.model("Curriculum", new mongoose.Schema({
    course: String
}));


// 5. Routes


// Home page
app.get('/', (req, res) => {
    res.send(`
    <html>
        <body>
            <h2>Demonstrații MongoDB</h2>
            <ul>
                <li><a href='/collections'>List Collections</a></li>
                <li><a href='/list'>List Curriculum</a></li>
                <li><a href='/insert'>Insert OneBook</a></li>
                <li><a href='/onebook'>List OneBook</a></li>
                <li><a href='/drop'>Drop OneBook</a></li>
            </ul>
        </body>
    </html>
    `);
});

// List collections
app.get('/collections', async (req, res) => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    let html = "<html><body><ul>";

    collections.forEach(col => {
        html += `<li>${col.name}</li>`;
    });

    html += "</ul></body></html>";
    res.send(html);
});

// List Curriculum items
app.get('/list', async (req, res) => {
    const items = await Curriculum.find();
    items.forEach(i => console.log("Course:", i.course));

    res.json({ status: true, count: items.length });
});

// Insert OneBook item
app.get('/insert', async (req, res) => {
    const newItem = new OneBook({
        authors: "Amit Phaltankar, Juned Ahsan, Michael Harrison, Liviu Nedov",
        title: "MongoDB Fundamentals"
    });

    await newItem.save();
    console.log("Inserted:", newItem);

    res.json({ status: true, insertedId: newItem._id });
});

// List OneBook items
app.get('/onebook', async (req, res) => {
    const items = await OneBook.find();
    items.forEach(i => console.log("Book:", i.title));

    res.json({ status: true, count: items.length });
});

// Drop OneBook collection
app.get('/drop', async (req, res) => {
    try {
        await mongoose.connection.db.dropCollection("onebooks");
        console.log("Collection 'onebooks' dropped");
        res.json({ status: true });
    } catch (err) {
        console.log("Collection does not exist");
        res.json({ status: false, error: "Collection not found" });
    }
});


// 6. Start server

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
