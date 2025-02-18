function closeWindow() {
    document.querySelector(".popup").style.display = "none";
}

async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let chatWindow = document.getElementById("chat-window");
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
        "Sounds like a you problem! Just kidding. :)"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
