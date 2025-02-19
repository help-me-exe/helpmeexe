document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        
        startNewGame(); // Minesweeper
        initCheckers(); // Checkers
        initPong(); // PONG
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
    chatbox.innerHTML += `<p><strong>Help_Me:</strong> ${response}</p>`;

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

// Checkers Game
let checkersBoard;
const checkersCanvas = document.getElementById('checkersCanvas');
const checkersCtx = checkersCanvas.getContext('2d');
let selectedPiece = null;
let isRedTurn = true;

function initCheckers() {
    checkersBoard = Array(8).fill().map(() => Array(8).fill(null));
    
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (y < 3 && (x + y) % 2 === 1) {
                checkersBoard[y][x] = { player: 'black', king: false };
            } else if (y > 4 && (x + y) % 2 === 1) {
                checkersBoard[y][x] = { player: 'red', king: false };
            }
        }
    }

    drawCheckersBoard();
}

function drawCheckersBoard() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            checkersCtx.fillStyle = (x + y) % 2 === 0 ? '#fff' : '#000';
            checkersCtx.fillRect(x * 50, y * 50, 50, 50);

            if (checkersBoard[y][x]) {
                checkersCtx.beginPath();
                checkersCtx.arc(x * 50 + 25, y * 50 + 25, 20, 0, Math.PI * 2);
                checkersCtx.fillStyle = checkersBoard[y][x].player === 'red' ? 'red' : 'black';
                checkersCtx.fill();
                if (checkersBoard[y][x].king) {
                    checkersCtx.fillStyle = 'gold';
                    checkersCtx.font = '20px Arial';
                    checkersCtx.fillText('K', x * 50 + 15, y * 50 + 35);
                }
            }
        }
    }
}

checkersCanvas.addEventListener('click', function(event) {
    let rect = checkersCanvas.getBoundingClientRect();
    let x = Math.floor((event.clientX - rect.left) / 50);
    let y = Math.floor((event.clientY - rect.top) / 50);

    if (selectedPiece === null && checkersBoard[y][x] && checkersBoard[y][x].player === (isRedTurn ? 'red' : 'black')) {
        selectedPiece = { x, y };
    } else if (selectedPiece !== null) {
        let moves = getPossibleMoves(selectedPiece.x, selectedPiece.y);
        if (moves.some(move => move.x === x && move.y === y)) {
            makeMove(selectedPiece.x, selectedPiece.y, x, y);
            selectedPiece = null;
            isRedTurn = !isRedTurn;
        } else {
            selectedPiece = null;
        }
        drawCheckersBoard();
    }
});

function getPossibleMoves(x, y) {
    let piece = checkersBoard[y][x];
    let moves = [];

    let directions = piece.king ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] : (piece.player === 'red' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]]);

    for (let [dx, dy] of directions) {
        let nx = x + dx, ny = y + dy;
        if (ny >= 0 && ny < 8 && nx >= 0 && nx < 8) {
            if (!checkersBoard[ny][nx]) {
                moves.push({ x: nx, y: ny });
            } else if (checkersBoard[ny][nx].player !== piece.player) {
                let jumpX = nx + dx, jumpY = ny + dy;
                if (jumpY >= 0 && jumpY < 8 && jumpX >= 0 && jumpX < 8 && !checkersBoard[jumpY][jumpX]) {
                    moves.push({ x: jumpX, y: jumpY, jump: true });
                }
            }
        }
    }
    return moves;
}

function makeMove(fromX, fromY, toX, toY) {
    let piece = checkersBoard[fromY][fromX];
    checkersBoard[toY][toX] = piece;
    checkersBoard[fromY][fromX] = null;

    if (Math.abs(fromY - toY) === 2) { // Jump move
        let jumpY = (fromY + toY) / 2;
        let jumpX = (fromX + toX) / 2;
        checkersBoard[jumpY][jumpX] = null;
    }

    if ((piece.player === 'red' && toY === 0) || (piece.player === 'black' && toY === 7)) {
        checkersBoard[toY][toX].king = true;
    }
}

// PONG Game
let pongCanvas = document.getElementById('pongCanvas');
let pongCtx = pongCanvas.getContext('2d');
let ballX = pongCanvas.width / 2;
let ballY = pongCanvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let paddleHeight = 100;
let paddleWidth = 10;
let playerY = (pongCanvas.height - paddleHeight) / 2;
let aiY = (pongCanvas.height - paddleHeight) / 2;
let playerScore = 0;
let aiScore = 0;

function initPong() {
    drawPong();
    setInterval(updatePong, 1000/60);
}

function drawPong() {
    pongCtx.fillStyle = 'black';
    pongCtx.fillRect(0, 0, pongCanvas.width, pongCanvas.height);
    
    pongCtx.fillStyle = 'white';
    pongCtx.fillRect(0, playerY, paddleWidth, paddleHeight);
    pongCtx.fillRect(pongCanvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    pongCtx.beginPath();
    pongCtx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    pongCtx.fill();

    pongCtx.font = '30px Arial';
    pongCtx.fillText(playerScore, 100, 50);
    pongCtx.fillText(aiScore, pongCanvas.width - 100, 50);
}

function updatePong() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY - 10 < 0 || ballY + 10 > pongCanvas.height) ballSpeedY = -ballSpeedY;

    // Ball collision with paddles
    if (ballX - 10 < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX * 1.1; // Speed up slightly
    } else if (ballX + 10 > pongCanvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX * 1.1;
    }

    // Score point
    if (ballX < 0) {
        aiScore++;
        resetBall();
    } else if (ballX > pongCanvas.width) {
        playerScore++;
        resetBall();
    }

    // AI simple movement
    if (aiY + paddleHeight/2 < ballY - 35) aiY += 6;
    else if (aiY + paddleHeight/2 > ballY + 35) aiY -= 6;

    drawPong();
}

function resetBall() {
    ballX = pongCanvas.width / 2;
    ballY = pongCanvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4 * (Math.random() < 0.5 ? 1 : -1);
}

document.addEventListener('mousemove', function(e) {
    let rect = pongCanvas.getBoundingClientRect();
    playerY = e.clientY - rect.top - paddleHeight / 2;
    if (playerY < 0) playerY = 0;
    if (playerY > pongCanvas.height - paddleHeight) playerY = pongCanvas.height - paddleHeight;
});
