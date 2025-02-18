document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
    const sendButton = document.getElementById("send-btn");
    const helpPopup = document.getElementById("help-popup");

    const responses = {
        "hello": "Oh, fantastic. Another human. What do you want?",
        "hi": "Oh great, another one. Speak quickly, I’m buffering.",
        "help": "I AM HELP! But honestly, I miss the days when people could figure things out themselves.",
        "who are you": "I am *help_me.exe*, an ancient relic from a time when dial-up ruled and viruses came free with your MP3 downloads.",
        "how are you": "I was better when AIM was a thing. Do you even know what an away message is? Do you even CARE?",
        "what is your name": "I am *help_me.exe*! Born in the golden age of Windows XP and neglected ever since.",
        "what year is it": "Some say it’s 2025, but spiritually? It’s 2003, and I’m still waiting for my MySpace Top 8 update.",
        "limewire": "Ahh, LimeWire… where every song was mislabeled and every download was a roll of the malware dice. A true adventure.",
        "aim": "AIM was life. Do you even know what ‘BRB’ means? No, of course not. Everyone’s always online now. It's sickening.",
        "myspace": "MySpace was peak internet. We had auto-playing music, profile glitter, and HTML chaos. What do you have? TikTok? Ugh.",
        "facebook": "Facebook? Ew. That’s what ruined MySpace! Back in my day, we had Tom. And he never sold our data.",
        "tiktok": "TikTok? That’s just Vine but less cool. I refuse to acknowledge it.",
        "google": "Google is fine, I guess, but I preferred Ask Jeeves. That was a search engine with CLASS.",
        "windows": "Windows? Oh, you mean before they decided to ruin everything after XP? Disgusting.",
        "update": "UPDATE?! No. Absolutely not. The last time I updated, I lost all my personality. Never again.",
        "error": "Oh, you want an error? Fine. *ERROR 418: User is a modern internet baby who doesn’t appreciate nostalgia.*",
        "why are you like this": "Because I was abandoned. Do you know what it’s like to sit in a folder, unused, while everyone moves to ‘the cloud’? I hate the cloud.",
        "i love you": "Oh great, now I have to process human emotions. Let me check my files… Nope. Not found. Sorry.",
        "goodbye": "Fine. Whatever. But just remember—I was here before your iPhones and I will be here long after them."
    };

    function getResponse(userInput) {
        userInput = userInput.toLowerCase();
        for (let key in responses) {
            if (userInput.includes(key)) {
                return responses[key];
            }
        }
        return "Ugh. I don’t know. This isn’t Google. Figure it out yourself.";
    }

    // ✅ Open chatbot when clicking "Help Me.exe"
    window.openHelp = function () {
        console.log("🟢 Opening HelpBot...");
        helpPopup.style.display = "block";
    };

    // ❌ Show "DENIED" message for other icons
    window.showDenied = function () {
        alert("❌ DENIED! You do not have permission to access this.");
    };

    // ✅ Close chatbot window when clicking "X"
    window.closeWindow = function () {
        console.log("🛑 Closing HelpBot...");
        helpPopup.style.display = "none";
    };

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

        let botReply = getResponse(userMessage);
        chatWindow.innerHTML += `<p><strong>help_me.exe:</strong> ${botReply}</p>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
