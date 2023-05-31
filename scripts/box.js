class Box {
  constructor({
    id,
    position,
    hasFlag,
  }) {
    this.id = id;
    this.position = position;
    this.hasFlag = hasFlag;
    this.#init();
  }

  #init = ()=> {
    const box = document.createElement("div");
    box.classList.add("box");
    box.id = this.id;

    this.element = box;
    this.#addEventListeners();
  }

  #addEventListeners = ()=> {
    this.element.addEventListener("click", this.#handleClick);
    this.element.addEventListener("contextmenu", this.#handleRightClick);
    this.element.addEventListener("mousedown", this.#handleMouseDown);
  }

  #handleClick = ()=> {
    openBox(this.id, this.position);
  }

  #handleRightClick = (ev)=> {
    if(gameFinishedBool === false) {
      ev.preventDefault();
      if(!this.element.classList.contains("open")) {
        if(!this.hasFlag) {
          if(flags > 0) {
            this.hasFlag = !this.hasFlag;
            this.element.classList.toggle("flag");
            flags--;
          } else {
            alert("you have no more flags");
          }
        } else if(this.hasFlag) {
          this.hasFlag = !this.hasFlag;
          this.element.classList.toggle("flag");
          flags++;
        }
        
        minesAmountInfo.innerHTML = `FLAGS: ${flags}`;
      }
    }
  }

  #handleMouseDown = (ev)=> {
    if(gameFinishedBool === false && ev.button === 0) {
      if(!this.element.classList.contains("flag") && !this.element.classList.contains("open")) {
        const randomPosition = Math.floor(Math.random() * surpriseFaces.length);
        const randomFace = surpriseFaces[randomPosition];
        facesButton.innerHTML = randomFace;
      }
    }
  }
}