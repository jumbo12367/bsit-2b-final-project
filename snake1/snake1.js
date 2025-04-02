let blockSize = 30;
let board, context;
let snakeX, snakeY;
let speedX = 0, speedY = 0;
let snakeBody = [];
let foodX, foodY;
let gameOver = false;
let isPaused = false;


window.onload = function () {
    board = document.getElementById("board");
    context = board.getContext("2d");

    resizeCanvas();
    placeFood();
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 100);

    window.addEventListener("resize", resizeCanvas);
    speedX = 1;
};

function resizeCanvas() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;
    snakeX = Math.floor(board.width / 2 / blockSize) * blockSize;
    snakeY = Math.floor(board.height / 2 / blockSize) * blockSize;
    snakeBody = [[snakeX, snakeY]];  // Initialize snake with one body part
}

let score = 0;  // Add a score variable

function changeDirection(e) {
    if (e.key === "ArrowUp" && speedY === 0) { speedX = 0; speedY = -1; }
    else if (e.key === "ArrowDown" && speedY === 0) { speedX = 0; speedY = 1; }
    else if (e.key === "ArrowLeft" && speedX === 0) { speedX = -1; speedY = 0; }
    else if (e.key === "ArrowRight" && speedX === 0) { speedX = 1; speedY = 0; }
}

function placeFood() {
    foodX = Math.floor(Math.random() * (board.width / blockSize)) * blockSize;
    foodY = Math.floor(Math.random() * (board.height / blockSize)) * blockSize;
}

const pauseIndex = document.getElementById("pauseIndex");
const pauseBtn = document.getElementById("pauseBtn");

function togglePauseindex() {
    isPaused = !isPaused;  
    pauseIndex.classList.toggle("show"); // Show or hide index
}

pauseBtn.addEventListener("click", togglePauseindex);

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") { // Press Space to toggle pause
        e.preventDefault();
        togglePauseindex();
    }
});


document.getElementById("restartBtn").addEventListener("click", function () {
    location.reload();  // Restart the game
});

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = '../index.html'; // Adjust if needed
});

document.getElementById("optionsBtn").addEventListener("click", function () {
    alert("Options index (Add settings here)");
});

document.getElementById("exitBtn").addEventListener("click", function () {
    window.location.href = '../index.html'; // Adjust if needed
});

// Modify update function to stop game when paused
function update() {
    if (gameOver || isPaused) return;  // Stop updating when paused

    context.fillStyle = "pink";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "white";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    snakeBody.unshift([snakeX, snakeY]);
    if (snakeBody.length > 1) {
        snakeBody.pop();
    }

    context.fillStyle = "green";
    for (let part of snakeBody) {
        context.fillRect(part[0], part[1], blockSize, blockSize);
    }

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); 
        placeFood();
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
    }

    if (snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) {
        gameOverScreen(); // Call the function instead of showing an alert
    }
    
}

function gameOverScreen() {
    isPaused = true; // Stop the game
    document.getElementById("gameOverScreen").classList.add("show"); // Show Game Over screen
}

document.getElementById("playAgainBtn").addEventListener("click", function () {
    location.reload(); // Restart the game
});

document.getElementById("exitGameBtn").addEventListener("click", function () {
    document.getElementById("board").style.display = "none"; // Hide the game
    document.getElementById("gameOverScreen");
    window.location.href = '../index.html'; // Adjust if needed
});
document.getElementById('homeBtn').addEventListener('click', function () {
    window.location.href = '../index.html'; // Adjust if needed
});

document.getElementById('exitButton').addEventListener('click', function () {
    window.location.href = '../index.html'; // Or use `window.close();` for standalone apps
});
