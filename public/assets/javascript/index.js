//getting set to do the thing
$(document).ready(function () {

  //so we can append stuff to this later
  var articleContainer = $(".article__container");

  //adding a saved article to the db so it renders on this page and stops rendering on this
  function saveArticles() {

    var articleToSave = $(this)
      .parents(".article")
      .data();

    $(this)
      .parents(".article")
      .remove();

    console.log("I'm trying to save!");
    console.log("ID of article I'm trying to save: " + articleToSave._id);
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
