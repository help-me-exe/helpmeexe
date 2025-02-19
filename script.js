document.addEventListener("DOMContentLoaded", function() {
    const loadingMessages = [
        "Initializing...",
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
    const progressBar = document.getElementById('progress-bar');

    const loadingInterval = setInterval(() => {
        loadingMessageElement.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        progressBar.style.width = (messageIndex * (100 / loadingMessages.length)) + '%';
    }, 2000);

    setTimeout(() => {
        clearInterval(loadingInterval);
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        
        // Play startup sound if supported
        const startupSound = document.getElementById('startup-sound');
        if (startupSound) {
            startupSound.play().catch(error => {
                // User interaction is required for autoplay in some browsers
                console.log("Autoplay was prevented for startup sound:", error);
            });
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }, 10000); // Loading screen for 10 seconds
    
    // Make Windows Draggable
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
        'pong': "Pong? I'm more of a 'ping' kind of bot. I don't bounce well with others.",
        'mycomputer': "My Computer? It's not 'my' computer, it's 'our' computer. I live here too!",
        'recyclebin': "Recycle Bin? I'm not ready to be recycled yet!"
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

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

// Randomly change status in taskbar
setInterval(() => {
    const statuses = ["Running...", "Overthinking...", "Waiting for user...", "Glitching...", "Help Needed..."];
    document.getElementById('status').textContent = statuses[Math.floor(Math.random() * statuses.length)];
}, 10000);
