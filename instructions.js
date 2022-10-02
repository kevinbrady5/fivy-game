

//Score and Instructions Modals
// Get the modal
var modal = document.getElementById("instructionsModal");

var scoreModal = document.getElementById("scoreModal");

// Get the button that opens the modal
var btn = document.querySelector(".helpButton");

var scoreBtn = document.querySelector(".scoreButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var scoreSpan = document.getElementsByClassName("closeScore")[0];

// When the user clicks one of the modal buttons, open the correct modal
btn.onclick = function() {
  modal.style.display = "block";
}

scoreBtn.onclick = function() {
    scoreModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

scoreSpan.onclick = function() {
    scoreModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if(event.target == scoreModal) {
    scoreModal.style.display = "none";
  }
}