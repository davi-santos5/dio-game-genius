let colorOrder = [];
let clickedOrder = [];
let score = 0;
let level = 1;

const modalWrapper = document.querySelector(".modal-wrapper");
const modal = modalWrapper.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close");
const modalTitle = document.querySelector(".modal-title");
const modalMessageText = document.querySelector(".message-text");
const modalMessageBtn = document.querySelector(".message-btn");

const scorePoints = document.querySelector(".score-points");
const levelNumber = document.querySelector(".level-number");

const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

modalWrapper.onclick = (event) =>
  event.target.className === "modal-wrapper show" && modalClose();
modalCloseBtn.onclick = () => modalClose();
modalMessageBtn.onclick = () => modalClose();

const modalShow = () => {
  modalWrapper.classList.add("show");
};

const modalClose = () => {
  modalWrapper.classList.remove("show");

  level = 1;
  score = 0;
  scorePoints.innerText = score;
  levelNumber.innerText = level;

  shuffleOrder();
};

const shuffleOrder = () => {
  let randomColor = Math.floor(Math.random() * 4);
  colorOrder = [...colorOrder, randomColor];
  clickedOrder = [];
  for (let i in colorOrder) {
    let elementColor = createColorElement(colorOrder[i]);
    lightColor(elementColor, Number(i) + 1, colorOrder[i]);
  }
};

const lightColor = (element, number, colorIndex) => {
  number *= 500;
  setTimeout(() => {
    element.classList.add(`selected${colorIndex}`);
  }, number - 250);

  setTimeout(() => {
    element.classList.remove(`selected${colorIndex}`);
  }, number);
};

const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != colorOrder[i]) {
      return gameOver();
    }
  }
  if (clickedOrder.length == colorOrder.length) setTimeout(nextLevel, 250);
};

const click = (color) => {
  clickedOrder = [...clickedOrder, color];

  createColorElement(color).classList.add(`selected${color}`);

  setTimeout(() => {
    createColorElement(color).classList.remove(`selected${color}`);
    checkOrder();
  }, 250);
};

const createColorElement = (color) => {
  if (color == 0) return green;
  if (color == 1) return red;
  if (color == 2) return yellow;
  if (color == 3) return blue;
};

const nextLevel = () => {
  score = score + level * 100;
  level++;
  scorePoints.innerText = score;
  levelNumber.innerText = level;
  shuffleOrder();
};

const gameOver = () => {
  colorOrder = [];
  clickedOrder = [];

  modalShow();
  modalTitle.innerText = "Oh no! You lost the game :( ";
  modalMessageText.innerHTML = `<span>Score: ${score}</span> <span>Max Level: ${level}</span>`;
};

const playGame = () => {
  modalShow();
  modalTitle.innerText = "Welcome to Genius!";

  level = 1;
  score = 0;
};

playGame();
