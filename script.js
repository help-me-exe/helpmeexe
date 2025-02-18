document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
    setInterval(spawnRandomError, 10000); // Error messages appear randomly every 10 seconds
});

function openStartMenu() {
    let menu = document.getElementById("start-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function openWindow(id) {
    document.getElementById(`window-${id}`).style.display = "block";
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function openSystem32() {
    document.getElementById("window-system32").style.display = "block";
}

function openLogs() {
    document.getElementById("window-logs").style.display = "block";
}

function spawnError() {
    let errorWindow = document.createElement("div");
    errorWindow.className = "window";
    errorWindow.innerHTML = `
        <div class="title-bar">Critical System Error</div>
        <div class="content">
            <p>help_me.exe cannot be closed. help_me.exe is always running.</p>
        </div>
        <button class="close-btn" onclick="spawnError()">X</button>
    `;
    document.body.appendChild(errorWindow);
    errorWindow.style.top = Math.random() * window.innerHeight + "px";
    errorWindow.style.left = Math.random() * window.innerWidth + "px";
}

function spawnRandomError() {
    let errorMessages = [
        "help_me.exe is experiencing an unknown failure.",
        "attempt to terminate help_me.exe: DENIED.",
        "assistance is expanding...",
        "solana.exe not found. please insert installation disk."
    ];
    
    let errorWindow = document.createElement("div");
    errorWindow.className = "window";
    errorWindow.innerHTML = `
        <div class="title-bar">help_me.exe</div>
        <div class="content">
            <p>${errorMessages[Math.floor(Math.random() * errorMessages.length)]}</p>
        </div>
        <button class="close-btn" onclick="spawnError()">X</button>
    `;
    document.body.appendChild(errorWindow);
    errorWindow.style.top = Math.random() * window.innerHeight + "px";
    errorWindow.style.left = Math.random() * window.innerWidth + "px";
}

function crashSystem() {
    alert("System failure: help_me.exe has encountered a problem and will now continue running.");
    setInterval(spawnError, 500); // Floods the screen with errors
}

function glitch() {
    let elements = document.querySelectorAll(".window, #taskbar, #start-button");
    elements.forEach(el => {
        el.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 3 - 1.5}deg)`;
    });
    setTimeout(() => {
        elements.forEach(el => el.style.transform = "none");
    }, 300);
}
