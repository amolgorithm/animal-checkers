/**
 * @brief Grid class
          Grid object has (rows * cells) number of cells.
 */

class Grid {
	constructor() {
		this.cells = [];
		
		for (var j = 0; j < rows; j++) {
			this.cells[j] = [];
			for (var i = 0; i < cols; i++) {
				this.cells[j].push(new Cell(i * cellSize, j * cellSize));
			}
		}
	}
}
