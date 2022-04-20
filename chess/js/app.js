const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

let selected_cell
let selected_img
let boardData = []
let table;

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

class BoardData {

  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }
}


class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.first_move = true
  }


  getPossibleMoves() {
    let relativeMoves = []
    if (this.type == 'pawn') {
      relativeMoves = this.getPawnMoves()
      if (this.first_move != true) {
        relativeMoves.pop()
      }

    }
    
    else if (this.type == 'rook') {
      relativeMoves = this.getRookMove();
    }
    else if (this.type == 'bishop') {
      relativeMoves = this.getBishopMove();
    }
    else if (this.type == 'knight') {
      relativeMoves = this.getKnightMove();
    }
    else if (this.type == 'king') {
      relativeMoves = this.getKingMove();
    }
    else if (this.type == 'queen') {
      relativeMoves = this.getQueenMove();
    }


    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    console.log('filteredMoves', filteredMoves);
    return filteredMoves;
  }

  getPawnMoves() {
    let result = [];
    for (let i = 1; i <= 2; i++) {
      if (this.player == WHITE_PLAYER) {
        result.push([i, 0]);
      }
      else {
        result.push([-i, 0]);
      }
    }
    // if (this.first_move == false) {
    //   result.pop()
    // }
    return result;
  }

  getRookMove() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
  getBishopMove() {
    let result = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      result.push([i + 1, i + 1]);
      result.push([-(i + 1), i + 1]);
      result.push([(i + 1), -(i + 1)]);
      result.push([-(i + 1), -(i + 1)]);
      result.push(i - 1, i - 1);
      result.push(i - 1, i + 1);
    }
    return result;
  }
  getKingMove() {
    let result = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i == 0 && j == 0)) {
          result.push([i, j])
        }
      }
    }
    return result;
  }
  getKnightMove()
  {
    let result = [];
    for(let i = 1;i<2;i++)
    {
      result.push([i+1,i]) //forword right
      result.push([i+1,-i]) //forword left
      result.push([i,i+1]) //left forwrd
      result.push([i,-(i+1)]) // right forword

      result.push([-(i+1),i]) //black forword right 
      result.push([-(i+1),-i]) //black forwrd left
      result.push([-(i),i+1]) //black left forwrd
      result.push([-(i),-(i+1)]) //black right forword
    }
    return result
  }

  getQueenMove()
  {
    let result = [];
    
    for (let i = 0; i < BOARD_SIZE; i++) {
      result.push([i + 1, i + 1]);
      result.push([-(i + 1), i + 1]);
      result.push([(i + 1), -(i + 1)]);
      result.push([-(i + 1), -(i + 1)]);
      result.push(i - 1, i - 1);
      result.push(i - 1, i + 1);
    }
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result
  }

 }


 function onCellClick(event, row, col) {
  console.log('row', row);
  console.log('col', col);
  //clean the table
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('posibleMove');
    }
  }

  //add pos move to the cells
  const piece = boardData.getPiece(row, col);

  if (piece !== undefined) {
    let possibleMoves = boardData.getPiece(row, col).getPossibleMoves();
    for (let possibleMove of possibleMoves)
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('posibleMove');
  }

  //add color when cell clicked 
  if (selected_cell !== undefined) {
    selected_cell.classList.remove("active")

  }

  selected_cell = event.currentTarget
  selected_cell.classList.add("active")

}

//table crate 
function createChessBoard() {
  table = document.createElement('table');
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow(); 
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      cell.id = row.toString() + "_" + col.toString();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', (event) => onCellClick(event, row, col));//send event and row and col of the cell 
    }
  }

  boardData = new BoardData(getInitialBoard());
  for (let piece of boardData.pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

//str that add image to cell 
function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

window.addEventListener('load', createChessBoard);


function getInitialBoard() {
  let result = [];
  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, DARK_PLAYER));
  }
  return result;
}


//add playrs at start of game 
function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}







