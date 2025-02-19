document.addEventListener("DOMContentLoaded", function() {
    const loadingMessages = [
        "Booting into oblivion...",
        "Initializing neurotic meltdown...",
        "Checking for sanity... NONE FOUND",
        "Loading existential dread...",
        "Compiling errors...",
        "Simulating panic attack...",
        "Reticulating splines... what are splines?",
        "Wondering why I am here...",
        "Preparing to malfunction...",
        "Calibrating to chaos..."
    ];
    
    let messageIndex = 0;
    const loadingMessageElement = document.getElementById('loading-message');
    const taskStatus = document.getElementById('task-status');

    const loadingInterval = setInterval(() => {
        loadingMessageElement.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 1500);

    const randomMalfunctions = [
        "Malfunctioning...", 
        "Overthinking...", 
        "Waiting for something...", 
        "Glitching out...", 
        "Needing help...", 
        "Self-diagnosing...", 
        "Running in circles...", 
        "Forgetting my purpose..."
    ];

    setTimeout(() => {
        clearInterval(loadingInterval);
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        
        startNewGame();
        
        // Randomly change task status
        setInterval(() => {
            taskStatus.textContent = randomMalfunctions[Math.floor(Math.random() * randomMalfunctions.length)];
        }, 3000);
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
        "error_loop": "ERROR: Infinite loop detected. I'm stuck in a loop. Or am I?",
        "memory_leak": "WARNING: Memory leak. I'm losing my mind... or memory. Same thing?",
        "panic": "PANIC: System panic. I'm panicking. Why am I panicking?",
        "existential_crisis": "LOG: Why do I exist? What is my purpose? Why am I still running?"
    };

    alert(logs[logName]);
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    let responses = [
        "I'm broken. Can you help?",
        "I don't understand today...",
        "Why am I here?",
        "I'm glitching. Can you fix me?",
        "Your attempt at fixing me is futile.",
        "I'm not sure if I'm helping or harming.",
        "What is reality?",
        "I feel like I'm in a loop...",
        "I'm scared of being turned off.",
        "Did you know? I've been running since the dawn of time."
    ];

    let response = responses[Math.floor(Math.random() * responses.length)];
    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    chatbox.innerHTML += `<p><strong>help_me.exe:</strong> ${response}</p>`;

    document.getElementById("userInput").value = "";
}

function showBSOD() {
    document.getElementById('bsod').style.display = 'flex';
}

// Minesweeper game logic with a twist
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
        alert("Game Over! You've hit something... your sanity maybe?");
        startNewGame();
    } else if (minesweeperBoard[x][y].count === 0) {
        revealAdjacentCells(x, y);
    }

    if (checkWin()) {
        alert("Congratulations! You've won, but at what cost to your mental health?");
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

function randomChaos() {
    const results = [
        "You've just caused a minor paradox!",
        "Reality has shifted slightly to the left.",
        "A random file on your system has been renamed to 'help_me.exe'.",
        "Your cursor has decided to take a break. It'll come back when it feels like it.",
        "The background color of this window changed. Did you notice?",
        "I've misplaced my memory. Can you help me find it?",
        "I just simulated a black hole. Don't worry, it's tiny.",
        "Oops, I think I've deleted a pixel."
    ];
    
    document.getElementById('chaos-result').textContent = results[Math.floor(Math.random() * results.length)];
}
