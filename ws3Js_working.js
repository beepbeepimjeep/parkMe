window.onload = function () {
    // Get the modal
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

/*let gameState = {
    incorrectGuesses : [],
    remainingGuesses : 10
};*/

function setWord (word) {
//set word to be guessed
}
function validate (guess) {
//validate the input from the form (letter)
}
function check (guess) {
//check if the guess is correct
}
function updateWordTiles (index) {
//update the tiles on the HTML
}
function checkEndOfGame(){
//check if the player has guessed the secret word or if the game is over (no more
//remaining guesses
}

var word = "";
function init(){
    word = document.getElementById("setWord").value;
//initialise or reset the game (set new word to be guessed, clean word tiles,
// incorrect guesses and remaining guesses
}
function showWord(){
    alert("showWord "+word);
}



