const board = document.querySelector(".board");
const boardContainer = document.querySelector(".boardContainer");
const facesButton = document.querySelector(".facesButton");
const minesAmountInfo = document.querySelector(".minesAmountInfo");
const timeInfo = document.querySelector(".timeInfo");
const stateGameText = document.querySelector("#stateGameText");
const root = document.querySelector(":root");

let boardSize = [8, 8]; //row, column
let dificulty = 1;
let minesAmount = 10;
let flags = 10;
let minePositions = [];
let counter = 0;
let gameFinishedBool = false;
let startTime = false;
let gameTime = 0;
let timer;

root.style.setProperty("--boxSizeRow", boardSize[0]);
root.style.setProperty("--boxSizeColumn", boardSize[1]);