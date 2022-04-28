class BoardData{
    constructor()
    {
      this.initPieces();
    }
   
  initPieces() {
    // Create list of pieces (32 total)
    this.pieces = [];

    for (let i = 0; i < BOARD_SIZE; i=i+2) {
      this.pieces.push(new Piece(0, i+1, PAWN, WHITE_PLAYER));
      this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER));
      this.pieces.push(new Piece(2, i+1, PAWN, WHITE_PLAYER));
      this.pieces.push(new Piece(5, i, PAWN, BLACK_PLAYER));
      this.pieces.push(new Piece(6, i+1, PAWN, BLACK_PLAYER));
      this.pieces.push(new Piece(7, i, PAWN, BLACK_PLAYER));
    }
  }
    
    getPiece(row, col)
   {
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
        if (piece.row === row && piece.col === col   ) {
          // Remove piece at index i
           this.pieces.splice(i, 1);
        }
        
        else if(piece.row === re_piece[0]  && piece.col === re_piece[1])
        {
          console.log("removed " +  re_piece);
          console.log(row+":"+col)
          this.pieces.splice(i, 1); //check if there is pawn before eating and removeing
          re_piece = []; // clear the global int to not delate raminble data 
        }
      }
    }
}
