const request = require('request');
const cheerio = require('cheerio');

const scraper = (req, res) => {

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

module.exports = scraper;

