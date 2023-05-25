facesButton.addEventListener("click", startGame);
document.addEventListener("mouseup", ()=> {
  if(gameFinishedBool === false) {
    facesButton.innerHTML = "🙂";
  }
});

let matrix = [];
let matrixIds = [];

startGame();

function startGame() {
  flags = minesAmount;
  minesAmountInfo.innerHTML = `FLAGS: ${flags}`;
  timeInfo.innerHTML = `TIME: 0`;
  counter = 0;
  startTime = false;
  gameFinishedBool = false;
  gameTime = 0;
  boardContainer.innerHTML = "";
  stateGameText.innerText = "";
  facesButton.innerHTML = "🙂";
  matrix = createMatrix();
  matrixIds = createMatrixIds();
  
  clearTimeout(timer);
  renderBoard();
}

function renderBoard() {
  let id = 0;
  for(row = 0; row < boardSize[0]; row++) {
    for(column = 0; column < boardSize[1]; column++) {
      const box = new Box({
        id: id,
        position: [row, column],
        hasFlag: false,
      });
      boardContainer.append(box.box);
      id++;
    }
  }
}

function openBox(id, position) {
  const boxToOpen = document.getElementById(`${id}`);

  if(startTime === false) {
    startTime = true;
    startGameTimer();
  }

  if(matrix[position[0]][position[1]] !== "M") {
    if(matrix[position[0]][position[1]] === 0) {
      boxToOpen.innerHTML = "";
      openBoxArea(position);
    } else {
      const numberElement = matrix[position[0]][position[1]];
      boxToOpen.classList.add(`number${numberElement}`);
      boxToOpen.innerHTML = `<h1>${numberElement}</h1>`;
    }
    counter++;
    
  } else {
    gameFinished("lose");
    boxToOpen.classList.add("detonatedMine");
  }

  if(counter === (boardSize[0] * boardSize[1]) - minesAmount) {
    gameFinished("win");
  }
}

function startGameTimer() {
  timer = setTimeout(()=> {
    gameTime++;
    timeInfo.innerHTML = `TIME: ${gameTime}`;
    startGameTimer();
  }, 1000);
}

function gameFinished(resultGame) {
  gameFinishedBool = true;
  clearTimeout(timer);

  if(resultGame === "win") {
    winGame();
    stateGameText.innerText = "¡YOU WIN!";
  } else if(resultGame === "lose") {
    loseGame();
    stateGameText.innerText = "¡YOU LOSE!";
  }

  function winGame() {
    minePositions.forEach((position)=> {
      const id = matrixIds[position[0]][position[1]];
      const boxToOpen = document.getElementById(`${id}`);
      boxToOpen.classList.add("flag");
    });
    facesButton.innerHTML = "😎";
  }

  function loseGame() {
    matrixIds.forEach((row, rowIndex)=> {
      row.forEach((column, columnIndex)=> {
        const boxToOpen = document.getElementById(`${column}`);
        if(boxToOpen.classList.contains("flag")) {
          if(matrix[rowIndex][columnIndex] !== "M") {
            boxToOpen.classList.remove("flag");
            boxToOpen.classList.add("open");
            boxToOpen.classList.add("wrongMine");
          }
        } else if(matrix[rowIndex][columnIndex] === "M") {
          boxToOpen.classList.add("mine");
        }
      });
    });
    facesButton.innerHTML = "💀";
  }
}

function openBoxArea(position) {
  const areaToOpen = searchValidArea(position);

  for(let row = areaToOpen[0]; row <= areaToOpen[1]; row++) {
    for(let column = areaToOpen[2]; column <= areaToOpen[3]; column++) {
      const newId = matrixIds[row][column];
      const boxToOpen = document.getElementById(`${newId}`);
      boxToOpen.click();
    }
  }
}

function createMatrix() {
  const arraySize = boardSize[0] * boardSize[1];
  const array = new Array(arraySize).fill(0).fill("M", 0, minesAmount);
  const sortedArray = array.sort(()=> Math.random() - 0.5);
  const newMatrix = [];
  let arrayPosition = 0;

  for(row = 0; row < boardSize[0]; row++) {
    const newRow = [];
    for(column = 0; column < boardSize[1]; column++) {
      newRow.push(sortedArray[arrayPosition]);
      arrayPosition++;
    }
    newMatrix.push(newRow);
  }

  const newMatrixWithRanges = createMineRange(newMatrix);
  return newMatrixWithRanges;
}

function createMineRange(matrix) {
  let matrixWithRanges = matrix;
  minePositions = searchMines(matrix);
  
  minePositions.forEach((minePosition)=> {
    const mineRange = searchValidArea(minePosition);

    for(let row = mineRange[0]; row <= mineRange[1]; row++) {
      for(let column = mineRange[2]; column <= mineRange[3]; column++) {
        if(matrixWithRanges[row][column] !== "M") {
          matrixWithRanges[row][column] = matrixWithRanges[row][column] + 1;
        }
      }
    }
  });
  return matrixWithRanges;
}

function searchMines(matrix) {
  const array = [];
  matrix.forEach((row, indexRow)=> {
    row.forEach((element, indexElement)=> {
      if(element === "M") {
        array.push([indexRow, indexElement]);
      }
    });
  });
  return array;
}

function searchValidArea(position) {
  const range = [];
  position.forEach((item, index)=> {
    item - 1 < 0 ? range.push(item) : range.push(item - 1);
    item + 1 > boardSize[index] - 1 ? range.push(item) : range.push(item + 1);
  });
  return range;
}

function createMatrixIds() {
  let id = 0;
  const matrixIds = [];
  for(row = 0; row < boardSize[0]; row++) {
    const arrayIds = [];
    for(column = 0; column < boardSize[1]; column++) {
      arrayIds.push(id);
      id++;
    }
    matrixIds.push(arrayIds);
  }
  return matrixIds;
}