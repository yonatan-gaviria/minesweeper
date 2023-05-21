class Box {
  constructor({
    id,
    position,
    isOpen
  }) {
    this.id = id;
    this.position = position;
    this.isOpen = isOpen;
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
  }

  #handleClick = ()=> {
    if(!this.box.classList.contains("flag")) {
      this.box.classList.add("open");
      this.box.removeEventListener("click", this.#handleClick);
      openBox(this.id, this.position);
    }
  }

  #handleRightClick = (ev)=> {
    ev.preventDefault();
    if(!this.box.classList.contains("open")) {
      this.box.classList.toggle("flag");
    }
  }
}