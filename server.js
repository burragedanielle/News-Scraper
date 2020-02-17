const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const articles = require('./routes/API/articles');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://danielle123:danielle123@ds237770.mlab.com:37770/heroku_09h32qmq'

const db = MONGODB_URI;
mongoose.connect(db)
    .then(() => console.log(`Mongodb is connected`))
    .catch(err => console.log(err));

app.use('/api/articles', articles);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


