document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
    const sendButton = document.getElementById("send-btn");
    const closeButton = document.querySelector(".close-btn");
    const helpPopup = document.getElementById("help-popup");

    // 🟢 Open the pop-up when clicking HelpMe.exe
    window.openHelp = function () {
        helpPopup.style.display = "block";
    };

    // 🔴 Close the pop-up
    closeButton.addEventListener("click", function () {
        helpPopup.style.display = "none";
    });

    // ✉️ Send Message
    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let userMessage = inputField.value.trim();
        if (!userMessage) return;

        chatWindow.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        inputField.value = "";
        chatWindow.scrollTop = chatWindow.scrollHeight;

        setTimeout(() => {
            let botReply = generateFakeReply(userMessage);
            chatWindow.innerHTML += `<p><strong>HelpBot 2002:</strong> ${botReply}</p>`;
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
    }

    function generateFakeReply() {
        let responses = [
            "Hmm... let me think about that.",
            "Have you tried turning it off and on again?",
            "Check the manual, maybe?",
            "Error 404: Useful response not found.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
});
