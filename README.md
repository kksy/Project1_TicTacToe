# WDI Project1-TicTacToe

## Overview
A Tic Tac Toe game, which is my first project as a Web Development Immersive student at General Assembly

<b>Live Demo</b>: http://kksy.github.io/Project1_TicTacToe/

## Features
+ Tic Tac Toe game using images as markers
+ Scoreboard and round number tracking
+ Reset game and continue game functions
+ Changing square colour on hover for highlighting
+ Changing markers
+ Alert using manually made modal window

## Technologies
+ HTML5
+ CSS3
+ Javascript, including
  - jQuery

## Problems encountered
+ My first problem was how I could check the winner. The method I used was accessing the 3 by 3 array and checking if the first value is equal to the next 2 succeeding values. Somehow, I think that there's a better and more efficient way to do this. I had thought of assigning numbers for the squares, and adding them up. Each row, column or diagonal win will have a unique sum. This may be a future improvement. 
+ [FIXED] I initially used buttons for the squares, thinking that a button automatically aligns text to the center vertically and horizontally. While this may be a fix for centering text, this caused problems for me when I used images instead. There were a lot of default behaviour for buttons and images that I couldn't get rid of. As a result, the squares tend to expand, messing up the layout. Although I managed to make the square buttons behave how I wanted them to be, I thought that this wasn't good code. Eventually, the recent fix I used for this was just to use one div for one square, and turn the markers into backgrounds. This way, the container won't be affected. 
