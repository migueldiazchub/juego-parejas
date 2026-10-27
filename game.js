"use strict";

document.addEventListener("DOMContentLoaded", function () {
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
    cardContent.textContent = value;
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

  function flipCard(cardId) {
    const card = document.getElementById(cardId).firstChild;
    card.classList.toggle("game-card-hidden");

    return cardId;
  }

  function checkCardPair(currentId, previousId) {
    if (cardData[currentId] === cardData[previousId]) {
      return true;
    } else {
      return false;
    }
  }

  const cardData = setBoard();

  const gameController = {
    currentSelected: null,
    previousSelected: null,
    clearSelection: function () {
      this.currentSelected = null;
      this.previousSelected = null;
    },
  };

  function cardClickListener(element) {
    element.addEventListener(
      "click",
      function () {
        gameController.previousSelected = gameController.currentSelected;
        gameController.currentSelected = flipCard(this.id);

        document.dispatchEvent(flipEvent);
        console.log(gameController);
      },
      { once: true },
    );
  }

  const flipEvent = new Event("flip");
  const cardElements = document.getElementsByClassName("game-card-container");
  for (let element of cardElements) {
    cardClickListener(element);
  }

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

        cardClickListener(
          document.getElementById(gameController.currentSelected),
        );
        cardClickListener(
          document.getElementById(gameController.previousSelected),
        );
        flipCard(gameController.currentSelected);
        flipCard(gameController.previousSelected);
      }

      gameController.clearSelection();
    }
  });
});
