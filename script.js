const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
let snakeSpeed = 200;
let gameInterval;
let isGameRunning = false;

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);

function startGame() {
  if (!isGameRunning) {
    if (!gameInterval) {
      gameInterval = setInterval(main, snakeSpeed);
    }
    startButton.style.display = "none";
    pauseButton.style.visibility = "visible";
    isGameRunning = true;
  }
}

function pauseGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
    pauseButton.style.visibility = "hidden";
    startButton.style.display = "inline-block";
    // startButton.style.justify-content = "center"; 
    isGameRunning = false;
  }
}

    const board_border = 'black';
    const board_background = "white";
    const snake_col = 'lightblue';
    const snake_border = 'darkblue';
    
    let snake = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200},
      {x: 150, y: 200},
      {x: 140, y: 200},
      {x: 130, y: 200},
      {x: 120, y: 200},
      {x: 110, y: 200},
      {x: 100, y: 200},
      {x: 90, y: 200},
      {x: 80, y: 200},
      {x: 70, y: 200},
      {x: 60, y: 200},
      {x: 50, y: 200},
      {x: 40, y: 200},
      {x: 30, y: 200},
      {x: 20, y: 200},
      {x: 10, y: 200},
    ]  

    let score = 0;
    // True if changing direction
    let changing_direction = false;
    // Horizontal velocity
    let food_x;
    let food_y;
    let dx = 10;
    // Vertical velocity
    let dy = 0;
    
    
    // Get the canvas element
    const snakeboard = document.getElementById("snakeboard");
    // Return a two dimensional drawing context
    const snakeboard_ctx = snakeboard.getContext("2d");
    // Start game
    main();

    gen_food();

    document.addEventListener("keydown", change_direction);
    
    // main function called repeatedly to keep the game running
    function main() {

        if (has_game_ended()) return;

        changing_direction = false;
        setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        // Repeat
        // main();
      }, )
    }

    // draw a border around the canvas
    function clear_board() {
      //  Select the colour to fill the drawing
      snakeboard_ctx.fillStyle = board_background;
      //  Select the colour for the border of the canvas
      snakeboard_ctx.strokestyle = board_border;
      // Draw a "filled" rectangle to cover the entire canvas
      snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
      // Draw a "border" around the entire canvas
      snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }
    
    // Draw the snake on the canvas
    function drawSnake() {
      // Draw each part
      snake.forEach(drawSnakePart)
    }

    function drawFood() {
      snakeboard_ctx.fillStyle = 'red';
      snakeboard_ctx.strokestyle = 'darkred';
      snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
      snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
    }
    
    // Draw one snake part
    function drawSnakePart(snakePart) {

      // Set the colour of the snake part
      snakeboard_ctx.fillStyle = snake_col;
      // Set the border colour of the snake part
      snakeboard_ctx.strokestyle = snake_border;
      // Draw a "filled" rectangle to represent the snake part at the coordinates
      // the part is located
      snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the snake part
      snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function has_game_ended() {
  console.log("game end");
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      document.getElementById('gameOverMessage').style.display = 'block';
      document.getElementById('resetButton').style.display = 'block';
      return true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;

  if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
    document.getElementById('gameOverMessage').style.display = 'block';
    document.getElementById('resetButton').style.display = 'block';
    return true;
  }

  return false;
}


    function random_food(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    function gen_food() {
      // Generate a random number the food x-coordinate
      food_x = random_food(0, snakeboard.width - 10);
      // Generate a random number for the food y-coordinate
      food_y = random_food(0, snakeboard.height - 10);
      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
      });
    }

    function change_direction(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
    // Prevent the snake from reversing
    
      if (changing_direction) return;
      changing_direction = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }

    function move_snake() {
      // Create the new Snake's head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      // Add the new head to the beginning of snake body
      snake.unshift(head);
      const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
      if (has_eaten_food) {
        snake.pop();
        snake.pop();
        score += 1;
        if(snake.length == 0){
          document.getElementById('gameWinMessage').style.display = 'block';
          document.getElementById('resetButton').style.display = 'block';
        }
        // Increase score
        
    
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        gen_food();
      } 
      else {
        console.log('Hi Snake')
        // Remove the last part of snake body
        snake.pop();
        
      }
    }

    function initializeGame() {
  updateGameSettings();
  pauseButton.style.visibility = "hidden"; // Hide the pause button initially
  isGameRunning = false;
}

    document.getElementById("resetButton").onclick = function() {
          location.reload();
        };
        // Define game mode variables and settings
      // let gameSettings = {
      //   easy: { speed: 1000 },
      //   medium: { speed: 100 },
      //   hard: { speed: 50 },
      // };

// Function to update game settings based on the selected game mode
//       function updateGameSettings() {
//     console.log("snake is low");
//     const selectedMode = document.getElementById("mode").value;
//     snakeSpeed = gameSettings[selectedMode].speed;
//     clearInterval(gameInterval);
//     gameInterval = setInterval(main, snakeSpeed);
//     startGame();
// }
    // Function to update game settings based on the selected game mode
function updateGameSettings() {
  const selectedMode = document.getElementById("mode").value;
  if (selectedMode === "easy") {
    snakeSpeed = 200; // Adjust the speed values as needed
  } else if (selectedMode === "medium") {
    snakeSpeed = 100;
  } else if (selectedMode === "hard") {
    snakeSpeed = 45;
  }
}


// Add an event listener to the game mode select element
const modeSelect = document.getElementById("mode");
modeSelect.addEventListener("change", updateGameSettings);

// Call the initializeGame function on page load
initializeGame();

