const sec = 5;

export class Pung {
  list = null;

  constructor(name, sec){
    this.sec = sec;
    this.name = name;
    this.list = this.createList();
    this.isRunning = true;
    this.run();
  }

  run()
  {
    this.isRunning = true;
    const changeButton = this.list.getElementsByTagName("button")[1];
    changeButton.textContent = '중지';
    this.timerId = setInterval(()=>{
      this.sec--;
      if (this.sec === 0){
        clearInterval(this.timerId);
        this.removeList();
      }
      this.update();
    }, 1000); 
  }

  
  stop(){
    this.isRunning = false;
    clearInterval(this.timerId);
    const changeButton = this.list.getElementsByTagName("button")[1];
    changeButton.textContent = '시작';
  }
  
  add(){
    this.sec += sec;
    this.update();
  }

  update(){
    if (this.list !== null){
      this.list.firstChild.nodeValue = `${this.name} ${this.sec}초 `;
    }
  }

  changeStatus() {
    this.isRunning = !this.isRunning
    this.isRunning? this.run() : this.stop();
  }

  addList() {
    if (this.list !== null){
      document.getElementById("pung-list").appendChild(this.list);
    }
  }

  removeList() {
    if (this.list !== null){
      this.stop();
      if (this.list.parentElement !== null)
        this.list.parentElement.removeChild(this.list);
      this.list = null;
    }
  }

  createList(){
    const newList = document.createElement("li");
    const textNode = document.createTextNode(`${this.name} ${this.sec}초 `);
    newList.append(textNode);

    const addtButton = document.createElement("button");
    addtButton.textContent="+5초"
    addtButton.addEventListener("click", () => this.add());
    newList.append(addtButton);

    const changeButton = document.createElement("button");
    changeButton.textContent="중지"
    changeButton.addEventListener("click", () => this.changeStatus())
    newList.append(changeButton);
  
    const removeButton = document.createElement("button");
    removeButton.textContent="삭제"
    removeButton.addEventListener("click", () => this.removeList());
    newList.append(removeButton);

    return newList;
  }
}