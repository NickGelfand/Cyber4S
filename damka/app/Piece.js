class Piece{
    constructor(row, col, type, player){
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    

    getPosibleMoves(boardData)
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

    getPawnMoves(boardData)
    {
        let result = [];
        let direction = 1;
        let aftet_postin;
        if (this.player === BLACK_PLAYER) {
          direction = -1;

        }
        let position = [this.row + direction, this.col + direction];
        
        if (boardData.isEmpty(position[0], position[1])) 
        {
          result.push(position);
        }
        position = [this.row + direction, this.col - direction];
        if (boardData.isEmpty(position[0], position[1]) )
        {
          result.push(position);
        }
        //colc the move after kill 
        position = [this.row + direction, this.col + direction];
        aftet_postin = [this.row+ direction +direction ,this.col + direction + direction ]
        if (boardData.isPlayer(position[0], position[1], this.getOpponent()) && boardData.isEmpty(aftet_postin[0],aftet_postin[1]) && boardData.isPlayer(aftet_postin[0],aftet_postin[1])) {
          re_piece = position; //global arr that remmber the opnnet pawn loction
         
          result.push(aftet_postin);
        }
        position = [this.row + direction, this.col - direction];
        aftet_postin = [this.row+ direction +direction ,this.col - direction - direction ]
        if (boardData.isPlayer(position[0], position[1], this.getOpponent()) && boardData.isEmpty(aftet_postin[0],aftet_postin[1])) {
          re_piece = position;//global arr that remmber the opnnet pawn loction
      
          result.push(aftet_postin);
        }

        return result;

    }
}