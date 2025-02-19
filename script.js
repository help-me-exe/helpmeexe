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
    }, 10000); // 10 seconds loading screen
    
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
