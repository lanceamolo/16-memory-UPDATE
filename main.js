// Have a "new game" screen with a single choice "new game"
// The game should have a total of 9 pairs (18 cards total)
// When the user runs out of turns, show a losing screen
// When the chooses two cards that do not match, flip them back over
// When the user wins or loses, indicate as much
// All screens should be generated via JavaScript templates

// First priority!
// Focus on getting the actual game to work first! Then focus on the next feature.
// Understand how cards turn

// When the user finds a match, leave the cards face up and disallow clicking those cards
const slots = document.querySelectorAll(".slots")

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
  if (card1.dataset.title !== card2.dataset.title) {
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
slots.forEach((card) => card.addEventListener("click", flipCard))

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
