export class Chef{
  status = '대기중';

  constructor(name){
    this.name = name;
    this.list = this.addChefList();
  }

  cooking(food){
    return new Promise((resolve, reject) => {
      this.status = '요리중';
      this.updateChefList(food);
      setTimeout(() => {
        this.status = '대기중';
        this.updateChefList(null);
        resolve(food);
      }, food.time);
    });
  }

  addChefList(){
    const newList = document.createElement("li");

    const textNode = document.createTextNode(`${this.name} 대기중`);
    newList.append(textNode);
    
    const myList = document.getElementById("cooking");
    myList.appendChild(newList);
    
    return newList;
  }

  updateChefList(food){
    if (this.status === '대기중'){
      this.list.textContent = `${this.name} 대기중`
    }
    else{
      this.list.textContent = `${this.name} 주문${food.no} ${food.name} 요리중`
    }
  }
}