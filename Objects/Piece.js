class Piece {
	constructor(i, j, player, color) {
		this.i = i; // Grid
		this.j = j; // Coordinates
		this.player = player; // Its player
		this.color = color; // Piece color
		this.direction = [player.forward];
		this.level = 0; // Beginning level (rat)
	}
	
	// Method that changes a piece to a king
	changeToKing() {
		// If the piece already can go in two direction, it means that it is already a king
        if (this.direction.length > 1) {
            return; // In that case, this function is absolutely unnecessary
        }
        
        this.level = arrayOfLevels.length-1; // Changes level to king
        
        this.direction.push(-(this.player.forward)); // Adopts the ability of using the opposite of its direction.

    };
};
