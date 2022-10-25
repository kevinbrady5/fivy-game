//Array of cards
const cardsTest = [
    "Two of Hearts",
    "Two of Spades",
    "Three of Diamonds",
    "Four of Clubs",
    "King of Spades",
    "King of Clubs",

  ];

  //Array of the turn modifiers
const modifiers = [
    "Draw 1",
    "Draw 2",
    "Draw 3",
    "Pass 1 to the Left",
    "Pass 2 to the Left",
    "Pass 1 to the Right",
    "Pass 2 to the Right",
    "Reverse Play Order",
  ];

function deckBuilder() {
    const values = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", ];
    const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];

    const cards = [];
    for (let s = 0; s < suits.length; s++) {
        for (let v = 0; v < values.length; v++) {
            const value = values[v];
            const suit = suits[s];
            cards.push({ value, suit });
  }
}
return cards;
}

/*function randomCard(cards) { 
    const random = Math.floor(Math.random() * 51);  
    const cardValue = cards[random].value;
    const cardSuit = cards[random].suit;

    let entity;
    cardSuit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + cardSuit.toLowerCase() + ";");

    const card = document.createElement("div");
    card.classList.add("card", cardSuit.toLowerCase());
    card.innerHTML = 
    '<span class="card-value-suit top">' + cardValue + entity + '</span>' + 
    '<span class="card-suit">' + entity + '</span>' + 
    '<span class="card-value-suit bot">' + cardValue + entity + '</span>';
    document.body.appendChild(card);
  }
  const cards = deckBuilder();
  randomCard(cards);
*/
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
const turnCards = document.querySelector(".turnCards");
const turn1 = document.querySelector(".turn1");
const turn2 = document.querySelector(".turn2");
const turn3 = document.querySelector(".turn3");
const turn4 = document.querySelector(".turn4");
const turn5 = document.querySelector(".turn5");
const turnDiv = document.querySelector(".turnDiv");
const turnCounter = document.querySelector(".turnCounter");
const turnModifier = document.querySelector(".turnModifier");
const nextButtonDiv = document.querySelector(".nextButtonDiv");
const newPlayerButton = document.querySelector(".newPlayerButton");
const newPlayerDiv = document.querySelector(".newPlayerDiv");
const playersDisplay = document.querySelector(".players");
const finishButton = document.querySelector(".finishButton");
const numOfRoundsDiv = document.querySelector(".numOfRoundsDiv");
const roundsButton3 = document.querySelector(".roundsButton3");
const roundsButton5 = document.querySelector(".roundsButton5");
const roundsButton7 = document.querySelector(".roundsButton7");
const finishRoundDiv = document.querySelector(".finishRoundDiv");
const newPlayerInput = document.getElementById("newPlayer");
const finishButtonDiv = document.querySelector(".finishButtonDiv");
const addPlayerDiv = document.querySelector(".addPlayerDiv");
const addPlayerButton = document.querySelector(".addPlayerButton");
const playersScoresDiv = document.querySelector(".playersScoresDiv");
const rounds = document.querySelector(".rounds");
const gameOver = document.querySelector(".gameOver");
const wildCard = document.querySelector(".wildCard");

//Main gameplay buttons
startButton.addEventListener("click", gameSetup);
nextButton.addEventListener("click", startTurn);
addPlayerButton.addEventListener("click", playerInput);
newPlayerButton.addEventListener("click", addPlayer);
finishButton.addEventListener("click", getNumTurns);
roundsButton3.addEventListener("click", () => {
    startGame(3)
});
roundsButton5.addEventListener("click", () => {
    startGame(5) 
});
roundsButton7.addEventListener("click", () => {
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
     if (players.length > 0){
    finishButtonDiv.style.display = "block";
    }
    addPlayerDiv.style.display = "block";
    newPlayerDiv.style.display = "none";
}

function getNumTurns() {
    newPlayerDiv.style.display = "none";
    addPlayerDiv.style.display = "none";
    finishButtonDiv.style.display = "none";
    numOfRoundsDiv.style.display = "block";
}

function startGame(roundsChosen) {
    totalRounds = roundsChosen;
    numOfRoundsDiv.style.display = "none";
    startTurn();
}

let currentValue;
let currentSuit;
let wildCardsThisRound = [];
let currentModifier;
let currentTurn = 0;
let totalTurns = 5;
let totalRounds;
let currentRound = 1;

function startTurn() {
    if(currentRound > totalRounds) {
        finishRoundDiv.style.display = "none";
        gameOver.style.display = "block";
        gameOver.innerHTML = "Game over!";
    } else {

    finishRoundDiv.style.display = "none";
    turnCards.style.display = "flex";
    turnDiv.style.display = "block";
    wildCard.style.display = "block";
    nextButtonDiv.style.display = "block";
    nextButton.innerHTML = "Next Turn";
    rounds.style.display = "inline";
    rounds.innerHTML = currentRound + "/" + totalRounds;

    //get a random wild card from the cards array but not the same one back to back
    const cards = deckBuilder();

    const random = Math.floor(Math.random() * 51);  
    const cardValue = cards[random].value;
    const cardSuit = cards[random].suit;

    if (!wildCardsThisRound.includes(cardValue+cardSuit)) {
        currentValue = cardValue;
        currentSuit = cardSuit;
        wildCardsThisRound.push(currentValue+currentSuit);
        wildCard.classList.add("hearts");
        switch(currentSuit) {
            case "Hearts":
                suitIcon = "&hearts;"
                wildCard.className = "hearts";
              break;
            case "Diamonds":
                suitIcon = "&diams;"
                wildCard.className = "diamonds";
              break;
            case "Spades":
                suitIcon = "&spades;";
                wildCard.className = "spades";
              break;
            case "Clubs":
                suitIcon = "&clubs;";
                wildCard.className = "clubs";
          }
        wildCard.innerHTML = currentValue + suitIcon;
        setModifier();
    } else {
        startTurn();
    }
    }
}

function setModifier() {
    //turn counter checking when to change round
    if (currentTurn < totalTurns) {
        //get a random modifier from the modifiers array but not the same one back to back
        let newModifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        if (newModifier != currentModifier){
        currentModifier = newModifier;
        turnModifier.innerHTML = currentModifier;
        currentTurn++;
        turnCounter.innerHTML = "Turn " + currentTurn + " of " + totalTurns;

        switch(currentTurn) {
            case 1:
                turn1.innerHTML = currentTurn;
              break;
            case 2:
                turn2.innerHTML = currentTurn;
              break;
            case 3:
                turn3.innerHTML = currentTurn;
              break;
            case 4:
                turn4.innerHTML = currentTurn;
              break;
            case 5:
                turn5.innerHTML = currentTurn;
          }

        }   else {
        setModifier();
        }
        if(currentTurn == totalTurns) {
            nextButton.innerHTML = "Finish Round";
        }
    } else {
        //need a way to stop the code from running another turn when the round is finished. it isnt noticeable unless logging console but could cause issues?
        finishRound();
        wildCardsThisRound = [];
    }
}

function finishRound() {

    finishRoundDiv.style.display = "block";
    turnCards.style.display = "none";
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
    currentRound ++;
    currentTurn = 0;
    turn2.innerHTML = "";
    turn3.innerHTML = "";
    turn4.innerHTML = "";
    turn5.innerHTML = "";
    startTurn();
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
