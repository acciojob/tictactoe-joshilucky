const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const startBtn = document.getElementById("start-btn");
const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const cells = document.querySelectorAll("[data-cell]");

let player1, player2;
let currentPlayer = "X";
let running = false;

// Winning combinations
const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

function startGame() {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";

  document.querySelector(".player-inputs").classList.add("hidden");
  gameBoard.classList.remove("hidden");
  resetBtn.classList.remove("hidden");

  statusText.textContent = `${player1} (X)'s turn`;
  running = true;

  cells.forEach(cell => cell.addEventListener("click", cellClicked));
}

function cellClicked() {
  const index = [...cells].indexOf(this);
  if (this.textContent !== "" || !running) return;

  this.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer === "X" ? player1 : player2} Wins! 🎉`;
    running = false;
  } else if ([...cells].every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a Draw!";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer === "X" ? player1 : player2} (${currentPlayer})'s turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index].textContent === currentPlayer);
  });
}

function resetGame() {
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${player1} (X)'s turn`;
}
