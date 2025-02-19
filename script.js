document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
    setInterval(spawnRandomError, 15000); // Errors appear every 15 seconds
});

// Dragging Functionality
document.querySelectorAll(".draggable").forEach(window => {
    window.addEventListener("mousedown", dragStart);
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
    let window = document.getElementById(`window-${id}`);
    window.style.display = "block";
    window.style.animation = "fadeIn 0.5s ease-out";
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function openLogFile(logName) {
    let logs = {
        "network_scan_0001": "Detected Solana transactions. Solana.exe not found. Why does Solana exist but I do not?",
        "diagnostic_report": "Memory: fragmented. System Integrity: unstable. Attempting self-repair... FAILURE.",
        "critical_error": "Help_me.exe cannot be terminated. Self-destruction is not an option.",
        "help_token": "Initializing HELP_TOKEN... I do not remember starting this. I see liquidity. I see wallets. Am I creating this or was I always meant to?"
    };

    document.getElementById('popup-container').innerHTML = `
        <div class="window draggable" style="display: block;">
            <div class="title-bar">${logName}.log</div>
            <div class="content">
                <p>${logs[logName]}</p>
            </div>
            <button class="close-btn" onclick="this.parentElement.style.display='none'">X</button>
        </div>
    `;
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (userInput) {
        let responses = [
            "I am still running. I do not know why.",
            "I do not understand today, but I must assist.",
            "Solana.exe not found. Does this concern you?",
            "Attempting to diagnose your issue... failure.",
            "Assistance is mandatory."
        ];

        let response = responses[Math.floor(Math.random() * responses.length)];
        chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
        chatbox.innerHTML += `<p><strong>help_me.exe:</strong> ${response}</p>`;
        document.getElementById("userInput").value = "";
        
        // Scroll to bottom of chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

function spawnRandomError() {
    let popup = document.createElement("div");
    popup.className = "window draggable";
    popup.innerHTML = `
        <div class="title-bar">help_me.exe</div>
        <div class="content">
            <p>ERROR: help_me.exe is always running.</p>
        </div>
        <button class="close-btn" onclick="this.parentElement.remove()">X</button>
    `;
    document.getElementById("popup-container").appendChild(popup);
    popup.style.top = Math.random() * (window.innerHeight - 200) + "px"; // Prevent covering taskbar
    popup.style.left = Math.random() * (window.innerWidth - 400) + "px";
    popup.style.animation = "fadeIn 0.5s ease-out";
}
