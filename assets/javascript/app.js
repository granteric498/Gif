var topics = [
    "Chicago Bears",
    "Chicago Blackhawks",
    "Chicago Bulls",
    "Chicago Cubs",
    "Chicago White Sox"
];

function renderButtons() {
    $("#buttons-appear-here").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.attr("data-team", topics[i]);
        a.text(topics[i]);
        a.attr('id', 'displayTeam');
        $("#buttons-appear-here").append(a);
      };
};

// Function to display the gifs. 
function displayGif() {
    var team = $(this).attr("data-team");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      team + "&api_key=WXRi2y5z5f0P44nL2Woo4AeQAJWNHZP9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
          // Created div and stored it in a variable
          var teamDiv = $("<div>");
          // Got the rating of the gif and stored it in a variable
          var p = $("<p>").html("<b>" + results[i].title + "</b><br><a href='" + results[i].url + "' target='_blank'>Click here</a> to see source<br>Rating: " + results[i].rating);
          // Created image tag and stored it in a variable
          var teamImage = $("<img>")
          // Created variable with the URL of the regular animated gif
          var regularGif = results[i].images.fixed_height.url;
          // Created still image of the previously animated gif by adding "_s" before ".gif"
          var stillGif = results[i].images.fixed_height.url.replace('.gif','_s.gif');
          // This has the image, when prompted, to be stillGif
          teamImage.attr("src", stillGif);
          // This makes sure the URL to the still and regular gif are to corresponding data attributes
          teamImage.attr("data-still", stillGif);
          teamImage.attr("data-animate", regularGif);
          // This sets the data state to still. If we want to animate, we have to look at
          // on click event later
          teamImage.attr("data-state", "still");
          // This sets the class so it is easy to call for the event handler
          teamImage.attr("class", "gif");
          // The rating and image are appended to the div
          $(teamDiv).append(p);
          $(teamDiv).append(teamImage);
          // The div is prompted on and to the top of the screen to the respective id.
          $("#gifs-appear-here").prepend(teamDiv);
      };

      // Sets event handler on each individual Gif
      $(".gif").on("click", function() {
          // Data state is stored in var state
          var state = $(this).attr("data-state");
          // If data state == "still", then it will animate on click
          if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state","animate");
            } 
            // Else (meaning if data state == "animate"), then it will be a still image on click
            else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state","still");
            };
          });
  });
};

// Function to add user's team
$("#addTeam").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // Grabs the input from the textbox
    var team = $("#teamInput").val().trim();
    // Adds the input to the end of the array
    topics.push(team);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#teamInput").val("");
});

// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", "#displayTeam", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();