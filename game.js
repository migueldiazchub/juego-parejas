"use strict";

document.addEventListener("DOMContentLoaded", function () {
  setBoard();

  const cardElements = document.getElementsByClassName("game-card-container");
  for (let element of cardElements) {
    element.addEventListener("click", function () {
      flipCard(this);
    });
  }
});

function flipCard(cardContainer) {
  const content = cardContainer.firstChild;
  content.classList.toggle("game-card-hidden");
}

function setBoard() {
  const board = document.getElementById("board");
  const cardArray = createCardValues();
  shuffleCards(cardArray);
  for (let id = 0; id < 30; id++) {
    const newCard = createCard(id, cardArray[id]);
    board.appendChild(newCard);
  }
}

function createCard(id, value) {
  const cardContainer = document.createElement("article");
  cardContainer.classList.add("game-card-container");
  cardContainer.id = `card${id}`;

  const cardContent = document.createElement("div");
  cardContent.textContent = value;
  cardContent.classList.add("game-card-content", "game-card-hidden");

  cardContainer.appendChild(cardContent);
  return cardContainer;
}

function createCardValues() {
  const cardArray = [];
  const cardValues = "ABCDEFGHIJKLMNO";
  for (let i = 0; i < 30; i++) {
    cardArray.push(cardValues[Math.floor(i / 2)]);
  }
  return cardArray;
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

class GameCard {
  constructor(id, value) {
    this.id = id;
    this.value = value;
    this.reveal = false;
  }
}
