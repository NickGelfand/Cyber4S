const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

let selected_cell
let selected_img
let pieces = [];
let temp_piece;


class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
  
  
}

// function addImageByIndex(cell, type, index) {
//   if (index === 0 || index === 7) {
//     addImage(cell, type, 'rook');
//   } else if (index === 1 || index === 6) {
//     addImage(cell, type, 'knight');
//   } else if (index === 2 || index === 5) {
//     addImage(cell, type, 'bishop');
//   } else if (index === 3) {
//     addImage(cell, type, 'king');
//   } else if (index === 4) {
//     addImage(cell, type, 'queen');
//   }
// }

function createChessBoard() {
  const table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click',atclick);
    }
  }

  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
  

}

window.addEventListener('load', createChessBoard);



function posibleMoves(index,posibel_cells)
{
  
  let p1 = pieces[index];
  if(p1.type == 'pawn')
  {
    pawnMove(p1)
  }
  else if(p1.type == 'rook')
  {
    
  }
  else if(p1.type == 'bishop')
  {
    console.log("bishop")
  }
  else if(p1.type == 'knight')
  {
    console.log("knight")
  }
  else if(p1.type == 'king')
  {
    console.log("king")
  }
  else if(p1.type == 'queen')
  {
    console.log("queen")
  }
 

}






function pawnMove(p1)
{
  // fleg = 0;
  // let posi  = p1.row + "_" +p1.col
  // const elment =document.getElementById(posi)
  // console.log(elment)
  // let posible = []
  // let x,y

  // if(p1.row == 6 || p1.row== 1)
  // {
  //   fleg=1 //first move 
  // }
  // if(fleg == 1)
  // {
  //   if(p1.row == 6 )
  //   {
  //     let xIndex = p1.row - 1
  //     let xIndex2 = p1.row -2
  //     let zIndex = p1.col
  //     x = xIndex +"_"+zIndex
  //     y = xIndex2+"_"+zIndex 
  //     posible.push(x)
  //     posible.push(y)
  //     displayMove()
  //   }
  //   else if(p1.row == 1 )
  //   {
  //     let xIndex = p1.row + 1
  //     let xIndex2 = p1.row + 2
  //     let zIndex = p1.col
  //     x = xIndex +"_"+zIndex
  //     y = xIndex2+"_"+zIndex 
  //     posible.push(x)
  //     posible.push(y)
      
  //     fleg = 0;
  //   }
  //   else{
  //     let xIndex = p1.row + 1
  //     let zIndex = p1.col
  //     x = xIndex +"_"+zIndex
  //     posible.push(x)
      
    }

//   }

// }





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

function atclick(e)
{
  if(selected_cell !== undefined)
  {
    selected_cell.classList.remove("active")

  }

  selected_cell = e.currentTarget 
  selected_cell.classList.add("active")
  posibel_cells = selected_cell
  temp_piece = selected_cell

  posibleMoves(getPiece(temp_piece),posibel_cells) //send the index to the func

  
  
}



function displayMove()
{
  this.ca
}



//get the index of the relvent piece 
function getPiece(temp)
{
  for(let i=0;i<pieces.length; i++)
  {
    str1 = pieces[i].row+'_' +pieces[i].col
    if(temp.id == str1)
    {
      return i;
      break;
      
    }
    
  }
  return "blank"
}