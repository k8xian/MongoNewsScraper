//getting the document ready
$(document).ready(function() {
  
  //establishing necessary global variable
  var articleContainer = $(".article-container");

  //rendering all saved notes 
  function showSavedNotes(data) {
    // setting up an array
    var notesArray = [];
    //setting a current variable
    var currentNote;
    if (!data.notes.length) {
      //Adding a default note if there aren't notes
      currentNote = $("<li class='saved-notes'>No notes. Add one if you like..</li>");
      //Adding a default note
      notesArray.push(currentNote);
    } else {
      // if there ARE notes
      for (i in data.notes) {
        //taking this current note and making it pretty
        currentNote = $("<li class='saved-notes note'>")
        //filling out the note with info
          .text(data.notes[i].noteText)
        //adding the delete button
          .append($("<a class='deleteNote'>x</a>"));
        //adding a route to the delete note button
        currentNote.children("a").data("_id", data.notes[i]._id);
        //adding it to the array
        notesArray.push(currentNote);
      }
    }
    //appending the whole array to the container
    $(".note__container").append(notesArray);
  }

    //deleting article from the saved list
  function deleteArticle() {
    //establishing the selected article as this
    var articleToDelete = $(this)
      .parents(".article")
      .data();

    //making it go away visually
    $(this)
      .parents(".article")
      .remove();

    //sending the data to the route to remove from the db
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
      if (data.ok) {
      }
    });
  }
  
  //showing the actual block of notes with the bootstrap bootbox
  function articleNotes(event) {
    //establishing the selected article as this
    var selectedArticle = $(this)
      .parents(".article")
      .data();
      //rendering a prettier modal
    $.get("/api/notes/" + selectedArticle._id).then(function (data) {
      var modalText = $("<div class='container-fluid text-center'>").append(
        $("<h4>").text("Notes For Article: " + selectedArticle._id),
        $("<hr>"),
        $("<ul class='list-group note__container'>"),
        $("<textarea placeholder='what do you think?'>"),
        $("<a class='saveNote'>Save</a>")
      );
      //passing the data into the bootstrap modal
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      //appending data to the "save" button so that it saves to the db properly
      var noteData = {
        _id: selectedArticle._id,
        notes: data
      };
      $(".saveNote").data("article", noteData);
      showSavedNotes(noteData);
    });
  }

  //doing the thing where it's actually saving a note
  function saveNote() {
    //collecting the data from the textara
    var noteData;
    var newNote = $(".bootbox-body textarea")
      .val()
      .trim();
    //if there is a new note, connecting the headlineID to the note so that both databases are connected
    if (newNote) {
      noteData = { _headlineId: $(this).data("article")._id, noteText: newNote };
      $.post("/api/notes", noteData).then(function() {
        //getting rid of the modal
        bootbox.hideAll();
      });
    }
  }

  //deleting an individual note by the data added in the function earlier
  function deleteNote() {
    var noteToDelete = $(this).data("_id");
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function() {
      bootbox.hideAll();
    });
  }

  //clearing all articles as previously set
  function clearArticle() {
    $.get("api/clear")
      .then(function() {
        articleContainer.empty();
      });
  }

  //event listeners to trigger the functions
  $(document).on("click", ".delete", deleteArticle);
  $(document).on("click", ".notes", articleNotes);
  $(document).on("click", ".saveNote", saveNote);
  $(document).on("click", ".deleteNote", deleteNote);
  $(document).on("click", "#clear", clearArticle);

});
