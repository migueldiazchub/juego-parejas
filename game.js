"use strict";

// cat api key
// live_K3RykO2vhIYOYfR0ES49AC4VCAUPWZkWQk8PihbhQUrSmKY6TExVpIVFi0umhVR9

// https://api.thecatapi.com/v1/images/search?limit=15

async function getPictures() {
  const pictureUrlList = [];
  try {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=15",
      {
        headers: {
          "x-api-key":
            "live_K3RykO2vhIYOYfR0ES49AC4VCAUPWZkWQk8PihbhQUrSmKY6TExVpIVFi0umhVR9",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const result = await response.json();
    for (let item of result) {
      pictureUrlList.push(item.url);
    }
    return pictureUrlList;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // funciones para crear las cartas y el tablero
  async function getImageElements() {
    const urlList = await getPictures();
    const imgData = {};
    for (let id = 0; id < 30; id++) {
      const img = document.createElement("img");
      const imgId = `img${Math.floor(id / 2)}`;
      img.src = urlList[Math.floor(id / 2)];
      img.classList.add("game-card-image");
      imgData[imgId] = img;
    }
    return imgData;
  }

  function shuffleCards(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  function createCardElement(id) {
    const cardContainer = document.createElement("article");
    cardContainer.classList.add("game-card-container");
    cardContainer.id = id;

    const cardContent = document.createElement("div");
    cardContent.classList.add("game-card-content", "game-card-hidden");

    cardContainer.appendChild(cardContent);
    return cardContainer;
  }

  function setBoard() {
    const cardData = {};
    const numberArray = [];
    for (let i = 0; i < 30; i++) {
      numberArray.push(Math.floor(i / 2));
    }
    shuffleCards(numberArray);

    const board = document.getElementById("board");
    for (let id = 0; id < 30; id++) {
      const cardId = `card${id}`;
      const imgId = `img${numberArray[id]}`;
      cardData[cardId] = imgId;
      const newCardContainer = createCardElement(cardId);
      board.appendChild(newCardContainer);
    }
    return cardData;
  }

  //temporizador
  function gameTimer(seconds) {
    const timeDisplay = document.getElementById("data-time");
    let remainingSeconds = seconds;
    timeDisplay.textContent = remainingSeconds;
    let timeInterval = setInterval(() => {
      timeDisplay.textContent = --remainingSeconds;
    }, 1000);
    let gameTimer = setTimeout(() => {
      clearInterval(timeInterval);
      document.dispatchEvent(endEvent);
      console.log("time out");
    }, seconds * 1000);
  }

  //puntuación
  function updateScore() {
    const scoreDisplay = document.getElementById("data-score");
    scoreDisplay.textContent = gameController.score;
  }

  //funciones para la lógica del juego
  const flipEvent = new Event("flip");
  function flipHandler(event) {
    const card = event.currentTarget.firstChild;
    const cardId = event.currentTarget.id;
    const imgId = cardData[cardId];

    card.classList.toggle("game-card-hidden");
    if (card.classList.contains("game-card-hidden")) {
      card.removeChild(imgData[imgId]);
    } else {
      card.appendChild(imgData[imgId]);
    }

    gameController.previousSelected = gameController.currentSelected;
    gameController.currentSelected = cardId;

    document.dispatchEvent(flipEvent);
    console.log(cardData[cardId]);
  }

  function cardClickListener(element) {
    element.addEventListener("click", flipHandler, { once: true });
  }

  function setBoardInteraction() {
    const cardElements = document.getElementsByClassName("game-card-container");
    for (let element of cardElements) {
      cardClickListener(element);
    }
  }

  //not working exactly as intended
  //conflicts with restore timeout
  function removeBoardInteraction() {
    const cardElements = document.getElementsByClassName("game-card-container");
    for (let element of cardElements) {
      element.removeEventListener("click", flipHandler);
    }
  }

  function checkCardPair(currentId, previousId) {
    console.log(gameController);
    if (cardData[currentId] === cardData[previousId]) {
      return true;
    } else {
      return false;
    }
  }

  function restoreCard(cardId) {
    const card = document.getElementById(cardId);
    cardClickListener(card);
    card.firstChild.classList.add("game-card-hidden");
    card.firstChild.textContent = "";
  }

  const imgData = await getImageElements();
  const cardData = setBoard();

  const gameController = {
    score: 0,
    currentSelected: null,
    previousSelected: null,
    clearSelection: function () {
      this.currentSelected = null;
      this.previousSelected = null;
    },
  };

  function startGame() {
    document.getElementById("start-window").classList.add("hidden");
    document.getElementById("game-window").classList.remove("hidden");
    setBoardInteraction();
    gameTimer(600);
  }

  const endEvent = new Event("gameEnd");
  function endGame() {
    //removeBoardInteraction();
  }

  document.getElementById("game-start").addEventListener("click", startGame);

  document.addEventListener("flip", function () {
    console.log("flip");
    if (gameController.previousSelected === null) {
      return;
    } else {
      if (
        checkCardPair(
          gameController.currentSelected,
          gameController.previousSelected,
        )
      ) {
        gameController.score += 10;
        updateScore();
        console.log(true);
      } else {
        gameController.score -= 1;
        updateScore();
        console.log(false);

        const currentToRestore = gameController.currentSelected;
        const previousToRestore = gameController.previousSelected;
        let restoreTimer = setTimeout(() => {
          restoreCard(currentToRestore);
          restoreCard(previousToRestore);
        }, 1000);
        document.addEventListener("gameEnd", function () {
          clearTimeout(restoreTimer);
        });
      }

      gameController.clearSelection();
    }
  });

  document.addEventListener("gameEnd", endGame);
});
