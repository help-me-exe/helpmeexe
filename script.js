let zIndexCounter = 1;

// Toggle Start Menu
function toggleStartMenu() {
    let menu = document.getElementById("start-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Open a Window
function openWindow(title) {
    let container = document.getElementById("windows-container");

    // Create Window
    let windowDiv = document.createElement("div");
    windowDiv.classList.add("window");
    windowDiv.style.top = Math.random() * 200 + "px";
    windowDiv.style.left = Math.random() * 200 + "px";
    windowDiv.style.zIndex = zIndexCounter++;

    // Window Header
    let header = document.createElement("div");
    header.classList.add("window-header");
    header.innerHTML = `<span>${title}</span> <span class="close-btn" onclick="this.parentElement.parentElement.remove()">X</span>`;
    windowDiv.appendChild(header);

    // Window Content
    let content = document.createElement("div");
    content.innerHTML = `<p>This is the ${title} window.</p>`;
    windowDiv.appendChild(content);

    // Drag Functionality
    makeDraggable(windowDiv);

    // Add to Screen
    container.appendChild(windowDiv);
}

// Make Windows Draggable
function makeDraggable(element) {
    let header = element.querySelector(".window-header");
    let offsetX, offsetY, isDragging = false;

    header.onmousedown = function(event) {
        isDragging = true;
        offsetX = event.clientX - element.offsetLeft;
        offsetY = event.clientY - element.offsetTop;
    };

    document.onmousemove = function(event) {
        if (isDragging) {
            element.style.left = (event.clientX - offsetX) + "px";
            element.style.top = (event.clientY - offsetY) + "px";
        }
    };

    document.onmouseup = function() {
        isDragging = false;
    };
}

// Update Clock
function updateClock() {
    let clock = document.getElementById("clock");
    let now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
