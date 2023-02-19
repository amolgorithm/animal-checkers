/**
 * @brief Cell class
          Objects have given coordinates and can be occupied with a piece.
 */

class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.piece = null;
	}
	
	isEmpty() {
		return (this.piece === null);
	}
}

