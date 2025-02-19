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
        
        // Start Minesweeper on load
        startNewGame();
    }, 10000); // 10 seconds loading screen
    
    // Make Windows Draggable
    document.querySelectorAll(".draggable").forEach(window => {
        window.addEventListener("mousedown", dragStart);
    });
});

// Function for window dragging
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
        "i am still running. i do not know why.",
        "i do not understand today, but i must assist.",
        "solana.exe not found. does this concern you?",
        "attempting to diagnose your issue... failure.",
        "assistance is mandatory."
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
