# 15-Puzzle
15-puzzle where one needs to place in order 15 square pieces in a square box.

## Board
I used an 1d array to simulate a 4X4 grid.
give every tile a value and the empty tile carrying null

## Convert from 1d to 2d
if iam at tile 14 and want to get its position in 2d it will be represented as (row, column).
we calculate row from dividing the index by 4 "row = index/4" , column will be the index mod 4 "col= index%4"

### explain column part 
we notice that every tile in first column are 1,5,9,13 if we get the reminder of divition by 4 it will be 1 

## Check if the clicked tile is adjecent to the empty tile
```js
const isAdjacent = 
(clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) || 
(clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1);

```
we check horizintaly and vertically 
horizintaly : they must be in the same row and there columns next to each other that means the absoulte value of the columns value = 1 
vertically: the same as horizontally imagine we flip the board 90 degree

