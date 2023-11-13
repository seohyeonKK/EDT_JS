const Images = ["rock.jpg", "paper.jpg", "scissors.jpg"];

let imageIndex =  [0, 1];

const rotateImage = (index) => {
  const id = (index === 0 ? "player1" : "player2") + "_rotating_image";
  
  let rotatingImage = document.getElementById(id);
  imageIndex[index] = (imageIndex[index] + 1) % Images.length;
  rotatingImage.src = Images[imageIndex[index]];
}

let timers = [setInterval(() => rotateImage(0), 205), 
                setInterval(() => rotateImage(1), 195)];

const stopRotate = (index) => {
  clearInterval(timers[index]);
  timers[index] = null;
  checkTimers();
}

const checkTimers = () => {
  const isAllTimersStopped = timers.every(timer => timer === null);
  if (isAllTimersStopped)
  {
    alert(getWinner(imageIndex[0], imageIndex[1]));
    restart();
  }
}

const getWinner = (player1, player2) => {
  const rock = 0;
  const paper = 1;
  const scissors = 2;
  if (player1 === rock)
  {
    if (player2 === scissors) return "Player1 승리";
    else if (player2 === paper) return "Player2 승리";
    else return "비겼습니다.";
  }
  else if (player1 === paper)
  {
    if (player2 === rock) return "Player1 승리";
    else if (player2 === scissors) return "Player2 승리";
    else return "비겼습니다.";
  }
  else 
  {
    if (player2 === paper) return "Player1 승리";
    else if (player2 === rock) return "Player2 승리";
    else return "비겼습니다.";
  }
}

const restart = () => {
  clearInterval(timers[0]);
  clearInterval(timers[1]);
  timers[0] = setInterval(() => rotateImage(0), 205);
  timers[1] = setInterval(() => rotateImage(1), 195);
  imageIndex[0] = 0;
  imageIndex[1] = 1;
}

document.getElementById("player1_stop").addEventListener("click", () => stopRotate(0));
document.getElementById("player2_stop").addEventListener("click", () => stopRotate(1));

document.getElementById("restart").addEventListener("click", restart);
