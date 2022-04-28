
let table;
let selectedPiece;
let game;
let re_piece =[];


const DAMKA_ID = 'damka-bord';
const BOARD_SIZE = 8;
const PAWN = 'pawn';
const QUEEN = 'queen';
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

function initGame() 
{
  // Create list of pieces 
  game = new Game(WHITE_PLAYER);
  createBoard(game.boardData);
}

function createBoard(boardData)
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
            cell.addEventListener('click', () => onCellClick( row, col));
        }
    }

    for (let piece of boardData.pieces) {
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


function onCellClick(row,col)
{
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    // Recreate whole board - this is not efficient, but doesn't affect user experience
    createBoard(game.boardData);
  } else {
    tryUpdateSelectedPiece(row, col);
  }
}


function tryUpdateSelectedPiece(row, col) {
   // Clear all previous possible moves
   for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  // Show possible moves
  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.PossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }

  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}


window.addEventListener('load',initGame)

