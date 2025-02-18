document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
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

function openLogFile() {
    document.getElementById("window-logfile").style.display = "block";
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
