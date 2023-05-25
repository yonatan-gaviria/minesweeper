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

    this.box = box;
    this.#addEventListeners();
  }

  #addEventListeners = ()=> {
    this.box.addEventListener("click", this.#handleClick);
    this.box.addEventListener("contextmenu", this.#handleRightClick);
    this.box.addEventListener("mousedown", this.#handleMouseDown);
  }

  #handleClick = ()=> {
    if(gameFinishedBool === false) {
      if(!this.box.classList.contains("flag")) {
        this.box.classList.add("open");
        this.box.removeEventListener("click", this.#handleClick);
        openBox(this.id, this.position);
      }
    }
  }

  #handleRightClick = (ev)=> {
    if(gameFinishedBool === false) {
      ev.preventDefault();
      if(!this.box.classList.contains("open")) {
        if(!this.hasFlag) {
          if(flags > 0) {
            this.hasFlag = !this.hasFlag;
            this.box.classList.toggle("flag");
            flags--;
          } else {
            alert("you have no more flags");
          }
        } else if(this.hasFlag) {
          this.hasFlag = !this.hasFlag;
          this.box.classList.toggle("flag");
          flags++;
        }
        
        minesAmountInfo.innerHTML = `FLAGS: ${flags}`;
      }
    }
  }

  #handleMouseDown = (ev)=> {
    if(gameFinishedBool === false && ev.button === 0) {
      if(!this.box.classList.contains("flag") && !this.box.classList.contains("open")) {
        facesButton.innerHTML = "😮";
      }
    }
  }
}