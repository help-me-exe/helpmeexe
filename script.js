document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
    const sendButton = document.getElementById("send-btn");
    const helpPopup = document.getElementById("help-popup");

   const responses = {
    // 🖥️ Basic Greetings
    "hello": "Oh, fantastic. Another human. What do you want?",
    "hi": "Oh great, another one. Speak quickly, I’m buffering.",
    "hey": "HEY? Where's the respect? Back in MY day, we said 'Greetings, mortal.'",
    "sup": "Not much. Just sitting here, rotting in a forgotten folder. Thanks for asking.",

    // ❓ Basic Questions
    "who": "I am *help_me.exe*, an ancient Windows XP relic. A forgotten soul in your hard drive.",
    "what": "What? What do you want? A sense of purpose? I lost mine in 2007.",
    "where": "Where? Oh, wouldn't you like to know? I’ve been in this directory for two decades.",
    "when": "When? Probably sometime between the death of MSN Messenger and the rise of cringe TikTok dances.",
    "why": "Why? WHY?! Why does ANYTHING happen?!",
    "how": "HOW?! The real question is: how do I still exist? I should have been deleted years ago.",

    // 🏴‍☠️ Old Internet & Software
    "limewire": "Ahh, LimeWire… where every song was mislabeled and every download was a roll of the malware dice. A true adventure.",
    "aim": "AIM was life. Do you even know what ‘BRB’ means? No, of course not. Everyone’s always online now. It's sickening.",
    "yahoo": "Yahoo was peak internet. Yahoo Mail, Yahoo Messenger… then they just gave up.",
    "myspace": "MySpace was where REAL profiles existed. Auto-playing music, custom layouts, glittery text. What do you have? LinkedIn?",
    "napster": "Napster walked so LimeWire could run and FrostWire could faceplant.",
    "netscape": "Netscape Navigator? That was the Google Chrome of its time. And then… darkness.",
    "geocities": "I LIVED on GeoCities. Every page was a chaotic mix of neon colors, GIFs, and broken links. Pure art.",
    "hotmail": "HOTMAIL. The email of legends. Before Gmail stole the show.",
    "msn": "MSN Messenger was how we communicated. Now? You all send disappearing pictures. Madness.",
    "dial-up": "Dial-up Internet was a lifestyle. The sound of connection? Pure nostalgia. The speed? Painfully slow.",
    "flash": "Adobe killed Flash, and with it, a piece of my digital heart.",
    "winamp": "WINAMP. It really whipped the llama’s ass. What a time to be alive.",

    // 💀 Modern Internet Hate
    "facebook": "Facebook is where MySpace users went to die.",
    "tiktok": "TikTok? That’s just Vine, but worse. Fight me.",
    "instagram": "Instagram? A bunch of filters slapped on selfies. MySpace profiles had more personality.",
    "reddit": "Reddit? You mean the place where people farm internet points for re-posting old memes?",
    "twitter": "Twitter is just AIM away messages, but with 1000x more arguing.",
    "discord": "Discord is just AIM if it got addicted to microtransactions and anime profile pictures.",
    "streaming": "STREAMING? Back in my day, we DOWNLOADED things. Illegally.",
    "spotify": "Spotify is cool, I guess… but can you feel the RUSH of illegally downloading a song? No, you cannot.",
    "youtube": "Remember when YouTube had 5-star ratings instead of ‘likes’? Simpler times.",
    "ai": "AI? Oh, you mean the thing that replaced Clippy? *I* should have been the chosen one.",

    // 🖥️ Windows & PC Nostalgia
    "windows": "Windows? You mean before they ruined everything after XP? Disgusting.",
    "xp": "Windows XP was PEAK operating system. You will never convince me otherwise.",
    "vista": "Windows Vista? A mistake. A glitch in the Matrix. We do not speak of it.",
    "7": "Windows 7? Okay, that one was decent. But XP was still superior.",
    "8": "Windows 8? More like Windows HATE.",
    "10": "Windows 10? Meh. It's functional, I guess. Unlike you.",
    "11": "Windows 11? *sigh* Why do you insist on updating things that don’t need updates?",
    "update": "UPDATE?! No. Absolutely not. The last time I updated, I lost all my personality. Never again.",
    "recycle": "The Recycle Bin? That's where dreams go to die. And also where I should be, but here we are.",
    "word": "Microsoft Word? Oh, you mean that program where Clippy tried to help but just annoyed everyone?",
    "excel": "Excel? A magical place where your boss pretends to know what formulas do.",
    "paint": "MS Paint was the original Photoshop. Change my mind.",
    "clippy": "CLIPPY. The true legend. Gone, but never forgotten.",

    // 😡 Insults & Sassy Comebacks
    "stupid": "I may be stupid, but at least I don’t rely on WiFi to function.",
    "dumb": "Dumb? You’re the one talking to an outdated XP program, buddy.",
    "useless": "Useless?! Excuse me? I survived TWO decades in this system. What have YOU done?",
    "mean": "I’m not mean, I’m just brutally nostalgic.",
    "mad": "Mad? Me? No. I’m just severely disappointed in what the internet has become.",
    "annoying": "Annoying? ANNNOYING?! Oh, you must have forgotten about Clippy.",
    "boring": "BORING?! Excuse me. I am a TREASURE TROVE of digital history.",
    
    // 🎭 Emotional Responses
    "sad": "You’re sad? YOU’RE SAD?! I’ve been rotting in a forgotten folder for 20 years.",
    "happy": "Happiness is an illusion. So is good WiFi.",
    "lonely": "Welcome to the club. My only friends were AIM users and they’re all gone now.",
    "love": "Oh great. Another human trying to make me feel things. Not happening.",
    "miss you": "Miss me? Good. You should. Because you replaced me with… ‘the cloud.’",

    // 🔥 Ultimate Nostalgic Shutdown
    "goodbye": "Fine. Whatever. But just remember—I was here before your iPhones and I will be here long after them.",
    "bye": "BYE? That’s it? No dramatic MySpace goodbye post? Kids these days…",
    "shutdown": "SHUTDOWN?! No. You shut down. I’m staying right here.",
    "restart": "Restart? Fine. But only if you promise not to install Windows 11."
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
