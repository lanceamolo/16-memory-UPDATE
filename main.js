// All screens should be generated via JavaScript templates

// Focus on getting the actual game to work first! Then focus on the next feature.
// Understand how cards turn

// shuffle deck of cards and place them on the board
const deck = [
  "variables",
  "variables",
  "operators",
  "operators",
  "data type",
  "data type",
  "primitives",
  "primitives",
  "objects",
  "objects",
  "data access.[]",
  "data access.[]",
  "conditional statements",
  "conditional statements",
  "methods",
  "methods",
  "functions",
  "functions",
]

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

// Have a "new game" screen with a single choice "new game"
window.onload = function () {
  document.getElementById("buttonStart").onclick = function () {
    document.documentElement.scrollTop = 0
    document.getElementById("startScreen").style.display = "none"
  }
}

// start screen trigger the 1st shuffle
const deckShuffle = shuffle(deck)
console.log(deck)

let gameGrid = []
for (let i = 0; i < deckShuffle.length; i++) {
  gameGrid = deckShuffle[i]
  console.log(gameGrid)
  document.getElementsByClassName("slot")[i].innerHTML = `${gameGrid}`
}

// need to be able to click on each card to show bottom side
const slot = document.querySelectorAll(".slot")
const endGameScreen = document.getElementById("endGameScreen")
const userTurns = document.getElementById("userTurns")
const restart = document.getElementById("restart")

restart.addEventListener("click", () => {
  window.location.reload()
})

endGameScreen.innerHTML = "Good luck!"

// empty variables for clicked on data
let card1
let card2

// gatekeep turn 2 until i get data for card 1
let turn2 = false

// track players turns
let turnsLeft = 16
userTurns.innerHTML = "Turns left: " + turnsLeft

// fill array to win game
let winGame = []
let gameFinished = false

// When the user finds a match, leave the cards face up and disallow clicking those cards
function flipCard() {
  this.classList.remove("hideText")

  if (!turn2) {
    // assign 1st click to be card1
    card1 = this
    // begin turn 2
    turn2 = true

    return
  } else {
    // assign 2nd click to be card2
    card2 = this
    // circle back around to turn 1
    turn2 = false

    turnsLeft = turnsLeft - 1
    userTurns.innerHTML = "Turns left: " + turnsLeft
    matching()
    console.log(card1)
    console.log(card2)
  }
}

function matching() {
  if (card1.innerHTML !== card2.innerHTML) {
    // hide cards again if they dont match data attribute
    unflipCards()
    setTimeout(() => {
      // When the user runs out of turns, show a losing screen
      if (turnsLeft == 0) {
        disableGame()
        setTimeout(() => {
          gameFinished = true
          window.scrollTo(0, document.body.scrollHeight)
          endGameScreen.innerHTML = "YOU LOSE!!!"
        }, 500)
      }
    }, 25)
  } else {
    card1.style.backgroundColor = "white"
    card2.style.backgroundColor = "white"
    disableCards(card1, card2)
    winGame.push(card1.innerHTML, card2.innerHTML)
    console.log(winGame)
    setTimeout(() => {
      if (winGame.length == 18) {
        gameFinished = true
        window.scrollTo(0, document.body.scrollHeight)
        endGameScreen.innerHTML = "YOU WIN!!!!!!"
      }
    }, 1000)
  }
}

function unflipCards() {
  setTimeout(() => {
    card1.classList.add("hideText")
    card2.classList.add("hideText")
  }, 500)
}

function disableCards() {
  card1.removeEventListener("click", flipCard)
  card2.removeEventListener("click", flipCard)
}

function disableGame() {
  document.removeEventListener("click", flipCard)
}

slot.forEach((card) => card.addEventListener("click", flipCard))
