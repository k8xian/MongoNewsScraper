//getting set to do the thing
$(document).ready(function() {

  //so we can append stuff to this later
 var articleContainer = $(".article-container");

 //adding a saved article to the db so it renders on this page and stops rendering on this
 function handleArticleSave() {
   var articleToSave = $(this)
     .parents(".article")
     .data();

   $(this)
     .parents(".article")
     .remove();

   articleToSave.saved = true;
   $.ajax({
     method: "PUT",
     url: "/api/headlines/" + articleToSave._id,
     data: articleToSave
   }).then(function(data) {
     if (data.saved) {
       location.reload();
     }
   });
 }

 //scraping articles
 function handleArticleScrape() {
   $.get("/api/fetch").then(function(data) {
     location.reload();
   });
 }

 //nuking everything
 function handleArticleClear() {
   $.get("api/clear").then(function() {
     articleContainer.empty();
     location.reload();
   });
 }

 //listening for events to do the thing
 $(document).on("click", ".save", handleArticleSave);
 $(document).on("click", "#scrape", handleArticleScrape);
 $(document).on("click", "#clear", handleArticleClear);
});
