const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const setupElement = document.getElementById('setup');
const muteCheckbox = document.getElementById('muteCheckbox');
const bgMusic = document.getElementById('bgMusic');

// classes for each side; human picks one
let humanClass = X_CLASS;
let computerClass = O_CLASS;

let oTurn;

// initialization: don't start right away, wait for the player to press Start
window.addEventListener('DOMContentLoaded', () => {
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', showSetup);
  muteCheckbox.addEventListener('change', () => {
    bgMusic.muted = muteCheckbox.checked;
  });

  // attempt to load audio and listen for errors
  bgMusic.loop = true; // ensure it never stops until we pause it
  bgMusic.addEventListener('error', () => {
    console.warn('Background music failed to load. Check file path or format.');
  });
  bgMusic.addEventListener('canplaythrough', () => {
    console.log('Music loaded and ready.');
  });
  bgMusic.load();

  // try to autoplay (may be blocked without interaction)
  bgMusic.play().catch(err => {
    console.warn('Autoplay prevented:', err);
  });

  // board and messages hidden until game begins
  board.classList.add('hidden');
});

function startGame() {
  // determine marker selection
  const choice = document.querySelector('input[name="player"]:checked').value;
  humanClass = choice === 'o' ? O_CLASS : X_CLASS;
  computerClass = humanClass === X_CLASS ? O_CLASS : X_CLASS;

  // human always starts, so oTurn false regardless of choice
  oTurn = false;

  // hide setup and show board
  setupElement.classList.add('hidden');
  board.classList.remove('hidden');
  if (!bgMusic.paused) {
    // already playing
  } else {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(err => {
      console.warn('Music play failed:', err);
    });
  }

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? computerClass : humanClass;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    if (oTurn) {
      computerMove();
    }
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || 
           cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'DRAW SURE MO OY!';
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "DAOG SI O's" : "DAOG SI X's"} Pinaasa ka lang.`;
  }
  winningMessageElement.classList.add('show');
}

// return to setup screen and reset board
function showSetup() {
  setupElement.classList.remove('hidden');
  board.classList.add('hidden');
  winningMessageElement.classList.remove('show');
}

function computerMove() {
  // choose a random empty cell
  const empty = [...cellElements].filter(c => !c.classList.contains(X_CLASS) && !c.classList.contains(O_CLASS));
  if (empty.length === 0) return;
  const cell = empty[Math.floor(Math.random() * empty.length)];
  placeMark(cell, computerClass);
  cell.removeEventListener('click', handleClick);

  if (checkWin(computerClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns(); // back to human
  }
}