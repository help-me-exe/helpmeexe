document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startup-sound").play();
    openWindow('welcome'); // Show welcome popup on page load
});

// Enable Draggable Windows
document.querySelectorAll(".draggable").forEach(win => {
    win.addEventListener("mousedown", function(event) {
        let shiftX = event.clientX - win.getBoundingClientRect().left;
        let shiftY = event.clientY - win.getBoundingClientRect().top;
        
        function moveAt(x, y) {
            win.style.left = x - shiftX + "px";
            win.style.top = y - shiftY + "px";
        }

        function mouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", mouseMove);
        win.onmouseup = function () {
            document.removeEventListener("mousemove", mouseMove);
            win.onmouseup = null;
        };
    });
});

// Show Fake BSOD
function showBSOD() {
    document.getElementById("bsod").style.display = "block";
}

// Restart System
function restartSystem() {
    location.reload();
}

// Open & Close Windows
function openWindow(id) {
    document.getElementById(`window-${id}`).style.display = "block";
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}
