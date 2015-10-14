console.log("tictactoe.js is running");

// EMPTY BOARD
var gameArray = [
					["", "", ""], 
					["", "", ""], 
					["", "", ""]
				];

// RESET
var resetArray = [
					["", "", ""], 
					["", "", ""], 
					["", "", ""]
				];

var player1 = "X";
var player2 = "O";
var player = 1;
var turns = 0;

// RESET
var resetGame = function() {
	gameArray = resetArray; // reset gameArray
	_.each($('.square'), function() {
		$('span').html(""); // reset board squares
	});
	turns = 0;

}

// DETERMINES PLAYER 
var playerTurn = function(turnNum) {
	turnNum = player;
	 if (turnNum === 1) {
	 	player = 2;
	 	return player1;
	 } else if (turnNum === 2) {
	 	player = 1;
	 	return player2;
	 }
}

// SET PLAYER ON BOARD
var setSquare = function(row, col, player) {
	gameArray[row][col] = player; 
	return gameArray;
}

// CHECK ROW
var checkRow = function(gameBoard) {
	var col = 0;
	for (var row = 0; row < gameArray.length; row++) {
		var elem = gameBoard[row][col];
		if (elem !== "") {
			if (elem === gameBoard[row][col + 1] && elem === gameBoard[row][col + 2]) {
				return elem;
			}
		}
	}
}

// CHECK COL
var checkCol = function(gameBoard) {
	var row = 0;
	for (var col = 0; col < gameArray.length; col++) {	
		var elem = gameBoard[row][col];
		if (elem !== "") {
			if (elem === gameBoard[row + 1][col] && elem === gameBoard[row + 2][col]) {
				return elem;
			}
		}
	}	
}

// CHECK DIAGONAL
var checkDiag = function(gameBoard) {
	var row = 1;
	var col = 1; 
	var elem = gameBoard[row][col];
	if (elem === gameBoard[row + 1][col + 1] && elem === gameBoard[row - 1][col - 1]) {
		return elem;
	} else if (elem === gameBoard[row - 1][col + 1] && elem === gameBoard[row + 1][col - 1]) {
		return elem;
	}
}

// CHECK WINNER
var getWinner = function() {	
	return checkRow(gameArray) || checkCol(gameArray) || checkDiag(gameArray)		
}

// CHOOSE SQUARE
$('.board').on('click', '.square', function() {
	var $position = $(this).attr('data-index').split(""); // get the id of clicked i.e. 's01' => ['s', '0', '1']
	var row = parseInt($position[0]); // ['0', '1'] => 0
	var col = parseInt($position[1]); // [0', '1'] => 1
	var markSquare = playerTurn(player);

	$(this).find('span').html(markSquare); // changes the value of the box to player symbol
	
	setSquare(row, col, markSquare); // sets the gameArray

	turns++;
	
	var winner = getWinner();
	
	if (winner) {
		console.log("winner: ", winner);
	}

	if (turns === 9) {
		console.log("tie");
	}
});