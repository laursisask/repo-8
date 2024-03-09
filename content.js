function overlayExists() {
    return document.getElementById('octopusaioverlay') != null
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = "octopusaioverlay"
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.zIndex = 10000
    document.body.appendChild(overlay);

    // Create the top div
    const topDiv = document.createElement('div');
    topDiv.style.height = '20vh';
    topDiv.style.width = '100%';
    topDiv.style.paddingLeft = '10%';
    topDiv.style.paddingRight = '10%';
    topDiv.style.paddingTop = '10vh';
    //topDiv.style.background = 'blue'; // Added for visibility
    overlay.appendChild(topDiv);

    // Create the bottom div
    const bottomDiv = document.createElement('div');
    bottomDiv.style.height = '80vh';
    bottomDiv.style.width = '100%';
    bottomDiv.style.paddingLeft = '10%';
    bottomDiv.style.paddingRight = '10%';
    bottomDiv.style.paddingTop = '10vh';
    //bottomDiv.style.background = 'red'; // Added for visibility
    overlay.appendChild(bottomDiv);

    const input = document.createElement('textarea');
    input.id = "input"
    input.style.width = '100%';
    input.style.fontSize = '20px';
    input.value = "What project variables are in the project Octopus Copilot Function?"
    input.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    topDiv.appendChild(input);

    const answer = document.createElement('textarea');
    answer.id = "answer"
    answer.style.width = '100%';
    answer.style.fontSize = '20px';
    answer.style.height = '60vh';
    answer.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    bottomDiv.appendChild(answer);

    input.onkeydown = function (event) {
        if (event.keyCode === 13) {
            answer.value = "Processing..."
            chrome
                .runtime
                .sendMessage({query: input.value})
                .then(response => answer.value = response.answer)
            event.preventDefault()
            return false
        }
    }
}

function destroyOverlay() {
    const overlay = document.getElementById('octopusaioverlay')
    if (overlay != null) {
        overlay.remove()
    }
}

if (!overlayExists()) {
    createOverlay()
} else {
    destroyOverlay()
}