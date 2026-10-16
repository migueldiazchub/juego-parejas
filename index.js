"use strict";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
