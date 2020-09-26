// Have a "new game" screen with a single choice "new game"
// The game should have a total of 9 pairs (18 cards total)
// When the user runs out of turns, show a losing screen
// When the chooses two cards that do not match, flip them back over
// When the user wins or loses, indicate as much
// All screens should be generated via JavaScript templates

// First priority!
// Focus on getting the actual game to work first! Then focus on the next feature.
// Understand how cards turn

// shuffle deck of cards and place them on the board
// const chosenWord = allowedWords[Math.floor(Math.random() * allowedWords.length)]
// console.log(chosenWord)
// const gbpItemTitle = gbpItem.map(function (item) {
//   return `${item.title} $${item.price}`
// })
// document.querySelector("#answer3").innerHTML = `${gbpItemTitle}`

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

// start screen trigger the 1st shuffle
window.onload = function () {
  document.getElementById("buttonModal").onclick = function () {
    document.getElementById("modal").style.display = "none"
  }
}

const deckShuffle = shuffle(deck)
console.log(deck)

let gameGrid = []
for (let j = 0; j < deckShuffle.length; j++) {
  gameGrid = deckShuffle[j]
  console.log(gameGrid)
  document.getElementsByClassName("slot")[j].innerHTML = `${gameGrid}`
}

// When the user finds a match, leave the cards face up and disallow clicking those cards
const slot = document.querySelectorAll(".slot")

// empty variables for clicked on data
let card1
let card2
// gatekeep turn 2 until i get data for card 1
let turn2 = false

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
      alert("Try again")
    }, 25)
  }
}

function unflipCards() {
  setTimeout(() => {
    card1.classList.add("hideText")
    card2.classList.add("hideText")
  }, 500)
}

// need to be able to click on each card to show bottom side
slot.forEach((card) => card.addEventListener("click", flipCard))

// const slots = document.querySelectorAll(".card")

// let cardOne
// let startTurn2 = false
// let cardTwo

// let chosenCards = []
// const pickCard = document.addEventListener("click", (e) => {
//   for (let i = 0; i < slots.length; i++) {
//     slots[i].onclick = function (e) {
//       let currentTgt = e.target
//       currentTgt.classList.remove("hideText")
//       chosenCards.push(this.outerHTML)
//       console.log(currentTgt)
//       console.log(chosenCards)
//     }
//   }
// })
