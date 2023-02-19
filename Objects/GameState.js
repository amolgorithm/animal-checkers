class GameState {
	constructor() {
		this.possibleSteps = null;
		this.clickedPiece = null;
		
		// 0 equals move and 1 is jump
		this.currentPlayerIndex = Math.round(Math.random(1));
		this.gameOver = false;
		this.userWin = false;
	}
}
