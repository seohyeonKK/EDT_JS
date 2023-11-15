import { Pung } from "./Pung.js";

let pungList = [];

let timerId = null;

const startInterval = () => {
  return setInterval(()=>{
    draw();
    if (pungList.length <= 0){
      clearInterval(timerId);
      timerId = null;
    }
  }, 500)
}

const input = document.getElementById('name-input');
const buttons = [
  document.getElementById('button-5sec'),
  document.getElementById('button-10sec'),
  document.getElementById('button-20sec')
]

buttons[0].addEventListener("click", () => createPung(getInputValue(), 5));
buttons[1].addEventListener("click", () => createPung(getInputValue(), 10));
buttons[2].addEventListener("click", () => createPung(getInputValue(), 20));

document.getElementById('reset').addEventListener("click", reset);
document.getElementById('multiply').addEventListener("click", multiply);
document.getElementById('all-add').addEventListener("click", () => allUpdate(pung => pung.add()));
document.getElementById('all-stop').addEventListener("click", () => allUpdate(pung => pung.stop()));
document.getElementById('all-start').addEventListener("click", () => allUpdate(pung => pung.run()))

function getInputValue(){
  const inputValue = input.value;
  input.value = "";
  return inputValue;
}

function draw() {
  pungList = pungList.filter((pung) => pung.sec > 0 && pung.list !== null)
            .sort((a, b) => a.sec - b.sec);

  let sum = 0;
  pungList.forEach(pung => {
    sum += pung.sec;  
  });

  const average = sum / pungList.length; 
  
  document.getElementById('total').innerHTML = `총: ${pungList.length}건 평균 남은시간: ${isNaN(average)? 0 : average.toFixed(1)}초`
  allUpdate((pung)=> pung.addList());
}

function createPung(name, sec){
  const newPung = new Pung(name, sec, true);
  pungList.push(newPung);
  draw();
  if (timerId === null)
    timerId = startInterval();
}

function multiply(){
  let newPungList = [];
  pungList.forEach((pung) => {
    newPungList.push(pung);
    newPungList.push(new Pung(pung.name, pung.sec));
  })
  pungList = newPungList;
}

function reset(){
  allUpdate((pung)=>pung.removeList());
  pungList = [];
}

function allUpdate(update){
  pungList.forEach(update)
}