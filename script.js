document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
    setInterval(spawnRandomError, 12000); // Errors appear every 12 seconds
});

function toggleStartMenu() {
    let menu = document.getElementById("start-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
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

function crashSystem() {
    alert("System failure: help_me.exe will now continue running.");
    setInterval(spawnError, 600);
}

function spawnError() {
    let popup = document.createElement("div");
    popup.className = "window";
    popup.innerHTML = `
        <div class="title-bar">help_me.exe</div>
        <div class="content">
            <p>ERROR: help_me.exe is always running.</p>
        </div>
        <button class="close-btn" onclick="this.parentElement.remove()">X</button>
    `;
    document.getElementById("popup-container").appendChild(popup);
    popup.style.top = Math.random() * window.innerHeight + "px";
    popup.style.left = Math.random() * window.innerWidth + "px";
}
