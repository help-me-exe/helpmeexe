document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");

    document.querySelector(".close-btn").addEventListener("click", function () {
        document.querySelector(".popup").style.display = "none";
    });

    document.querySelector("button").addEventListener("click", sendMessage);

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
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

    function generateFakeReply(input) {
        let responses = [
            "Hmm... let me think about that.",
            "Have you tried turning it off and on again?",
            "I'm just a simple bot from 2002, can you rephrase?",
            "Check the manual, maybe?",
            "I don't have that information... yet!",
            "Sounds like a you problem! Just kidding. :)",
            "I'm still buffering... wait, do I even buffer?",
            "Error 404: Useful response not found.",
            "Let me consult my ancient knowledge... nope, nothing."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
});

