console.log("tictactoe.js is running");

// EMPTY BOARD
var gameArray = [
					["", "", ""], 
					["", "", ""], 
					["", "", ""]
				];

var player1 = "1";
var player2 = "2";
var player = 1;
var turns = 0;

// RESET
var resetGame = function() {
	// reset gameArray
	gameArray = [
					["", "", ""], 
					["", "", ""], 
					["", "", ""]
				]; 
	// reset board squares
	$('.square > button').html(''); 
	// reset turns
	turns = 0; 
	// enable click on square
	$('.square').prop('disabled', false);
	// reset to player 1
	player = 1;

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

var chooseMarker = function(playerNum) {
	var $dog = $('<img>').attr('src', 'images/tommy-marker.png');
	var $cat = $('<img>').attr('src', 'images/pusheen-marker.png')
	if (playerNum === "2") {
		return $dog;
	} else if (playerNum === "1") {
		return $cat;
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
	var markArray = playerTurn(player);
	var markSquare = chooseMarker(markArray);
	// disable cicked box after marking
	$(this).prop('disabled', true); 
	// changes the value of the box to player symbol
	$(this).find('button').html(markSquare); 
	// sets the gameArray
	setSquare(row, col, markArray); 
	// add turn per click
	turns++; 
	
	// check for winner
	var winner = getWinner();
	if (winner) {
		console.log("winner: ", winner);
		alert("The winner is PLAYER " + winner + "!");
		// disable clicking all squares
		$('.square').prop('disabled', true); 
	} else if (turns === 9) {
		console.log("tie");
		alert("The game is TIED!");
	}
});

$('#reset').on('click', resetGame);