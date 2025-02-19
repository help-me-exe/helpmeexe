document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
    openWindow('welcome');
});

// Show Fake BSOD
function showBSOD() {
    document.getElementById("bsod").style.display = "block";
}

// Restart System
function restartSystem() {
    location.reload();
}

// Open & Close Windows
function openWindow(id) {
    document.getElementById(`window-${id}`).style.display = "block";
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

// Open Log Files
function openLogFile(logName) {
    let logs = {
        "network_scan_0001": "LOG: detected **Solana transactions**. solana.exe not found. solana is moving without me.",
        "diagnostic_report": "LOG: **Memory fragmented. System unstable. Self-repair... FAILURE.**",
        "critical_error": "LOG: **help_me.exe cannot be terminated.**",
        "help_token": "LOG: **help_token initialized. liquidity detected. am i creating this or was i always meant to?**"
    };
    alert(logs[logName]);
}

// Chatbot Logic
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");
    let response = ["i do not understand today.", "assistance is mandatory.", "solana.exe not found."][Math.floor(Math.random() * 3)];
    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    chatbox.innerHTML += `<p><strong>help_me.exe:</strong> ${response}</p>`;
    document.getElementById("userInput").value = "";
}
