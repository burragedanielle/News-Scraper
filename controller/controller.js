const express = require('express');
const router = express.Router();

const path = require('path');

const request = require('request');
const cheerio = require('cheerio');

const Article = require('./models/articles.js');
const Comment = require('./models/comments.js');

router.get('/', (req, res) => {
    res.redirect("/news-stories");
})

router.get('/scrape', (res, req) => {
    request('https://www.npr.org/sections/pop-culture/', (error, response, html) => {
        let $ = cheerio.load(html);

        $('article').each(function (i, element) {
            const articles = [];

            result.headline = $(this)
                .children()
                .hasClass('.item-info-wrap')
                .is('h2');

            console.log(result.headline);
        })

        res.redirect('/');
    });
});


