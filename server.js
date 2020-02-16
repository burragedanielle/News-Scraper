const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/news-stories', (req, res) => {
    const newsStories = [
        {
            id: 1,
            headline: "Story 1",
            summary: "A story",
            url: "www.story",
            byline: "By Storie"
        },
        {
            id: 2,
            headline: "Story 2",
            summary: "Another story",
            url: "www.story2",
            byline: "By Storie"
        },
        {
            id: 2,
            headline: "Story 3",
            summary: "Third story",
            url: "www.story3",
            byline: "By Storie"
        },
    ];

    res.json(newsStories);
});

mongoose.connect('mongodb://localhost/news-stories');
const db = mongoose.connection;

db.on('error', console.error.bind(console, `connection error:`));
db.once('open', function () {
    console.log(`Connected to Mongoose!`);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


