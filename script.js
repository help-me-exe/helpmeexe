document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
    const sendButton = document.getElementById("send-btn");
    const helpPopup = document.getElementById("help-popup");

    const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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"; // 🔹 Replace with your actual OpenAI API key

    // ✅ Open chatbot when clicking "Help Me.exe"
    window.openHelp = function () {
        helpPopup.style.display = "block";
    };

    // ❌ Show "DENIED" message for other icons
    window.showDenied = function () {
        alert("❌ DENIED! You do not have permission to access this.");
    };

    // ✅ Close chatbot window
    window.closeWindow = function () {
        helpPopup.style.display = "none";
    };

    // ✅ Send message when clicking send button
    sendButton.addEventListener("click", sendMessage);

    // ✅ Send message when pressing Enter key
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let userMessage = inputField.value.trim();
        if (!userMessage) return;

        // Display user message in chat window
        cha
