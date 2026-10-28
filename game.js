"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // funciones para crear las cartas y el tablero
  function createCardValues() {
    const cardList = [];
    const cardValues = "ABCDEFGHIJKLMNO";
    for (let i = 0; i < 30; i++) {
      cardList.push(cardValues[Math.floor(i / 2)]);
    }
    return cardList;
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

  function createCardElement(id, value) {
    const cardContainer = document.createElement("article");
    cardContainer.classList.add("game-card-container");
    cardContainer.id = id;

    const cardContent = document.createElement("div");
    //cardContent.textContent = value;
    cardContent.classList.add("game-card-content", "game-card-hidden");

    cardContainer.appendChild(cardContent);
    return cardContainer;
  }

  function setBoard() {
    const cardData = {};
    const board = document.getElementById("board");
    const cardValueList = createCardValues();
    shuffleCards(cardValueList);
    for (let id = 0; id < 30; id++) {
      const cardId = `card${id}`;
      cardData[cardId] = cardValueList[id];

      const newCardContainer = createCardElement(cardId, cardValueList[id]);
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
      console.log("time out");
    }, seconds * 1000);
  }

  //funciones para la lógica del juego
  function flipCard(cardId) {
    const card = document.getElementById(cardId).firstChild;
    card.classList.toggle("game-card-hidden");
    if (card.classList.contains("game-card-hidden")) {
      card.textContent = "";
    } else {
      card.textContent = cardData[cardId];
    }

    return cardId;
  }

  const flipEvent = new Event("flip");
  function cardClickListener(element) {
    element.addEventListener(
      "click",
      function () {
        gameController.previousSelected = gameController.currentSelected;
        gameController.currentSelected = flipCard(this.id);

        document.dispatchEvent(flipEvent);
        console.log(cardData[this.id]);
      },
      { once: true },
    );
  }

  function setBoardInteraction() {
    const cardElements = document.getElementsByClassName("game-card-container");
    for (let element of cardElements) {
      cardClickListener(element);
    }
  }

  //not working currently
  function removeBoardInteraction() {
    const cardElements = document.getElementsByClassName("game-card-container");
    for (let element of cardElements) {
      element.removeEventListener("click");
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

  function restoreCards(currentId, previousId) {
    cardClickListener(document.getElementById(currentId));
    cardClickListener(document.getElementById(previousId));
    flipCard(currentId);
    flipCard(previousId);
  }

  const cardData = setBoard();

  function startGame() {
    gameTimer(5);
    setBoardInteraction();
  }

  const gameController = {
    currentSelected: null,
    previousSelected: null,
    clearSelection: function () {
      this.currentSelected = null;
      this.previousSelected = null;
    },
  };

  const startButton = document.getElementById("game-start");
  startButton.addEventListener("click", startGame);

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
        console.log(true);
      } else {
        console.log(false);

        const currentToRestore = gameController.currentSelected;
        const previousToRestore = gameController.previousSelected;
        let restoreTimer = setTimeout(() => {
          restoreCards(currentToRestore, previousToRestore);
        }, 1000);
      }

      gameController.clearSelection();
    }
  });
});
