class CustomGame {
  constructor() {
    this.#init();
  }

  #smallerSize = 0;
  #maximumRange = 9;
  #totalBoxes = 0;
  #maxMinesAmount = 0;

  #init = ()=> {
    const customMenuContainer = document.createElement("div");
    customMenuContainer.classList.add("customMenuContainer");

    const textWidth = document.createElement("div");
    textWidth.innerText = "width: ";
    textWidth.classList.add("textWidth");
    customMenuContainer.append(textWidth);

    const inputWidth = document.createElement("input");
    inputWidth.type = "number";
    inputWidth.min = "1";
    inputWidth.value = boardSize[1];
    inputWidth.classList.add("inputWidth");
    customMenuContainer.append(inputWidth);

    const textHeight = document.createElement("div");
    textHeight.innerText = "height: ";
    textHeight.classList.add("textHeight");
    customMenuContainer.append(textHeight);

    const inputHeight = document.createElement("input");
    inputHeight.type = "number";
    inputHeight.min = "1";
    inputHeight.value = boardSize[0];
    inputHeight.classList.add("inputHeight");
    customMenuContainer.append(inputHeight);

    const textMinesAmount = document.createElement("div");
    textMinesAmount.innerText = "mines: ";
    textMinesAmount.classList.add("textMinesAmount");
    customMenuContainer.append(textMinesAmount);

    const inputMines = document.createElement("input");
    inputMines.type = "number";
    inputMines.min = "0";
    inputMines.value = minesAmount;
    inputMines.classList.add("inputMines");
    customMenuContainer.append(inputMines);

    const verificatorContainer = document.createElement("div");
    verificatorContainer.classList.add("verificatorContainer");
    customMenuContainer.append(verificatorContainer);

    const acceptVerificator = document.createElement("button");
    acceptVerificator.classList.add("acceptVerificator");
    acceptVerificator.innerText = "accept";
    verificatorContainer.append(acceptVerificator);

    const cancelVerificator = document.createElement("button");
    cancelVerificator.classList.add("cancelVerificator");
    cancelVerificator.innerText = "cancel";
    verificatorContainer.append(cancelVerificator);

    this.element = customMenuContainer;
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.inputMines = inputMines;
    this.acceptVerificator = acceptVerificator;
    this.cancelVerificator = cancelVerificator;

    this.#addEventListeners();
  }

  #addEventListeners = ()=> {
    this.acceptVerificator.addEventListener("click", this.#handleAccept);
    this.cancelVerificator.addEventListener("click", this.#handleCancel);
    this.inputWidth.addEventListener("change", this.#handleValidateFields);
    this.inputHeight.addEventListener("change", this.#handleValidateFields);
  }

  #handleAccept = ()=> {
    boardSize[1] = this.inputWidth.value;
    boardSize[0] = this.inputHeight.value;
    
    if(Number(this.inputMines.value) > this.#maxMinesAmount) {
      minesAmount = this.#maxMinesAmount;
    } else if(Number(this.inputMines.value) < 0) {
      minesAmount = 0;
    } else {
      minesAmount = Number(this.inputMines.value);
    }
    restartDefaultValues();
  }

  #handleCancel = ()=> {
    restartDefaultValues();
  }

  #handleValidateFields = (ev)=> {
    if(ev.target.value === "" || ev.target.value === "0") {
      ev.target.value = 1;
    }

    Number(this.inputWidth.value) <= Number(this.inputHeight.value) ? 
    this.#smallerSize = Number(this.inputWidth.value) :
    this.#smallerSize = Number(this.inputHeight.value);

    if(this.#smallerSize <= 3) {
      this.#maximumRange = this.#smallerSize * 3;
    }

    this.#totalBoxes = Number(this.inputWidth.value) * Number(this.inputHeight.value);
    this.#maxMinesAmount = this.#totalBoxes - this.#maximumRange;

    if(this.#maxMinesAmount < 0) { 
      this.#maxMinesAmount = 0;
    }

    if(Number(this.inputMines.value) > this.#maxMinesAmount) {
      this.inputMines.value = this.#maxMinesAmount;
    }
  }
}