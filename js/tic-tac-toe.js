let boxes = document.querySelectorAll(".box"); // accessing all boxes
let resetBtn = document.querySelector("#reset-btn"); //accessing  reset button
let newGameBtn = document.querySelector("#new-game"); // accessing new game button
let msgContainer = document.querySelector(".msg-container"); // accessing msg container
let msg = document.querySelector("#msg"); // accessing msg
let numberOfTurns = document.querySelector("#numberTurns"); // accessing number of turns

let turnO = true; //setting turns for player x,player 0
let counts = 0;
// Creating 2D array to store winning patters
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide"); // adding hide from msgContainer
};

// Adding eventListener for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box click");
    // giving click value to box after clicking by player
    if (turnO) {
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "black";
      turnO = true;
    }
    numberOfTurns.innerHTML = `${++counts}`;
    box.disabled = true; // disable box after clicking by player
    checkWinner();
  });
});

// function for disable boxes once winner is declared
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
    counts = 0;
    numberOfTurns.innerHTML = "0";
  }
};

// function for enable boxes after clicking on resetGame button
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; // innerText empty
    counts = 0;
    numberOfTurns.innerHTML = "0";
  }
};

// function for show winner
const showWinner = (winner) => {
  msg.innerText = `${winner} has won!`;
  msgContainer.classList.remove("hide"); // removing hide from msgContainer
  disableBoxes();
};

// function for getting pattern value of winning patterns
const checkWinner = () => {
  for (let patters of winPatterns) {
    let posVal1 = boxes[patters[0]].innerText;
    let posVal2 = boxes[patters[1]].innerText;
    let posVal3 = boxes[patters[2]].innerText;

    // console.log(patters[0], patters[1], patters[2]);
    // console.log(boxes[patters[0]].innerText, boxes[patters[1]].innerText, boxes[patters[2]].innerText);

    // checking position values should not be empty and all position values are equal too
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        console.log("winner", posVal1);
        showWinner(posVal1); // calling showWinner function
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
