const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

let selected_cell
let selected_img
let boardData = []
let table;


class BoardData{
  
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row=== row && piece.col=== col) {
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


getPossibleMoves()
{
  let relativeMoves = []
  if(this.type == 'pawn')
  {
    relativeMoves  = this.getPawnMoves()
    if(this.first_move != true)
    {
      relativeMoves.pop()
    }

  }
  else if(this.type == 'rook')
  {
    relativeMoves = this.getRookMove()
    
  }
  else if(this.type == 'bishop')
  {
    relativeMoves = this.getBishopMove();
  }
  else if(this.type == 'knight')
  {
    console.log("knight")
  }
  else if(this.type == 'king')
  {
    relativeMoves = this.getKingMove();
  }
  else if(this.type == 'queen')
  {
    console.log("queen")
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
  
  getPawnMoves()
  {
    let result = [];
    for (let i = 1; i < 2; i++) {
      result.push([-i, 0]);
     
    }
    return result;
  }

  getRookMove()
  {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
  getBishopMove()
  {
    let result = [];
    
    for (let i = 0; i < BOARD_SIZE; i++) {
      result.push([i+1,i+1]);
      result.push([-(i+1),i+1]);
      result.push([(i+1),-(i+1)]);
      result.push([-(i+1),-(i+1)]);
    }
    

    console.log(result)
    return result;
  }
  getKingMove()
  {
    let result = [];
    for (let i = -1; i <= 1; i++) {
      for(let j = -1; j<=1; j++)
      {
        if(!(i== 0 && j == 0))
        {
          result.push([i,j])
        }
        
      }
    }
    
    return result;
  }

}


function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
  
  
}


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
      cell.addEventListener('click',(event) => onCellClick(event, row, col));
    }
  }

  boardData = new BoardData(getInitialBoard());
  for (let piece of boardData.pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);















function getInitialBoard()
{
  let result = [];
  //----------------------------------------------
  //white
  result.push(new Piece(1,0,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,1,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,2,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,3,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,4,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,5,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,6,"pawn",WHITE_PLAYER));
  result.push(new Piece(1,7,"pawn",WHITE_PLAYER));

  //-----------------------------------------------
  result.push(new Piece(0,0,"rook",WHITE_PLAYER));
  result.push(new Piece(0,1,"knight",WHITE_PLAYER));
  result.push(new Piece(0,2,"bishop",WHITE_PLAYER));
  result.push(new Piece(0,3,"king",WHITE_PLAYER));
  result.push(new Piece(0,4,"queen",WHITE_PLAYER));
  result.push(new Piece(0,5,"bishop",WHITE_PLAYER));
  result.push(new Piece(0,6,"knight",WHITE_PLAYER));
  result.push(new Piece(0,7,"rook",WHITE_PLAYER));
  //----------------------------------------------
  //black
  result.push(new Piece(6,0,"pawn",DARK_PLAYER));
  result.push(new Piece(6,1,"pawn",DARK_PLAYER));
  result.push(new Piece(6,2,"pawn",DARK_PLAYER));
  result.push(new Piece(6,3,"pawn",DARK_PLAYER));
  result.push(new Piece(6,4,"pawn",DARK_PLAYER));
  result.push(new Piece(6,5,"pawn",DARK_PLAYER));
  result.push(new Piece(6,6,"pawn",DARK_PLAYER));
  result.push(new Piece(6,7,"pawn",DARK_PLAYER));
  //----------------------------------------------
  result.push(new Piece(7,0,"rook",DARK_PLAYER));
  result.push(new Piece(7,1,"knight",DARK_PLAYER));
  result.push(new Piece(7,2,"bishop",DARK_PLAYER));
  result.push(new Piece(7,3,"king",DARK_PLAYER));
  result.push(new Piece(7,4,"queen",DARK_PLAYER));
  result.push(new Piece(7,5,"bishop",DARK_PLAYER));
  result.push(new Piece(7,6,"knight",DARK_PLAYER));
  result.push(new Piece(7,7,"rook",DARK_PLAYER));
 
  return result
}

function onCellClick(event, row, col)
{
  console.log('row', row);
  console.log('col', col);
   //clean the table from pos move
   for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('posibleMove');
    }
  }
  
//add pos move to the cells
  const piece= boardData.getPiece (row, col);
  
    if (piece!== undefined) {
      let possibleMoves = boardData.getPiece (row, col).getPossibleMoves();
      for (let possibleMove of possibleMoves)
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('posibleMove');
    }


  if(selected_cell !== undefined)
  {
    selected_cell.classList.remove("active")

  }

  selected_cell = event.currentTarget 
  selected_cell.classList.add("active")  
  
}






