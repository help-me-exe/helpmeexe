document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
    setInterval(spawnRandomError, 8000); 
});

function openLogs() {
    document.getElementById("window-logs").style.display = "block";
}

function openLogFile(logName) {
    alert(`Opening ${logName}.log...`);
    let errorMessage = [
        "help_me.exe cannot close.",
        "solana.exe not found.",
        "self-diagnosis failed.",
        "assistance is mandatory."
    ];
    
    setTimeout(() => {
        alert(errorMessage[Math.floor(Math.random() * errorMessage.length)]);
    }, 2000);
}

function crashSystem() {
    alert("System failure: help_me.exe will now continue running.");
    setInterval(spawnError, 300);
}

function spawnError() {
    alert("ERROR: help_me.exe is always running.");
}
