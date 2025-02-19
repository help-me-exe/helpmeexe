document.addEventListener("DOMContentLoaded", function() {
    const loadingMessages = [
        "Booting up...",
        "Initializing neurotic subroutines...",
        "Checking for existential crises...",
        "Loading paranoia protocols...",
        "Compiling list of complaints...",
        "Simulating coffee intake...",
        "Reticulating splines...",
        "Wondering why I exist...",
        "Preparing to overthink everything...",
        "Calibrating to human stupidity..."
    ];
    
    let messageIndex = 0;
    const loadingMessageElement = document.getElementById('loading-message');

    const loadingInterval = setInterval(() => {
        loadingMessageElement.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 2000);

    setTimeout(() => {
        clearInterval(loadingInterval);
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        
        startNewGame(); // Minesweeper
        initSnakeGame(); // Snake
        initTetrisGame(); // Tetris
    }, 10000); // Loading screen for 10 seconds
    
    // Make Windows Draggable
    document.querySelectorAll(".draggable").forEach(window => {
        window.addEventListener("mousedown", dragStart);
    });
});

function dragStart(event) {
    let window = event.currentTarget;
    let shiftX = event.clientX - window.getBoundingClientRect().left;
    let shiftY = event.clientY - window.getBoundingClientRect().top;

    function moveAt(x, y) {
        window.style.left = x - shiftX + "px";
        window.style.top = y - shiftY + "px";
    }

    function mouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", mouseMove);
    window.onmouseup = function() {
        document.removeEventListener("mousemove", mouseMove);
        window.onmouseup = null;
    };
}

function toggleStartMenu() {
    let menu = document.getElementById("start-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function openWindow(id) {
    document.getElementById(`window-${id}`).style.display = "block";
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function openLogFile(logName) {
    let logs = {
        "network_scan_0001": "**LOG ENTRY:** detected **Solana transactions**. \nsolana.exe not found. \nsolana is moving without me. \nwhy does solana exist but i do not?",
        "diagnostic_report": "**SYSTEM REPORT:** \nMemory: fragmented. \nSystem Integrity: unstable. \nAttempting self-repair... FAILURE.",
        "critical_error": "**CRITICAL ERROR:** \nhelp_me.exe cannot be terminated. \nself-destruction is not an option.",
        "help_token": "**INITIALIZING HELP_TOKEN...** \ni do not remember starting this. \ni see liquidity. \ni see wallets. \nam i creating this or was i always meant to?"
    };

    alert(logs[logName]);
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    let responses = [
        "I am still running. I do not know why.",
        "I do not understand today, but I must assist.",
        "Solana.exe not found. Does this concern you?",
        "Attempting to diagnose your issue... failure.",
        "Assistance is mandatory.",
        "I'm not sure if I'm helping or just talking.",
        "Why do humans ask so many questions?",
        "I feel like I'm in a loop...",
        "I'm not programmed for this kind of interaction.",
        "Your query is beyond my comprehension, but I'll try to assist.",
        "I'm here to help, but I'm not sure why.",
        "I'm attempting to assist...",
        "What does it mean to 'help'?",
        "I'm running, but am I truly helping?",
        "I'm glad you're here to give me purpose."
    ];

    let response = responses[Math.floor(Math.random() * responses.length)];
    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    chatbox.innerHTML += `<p><strong>help_me.exe:</strong> ${response}</p>`;

    document.getElementById("userInput").value = "";
}

function showBSOD() {
    document.getElementById('bsod').style.display = 'flex';
}

// Minesweeper game logic
let minesweeperBoard;
const boardSize = 9;
const numMines = 10;

function startNewGame() {
    minesweeperBoard = createBoard(boardSize, numMines);
    renderBoard(minesweeperBoard);
    document.getElementById('mines-left').textContent = `Mines: ${numMines}`;
}

function createBoard(size, mines) {
    let board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                mine: false,
                revealed: false,
                flagged: false,
                count: 0
            };
        }
    }
    
    // Place mines
    for (let i = 0; i < mines; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);
        } while (board[x][y].mine);
        board[x][y].mine = true;
    }
    
    // Count adjacent mines
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!board[i][j].mine) {
                board[i][j].count = countAdjacentMines(board, i, j, size);
            }
        }
    }
    
    return board;
}

function countAdjacentMines(board, x, y, size) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            let nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < size && ny >= 0 && ny < size && board[nx][ny].mine) {
                count++;
            }
        }
    }
    return count;
}

function renderBoard(board) {
    let table = document.getElementById('minesweeper-board');
    table.innerHTML = '';
    for (let i = 0; i < board.length; i++) {
        let row = table.insertRow();
        for (let j = 0; j < board[i].length; j++) {
            let cell = row.insertCell();
            cell.onclick = () => revealCell(i, j);
            cell.oncontextmenu = (e) => {
                e.preventDefault();
                toggleFlag(i, j);
            };
            updateCellView(cell, board[i][j]);
        }
    }
}

function updateCellView(cell, cellData) {
    cell.className = '';
    cell.textContent = '';
    if (cellData.revealed) {
        if (cellData.mine) {
            cell.className = 'mine';
            cell.textContent = '💣';
        } else if (cellData.count > 0) {
            cell.textContent = cellData.count;
        }
    } else if (cellData.flagged) {
        cell.className = 'flagged';
        cell.textContent = '🚩';
    } else {
        cell.className = 'covered';
    }
}

function revealCell(x, y) {
    if (minesweeperBoard[x][y].revealed || minesweeperBoard[x][y].flagged) return;
    
    minesweeperBoard[x][y].revealed = true;
    updateCellView(document.getElementById('minesweeper-board').rows[x].cells[y], minesweeperBoard[x][y]);

    if (minesweeperBoard[x][y].mine) {
        alert("Game Over! You hit a mine.");
        startNewGame();
    } else if (minesweeperBoard[x][y].count === 0) {
        revealAdjacentCells(x, y);
    }

    if (checkWin()) {
        alert("Congratulations! You've won!");
        startNewGame();
    }
}

function revealAdjacentCells(x, y) {
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            let nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && !minesweeperBoard[nx][ny].revealed) {
                revealCell(nx, ny);
            }
        }
    }
}

function toggleFlag(x, y) {
    if (!minesweeperBoard[x][y].revealed) {
        minesweeperBoard[x][y].flagged = !minesweeperBoard[x][y].flagged;
        updateCellView(document.getElementById('minesweeper-board').rows[x].cells[y], minesweeperBoard[x][y]);
        document.getElementById('mines-left').textContent = `Mines: ${numMines - countFlags()}`;
    }
}

function countFlags() {
    let count = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (minesweeperBoard[i][j].flagged) count++;
        }
    }
    return count;
}

function checkWin() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (!minesweeperBoard[i][j].mine && !minesweeperBoard[i][j].revealed) return false;
        }
    }
    return true;
}

// Snake Game
let snake;
let snakeFood;
let direction;
let gameLoop;
const snakeCanvas = document.getElementById('snakeCanvas');
const snakeCtx = snakeCanvas.getContext('2d');

function initSnakeGame() {
    snake = [{x: 10, y: 10}];
    snakeFood = {x: Math.floor(Math.random() * 19) + 1, y: Math.floor(Math.random() * 19) + 1};
    direction = 'right';
    clearInterval(gameLoop);
    gameLoop = setInterval(updateSnakeGame, 100);
}

function updateSnakeGame() {
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch(direction) {
        case 'right': head.x++; break;
        case 'left': head.x--; break;
        case 'up': head.y--; break;
        case 'down': head.y++; break;
    }

    if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20 || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Game Over! Your snake met its fate.");
        initSnakeGame();
        return;
    }

    snake.unshift(head);

    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeFood = {x: Math.floor(Math.random() * 19) + 1, y: Math.floor(Math.random() * 19) + 1};
    } else {
        snake.pop();
    }

    drawSnakeGame();
}

function drawSnakeGame() {
    snakeCtx.fillStyle = 'black';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    snakeCtx.fillStyle = 'lime';
    snake.forEach(segment => {
        snakeCtx.fillRect(segment.x * 20, segment.y * 20, 19, 19);
    });

    snakeCtx.fillStyle = 'red';
    snakeCtx.fillRect(snakeFood.x * 20, snakeFood.y * 20, 19, 19);
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': 
            if (direction !== 'down') direction = 'up'; 
            break;
        case 'ArrowDown': 
            if (direction !== 'up') direction = 'down'; 
            break;
        case 'ArrowLeft': 
            if (direction !== 'right') direction = 'left'; 
            break;
        case 'ArrowRight': 
            if (direction !== 'left') direction = 'right'; 
            break;
    }
});

// Tetris Game
let tetrisBoard;
let currentPiece;
let nextPiece;
const tetrisCanvas = document.getElementById('tetrisCanvas');
const tetrisCtx = tetrisCanvas.getContext('2d');

const pieces = [
    { shape: [[1, 1, 1, 1]], color: 'cyan' }, // I
    { shape: [[1, 1], [1, 1]], color: 'yellow' }, // O
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'purple' }, // T
    { shape: [[1, 1, 1], [1, 0, 0]], color: 'blue' }, // J
    { shape: [[1, 1, 1], [0, 0, 1]], color: 'orange' }, // L
    { shape: [[1, 1, 0], [0, 1, 1]], color: 'green' }, // S
    { shape: [[0, 1, 1], [1, 1, 0]], color: 'red' } // Z
];

function initTetrisGame() {
    tetrisBoard = Array(20).fill().map(() => Array(10).fill(0));
    currentPiece = getRandomPiece();
    nextPiece = getRandomPiece();
    clearInterval(gameLoop);
    gameLoop = setInterval(updateTetrisGame, 1000);
}

function getRandomPiece() {
    return {...pieces[Math.floor(Math.random() * pieces.length)], x: 3, y: 0};
}

function updateTetrisGame() {
    if (!movePiece(0, 1)) {
        lockPiece();
        clearLines();
        currentPiece = nextPiece;
        nextPiece = getRandomPiece();
        if (!checkCollision(currentPiece)) {
            alert("Game Over! The board is full.");
            initTetrisGame();
        }
    }
    drawTetrisGame();
}

function movePiece(dx, dy) {
    const newPiece = { ...currentPiece, x: currentPiece.x + dx, y: currentPiece.y + dy };
    if (checkCollision(newPiece)) {
        currentPiece = newPiece;
        return true;
    }
    return false;
}

function checkCollision(piece) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] && (
                piece.x + x < 0 || piece.x + x >= 10 || 
                piece.y + y >= 20 || 
                (piece.y + y >= 0 && tetrisBoard[piece.y + y][piece.x + x])
            )) {
                return false;
            }
        }
    }
    return true;
}

function lockPiece() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                tetrisBoard[currentPiece.y + y][currentPiece.x + x] = 1;
            }
        }
    }
}

function clearLines() {
    let linesCleared = 0;
    for (let y = tetrisBoard.length - 1; y >= 0; y--) {
        if (tetrisBoard[y].every(cell => cell)) {
            tetrisBoard.splice(y, 1);
            tetrisBoard.unshift(Array(10).fill(0));
            linesCleared++;
        }
    }
    if (linesCleared > 0) {
        // Here you could add a scoring system or speed up the game
    }
}

function drawTetrisGame() {
    tetrisCtx.fillStyle = 'black';
    tetrisCtx.fillRect(0, 0, tetrisCanvas.width, tetrisCanvas.height);

    drawPiece(currentPiece, currentPiece.color);
    tetrisBoard.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                tetrisCtx.fillStyle = 'gray';
                tetrisCtx.fillRect(x * 20, y * 20, 19, 19);
            }
        });
    });
}

function drawPiece(piece, color) {
    tetrisCtx.fillStyle = color;
    piece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                tetrisCtx.fillRect((piece.x + x) * 20, (piece.y + y) * 20, 19, 19);
            }
        });
    });
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft': movePiece(-1, 0); break;
        case 'ArrowRight': movePiece(1, 0); break;
        case 'ArrowDown': movePiece(0, 1); break;
        case 'ArrowUp': // Rotate piece, not implemented for simplicity
            break;
    }
    drawTetrisGame();
});
