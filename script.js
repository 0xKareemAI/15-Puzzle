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

function isAdjacent(index1, index2){
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;

    return (row1 === row2 && Math.abs(col1 - col2) === 1) ||
           (col1 === col2 && Math.abs(row1 - row2) === 1);
}

function moveTile(index){
    const emptyIndex = tiles.indexOf(null);

    if (isAdjacent(index, emptyIndex)){
        tiles[emptyIndex] = tiles[index];
        tiles[index] = null;
        renderBoard();
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

shuffleBoard();

