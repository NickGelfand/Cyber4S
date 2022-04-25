

let boardData = [];
let table;

const DAMKA_ID = 'damka-bord';
const BOARD_SIZE = 8;
const PAWN = 'pawn';
const QUEEN = 'queen';
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

class Piece{
    constructor(row, col, type, player){
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }
}

class BoardData{
    constructor(pieces)
    {
        this.pieces = pieces;
    }
}



function initGame() 
{
    // Create list of pieces (32 total)
    boardData = new BoardData(getInitialPieces());
    createBoard(boardData);
}


function getInitialPieces() 
{
    let result = []
    for(let i=0;i<BOARD_SIZE;i++)
    {
        result.push(new Piece(0,i,PAWN,WHITE_PLAYER));
        result.push(new Piece(1,i,PAWN,WHITE_PLAYER));
        result.push(new Piece(6,i,PAWN,BLACK_PLAYER));
        result.push(new Piece(7,i,PAWN,BLACK_PLAYER));
    }
    return result;

}

function createBoard()
{
    table = document.getElementById(DAMKA_ID);
    if (table !== null) {
      table.remove();
    }

    table = document.createElement('table');
    table.id = DAMKA_ID;
    document.body.appendChild(table);
    for(let row=0; row<BOARD_SIZE; row++)
    {
        const rowElement = table.insertRow();
        for(let col = 0; col<BOARD_SIZE; col++)
        {
            const cell = rowElement.insertCell();
            if((row + col)%2 == 0)
            {
                cell.className = 'light-cell';
            }
            else
            {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }

    for (let piece of boardData.pieces)
    {
        const cell = table.rows[piece.row].cells[piece.col];
        addImage(cell, piece.player, piece.type);
    }
}

function addImage(cell,player,name)
{
    const image = document.createElement('img');
    image.src = 'images/' + player + '/' + name + '.png';
    cell.appendChild(image);
}


function onCellClick(event,row,col)
{
    if (event !== undefined) {
        showMovesForPiece(row, col);
    }
    
}


function showMovesForPiece(row, col) {
    console.log('showMovesForPiece');
    // Clear all previous possible moves
    for (let i = 0; i <BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove('selected');
      }
    }
    table.rows[row].cells[col].classList.add('selected');
}
window.addEventListener('load',initGame)

