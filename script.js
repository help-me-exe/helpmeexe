document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
    const sendButton = document.getElementById("send-btn");
    const helpPopup = document.getElementById("help-popup");

    const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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"; 

    // ✅ System prompt to make the AI act like an old Windows XP Help Assistant
    const SYSTEM_PROMPT = "You are help_me.exe, a retro-style AI assistant from the early 2000s. Speak in a neurotic, sassy tone. you do not understand tech today. you miss limewire, and aim messenger. ";

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
        chatWindow.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        inputField.value = "";
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // ✅ Send message to OpenAI API
        fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4", // 🔹 Change to "gpt-4" if needed
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage }
                ],
                max_tokens: 150,
                temperature: 2
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // 🔹 Debugging: Show response in console

            if (data.choices && data.choices.length > 0) {
                let botReply = data.choices[0].message.content;
                chatWindow.innerHTML += `<p><strong>HelpBot 2002:</strong> ${botReply}</p>`;
                chatWindow.scrollTop = chatWindow.scrollHeight;
            } else {
                chatWindow.innerHTML += `<p><strong>HelpBot 2002:</strong> I'm not sure how to respond to that.</p>`;
            }
        })
        .catch(error => {
            console.error("API Error:", error); // 🔹 Debugging: Show fetch errors
            chatWindow.innerHTML += `<p><strong>HelpBot 2002:</strong> Error connecting to OpenAI.</p>`;
        });
    }
});
