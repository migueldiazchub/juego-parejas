"use strict";

document.addEventListener("DOMContentLoaded", function () {
  setBoard();
});

function setBoard() {
  const board = document.getElementById("board");
  for (let id = 0; id < 30; id++) {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.id = `card${id}`;
    board.appendChild(card);
  }
}

function createCards() {
  const cardArray = [];
  const cardValues = "ABCDEFGHIJKLMNO";
  for (let i = 0; i < 30; i++) {}
}

class GameCard {
  constructor(value) {
    this.value = value;
  }
}
