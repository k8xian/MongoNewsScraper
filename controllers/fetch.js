const db = require("../models");
const scrape = require("../scripts/scrape");

//fetching headlines
module.exports = {
  scrapeHeadlines: function(req, res) {
    return scrape()
      .then(function(articles) {
        //passing in controller for headline to create the articles according to the headline schema
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "There are no new articles."
          });
        }
        else {
          res.json({
            message: "Added " + dbHeadline.length + " articles."
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "Whew, it worked."
        });
      });
  }
};
