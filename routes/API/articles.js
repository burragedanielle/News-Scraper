const express = require('express');
const router = express.Router();

const Article = require('../../models/Articles');
const request = require('request');
const cheerio = require('cheerio');

//@GET API 
//@desc - gets all articles
router.get('/start', (req, res) => {
    Article.find({})
        .then(foundArticles => {
            res.json(foundArticles);
        });
})

//@POST API 
//@desc - scrapes all articles and adds to db
router.post('/scrape', (req, res) => {
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

                        articlesArr.forEach(article => {
                            const newArticle = new Article({
                                headline: headline,
                                summary: summary,
                                url: url
                            });

                            newArticle.save(function (err, doc) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(doc)
                                }
                            })
                        });
                    };
                })
            }
            res.json(articlesArr);
        });
    }
    scraper(res.body)
});


module.exports = router; 