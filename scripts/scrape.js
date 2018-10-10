var axios = require("axios");
var cheerio = require("cheerio");

//cheerio! 
var scrape = function() {
  return axios.get("https://www.washingtonpost.com").then(function(res) {
    var $ = cheerio.load(res.data);
    var articles = [];
    $(".moat-trackable").each(function(i, element) {
        
    //conveniently, the class was just called headline
      var headline = $(this)
        .find(".headline")
        .text()
        .trim();

      var url = $(this)
        .find("a")
        .attr("href");

      var summary = $(this)
        .find(".blurb")
        .text()
        .trim();

      if (headline && summary && url) {

        var newArticle = {
          headline: headline,
          summary: summary,
          url: url
        };

        articles.push(newArticle);
      }
    });
    return articles;
  });
};

module.exports = scrape;
