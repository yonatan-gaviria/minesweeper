const levelSelector = document.querySelector(".levelSelector");
const meter_arrow = document.querySelector("#meter_arrow");
const personalized = document.querySelector(".personalized");
const mode = document.querySelector(".mode");

const board = document.querySelector(".board");

const facesButton = document.querySelector(".facesButton");
const minesAmountInfo = document.querySelector(".minesAmountInfo");
const timeInfo = document.querySelector(".timeInfo");

const boardContainer = document.querySelector(".boardContainer");

const stateGameText = document.querySelector("#stateGameText");

const root = document.querySelector(":root");

let boardSize = [8,8]; //row, column
let level = 1;
let minesAmount = 10;
let flags = 10;
let counter = 0;
let gameFinishedBool = false;
let startGameBool = false;
let saveModeBool = false;
let gameTime = 0;
let timer;
let minePositions = [];
let matrix = [];
let matrixIds = [];

const loseFaces = ["😫", "😓", "😔", "🙁", "😞", "😢", "😭", "🤕", "🥺", "💀"];
const winFaces = ["😎", "🤩", "😜", "😝", "🤯", "🥳", "🧐", "🤓"];
const surpriseFaces = ["😗", "😮", "😬", "🥶", "😖", "😥"];