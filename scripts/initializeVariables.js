const levelSelector = document.querySelector(".levelSelector");
const meter_arrow = document.querySelector("#meter_arrow");
const personalized = document.querySelector(".personalized");
const saveMode = document.querySelector(".saveMode");
const board = document.querySelector(".board");
const boardContainer = document.querySelector(".boardContainer");
const facesButton = document.querySelector(".facesButton");
const minesAmountInfo = document.querySelector(".minesAmountInfo");
const timeInfo = document.querySelector(".timeInfo");
const stateGameText = document.querySelector("#stateGameText");
const root = document.querySelector(":root");

let boardSize = [8,8]; //row, column
let level = 1;
let minesAmount = 10;
let flags = 10;
let minePositions = [];
let counter = 0;
let gameFinishedBool = false;
let startTime = false;
let gameTime = 0;
let timer;
let matrix = [];
let matrixIds = [];