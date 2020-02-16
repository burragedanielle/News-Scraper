const cheerio = require('cheerio');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

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
})


const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


