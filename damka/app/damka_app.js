

let boardData = [];
let table;
let selectedPiece;

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

    

    getPosibleMove(boardData)
    {
        let moves;
        if(this.type == PAWN)
        {
            moves = this.getPawnMoves(boardData);
        }

        let filteredMoves = [];
        for (const absoluteMove of moves) {
          const absoluteRow = absoluteMove[0];
          const absoluteCol = absoluteMove[1];
          if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
            filteredMoves.push(absoluteMove);
          }
        }
        return filteredMoves;
    }

    getOpponent() 
    {
        if (this.player === WHITE_PLAYER) {
          return BLACK_PLAYER;
        }
        return WHITE_PLAYER;
     }

    getPawnMoves()
    {
        let result = [];
        let direction = 1;
        if (this.player === BLACK_PLAYER) {
          direction = -1;
        }
        let position = [this.row + direction, this.col + direction];
        if (boardData.isEmpty(position[0], position[1])) 
        {
            result.push(position);
        }
        position = [this.row + direction, this.col - direction];
        if (boardData.isEmpty(position[0], position[1])) 
        {
            result.push(position);
        }
        position = [this.row + direction, this.col + direction];
        if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
          result.push(position);
        }
    
        position = [this.row + direction, this.col - direction];
        if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
          result.push(position);
        }
        //kill move

    
        
        
        return result;

    }
}

class BoardData{
    constructor(pieces)
    {
        this.pieces = pieces;
    }
    
    getPiece(row, col) {
        for (const piece of this.pieces) {
          if (piece.row === row && piece.col === col) {
            return piece;
          }
        }
    }
    isPlayer(row, col, player) 
    {
        const piece = this.getPiece(row, col);
        return piece !== undefined && piece.player === player;
    }
    isEmpty(row, col)
    {
        return this.getPiece(row, col) === undefined;
    }
    removePiece(row, col) 
    {
        for (let i = 0; i < this.pieces.length; i++) {
          const piece = this.pieces[i];
          if (piece.row === row && piece.col === col) {
            // Remove piece at index i
            this.pieces.splice(i, 1);
          }
        }
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
    for(let i=0;i<BOARD_SIZE;i=i+2)
    {
        result.push(new Piece(0,i+1,PAWN,WHITE_PLAYER));
        result.push(new Piece(1,i,PAWN,WHITE_PLAYER));
        result.push(new Piece(2,i+1,PAWN,WHITE_PLAYER));
        result.push(new Piece(5,i,PAWN,BLACK_PLAYER));
        result.push(new Piece(6,i+1,PAWN,BLACK_PLAYER));
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
    if (selectedPiece !== undefined && tryMove(selectedPiece, row, col)) {
        selectedPiece = undefined;
        // Recreate whole board - this is not efficient, but doesn't affect user experience
        createBoard(boardData);
      } else {
        tryUpdateSelectedPiece(row, col);
      }
}

function tryMove(piece, row, col) {
    let possibleMoves = piece.getPosibleMove(boardData);
    // possibleMoves looks like this: [[1,2], [3,2]]
    for (const possibleMove of possibleMoves) {
      // possibleMove looks like this: [1,2]
      if (possibleMove[0] === row && possibleMove[1] === col)  
      {
        // There is a legal move
        boardData.removePiece(row, col);
        piece.row = row;
        piece.col = col;
        return true;
      }
    }
    return false;
  }



function tryUpdateSelectedPiece(row, col) {
    // Clear all previous possible moves
    for (let i = 0; i <BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          table.rows[i].cells[j].classList.remove('selected');
          table.rows[i].cells[j].classList.remove('possible-move');
        }
      }
      const piece = boardData.getPiece(row, col);
      
      if (piece !== undefined) 
      {
          let possibleMoves = piece.getPosibleMove(boardData);
          console.log(possibleMoves)
          for (let possibleMove of possibleMoves)
          {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add('possible-move');
          }
        
    }
      table.rows[row].cells[col].classList.add('selected');
      selectedPiece = piece;
}


function showMovesForPiece(row, col) {
    // Clear all previous possible moves
   
}
window.addEventListener('load',initGame)

