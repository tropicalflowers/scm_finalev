const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let startTime, endTime;

function startTimer() {
  startTime = new Date();
}

function stopTimer() {
  endTime = new Date();
  let timeDiff = endTime - startTime; // in ms
  timeDiff /= 1000; // convert to seconds
  let seconds = Math.round(timeDiff);
  alert(`Level Completed! Time taken: ${seconds} seconds. Resetting the level after 'ok' gets clicked.`);
}

function flipCard(event) {
  if (!startTime) startTimer(); // Start timer when first card is flipped

  var clickedCard = event.currentTarget;
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 2) {
      stopTimer(); // Stop timer when all matches are found
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  startTime = null; // Reset timer
  let arr = [1, 2, 1, 2];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `https://cdn.jsdelivr.net/gh/Sop20Games/memory-card@main/images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
