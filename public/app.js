//Store the Game status
const gameStatus = document.querySelector(".game_status");
//Store all the cells
const cells = document.querySelectorAll(".cell");
//Store the restart button
const button = document.getElementById("restartBtn");
//Add event listener for restart button.
button.addEventListener("click", restartGame);
//Create a variable and store wheather the game is active or not.
let gameActive = true;
toggleRestart();
//Set the current player
let currentPlayer = "X";
//Create a game state array in the form of strings, to easily track played cells and validate the game state later on
let gameState = ["", "", "", "", "", "", "", "", ""];
//Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//Toggle the restart button if the game is active
function toggleRestart() {
  if (gameActive) {
    button.style.display = "none";
  } else {
    button.style.display = "block";
  }
}

//Functions for displaying messages to the user
const winMessage = () => {
  return `Player ${currentPlayer} has won!`;
};
const drawMessage = () => {
  return `Draw!`;
};
const currentPlayerTurn = () => {
  return `It's ${currentPlayer}'s turn`;
};
//Set the inital message to let the players know whose turn it is
gameStatus.innerHTML = currentPlayerTurn();
//Add event listener to the cells
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

//Function to handle event when a cell is clicked.
function handleCellClick(e) {
  //Save the clicked cell
  const clickedCell = e.target;
  //Store the clicked cell index
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  //check whether the cell has already been played, or if the game is paused. If either of those is true simply ignore the click.
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  //If everything is fine continue the game flow.
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
  toggleRestart();
}
//Function the handle the played cell.
function handleCellPlayed(clickedCell, clickedCellIndex) {
  //Update game status
  gameState[clickedCellIndex] = currentPlayer;
  //Set the current player inside the cell
  clickedCell.innerHTML = currentPlayer;
}
//Function to check winning status
function handleResultValidation() {
  //Logic for winning condition
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    gameStatus.innerHTML = winMessage();
    gameActive = false;
    return;
  }
  //Logic for draw condition
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  //If the game is niether won or drawn, it means there are still more rounds to occur. So we need to change the player.
  handlePlayerChange();
}
//Function to change player
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerHTML = currentPlayerTurn();
}
//Function to restart game
function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = currentPlayerTurn();
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  toggleRestart();
}
