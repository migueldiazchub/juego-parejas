"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // funciones para crear las cartas y el tablero

  function getPictures() {
    const pictureUrlList = [];
    for (let i = 0; i < 30; i++) {
      pictureUrlList.push(`./gatos/img${Math.floor(i / 2)}.jpg`);
    }
    return pictureUrlList;
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
    const pictureUrlList = getPictures();
    shuffleCards(pictureUrlList);

    const board = document.getElementById("board");
    for (let id = 0; id < 30; id++) {
      const cardId = `card${id}`;
      cardData[cardId] = pictureUrlList[id];
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

    card.classList.toggle("game-card-hidden");
    if (card.classList.contains("game-card-hidden")) {
      card.src = "";
    } else {
      const img = document.createElement("img");
      img.src = cardData[cardId];
      card.append(img);
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
    const img = card.firstChild.firstChild;
    card.firstChild.removeChild(img);
  }

  const cardData = setBoard();

  const gameController = {
    score: 0,
    pairsRemaining: 15,
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
    gameTimer(60);
  }

  const endEvent = new Event("gameEnd");
  function endGame() {
    removeBoardInteraction();
    document.getElementById("end-window").classList.remove("hidden");

    const username = document.getElementById("username-display");
    const usernamevalue = document.getElementById("data-user").textContent;
    username.value = usernamevalue.trim();
    const score = document.getElementById("score-display");
    score.value = document.getElementById("data-score").textContent;
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
        gameController.pairsRemaining--;

        if (gameController.pairsRemaining == 0) {
          gameController.score += 40;
          updateScore();
          document.dispatchEvent(endEvent);
        }
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

  document.getElementById("go-back").addEventListener("click", function () {
    window.location.href = "index.php";
  });
});
