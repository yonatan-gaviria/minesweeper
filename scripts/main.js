levelSelector.addEventListener("click", ()=> {
  level++;
  if(level > 6) {
    level = 1;
  }
  selectLevel();
});

/* personalized.addEventListener("click", ()=> {
  root.style.setProperty("--boxSizeRow", 1);
  root.style.setProperty("--boxSizeColumn", 1);
  boardContainer.innerHTML = `<div class="optionsContainer"></div>`;
}); */

facesButton.addEventListener("click", startGame);
document.addEventListener("mouseup", ()=> {
  if(gameFinishedBool === false) {
    facesButton.innerHTML = "🙂";
  }
});

startGame();

function selectLevel() {
  switch (level) {
    case 1: 
      boardSize = [8,8];
      minesAmount = 10;
      meter_arrow.style = "transform: rotate(-80deg);";
    break;
    
    case 2: 
      boardSize = [8,16];
      minesAmount = 26;
      meter_arrow.style = "transform: rotate(-48deg);";
    break;
    
    case 3: 
      boardSize = [16,16];
      minesAmount = 40;
      meter_arrow.style = "transform: rotate(-16deg);";
    break;

    case 4: 
      boardSize = [16,30];
      minesAmount = 100;
      meter_arrow.style = "transform: rotate(16deg);";
    break;

    case 5: 
      boardSize = [30,30];
      minesAmount = 140;
      meter_arrow.style = "transform: rotate(48deg);";
    break;

    case 6: 
      boardSize = [30,60];
      minesAmount = 375;
      meter_arrow.style = "transform: rotate(80deg);";
    break;
  
    default:
    break;
  }

  startGame();
}

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

  root.style.setProperty("--boxSizeRow", boardSize[0]);
  root.style.setProperty("--boxSizeColumn", boardSize[1]);

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
  if(startTime === false) {
    startTime = true;
    startGameTimer();
  }
  
  const box = document.getElementById(`${id}`);
  if(!box.classList.contains("open") && !box.classList.contains("flag") && gameFinishedBool === false) {
    box.classList.add("open");

    if(matrix[position[0]][position[1]] !== "M") {
      if(matrix[position[0]][position[1]] === 0) {
        box.innerHTML = "";
        openBoxArea(position);
      } else {
        const numberElement = matrix[position[0]][position[1]];
        box.classList.add(`number${numberElement}`);
        box.innerHTML = `<h2>${numberElement}</h2>`;
      }
      counter++;
      
    } else {
      gameFinished("lose");
      box.classList.add("detonatedMine");
    }

    if(counter === (boardSize[0] * boardSize[1]) - minesAmount) {
      gameFinished("win");
    }
  }
}

function openBoxArea(position) {
  const range = searchValidArea(position);

  for(let row = range[0]; row <= range[1]; row++) {
    for(let column = range[2]; column <= range[3]; column++) {

        if(matrix[position[0]][position[1]] === 0) {
          const newPosition = [row, column];
          const newId = matrixIds[row][column];
          openBox(newId, newPosition);
        }
    }
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
  console.table(newMatrixWithRanges); ////..............................
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