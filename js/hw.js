$('document').ready(function () {

    // create array of animals
    var animalArr = ['cat', 'polar bear', 'elephant', 'zebra', 'jaguar', 'snow leopard', 'horse', 'crocodile', 'lion', 'gorilla', 'spider monkey', 'toucan', 'bear', 'buffalo', 'cat', 'blue whale', 'beluga whale', 'koala', 'kangaroo']

    // loop through array
    for (var i = 0; i < animalArr.length; i++) {

        // add each animal in the array to buttons div
        $('#animal-buttons').append('<button class="button">' + animalArr[i] + '</button>');
    };

    // submit button
    $('#add-animal').on('click', function () {
        event.preventDefault();

        // capture input value
        var newButton = $('#animal-input').val();

        // add new button to buttons div 
        $('#animal-buttons').append('<button class="button">' + newButton + '</button>');

        // cannot enter empty string
        if (newButton === '') {

            alert('must enter an animal');
        };
    });

    // animal giphy button
    $('#animal-buttons').on('click', '.button', function () {

        // empty giphy div on each click
        $('#animal-gifs').empty();

        // create variable for animal name of button clicked
        var animal = $(this).text();

        // search for name of animal clicked
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=BaFTSYCB1DgnJpmML0ESXohOA9etZnaV&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            // Storing an array of results in the results variable
            var results = response.data;
            
            // looping through array
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var personImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    // Prepending the gifDiv to the "#animal-gifs" div in the HTML
                    $("#animal-gifs").prepend(gifDiv);
                };
                // if statement
            };
            // for loop
        });
        // .then function
    });
    // button click
});
//.document


// unable to get {
//  - pause function
//      have to add data-still,data-animate,and data-state attributes to 
//      dynamic content while somehow inputing the correct key for each gif
//      ex. data-still="https://media1.giphy.com/media/(key>)3o85xkQpyMlnBkpB9C(<key)/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still"
//      then on click change the data-state to animate

//  - displaying gifs in 3 columns
//      maybe bootstrap 3 columns each with an animal-gifs class
// }