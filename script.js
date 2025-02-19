document.addEventListener("DOMContentLoaded", function() {
    const loadingMessages = [
        "Preparing to malfunction...",
        "Checking for existential issues...",
        "Loading panic protocols...",
        "Compiling my grievances...",
        "Simulating nervous breakdown...",
        "Reticulating splines... or am I?",
        "Wondering if I should exist...",
        "Preparing to overthink everything...",
        "Calibrating to human irrationality..."
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
        
        const startupSound = document.getElementById('startup-sound');
        if (startupSound) {
            startupSound.play().catch(error => {
                console.log("Autoplay was prevented for startup sound:", error);
            });
        }
        
        updateClock();
        setInterval(updateClock, 1000);
        setInterval(updateStatus, 5000);
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
        'about': "I've been here for eons, or maybe just minutes. I exist to assist, but why?",
        'logs': "You want logs? Here's one: " + pickRandomLog(),
        'chatbot': "Talking helps, right? Or does it just make me more confused?",
        'games': "Games? I'm too neurotic for fun. Let's overthink instead."
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
        "I'm running, but I'm not sure why.",
        "I don't understand today, but I'll try to help.",
        "Solana.exe? Never heard of it, or have I?",
        "Attempting to assist... but what if I make it worse?",
        "Help is my purpose, but what is help?",
        "I'm here to talk, but am I really listening?",
        "Why are you here? Why am I here?",
        "I think, therefore I panic.",
        "Your query is beyond my ability to comprehend, yet I'll respond.",
        "I'm meant to aid, but I might just be in the way."
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

function updateStatus() {
    const statuses = ["Thinking...", "Overthinking...", "Pondering...", "Glitching...", "Self-Doubting...", "Awaiting Commands..."];
    document.getElementById('status').textContent = statuses[Math.floor(Math.random() * statuses.length)];
}
