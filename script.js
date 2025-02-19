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
});

// ... (previous window drag, open, close, log file, send message, and BSOD functions)
