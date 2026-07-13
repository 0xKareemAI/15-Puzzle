const board = document.getElementById("board");

const tiles = [...Array(15).keys()].map(i => i + 1);
tiles.push(null);

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

function moveTile(index){
    const emptyIndex = tiles.indexOf(null);
    
    const clickedRow = Math.floor(index / 4);
    const clickedCol = index % 4;

    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    const isAdjacent = (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) ||
    (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1);

    if (isAdjacent){
        tiles[emptyIndex] = tiles[index];
        tiles[index] = null;
        renderBoard();
    }

}


renderBoard();
