const board = document.querySelector(".board");
const boardContainer = document.querySelector(".boardContainer");

let boardSize = [8, 8];
let dificulty = 1;
let minesAmount = 10;
let counter = 0;

const matrix = createMatrix();
const matrixIds = createMatrixIds();

renderBoard();

function renderBoard() {
  let id = 0;
  for(y = 0; y < boardSize[0]; y++) {
    for(x = 0; x < boardSize[0]; x++) {
      const box = new Box({
        id: id,
        position: [y, x],
        isOpen: false,
      });
      boardContainer.append(box.box);
      id++;
    }
  }
}

function openBox(id, position) {
  const boxToOpen = document.getElementById(`${id}`);

  /* if(matrix[position[0]][position[1]] === 0) {
    counter++;
    boxToOpen.innerHTML = "";
    openBoxArea(position);
  } else if(matrix[position[0]][position[1]] === "M") {
    boxToOpen.innerHTML = "boom";
  } else {
    counter++;
    boxToOpen.innerHTML = matrix[position[0]][position[1]];
    //openBoxArea(position);
  } */ 

  if(matrix[position[0]][position[1]] !== "M") {
    if(matrix[position[0]][position[1]] === 0) {
      boxToOpen.innerHTML = "";
      openBoxArea(position);
    } else {
      boxToOpen.innerHTML = matrix[position[0]][position[1]];
    }
    counter++;
    console.log(counter);
    
  } else {
    boxToOpen.innerHTML = "boom";
  }
}

function openBoxArea(position) {
  const areaToOpen = searchValidArea(position);

  for(let y = areaToOpen[2]; y <= areaToOpen[3]; y++) {
    for(let x = areaToOpen[0]; x <= areaToOpen[1]; x++) {
      const newId = matrixIds[x][y];
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

  for(y = 0; y < boardSize[1]; y++) {
    const newRow = [];
    for(x = 0; x < boardSize[0]; x++) {
      newRow.push(sortedArray[arrayPosition]);
      arrayPosition++;
    }
    newMatrix.push(newRow);
  }

  const newMatrixWithRanges = createMineRange(newMatrix);
  console.table(newMatrixWithRanges);
  return newMatrixWithRanges;
}

function createMineRange(matrix) {
  let matrixWithRanges = matrix;
  const minePositions = searchMines(matrix);
  
  minePositions.forEach((minePosition)=> {
    const mineRange = searchValidArea(minePosition);

    for(let y = mineRange[2]; y <= mineRange[3]; y++) {
      for(let x = mineRange[0]; x <= mineRange[1]; x++) {
        if(matrixWithRanges[y][x] !== "M") {
          matrixWithRanges[y][x] = matrixWithRanges[y][x] + 1;
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
        array.push([indexElement, indexRow]);
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
  for(y = 0; y < boardSize[1]; y++) {
    const arrayIds = [];
    for(x = 0; x < boardSize[1]; x++) {
      arrayIds.push(id);
      id++;
    }
    matrixIds.push(arrayIds);
  }
  return matrixIds;
}