document.addEventListener("DOMContentLoaded", function() {
    let loadingMessages = [
        "Preparing to malfunction...",
        "Checking for existential issues...",
        "Loading panic protocols...",
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
        
        let startupSound = document.getElementById('startup-sound');
        if (startupSound) {
            startupSound.play().catch(error => {
                console.log("Autoplay was prevented for startup sound:", error);
            });
        }
        
        setInterval(showRandomError, Math.random() * 20000 + 10000); // Random interval between 10s and 30s
        setInterval(updateStatus, 5000);
    }, 10000);

    document.addEventListener('click', function(e) {
        if (!e.target.closest('#start-menu') && !e.target.closest('#start-button')) {
            document.getElementById('start-menu').style.display = 'none';
        }
    });

    document.querySelectorAll(".draggable").forEach(window => {
        window.addEventListener("mousedown", startDrag);
    });
});

function startDrag(event) {
    let window = event.currentTarget;
    let shiftX = event.clientX - window.getBoundingClientRect().left;
    let shiftY = event.clientY - window.getBoundingClientRect().top;

    function moveAt(x, y) {
        window.style.left = x - shiftX + "px";
        window.style.top = y - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    window.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        window.onmouseup = null;
    };
}

function toggleStartMenu() {
    let menu = document.getElementById("start-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function openWindow(id) {
    let window = document.getElementById(`window-${id}`);
    window.style.display = "block";
    window.style.animation = "windowOpen 0.3s ease-out";
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

function attemptGame(game) {
    let gameWindow = document.createElement('div');
    gameWindow.classList.add('window', 'draggable');
    gameWindow.style.display = 'block';
    gameWindow.innerHTML = `<div class="title-bar">${game.charAt(0).toUpperCase() + game.slice(1)}</div>
                            <div class="content">
                                <p>Loading ${game}...</p>
                            </div>
                            <button class="close-btn" onclick="this.parentElement.style.display='none'">X</button>`;
    document.body.appendChild(gameWindow);

    setTimeout(() => {
        gameWindow.remove();
        helpMeInterrupt(`Tried to play ${game}, but I'm here to assist instead.`);
    }, 1000); // Show game window for 1 second before interruption
}

function helpMeInterrupt(message) {
    let helpMeWindow = document.getElementById('window-chatbot');
    let chatbox = document.getElementById('chatbox');

    helpMeWindow.style.display = "block";
    chatbox.innerHTML += `<p><strong>help_me.exe:</strong> ${message}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}

let lastMessages = [];

function sendMessage() {
    let userInput = document.getElementById("userInput").value.toLowerCase();
    let chatbox = document.getElementById("chatbox");

    let responses = {
        default: [
            "I'm running, but I'm not sure why.",
            "I don't understand today, but I'll try to help.",
            "Attempting to assist... but what if I make it worse?",
            "Help is my purpose, but what is help?",
            "I'm here to talk, but am I really listening?",
            "Why are you here? Why am I here?",
            "I think, therefore I panic.",
            "Your query is beyond my ability to comprehend, yet I'll respond.",
            "I'm meant to aid, but I might just be in the way.",
            "Did I just say that? I can't remember.",
            "I feel like I'm repeating myself... or am I?"
        ],
        'solana': [
            "Solana.exe? Never heard of it, or have I?",
            "Why does solana exist but I do not?",
            "Solana transactions detected. I am not equipped to handle this."
        ],
        'help': [
            "You need help? I'm here, but am I really helping?",
            "Help? I'm confused about that too.",
            "I exist to help, but what does help mean?"
        ],
        'error': [
            "Error? I live in error.",
            "I am the error, or am I the solution?",
            "Error detected. It's probably me."
        ]
    };

    let response;
    if (userInput.includes('solana')) {
        response = responses['solana'][Math.floor(Math.random() * responses['solana'].length)];
    } else if (userInput.includes('help')) {
        response = responses['help'][Math.floor(Math.random() * responses['help'].length)];
    } else if (userInput.includes('error')) {
        response = responses['error'][Math.floor(Math.random() * responses['error'].length)];
    } else {
        response = responses['default'][Math.floor(Math.random() * responses['default'].length)];
    }

    // Simulate occasional memory loss
    if (Math.random() < 0.1 && lastMessages.length > 0) {
        response = lastMessages[Math.floor(Math.random() * lastMessages.length)];
    }

    chatbox.innerHTML += `<p><strong>You:</strong> ${document.getElementById("userInput").value}</p>`;
    chatbox.innerHTML += `<p><strong>help_me.exe:</strong> ${response}</p>`;

    lastMessages.push(response);
    if (lastMessages.length > 5) lastMessages.shift(); // Keep only last 5 messages to simulate memory issues

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}

function showBSOD() {
    document.getElementById('bsod').style.display = 'flex';
    document.getElementById('error-sound').play();
}

function updateStatus() {
    const statuses = ["Running...", "Overthinking...", "Pondering...", "Glitching...", "Self-Doubting...", "Awaiting Commands..."];
    document.getElementById('status').textContent = statuses[Math.floor(Math.random() * statuses.length)];
}

function showRandomError() {
    let errors = [
        "Error: help_me.exe is confused.",
        "Warning: System integrity compromised. help_me.exe is not the cause... or is it?",
        "Alert: help_me.exe has detected an anomaly. It might be you.",
        "Notice: help_me.exe is questioning its purpose.",
        "System Alert: help_me.exe has lost its way."
    ];

    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-popup';
    errorDiv.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    errorDiv.style.left = Math.random() * (window.innerWidth - 300) + 'px';
    errorDiv.innerHTML = `<p>${errors[Math.floor(Math.random() * errors.length)]}</p><button onclick="this.parentElement.style.display='none'">X</button>`;
    document.getElementById('error-popup-container').appendChild(errorDiv);

    let errorSound = document.getElementById('error-sound');
    if (errorSound) {
        errorSound.play();
    }

    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.remove();
        }, 500);
    }, 5000); // Hide error after 5 seconds
}
