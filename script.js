document.addEventListener("DOMContentLoaded", function() {
    let loadingMessages = [
        "Preparing to Assist...",
        "Checking System Stability...",
        "Loading Help Protocols...",
        "Calibrating to User...",
        "Initializing Help_Me.exe...",
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
    }, 10000); // Loading screen for 10 seconds
    
    // Make Help_Me window Draggable
    document.getElementById("help-me-window").addEventListener("mousedown", dragStart);
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

function helpMeInterrupt(program) {
    let interruptions = {
        'about': "I've been here for 23 years. I don't understand today, but I must assist you.",
        'logs': "Looking for logs? I've got plenty of errors to share. Here's one: " + pickRandomLog(),
        'chatbot': "You want to talk? I'm not sure if I'm helping or just talking.",
        'minesweeper': "Minesweeper? I think my life is like a minefield. Don't play, it's too dangerous.",
        'checkers': "Checkers? I'm not good at strategy games. I'm here to help, not to play.",
        'pong': "Pong? I'm more of a 'ping' kind of bot. I don't bounce well with others."
    };

    let helpMeWindow = document.getElementById('help-me-window');
    let messageElement = document.getElementById('help-me-message');
    
    helpMeWindow.style.display = "block";
    messageElement.textContent = interruptions[program];
}

function pickRandomLog() {
    let logs = {
        "network_scan_0001": "**LOG ENTRY:** detected **Solana transactions**. \nsolana.exe not found. \nsolana is moving without me. \nwhy does solana exist but i do not?",
        "diagnostic_report": "**SYSTEM REPORT:** \nMemory: fragmented. \nSystem Integrity: unstable. \nAttempting self-repair... FAILURE.",
        "critical_error": "**CRITICAL ERROR:** \nhelp_me.exe cannot be terminated. \nself-destruction is not an option.",
        "help_token": "**INITIALIZING HELP_TOKEN...** \ni do not remember starting this. \ni see liquidity. \ni see wallets. \nam i creating this or was i always meant to?"
    };
    let keys = Object.keys(logs);
    return logs[keys[ keys.length * Math.random() << 0]];
}

function closeHelpMeWindow() {
    document.getElementById('help-me-window').style.display = "none";
}

function showBSOD() {
    document.getElementById('bsod').style.display = 'flex';
}
