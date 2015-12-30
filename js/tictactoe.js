
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
var rounds = 1;
var score1 = 0;
var score2 = 0;

var $resetBtn = $('#reset');
var $markerBtn1 = $('#marker1');
var $markerBtn2 = $('#marker2');
var $doneBtn1 = $('#done1'); 
var $doneBtn2 = $('#done2');

var $markerSrc1 = 'images/pusheen-marker.png'
var $markerSrc2 = 'images/tommy-marker.png'

// UPDATE DOM SCORE ------------------------------------
var updateDomScore =  function() {
	$('#score-1').html(score1);
	$('#score-2').html(score2);
	$('#round').html(rounds);
}

// MARKER BUTTON DISPLAY ------------------------------------
var markerDisplay = function(visibility) {
	$('#marker1').css('display', visibility);
    $('#marker2').css('display', visibility);
}

// MODAL DISPLAY ------------------------------------
var modalDisplay = function(modalClass, visibility) {
	$('.overlay').css('visibility', visibility);
	$(modalClass).css('visibility', visibility);
}

// NEW GAME ------------------------------------
var resetGame = function() {
    // reset gameArray
    gameArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    // remove markers from board
    $('.square').css('background-image', 'none');
    // reset turns
    turns = 0;
    // enable click on square
    $('.square').prop('disabled', false);
    // reset to player 1
    player = 1;
    // reset round
    rounds = 1;
    //reset scores
    score1 = 0;
    score2 = 0;
    // update DOM
    updateDomScore();
	// display marker button
	markerDisplay('initial')
	// enable hover colour
    $('.square').removeClass('hover-none');
}

$resetBtn.on('click', resetGame);

// CONTINUE GAME ------------------------------------
var continueGame = function() {
	// reset gameArray
    gameArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    // remove markers from board
    $('.square').css('background-image', 'none');
    // reset turns
    turns = 0;
    // enable click on square
    $('.square').prop('disabled', false);
    // reset to player 1
    player = 1;
    // add round number
    rounds++
    // update DOM
    updateDomScore();
	// display marker button
    markerDisplay('initial');
    // enable hover colour
    $('.square').removeClass('hover-none');
}

// DETERMINES PLAYER ------------------------------------
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

// CHANGING MARKER ------------------------------------
$markerBtn1.on('click', function() {
	modalDisplay('.modal1', 'visible');
});

$markerBtn2.on('click', function() {
	modalDisplay('.modal2', 'visible');
});

$doneBtn1.on('click', function() {
	modalDisplay('.modal1', 'hidden');
});

$doneBtn2.on('click', function() {
	modalDisplay('.modal2', 'hidden');
});

$('.modal1').on('click', 'img', function() {
	$markerSrc1 = $(this).attr('src');
	// removes opacity class
	$('img').removeClass('clicked-marker1');
	// highlights current click
	$(this).addClass('clicked-marker1');
});

$('.modal2').on('click', 'img', function() {
	$markerSrc2 = $(this).attr('src');
	// removes opacity class
	$('img').removeClass('clicked-marker2');
	// highlights current click
	$(this).addClass('clicked-marker2');
});


var chooseMarker = function(playerNum) {
    var $cat = $markerSrc1;
    var $dog = $markerSrc2;
    if (playerNum === player1) {
        return $cat;
    } else if (playerNum === player2) {
        return $dog;
    }
}

// SET PLAYER ON BOARD ------------------------------------
var setSquare = function(row, col, player) {
    gameArray[row][col] = player;
    return gameArray;
}
 
// CHECK ROW ------------------------------------
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

// CHECK COL ------------------------------------
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

// CHECK DIAGONAL ------------------------------------
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

// CHECK WINNER ------------------------------------
var getWinner = function() {
    var winner = checkRow(gameArray) || checkCol(gameArray) || checkDiag(gameArray);

    // check for winner
    if (winner) {
        console.log("winner: ", winner);
        setTimeout(function() {
        	modalDisplay('.modal3', 'visible');
        }, 500);
        $('.modal3').html('The winner is PLAYER ' + winner + '!');
        setTimeout(function() {
        	modalDisplay('.modal3', 'hidden');
        }, 2000);
        // disable clicking all squares
        $('.square').prop('disabled', true);
         setTimeout(continueGame, 2700);
    } else if (turns === 9) {
        console.log("tie");
        setTimeout(function() {
        	modalDisplay('.modal3', 'visible');
        }, 500);
        $('.modal3').html('The game is TIED!');
        setTimeout(function() {
        	modalDisplay('.modal3', 'hidden');
        }, 2000);
        setTimeout(continueGame, 2700);
    }

    // update score
    if (winner === player1) {
		score1++;
	} else if (winner === player2) {
		score2++;
	}
}

// HOVER SQUARE
$('.square').hover(function() {
		$(this).addClass('hover-colour');
	}, function() {
		$(this).removeClass('hover-colour');
	});

// CLICKED SQUARE ------------------------------------
$('.board').on('click', '.square', function() {
    var $position = $(this).attr('data-index').split(""); // get the data-* of clicked i.e. '01' => ['0', '1']
    var row = parseInt($position[0]); // ['0', '1'] => 0
    var col = parseInt($position[1]); // [0', '1'] => 1
    var markArray = playerTurn(player);
    var markerImgPath = chooseMarker(markArray);
    // hide marker button
    markerDisplay('none');
    // disable hover
    $(this).addClass('hover-none');
    // disable cicked box after marking
    $(this).prop('disabled', true);
    // changes the value of the box to player symbol
    // $(this).find('button').html(markSquare);
    $(this).css('background-image', 'url(' + markerImgPath + ')');
    // sets the gameArray
    setSquare(row, col, markArray);
    // add turn per click
    turns++;

    getWinner();
    updateDomScore();
});
