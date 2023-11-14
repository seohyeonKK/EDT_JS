export class Server{
  status = '대기중'

  constructor(time, name){
    this.time = time;
    this.name = name;
    this.list = this.addServerList();
  }

  serving(food){
    return new Promise((resolve, reject) => {
      this.status = '서빙';
      this.updateServerList(food);
      setTimeout(() => {
        this.status = '대기중';
        this.updateServerList(null);
        resolve();
      }, this.time);
    });
  }

  addServerList(){
    const newList = document.createElement("li");

    const textNode = document.createTextNode(`${this.name} 대기중`);
    newList.append(textNode);
    
    const myList = document.getElementById("serving");
    myList.appendChild(newList);
    
    return newList;
  }

  updateServerList(food){
    if (this.status === '대기중'){
      this.list.textContent = `${this.name} 대기중`
    }
    else{
      this.list.textContent = `${this.name} 주문${food.no} ${food.name} 서빙중`
    }
  }
}

