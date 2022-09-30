//Array of the goals
const goals = [
    "Two of a Kind",
    "Two Pairs",
    "Three Pairs",
    "Three of a Kind (Set)",
    "Two Three of a Kinds (Two Sets)",
    "Three in a Row (Run)",
    "Two Three in a Rows (Two Sets)",
    "Three of a Suit",
    "Four of a Suit",
    "Two of a Kind + Two of a Suit",
    "Two of a Kind + Three in a Row (Run)",

  ];

  //Array of the goals
const modifiers = [
    "Draw 2",
    "Draw 3",
    "Draw 4",
    "Pass 1 to the Left",
    "Pass 2 to the Left",
    "Pass 1 to the Right",
    "Pass 2 to the Right",
    "Reverse Play Order",
    "Eights are Wild",
    "Face Cards are Wild",
    "Goal Modifier"
  ];

let players = [];

class Player {
    constructor(name, score) {
    this.name = name;
    this.score = score;
    //color or emoji/icon/character?
    }
}

//HTML Elements that need to be updated by JS
const startButton = document.querySelector(".startButton");
const nextButton = document.querySelector(".nextButton"); 
const roundGoalDiv = document.querySelector(".roundGoalDiv");
const roundGoal = document.querySelector(".roundGoal");
const turnDiv = document.querySelector(".turnDiv");
const turnCounter = document.querySelector(".turnCounter");
const turnModifier = document.querySelector(".turnModifier");
const nextButtonDiv = document.querySelector(".nextButtonDiv");
const newPlayerButton = document.querySelector(".newPlayerButton");
const newPlayerDiv = document.querySelector(".newPlayerDiv");
const playersDisplay = document.querySelector(".players");
const finishButton = document.querySelector(".finishButton");
const numOfTurnsDiv = document.querySelector(".numOfTurnsDiv");
const turnsButton3 = document.querySelector(".turnsButton3");
const turnsButton5 = document.querySelector(".turnsButton5");
const turnsButton7 = document.querySelector(".turnsButton7");
const finishRoundDiv = document.querySelector(".finishRoundDiv");
const newPlayerInput = document.getElementById("newPlayer");
const finishButtonDiv = document.querySelector(".finishButtonDiv");
const addPlayerDiv = document.querySelector(".addPlayerDiv");
const addPlayerButton = document.querySelector(".addPlayerButton");
const playersScoresDiv = document.querySelector(".playersScoresDiv");

//Main gameplay buttons
startButton.addEventListener("click", gameSetup);
nextButton.addEventListener("click", setModifier);
addPlayerButton.addEventListener("click", playerInput);
newPlayerButton.addEventListener("click", addPlayer);
finishButton.addEventListener("click", getNumTurns);
turnsButton3.addEventListener("click", () => {
    startGame(3)
});
turnsButton5.addEventListener("click", () => {
    startGame(5) 
});
turnsButton7.addEventListener("click", () => {
    startGame(7)
});

//starts the game setup flow
function gameSetup() {
    startButton.style.display = "none";
    addPlayerDiv.style.display = "block";
}

function playerInput() {
    addPlayerDiv.style.display = "none";
    newPlayerDiv.style.display = "block";
    newPlayerInput.focus();
}

function addPlayer() {
    let newPlayer = new Player(document.getElementById("newPlayer").value, 0);
    players.push(newPlayer);
    document.getElementById("newPlayer").value = "";
    updateScore();
     if (players.length > 1){
    finishButtonDiv.style.display = "block";
    }
    addPlayerDiv.style.display = "block";
    newPlayerDiv.style.display = "none";
}

function getNumTurns() {
    newPlayerDiv.style.display = "none";
    addPlayerDiv.style.display = "none";
    finishButtonDiv.style.display = "none";
    numOfTurnsDiv.style.display = "block";
}

function startGame(turns) {
    totalTurns = turns;
    numOfTurnsDiv.style.display = "none";
    setGoal();
}

let currentGoal;
let currentModifier;
let currentTurn = 0;
let totalTurns;

function setGoal() {
    finishRoundDiv.style.display = "none";
    roundGoalDiv.style.display = "block";
    turnDiv.style.display = "block";
    nextButtonDiv.style.display = "block";
    nextButton.innerHTML = "Next Turn";
    //reset turn when goal changes
    currentTurn = 0;
    //get a random goal from the goals array but not the same one back to back
    let newGoal = goals[Math.floor(Math.random()*goals.length)];
    if (newGoal != currentGoal) {
        currentGoal = newGoal;
        roundGoal.innerHTML = currentGoal;
        setModifier();
    } else {
        setGoal();
    }
}

function setModifier() {
    //turn counter checking when to change goal
    if (currentTurn < totalTurns) {
        //get a random modifier from the modifiers array but not the same one back to back
        let newModifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        if (newModifier != currentModifier){
        currentModifier = newModifier;
        turnModifier.innerHTML = currentModifier;
        currentTurn++;
        turnCounter.innerHTML = "Turn " + currentTurn + " of " + totalTurns;
        }   else {
        setModifier();
        }
        if(currentTurn == totalTurns) {
            nextButton.innerHTML = "Finish Round";
        }
    } else {
        finishRound();
    }
}

function finishRound() {

    finishRoundDiv.style.display = "block";
    roundGoalDiv.style.display = "none";
    turnDiv.style.display = "none";
    nextButtonDiv.style.display = "none";

    finishRoundDiv.innerHTML = "Who won?"

    players.forEach(player => createPlayerButton(player));

    function createPlayerButton(player) {
        let btn = document.createElement("button");
        btn.innerHTML = player.name;
        //this event listener is where ill call add score and pass the winners name and increase their score
        btn.addEventListener("click", () => {
            addScore(player.name)
        });
        finishRoundDiv.appendChild(btn);
    }

    let btn = document.createElement("button");
        btn.innerHTML = "No one";
        btn.addEventListener("click", setGoal);
        finishRoundDiv.appendChild(btn);
}

function addScore(winner) {
    players.forEach(player => {
        if(player.name == winner){
            player.score += 1;
            updateScore();
        } else {
            updateScore();
        }
    });
    setGoal();
}

function updateScore() {
    playersScoresDiv.style.display = "block";
    playersDisplay.innerHTML = "";
    players.forEach(player => {
        playersDisplay.innerHTML += player.name + " - " + player.score + " ";
    });
}

//instructions on how to play
// Get the modal
var modal = document.getElementById("instructionsModal");

// Get the button that opens the modal
var btn = document.getElementById("instructionsModalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
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
