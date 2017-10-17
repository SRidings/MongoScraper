// Click function that scrapes new articles
$(document).on("click", "#scrape-btn", function(event) {
  event.preventDefault();

    $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .done(function() {
      window.location = "/articles";
    });
});

// on click save an article
$(document).on("click", ".save-btn", function(event) {
  event.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "PUT",
    url: "/articles/put/" + thisId,
    data: {
        saved: true
      }
    })
    // With that done
    .done(function(data) {
      window.location = "/articles";
    });

    // TODO: check functionality of this
    BootstrapDialog.show({
      message: "Article saved!"
    });
});

// Click function that deletes the article from the article page
$(document).on("click", ".delete-btn", function(event) {
  event.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId,
    })
      // With that done
      .done(function(data) {


        window.location = "/articles";
      });
});

// Click function that deletes the article from the saved page
$(document).on("click", ".delete-btn-saved", function(event) {
  event.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/saved/delete/" + thisId,
  })
    // With that done
    .done(function(data) {
      // Log the response

      window.location = "/saved";
    });
});

// Click function that saves the note on the article page
$(document).on("click", ".savenote", function(event) {
  event.preventDefault();
  if($(".textAreaInput").val() === "") {
    return false;
  } else {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from note textarea
        body: $(".textAreaInput").val()
      }
    })
      // With that done
      .done(function(data) {
        // Log the response
        console.log(data);
        window.location = "/articles";
      });
    // Also, remove the values entered in the input and textarea for note entry
    $(".textAreaInput").val("");
  }
});

// Click function that deletes the note from the articles page
$(document).on("click", ".delete-articles-note-btn", function(event) {
  event.preventDefault();
  // Grab the id associated with the note from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to delete the note
  $.ajax({
    method: "GET",
    url: "/articles/note/delete/" + thisId
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      window.location = "/articles";
    });
});
