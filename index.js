const wildCards = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

let players = [];

class Player {
    constructor(name, score, roundScore) {
    this.name = name;
    this.score = score;
    this.roundScore = roundScore;
    //color or emoji/icon/character?
    }
}

const startButton = document.querySelector(".startButton");
const startMessage = document.querySelector(".startMessage");
const addPlayerDiv = document.querySelector(".addPlayerDiv");
const addPlayerButton = document.querySelector(".addPlayerButton");
const addPlayerMessage = document.querySelector(".addPlayerMessage");
const newPlayerDiv = document.querySelector(".newPlayerDiv");
const newPlayerButton = document.querySelector(".newPlayerButton");
const finishButtonDiv = document.querySelector(".finishButtonDiv");
const finishButton = document.querySelector(".finishButton");
const newPlayerInput = document.getElementById("newPlayer");
const getRoundsDiv = document.querySelector(".getRoundsDiv");
const nextButton = document.querySelector(".nextButton");
const wildCard = document.querySelector(".wildCard");
const turnCounter = document.querySelector(".turnCounter");
const turnCards = document.querySelector(".turnCards");
const turnDiv = document.querySelector(".turnDiv");
const turn1 = document.querySelector(".turn1");
const turn2 = document.querySelector(".turn2");
const turn3 = document.querySelector(".turn3");
const turn4 = document.querySelector(".turn4");
const turn5 = document.querySelector(".turn5");
const scoreBoard = document.querySelector(".scoreBoard");
const addScore = document.querySelector(".addScore");
const gameOver = document.querySelector(".gameOver");

startButton.addEventListener("click", gameSetup);
addPlayerButton.addEventListener("click", playerInput);
newPlayerButton.addEventListener("click", savePlayer);
nextButton.addEventListener("click", nextTurn);
finishButton.addEventListener("click", getTotalRounds)

let wildCardsThisRound = [];
let currentTurn = 0;
let totalTurns = 5;
let totalRounds;
let currentRound = 0;

//starts the game setup flow
function gameSetup() {
  startButton.style.display = "none";
  turnCards.style.display = "none";
  startMessage.innerHTML = "Who is Playing?";
  newPlayerDiv.style.display = "block";
  newPlayerInput.focus();
}

function playerInput() {
  addPlayerDiv.style.display = "none";
  newPlayerDiv.style.display = "block";
  finishButtonDiv.style.display = "none";
  newPlayerInput.focus();
}

function savePlayer() {
  let playerNameInput = document.getElementById("newPlayer").value;

  if(playerNameInput != "" && !players.some(player => player.name === playerNameInput)){
  let newPlayer = new Player(playerNameInput, 0, 0);
  players.push(newPlayer);
  document.getElementById("newPlayer").value = "";
  //add confirmation message that player was added successfully
   if (players.length > 0){
  addPlayerMessage.innerHTML = players[players.length - 1].name + " has been added!";
  finishButtonDiv.style.display = "block";
  }
  addPlayerDiv.style.display = "block";
  newPlayerDiv.style.display = "none";
} else if(playerNameInput!= "") {
  alert("There is already a player with this name.");
} else {
  alert("Player name can not be blank.");
}
}

function getTotalRounds() {
  addPlayerDiv.style.display = "none";
  finishButtonDiv.style.display = "none";
  getRoundsDiv.style.display = "block";
  startMessage.innerHTML = "How Many Rounds?"
  let option1 = players.length;
  let option2 = players.length * 2;
  let option3 = players.length * 3;

  let option1Button = document.createElement("button");
  option1Button.classList = "btn roundBtn";
  option1Button.innerHTML = option1;
  getRoundsDiv.appendChild(option1Button);
  option1Button.addEventListener("click", () => {
    saveRoundSelection(option1);
  });
  let option2Button = document.createElement("button");
  option2Button.classList = "btn roundBtn";
  option2Button.innerHTML = option2;
  getRoundsDiv.appendChild(option2Button);
  option2Button.addEventListener("click", () => {
    saveRoundSelection(option2);
  });
  let option3Button = document.createElement("button");
  option3Button.classList = "btn roundBtn";
  option3Button.innerHTML = option3;
  getRoundsDiv.appendChild(option3Button);
  option3Button.addEventListener("click", () => {
    saveRoundSelection(option3);
});
}

function saveRoundSelection(rounds) {
  totalRounds = rounds;
  startRound();
}

function resetTurnCards() {
  turn1.classList = "turn1 flip";
  turn2.classList = "turn2"
  turn3.classList = "turn3"
  turn4.classList = "turn4"
  turn5.classList = "turn5"

  turn2.innerHTML = "";
  turn3.innerHTML = "";
  turn4.innerHTML = "";
  turn5.innerHTML = "";
}

function startRound() {
  resetTurnCards();

  if(currentRound == totalRounds){
    startMessage.innerHTML = "Game Over!"
    addScore.style.display = "none";
  } else {
  startButton.style.display = "none";
  getRoundsDiv.style.display = "none";
  addScore.style.display = "none";
  turnCards.style.display = "block";
  turnDiv.style.display = "block";
  nextButton.style.display = "inline-block";
  nextButton.innerHTML = "Next Turn";

  currentRound += 1;
  currentTurn = 1;
  startMessage.innerHTML = "Turn " + currentTurn + " of " + totalTurns;
  getWildCard();
}
}

function nextTurn() {
  currentTurn += 1;
  startMessage.innerHTML = "Turn " + currentTurn + " of " + totalTurns;

  wildCard.classList.remove("bounce");
  void wildCard.offsetWidth;

  getWildCard();
}

function getWildCard() {
  wildCard.classList.add("bounce");
    //turn counter checking when to change round
    if (currentTurn <= totalTurns) {
      //get a random wild card from the wildCards array but no repeats during round
      let newWildCard = wildCards[Math.floor(Math.random()*wildCards.length)];
      if (!wildCardsThisRound.includes(newWildCard)){
      wildCardsThisRound.push(newWildCard);
      wildCard.innerHTML = newWildCard + "s are wild this round!";
      }   else {
      getWildCard();
      }
      if(currentTurn == totalTurns) {
          nextButton.innerHTML = "Finish Round";
      }
  } else {
      //need a way to stop the code from running another turn when the round is finished. it isnt noticeable unless logging console but could cause issues?
      finishRound();
      wildCardsThisRound = [];
  }

  switch(currentTurn) {
    case 1:
        //do nothing if logo is already on 1st turn card
      break;
    case 2:
        turn2.innerHTML = "F";
        turn2.classList.add("flip");
      break;
    case 3:
        turn3.innerHTML = "i";
        turn3.classList.add("flip");
      break;
    case 4:
        turn4.innerHTML = "v";
        turn4.classList.add("flip");
      break;
    case 5:
        turn5.innerHTML = "y";
        turn5.classList.add("flip");
  }
}

function finishRound() {
  turnCards.style.display = "none";
  turnDiv.style.display = "none";
  nextButton.style.display = "none";

  askForScore();
}

function askForScore() {
  addScore.innerHTML = "";
  addScore.style.display = "block";
  startMessage.innerHTML = "How Many Cards Left?";

  players.forEach(player => {
    player.roundScore = 0;
    addScore.innerHTML += player.name;
    let scoreInput = document.createElement("input");
    scoreInput.id = player.name + "scoreInput";
    scoreInput.type = "number";
    scoreInput.defaultValue = 0;
    scoreInput.min = 0;
    scoreInput.max = 10;
    addScore.appendChild(scoreInput);
    addScore.innerHTML += "<br>"
  });

  let saveScoreButton = document.createElement("button");
  saveScoreButton.classList = "btn";
  saveScoreButton.innerHTML = "Save Scores";
  saveScoreButton.id = "saveScoreButton";
  saveScoreButton.style.padding = ".5em";
  addScore.appendChild(saveScoreButton);
  players.forEach(player => {
    saveScoreButton.addEventListener("click", () => {
      updateScore(player)
  });
  });

  let finishScoreButton = document.createElement("button");
  finishScoreButton.classList = "btn";
  finishScoreButton.id = "finishScore";
  finishScoreButton.innerHTML = "Start Next Round";
  finishScoreButton.style.padding = ".5em";
  finishScoreButton.style.display = "none";
  addScore.appendChild(finishScoreButton);
  finishScoreButton.addEventListener("click", startRound);
}

function updateScore(player) {
  player.roundScore = parseInt(document.getElementById(player.name + "scoreInput").value);
  player.score += player.roundScore;
  document.getElementById(player.name + "scoreInput").style.display = "none";
  document.getElementById("saveScoreButton").style.display = "none";
  document.getElementById("finishScore").style.display = "inline-block";
}

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
    scoreBoard.innerHTML = "";
    if(currentRound == 0) {
      scoreBoard.innerHTML += "Game has not started yet<br>";
    } else {
    scoreBoard.innerHTML += "Round: " + currentRound + " of " + totalRounds + "<br>";
    }
    players.forEach(player => {
      scoreBoard.innerHTML += player.name + " - " + player.score + " " + "<br>";
  });
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