require('dotenv').config();
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoHeadlines';

console.log('This is the Mongo URI', MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(() => console.log(`Mongodb is connected`))
    .catch(err => console.log(err));

// Routes
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const articles = require('./routes/API/articles');
app.use('/api', articles);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


