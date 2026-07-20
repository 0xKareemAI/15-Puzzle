const moveDisplay = document.getElementById("moveCount");
const timerDisplay = document.getElementById("timer");
const board = document.getElementById("board");

const winningState = [...Array(15).keys()].map(i => i + 1).concat(null);
const tiles = [...winningState];

let moveCount = 0;
let secondsElapsed = 0;
let timeInterval = null;
let isGameActive = false;


function startTimer(){
    if (timeInterval) return;
    isGameActive = true;
    timeInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer(){
    clearInterval(timeInterval);
    timeInterval = null;
    isGameActive = false;
}

function resetTimer(){
    stopTimer();
    secondsElapsed = 0;
    updateTimerDisplay();
}

function updateTimerDisplay(){
    if (moveDisplay) moveDisplay.textContent = moveCount;
    if (timerDisplay) timerDisplay.textContent = secondsElapsed;
}

function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}


function saveHighScore(){
    const bestMoves = localStorage.getItem("bestMoves");
    const bestTime = localStorage.getItem("bestTime");

    if (!bestMoves || moveCount < parseInt(bestMoves)){
        localStorage.setItem("bestMoves", moveCount);
    }

    if (!bestTime || secondsElapsed < parseInt(bestTime)){
        localStorage.setItem("bestTime", secondsElapsed);
    }

}

function loadHighScore(){
    const bestMoves = localStorage.getItem("bestMoves") || "None";
    const bestTime = (localStorage.getItem("bestTime")) ? formatTime(parseInt(localStorage.getItem("bestTime"))) : "None";

    return { bestMoves, bestTime };
}

    



function renderBoard(){
    board.innerHTML = "";
    tiles.forEach((value,index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (value == null){
            tile.classList.add("empty");
        }
        tile.textContent = value;
        tile.addEventListener("click",(e) => moveTile(index));
        board.appendChild(tile);
    });
}

function isAdjacent(index1, index2){
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;

    return (row1 === row2 && Math.abs(col1 - col2) === 1) ||
           (col1 === col2 && Math.abs(row1 - row2) === 1);
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

function checkWin(){
    
    return arraysEqual(tiles, winningState);
}

function moveTile(index){
    const emptyIndex = tiles.indexOf(null);

    if (isAdjacent(index, emptyIndex)){

        if (!isGameActive) startTimer();
        tiles[emptyIndex] = tiles[index];
        tiles[index] = null;

        moveCount++;
        if (checkWin()) {
            stopTimer();
            saveHighScore();
            setTimeout(() => {
                alert("Congratulations! You won!");
            }, 0);
        }
        renderBoard();
        updateTimerDisplay();

    }

}

function shuffleBoard(){
    for (let i = 0 ; i < 100; i++){

        const emptyIndex = tiles.indexOf(null);

        const possibleTiles = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];

        const validTiles = possibleTiles.filter(move => move >= 0 && move < 16 && isAdjacent(move, emptyIndex));

        const randomMove = validTiles[Math.floor(Math.random() * validTiles.length)];

        tiles[emptyIndex] = tiles[randomMove];
        tiles[randomMove] = null;
        
    }

    renderBoard();
}

function resetGame(){
    moveCount = 0;
    resetTimer();
    shuffleBoard();
}

(function startGame(){
    resetTimer();
    shuffleBoard();
})();
