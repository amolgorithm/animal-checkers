/**
 * @brief A checkers web game with an animal theme.
 * @details Rules of this game are a superset of English checkers rules.
            Other than general English checkers rules, additional rules are:
            - Four levels/ranks of animals in this game [rat, cat, dog, lion] - (levels are in ascending order).
            - Lions are the kings.
            - All pieces start at rat level.
            - When a piece jumps another piece, it raises in rank, unless it is a dog piece (A piece cannot turn into a lion/king by jumping; it must reach the other side to do so).
              - Example:
                - Rat => Cat => Dog
            - Regardless of the rank of the piece, it turns into a lion/king when it reaches the other side of the board.
              - Example:
                - Rat => Lion (When reaches opposite side of board)
                - Cat => Lion (When reaches opposite side of board)
                - Dog => Lion (When reaches opposite side of board)
                
 * @version 1.0
 */

var scaleOfWindowHeight = 0.9; // ratio of the canvas height to the inner window height.
var theHeight = scaleOfWindowHeight * window.innerHeight;
var theWidth = scaleOfWindowHeight * window.innerHeight;
var scaleOfCanvasHeight = 0.9; // ratio of the checkerboard height to the canvas height.

var rows = 8;
var cols = 8;

var cellSize = (scaleOfCanvasHeight * theHeight) / rows; 
var checkerPieceRadius = (cellSize/2) - 2;
var initialNumberOfPiecesPerSide = 12;
var robotNames = ["Mark", "Wilfred", "Brenda", "Lucifer", "Matt", "Harry", "Nate", "Charlotte"];


/**
 * @brief Draws a rat piece on the checkerboard, given coordinates, size and colours.
 * @param x, y, ratSize, bodyColor, eyeColor, pupilColor, featureStrokeColor
 */
function drawRat(x, y, ratSize, bodyColor, eyeColor, pupilColor, featureColor) {
	// Draws face and ears
    fill(bodyColor);
    ellipse(x, y+5, ratSize/1.2, ratSize/1.2);
    ellipse(x-ratSize/3, y-ratSize/3+5, ratSize/2, ratSize/2);
    ellipse(x+ratSize/3, y-ratSize/3+5, ratSize/2, ratSize/2);
    
    // Draws eyes
    fill(eyeColor);
    ellipse(x-ratSize/5, y+5, ratSize/4, ratSize/4);
    ellipse(x+ratSize/5, y+5, ratSize/4, ratSize/4);
    
    // Draws pupils
    fill(pupilColor);
    ellipse(x-ratSize/5, y+5, ratSize/7, ratSize/5);
    ellipse(x+ratSize/5, y+5, ratSize/7, ratSize/5);
    
    // Draws whiskers and nose
    fill(featureColor);
    stroke(featureColor);
    strokeWeight(2);
    ellipse(x, y+ratSize/5+5, ratSize/7, ratSize/7);
    
    line(x, y+ratSize/5+5, x-ratSize/3, y+ratSize/4+5);
    line(x, y+ratSize/5+5, x-ratSize/3, y+ratSize/10+5);
    line(x, y+ratSize/5+5, x+ratSize/3, y+ratSize/4+5);
    line(x, y+ratSize/5+5, x+ratSize/3, y+ratSize/10+5);
    
    noStroke();
}


/**
 * @brief Draws a cat piece on the checkerboard, given coordinates, size and colours.
 * @param x, y, catSize, bodyColor, eyeColor, pupilColor, featureStrokeColor
 */
function drawCat(x, y, catSize, bodyColor, eyeColor, pupilColor, featureStrokeColor) {
	// Draws face and ears
    noStroke();
    fill(bodyColor);
    ellipse(x, y, catSize, catSize);
    quad(x-catSize/1.6, y-catSize/3, x-catSize/2.6+catSize, y-catSize/3, x-catSize/2+catSize, y, x-catSize/2, y);
    
    // Draws eyes
    fill(eyeColor);
    ellipse(x-catSize/5, y-catSize/10, catSize/8, catSize/5);
    ellipse(x+catSize/5, y-catSize/10, catSize/8, catSize/5);
    
    // Draws pupils
    fill(pupilColor);
    ellipse(x-catSize/5, y-catSize/10, catSize/16, catSize/5);
    ellipse(x+catSize/5, y-catSize/10, catSize/16, catSize/5);
    
    // Draws whiskers and nose
    stroke(featureStrokeColor);
    strokeWeight(2);
    fill(featureStrokeColor);
    ellipse(x, y+catSize/8, catSize/8, catSize/8);
    line(x, y+catSize/8, x-catSize/2, y-catSize/20);
    line(x, y+catSize/8, x-catSize/2, y+catSize/8);
    line(x, y+catSize/8, x+catSize/2, y-catSize/20);
    line(x, y+catSize/8, x+catSize/2, y+catSize/8);
    
    noStroke();

}


/**
 * @brief Draws a dog piece on the checkerboard, given coordinates, size and colours.
 * @param x, y, dogSize, bodyColor, eyeColor, pupilColor, featureStrokeColor
 */
function drawDog(x, y, dogSize, bodyColor, eyeColor, pupilColor, featureStrokeColor) {
	// Draws face and ears
    noStroke();
    fill(bodyColor);
    rect(x-dogSize/2, y-dogSize/2, dogSize, dogSize, dogSize);
    ellipse(x-dogSize/2.5, y-dogSize/2, dogSize/4, dogSize/2);
    ellipse(x+dogSize/2.5, y-dogSize/2, dogSize/4, dogSize/2);
    
    // Draws eyes
    fill(eyeColor);
    ellipse(x-dogSize/5, y-dogSize/10, dogSize/5, dogSize/5);
    ellipse(x+dogSize/5, y-dogSize/10, dogSize/5, dogSize/5);
    
    // Draws pupils
    fill(pupilColor);
    ellipse(x-dogSize/5, y-dogSize/10, dogSize/16, dogSize/8);
    ellipse(x+dogSize/5, y-dogSize/10, dogSize/16, dogSize/8);
    
    // Draws nose
    fill(featureStrokeColor);
    rect(x-dogSize/16, y+dogSize/8, dogSize/8, dogSize/8, dogSize/8);

    noStroke();
}


/**
 * @brief Draws a lion piece on the checkerboard, given coordinates, size and colours.
 * @param x, y, lionSize, bodyColor, eyeColor, pupilColor, featureStrokeColor
 */
function drawLion(x, y, lionSize, bodyColor, eyeColor, pupilColor, featureStrokeColor) {	
    let numberOfSides = 5;
    
    noStroke();
    
    fill(bodyColor);
    beginShape();
    for (var i = 0; i < numberOfSides; i++) {
        var theAngle = i * TWO_PI / numberOfSides - PI / numberOfSides;
        vertex(x+(0.5)*lionSize*1.5*sin(theAngle), y-(0.5)*lionSize*1.5*cos(theAngle));

    }
    endShape(CLOSE);
    
    fill(0, 0, 0, 100);
    beginShape();
    for (var i = 0; i < numberOfSides; i++) {
        var theAngle = i * TWO_PI / numberOfSides - PI / numberOfSides;
        vertex(x+(0.5)*lionSize*1.5*sin(theAngle), y-(0.5)*lionSize*1.5*cos(theAngle));

    }
    endShape(CLOSE);
    
    
    
    fill(bodyColor);
    ellipse(x, y, lionSize, lionSize);
    
    fill(eyeColor);
    ellipse(x-lionSize/5, y-lionSize/10, lionSize/3, lionSize/3);
    
    ellipse(x+lionSize/5, y-lionSize/10, lionSize/3, lionSize/3);
    
    fill(pupilColor);
    ellipse(x-lionSize/5, y-lionSize/10, lionSize/10, lionSize/3);
    ellipse(x+lionSize/5, y-lionSize/10, lionSize/10, lionSize/3);
    
    
    stroke(0, 100);
    strokeWeight(2);
    fill(0);
    ellipse(x, y+lionSize/8, lionSize/5, lionSize/5);
    line(x, y+lionSize/8, x-lionSize/2, y-lionSize/20);
    line(x, y+lionSize/8, x-lionSize/2, y+lionSize/8);
    line(x, y+lionSize/8, x+lionSize/2, y-lionSize/20);
    line(x, y+lionSize/8, x+lionSize/2, y+lionSize/8);
    
	noStroke();
}



var arrayOfLevels = [drawRat, drawCat, drawDog, drawLion];


var gameState = new GameState();
var checkerBoard = new Grid();
var user = new Player(-1);
var robot = new Player(1);
var players = [user, robot];
var playerNames = ["You", robotNames[Math.floor(Math.random() * robotNames.length)]];



/**
 * @brief Checks if the given array is empty or not.
 * @param arr
 */
function empty(arr) {
    return arr.length === 0;
}



/**
 * @brief Checks if the given coordinates are within the checkerboard.
 * @param i, j
 */
function isCellInCheckerBoard(i, j) {
    return (i >= 0 && i <= cols-1 && j >= 0 && j <= rows-1);
}


/**
 * @brief Returns all the possible moves a certain piece could take, given the piece.
 * @param piece
 */
function move(piece) {
    var possibleMoves = [];
    
    for (var d in piece.direction) {
        possibleMoves.push([piece.i-1, piece.j+piece.direction[d]]);
        possibleMoves.push([piece.i+1, piece.j+piece.direction[d]]);
    }
    
    
    for (var m = possibleMoves.length - 1; m >= 0; m--) {
        var i = possibleMoves[m][0];
        var j = possibleMoves[m][1];
        var doSplice = false;

        if (!isCellInCheckerBoard(i, j)) {
            doSplice = true;
        }
        else if (!checkerBoard.cells[j][i].isEmpty()) {
            doSplice = true;
        }
        
        if (doSplice) {
            possibleMoves.splice(m, 1);
        }
    }
    let possibleStepsMap = new Map();
    
    for (var p in possibleMoves) {
        possibleStepsMap.set(possibleMoves[p], []);
    }
    
    return possibleStepsMap;
}



var visitedCells = [];

function jump(piece, baseCell, depth) {
    if (depth > initialNumberOfPiecesPerSide) {
        return null;
    }
    let myDepth = depth + 1;
    let possibleMoves = [];
   
    let possibleJumps = [];
    let jumpedOpponents = new Map();

    
    for (let d in piece.direction) {
        possibleMoves.push([baseCell[0]-1, baseCell[1]+piece.direction[d]]);
        possibleMoves.push([baseCell[0]+1, baseCell[1]+piece.direction[d]]);
    
        possibleJumps.push([baseCell[0] - 2, baseCell[1] + 2*piece.direction[d]]);
        possibleJumps.push([baseCell[0] + 2, baseCell[1] + 2*piece.direction[d]]);
    }
    
    for (let u = 0; u < possibleJumps.length; u++) {
        jumpedOpponents.set(possibleJumps[u], [possibleMoves[u]]);
    }
    
    
    for (let m = possibleJumps.length - 1; m >= 0; m--) {
        let i = possibleJumps[m][0];
        let j = possibleJumps[m][1];
        let doSplice = false;
        
        if (!isCellInCheckerBoard(i, j)) {
            jumpedOpponents.delete(possibleJumps[m]);
            possibleJumps.splice(m, 1);
            continue;
        }
        
        let cell = checkerBoard.cells[j][i];
        let adjCell = checkerBoard.cells[possibleMoves[m][1]][possibleMoves[m][0]];
        
        for (let v in visitedCells) {
            if (visitedCells[v][0] === possibleJumps[m][0] && visitedCells[v][1] === possibleJumps[m][1]) {
                doSplice = true;
                break;
            }
        }
        if (!cell.isEmpty()) {
            doSplice = true;
        }
        else if (adjCell.isEmpty()) {
            doSplice = true;
        }
        else if (adjCell.piece.player === piece.player) {
            doSplice = true;
        }
        if (doSplice) {
            jumpedOpponents.delete(possibleJumps[m]);
            possibleJumps.splice(m, 1);
        }
        else {
            visitedCells.push(baseCell);
            let nextJumpedOpponents = jump(piece, [i, j], myDepth);
            
            let count = 0;
            if (nextJumpedOpponents !== null) {
                count = nextJumpedOpponents.size;
            }
            if (count > 0) {
                //keep only leaves
                let iter = nextJumpedOpponents.entries();
                for (let c = 0; c < count; c++) {
                    let iterValue = iter.next().value;
                    let key = iterValue[0];
                    let value = iterValue[1];
                    value.push(jumpedOpponents.get(possibleJumps[m])[0]);
                    
                    jumpedOpponents.set(key, value);
            
                }
                
                if (piece.player == robot) {		
					jumpedOpponents.delete(possibleJumps[m]);
				}
            }
        }
    }
    return jumpedOpponents;
}




/**
 * @brief Generates and positions the intial pieces of the given player.
 * @param player, color
 */
function setupPieces(player, color) {
    
    var multipliers = [3.5, 2.5, 1.5];
    
    for (var m in multipliers) {
        var j = (multipliers[m] * player.forward * (-1) + 3.5);
        for (var i = 0; i < cols; i++) {
            if ((i+j) % 2 === 1) {
                var newPiece = new Piece(i, j, player, color);
                checkerBoard.cells[j][i].piece = newPiece;
            
                player.pieces.push(newPiece);
            }
        }
    }
    
}


/**
 * @brief Draws a single cell, given a cell object and its colour.
 * @param cell, colorOfCell
 */
function drawCell(cell, colorOfCell) {
    noStroke();
    fill(colorOfCell);
    rect(cell.x, cell.y, cellSize, cellSize);
}


/**
 * @brief Draws the entire checkerboard by drawing every cell.
 */
function drawCheckerBoard() {
    fill(0);
    rect(0, 0, cellSize*rows, cellSize*rows);
    
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            if ((i+j) % 2 === 0) {
                drawCell(checkerBoard.cells[i][j], color(160, 200, 160));
            }
            else {
                drawCell(checkerBoard.cells[i][j], color(101, 67, 33));
            }
        }
    }
}


/**
 * @brief Draws all of the player's pieces, given which player.
 * @param player
 */
function drawPieces(player) {
    for (var p in player.pieces) {
        let pieceProperties = [player.pieces[p].i * cellSize + checkerPieceRadius+2, 
        player.pieces[p].j * cellSize + checkerPieceRadius+2, checkerPieceRadius*2, player.pieces[p].color, color(180), color(0), color(255, 130, 255)];
        
        arrayOfLevels[player.pieces[p].level](...pieceProperties);
        
        if (player.pieces[p].j === (3.5 * player.forward + 3.5)) {
            player.pieces[p].changeToKing();
        }
    }
}



/**
 * @brief Prompts gameover state when called and deduces if the user won the match, given the player whom lost.
 * @param player
 */
function gameOver(player) {
	gameState.gameOver = true;
	gameState.userWin = (player != user);
}


/**
 * @details Checks if the game is over by checking if the given player does not have any pieces.
            If the given player does not have any pieces, then gameOver is called and passed the given player.
 * @param player
 */
function checkIfGameOver(player) {
	if (empty(player.pieces)) {
		gameOver(player)
	}
}


/**
 * @brief When the game is over, it is displayed whether the user won the match or not.
 */
function ifGameOver() {
	if (gameState.gameOver) {
		noStroke();
		fill(0, 0, 0, 150);
		rect(0, 0, scaleOfCanvasHeight * theWidth, scaleOfCanvasHeight * theHeight);
		
		textSize(70);
		textAlign(CENTER);
					
		if (gameState.userWin) {
			fill(192, 240, 192);
			text("YOU WON!", (scaleOfCanvasHeight * theWidth)/2, (scaleOfCanvasHeight * theHeight)/2);
		} else {
			fill(255, 204, 204);
			text("YOU LOST!", (scaleOfCanvasHeight * theWidth)/2, (scaleOfCanvasHeight * theHeight)/2);
		}
		
		noLoop();
	}
}



/**
 * @brief Draws dots in the cells with the coordinates from steps (param).
 * @param steps
 */
function drawPossibleSteps(steps) {
    
    // If it is not the user's turn...
    if (gameState.currentPlayerIndex !== 0) {
        return; // We end the function
    }
    
    // If steps is null, there are no possible steps for the user to take,
    if (steps === null) {
        return; // so we end the function
    }
    
    let count = steps.size;
    let iter = steps.keys();
    
    for (let c = 0; c < count; c++) {
        let step = iter.next().value;
        
        fill(255, 0, 0, 180);
        ellipse(step[0] * cellSize + checkerPieceRadius+2, step[1] * cellSize + checkerPieceRadius+2, checkerPieceRadius, checkerPieceRadius);
    }
}


/**
 * @brief Displays the names/titles of the two players, as well as whose turn it currently is.
 */
function displayGameStatistics() {
	
    fill(255);
    textSize(30);
    textAlign(CENTER);
    
    // Displays robot's name vertically and how many pieces it has left
    for (var s in playerNames[1]) {
        text(playerNames[1][s].toUpperCase(), theWidth/1.05, s*30+30);
    }
    text("(" + players[1].pieces.length + ")", theWidth/1.05, playerNames[1].length*30+30);
    
    // Displays "You" vertically and how many pieces you have left
    for (var p in playerNames[0]) {
        text(playerNames[0][p].toUpperCase(), theWidth/1.05, p*30+theWidth/1.4);
    }
    text("(" + players[0].pieces.length + ")", theWidth/1.05, playerNames[0].length*30+theWidth/1.4);
    
    
    // Displays whose turn it is
    if (gameState.currentPlayerIndex === 0) {
		text(playerNames[gameState.currentPlayerIndex] + "r turn", scaleOfCanvasHeight*theWidth/2, theHeight/1.04);
	} else {
		text(playerNames[gameState.currentPlayerIndex] + "'s turn", scaleOfCanvasHeight*theWidth/2, theHeight/1.04);
	}
    
}


/**
 * @brief Helps user select a piece to move or jump
 * @param thePiece
 */
function choosePiece(thePiece) {
    // if the clicked piece's player is not the current playing player
    if (players[gameState.currentPlayerIndex] !== thePiece.player) {
        return; // we cannot choose that piece
    }
    
    gameState.currentPlayOption = 1;
    visitedCells = [];
    let steps = jump(thePiece, [thePiece.i, thePiece.j], 0);
    visitedCells = [];

    if (steps === null || steps.size === 0) {
        steps = move(thePiece);
    }
    gameState.possibleSteps = steps;
    gameState.clickedPiece = thePiece;
}



/**
 * @brief 
 * @param i, j
 */
function finalizeTurn(i, j) {	
    if (gameState.clickedPiece === null) {
        return;
    }
    
    if (gameState.possibleSteps === null) {
        return;
    }
    
    if (gameState.possibleSteps.size === 0) {
        return;
    }
    
    
    let targetCell = checkerBoard.cells[j][i];
    
    var count = gameState.possibleSteps.size;
    
    let iter = gameState.possibleSteps.entries();
        
    for (var c = 0; c < count; c++) {
        let iterValue = iter.next().value;
        let step = iterValue[0];
        
        let oldClickedPieceIndex = [gameState.clickedPiece.i, gameState.clickedPiece.j];
        if (i === step[0] && j === step[1]) {
            checkerBoard.cells[gameState.clickedPiece.j][gameState.clickedPiece.i].piece = null;
            gameState.clickedPiece.i = step[0];
            gameState.clickedPiece.j = step[1];
            targetCell.piece = gameState.clickedPiece;
            
            // jump
            if (gameState.currentPlayOption === 1) {
                let clickedPiece = gameState.clickedPiece;

                let opponentCellIndices = iterValue[1];
                
                for (var p in opponentCellIndices) {

                    let opponentCellIndex = opponentCellIndices[p];
                    let opponentCell = checkerBoard.cells[opponentCellIndex[1]][opponentCellIndex[0]];
                    let opponentPiece = opponentCell.piece;
     
                    if (clickedPiece.level < arrayOfLevels.length-2) {
                        clickedPiece.level++;
                    }
                    
                    opponentCell.piece = null;
                    opponentPiece.player.pieces.splice(opponentPiece.player.pieces.indexOf(opponentPiece), 1);
                }
            }
            
            gameState.clickedPiece = null;
            gameState.possibleSteps = null;
            
			gameState.currentPlayerIndex = 1 - gameState.currentPlayerIndex;
            
            break;
        }
    }
    
}



/**
 * @brief Makes the robot randomly choose a move.
 * @details First, the function checks if there are possibles jumps that its pieces could take, before checking if there are possible moves, since jumps are regarded as more important than moves.
            If there are, the robot takes the first piece that has possible jumps and executes a jump.
		    Only if there are not any jumps that could be taken, it is then checked if there are possibles moves that its pieces could take. If there are, the robot randomly choosen one possible move.
		    If there are no jumps or moves that the robot's pieces can take, it is obvious that either there are no more robot pieces left, or the remaining pieces are locked.
		    If this were to happen, the game would be over and the robot would have lost, which means that the user would have won.
 */
function makeRobotMakeMove() {
	frameRate(60); // 60 fps is the default frame rate
    if (gameState.currentPlayerIndex === 1) {
		frameRate(random(0.5, 2)); // A random frame rate between 0.5 fps and 2 fps is chosen.
		                           // This slows down the p5 draw function and makes it look like the robot is thinking and making a move at different paces.
		
		let availableRobotJumps = [];
		
		// Scans through the robot's pieces for available jumps
        for (var r in robot.pieces) {
            let piece = robot.pieces[r];
            let steps = jump(piece, [piece.i, piece.j], 0); // Available (valid) jumps for the current piece that the loop is at.
            
            // If steps is null or an empty map, obviously there are no available jumps for that certain piece.
            if (steps === null || steps.size === 0) {
				// In that case, the code below the if statement is of no use/relevance and we would go the next piece that has available jumps, as that is what we want.
                continue;
            }
            
            // Once we reach here, it means that we have surpassed the if statement above, which can only be possible if the steps variable is not null or empty.
            // The steps variable is not being null or empty means that there (is an)/are available jump(s) for the current piece that the loop is at.
            // Jumps are what the robot wants, so it takes the first jump it sees, if there are any.
            // (The robot does not randomly choose a jump, it chooses the first piece in the loop that has an available jump and chooses that available jump.)
            gameState.clickedPiece = piece; // Therefore, we set the "clicked" piece / chosen piece to the current piece that the loop is at
            gameState.possibleSteps = steps;
            availableRobotJumps.push(steps); // We push steps to availableRobotJumps, since steps is a map with available jump(s).
            
            let firstChoice = steps.keys().next().value;
            finalizeTurn(firstChoice[0], firstChoice[1]);
            
            return; // At this point, the robot has chosen the jump, thus making its decision/move. So, the function has fulfilled its purpose and we need to go to the next task.
        }
        
        
        // We would be able to reach here only if we have surpassed the for loop above,
        // which is only possible if the return didn't occur in the for loop above, which could only happen if there were no available jumps.
        // When there are no available jumps for the robot to take, it will have to play a move.
        let availableRobotMoves = []; // Array created to store available moves that the robot's pieces have.
        let piecesWithMoves = [];
        
        // Scans through the robot's pieces for available moves
        for (var p in robot.pieces) {
            let piece = robot.pieces[p];
            let steps = move(piece); // Available (valid) moves for the current piece that the loop is at.
            
            // If steps is null or empty, then it means that there are no available moves for the current piece that the loop is at.
            if (steps === null || steps.size === 0) {
                continue; // If so, we need to move on to the next piece to collect available moves.
            }
            
            // Once we reach here, it means that steps is not null or empty, thus meaning that the current piece has available moves.
            availableRobotMoves.push(steps); // Therefore, we collect the available moves
            piecesWithMoves.push(piece); // and also the pieces with available moves
        }
           
        // If availableRobotMoves is empty and availableRobotJumps is empty, then the robot cannot do anything with its remaining pieces; they would be locked
        if (empty(availableRobotMoves) && empty(availableRobotJumps)) {
			gameOver(robot); // If so, we know that the game is over because the robot lost -- We call gameOver
			return; // and end the function
		}
        
        let randomIndex = round(random(0, availableRobotMoves.length-1)); // We choose a random number that is a valid index in availableRobotMoves.
        let selectedMove = availableRobotMoves[randomIndex]; // We select the map in availableRobotMoves whose index is the random number from above.
        let selectedPiece = piecesWithMoves[randomIndex]; // We select the piece corresponding to the move chosen from above.
        
        gameState.clickedPiece = selectedPiece; // The selected piece is chosen by the robot
        gameState.possibleSteps = selectedMove; // The selected move is chosen by the robot
        
        let firstChoice = selectedMove.keys().next().value;
        
        finalizeTurn(firstChoice[0], firstChoice[1]);

    }
}



function setup() {
	createCanvas(theWidth, theHeight); // Creates p5 canvas
	
	setupPieces(user, color(255)); // Sets up user's pieces
	setupPieces(robot, color(50, 155, 255)); // Sets up robot's pieces
	
}

/**
 * @brief Draws the canvas
 */
function draw() {
	clear(); // Clears canvas
    drawCheckerBoard();
    drawPieces(user);
    drawPieces(robot);
    drawPossibleSteps(gameState.possibleSteps);
    displayGameStatistics();
    makeRobotMakeMove();
    
    ifGameOver();
    checkIfGameOver(user);
    checkIfGameOver(robot);
}


/**
 * @brief Handler for the mouse click event
 */
function mouseClicked() {
    var i = floor(mouseX / cellSize);
    var j = floor(mouseY / cellSize);
    
    
    let currentCell = checkerBoard.cells[j][i];
    let thePiece = currentCell.piece;
    
    if (gameState.currentPlayerIndex === 0) {
		let availableJumps = [];
		
        for (var r in user.pieces) {
            let piece = user.pieces[r];
            let steps = jump(piece, [piece.i, piece.j], 0);
            
            if (steps === null || steps.size === 0) {		
                continue;
            }
            
            availableJumps.push(steps);
        }
        
        
        if (thePiece !== null && thePiece.player !== robot) {
			visitedCells = [];
			let jumpsThePiece = jump(thePiece, [thePiece.i, thePiece.j], 0);
			
			if (!((availableJumps.length > 0) && (jumpsThePiece === null || jumpsThePiece.size === 0))) {
				choosePiece(thePiece);
				return;
			}
			else {
				window.alert("That piece cannot be moved since a jump can be taken by a different piece. ");
			}
        }
		
        finalizeTurn(i, j);
        
    }
}
