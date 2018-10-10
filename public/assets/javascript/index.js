//getting set to do the thing
$(document).ready(function () {

  //so we can append stuff to this later
  var articleContainer = $(".article__container");

  //populating the scraped articles
  function populateArticles(articles) {
    var articleList = [];
    for (var i in articles) {
      articleList.push(newArticle(articles[i]));
    }
    articleContainer.append(articleList);
  }


  //adding new articles after scrape into a nice little format
  function newArticle(article) {
    var article = $("<div class='article'>");
    var articleHeader = $("<div class='article__header'>").append(
      $("<a class='article-link' target='_blank'>")
        .attr("href", article.url)
        .text(article.headline),
    );

    var articleSummary = $("<div class='article__summary'>").text(article.summary);
    var saveButton = $("<a class='save'>Save</a>")

    article.append(articleHeader, articleSummary, saveButton);
    article.data("_id", article._id);
    return article;
  }

  //adding a saved article to the db so it renders on this page and stops rendering on this
  function saveArticles() {

    var articleToSave = $(this)
      .parents(".article")
      .data();

    $(this)
      .parents(".article")
      .remove();

      console.log(articleToSave._id);
    // changing saved to true
    articleToSave.saved = true;
    $.ajax({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(function (data) {
      if (data.saved) {
        location.reload();
      }
    });
  }

  //scraping articles
  function scrapeArticles() {
    $.get("/api/fetch").then(function (data) {
      location.reload();
    });
  }

  //nuking everything
  function clearArticles() {
    $.get("api/clear").then(function () {
      articleContainer.empty();
      location.reload();
    });
  }


  //listening for events to do the thing
  $(document).on("click", ".save", saveArticles);
  $(document).on("click", "#scrape", scrapeArticles);
  $(document).on("click", "#clear", clearArticles);
});
