$(document).ready(function () {

  var articleContainer = $(".article__container");


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



  //rendering all saved notes by pushing them to an array and then appending that array to the container
  function showSavedNotes(data) {
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
      currentNote = $("<li class='saved-notes'>No notes for this article yet.</li>");
      notesToRender.push(currentNote);
    } else {
      for (var i = 0; i < data.notes.length; i++) {
        currentNote = $("<li class='saved-notes note'>")
          .text(data.notes[i].noteText)
          .append($("<a class='deleteNote'>x</a>"));
        currentNote.children("a").data("_id", data.notes[i]._id);
        notesToRender.push(currentNote);
      }
    }
    $(".note__container").append(notesToRender);
  }

  //deleting article from the saved list
  function deleteArticle() {
    //establishing the present article as this
    var articleToDelete = $(this)
      .parents(".article")
      .data();

    $(this)
      .parents(".article")
      .remove();
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function (data) {
      if (data.ok) {
        location.reload();
      }
    });
  }

  // showing the list of articles inside the notes modal -- using bootstrap bootbox to save time
  function showNotes(event) {
    var currentArticle = $(this)
      .parents(".article")
      .data();
    $.get("/api/notes/" + currentArticle._id).then(function (data) {
      var modalText = $("<div class='container-fluid text-center'>").append(
        $("<h4>").text("Notes For Article: " + currentArticle._id),
        $("<hr>"),
        $("<ul class='list-group note__container'>"),
        $("<textarea placeholder='what do you think?'>"),
        $("<a class='saveNote'>Save</a>")
      );
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentArticle._id,
        notes: data
      };
      $(".saveNote").data("article", noteData);
      showSavedNotes(noteData);
    });
  }

  //saving an individual note based on what you put in the text area
  function saveNotes() {
    var noteData;

    //capturing that input
    var newNote = $(".bootbox-body textarea")
      .val()
      .trim();
    if (newNote) {
      noteData = { _headlineId: $(this).data("article")._id, noteText: newNote };
      $.post("/api/notes", noteData).then(function () {
        bootbox.hideAll();
      });
    }
  }

  //deleting an individual note 
  function deleteNotes() {
    var noteToDelete = $(this).data("_id");
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function () {
      bootbox.hideAll();
    });
  }

  function clearArticles() {
    $.get("api/clear")
      .then(function () {
        articleContainer.empty();
        location.reload();
      });
  }

  //listning for clicks, and doing the thing
  $(document).on("click", ".notes", showNotes);
  $(document).on("click", ".saveNote", saveNotes);
  $(document).on("click", ".deleteNote", deleteNotes);
  $(document).on("click", ".delete", deleteArticle);
  $(document).on("click", ".clear", clearArticles);
});
