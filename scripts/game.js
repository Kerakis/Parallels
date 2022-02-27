let numberCorrect = 0;
let numberAttempted = 0;
let cardName = "";

function init() {
  // Submit button for user input
  const submitButton = document.querySelector(`#submitButton`);
  submitButton.addEventListener(`click`, cardGuess);

  // Skip to the next art
  const skipButton = document.querySelector(`#skip`);
  skipButton.addEventListener(`click`, skip);
}

async function fetchCard() {
  // Fetch a random card
  try {
    const response = await fetch(`https://api.scryfall.com/cards/random`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function nextRound() {
  let card = await fetchCard();

  // Define the card's name
  cardName = card.name;
  console.log(cardName);

  // Prevent an error if the card has more than one facee
  if (card.card_faces === undefined) {
    let cardImage = card.image_uris.art_crop;
    let imageCreate = document.getElementById("card");
    imageCreate.setAttribute("src", `${cardImage}`);
  } else {
    let cardImage = card.card_faces[0].image_uris.art_crop;
    let imageCreate = document.getElementById("card");
    imageCreate.setAttribute("src", `${cardImage}`);
  }

  // Detect enter key for submission // This isn't working either
  //     document.querySelector('#guessBox').addEventListener('keypress', function (e) {
  //     if (e.key === 'Enter') {
  //       cardGuess();
  //       cardInfo();
  //     }
  // });
}

// Collect user input and check if correct
function cardGuess() {
  let guess = document.getElementById("guessBox").value;
  let answer = cardName;
  document.getElementById("answerBox").style.visibility = "visible";
  document.getElementById("scoreBox").style.visibility = "visible";
  if (guess === answer) {
    document.getElementById(
      "answerBox"
    ).innerHTML = `Correct! The card was ${answer}`;

    numberCorrect++;
  } else {
    document.getElementById(
      "answerBox"
    ).innerHTML = `Sorry. The correct answer was ${answer}`;
  }

  numberAttempted++;

  document.getElementById(
    "scoreBox"
  ).innerHTML = `Score: ${numberCorrect} / ${numberAttempted}`;

  nextRound();
}

function skip() {
  document.getElementById("answerBox").style.visibility = "visible";
  document.getElementById("scoreBox").style.visibility = "visible";
  document.getElementById(
    "answerBox"
  ).innerHTML = `Skipped! The correct answer was ${cardName}`;

  numberAttempted++;

  document.getElementById(
    "scoreBox"
  ).innerHTML = `Score: ${numberCorrect} / ${numberAttempted}`;

  nextRound();
}

init();

// Run the game on page load
nextRound();

// Always display the current year for the copyright
document
  .getElementById("year")
  .appendChild(document.createTextNode(new Date().getFullYear()));
