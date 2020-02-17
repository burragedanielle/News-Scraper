const express = require('express');
const router = express.Router();

const Article = require('../../models/Articles');
const request = require('request');
const cheerio = require('cheerio');

//@GET API 
//@desc - gets all articles 

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ date: -1 })
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//@POST API 
//@desc - scrapes all articles and adds to db
router.post('/', (req, res) => {
    scraper = () => {
        request('https://www.npr.org/sections/pop-culture/', (error, response, html) => {
            const articlesArr = [];

            if (!error && response.statusCode === 200) {
                let $ = cheerio.load(html);
                console.log(`scraping...`);

                $("article").each(function (i, element) {

                    let headline = $(this)
                        .find(".item-info-wrap")
                        .children('.item-info')
                        .children('h2')
                        .text()
                        .trim();

                    let summary = $(this)
                        .find(".item-info-wrap")
                        .children('.item-info')
                        .children('p')
                        .text()
                        .trim();

                    // Grab the summary of the article
                    let url = $(this)
                        .find(".item-info-wrap")
                        .children('.item-info')
                        .children('h2')
                        .children('a')
                        .attr('href');

                    if (headline && summary && url) {
                        let articlesToAdd = {
                            headline: headline,
                            summary: summary,
                            url: url
                        }
                        articlesArr.push(articlesToAdd);
                        console.log(articlesArr);
                    };
                })
            }
            res.json(articlesArr);
        });

    }

    scraper(res.body);


    // const newArticle = new Article({
    //     headline: req.body.headline,
    //     summary: req.body.summary,
    //     url: req.body.url
    // });

    // newArticle.save().then(articles => res.json(articles));

});


module.exports = router; 