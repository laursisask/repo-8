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
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = 10000
    document.body.appendChild(overlay);

    // Create the top div
    const headingDiv = document.createElement('div');
    headingDiv.style.height = '10vh';
    headingDiv.style.width = '100%';
    headingDiv.style.paddingLeft = '10%';
    headingDiv.style.paddingRight = '10%';
    overlay.appendChild(headingDiv);

    var heading = document.createElement('h1');
    heading.innerText = 'Octopus AI';
    heading.style.textAlign = 'center';
    headingDiv.appendChild(heading);

    // Create the img element
    var img = document.createElement('img');
    img.src = chrome.runtime.getURL("logo.png");
    img.style.height = "1.625rem"
    img.style.width = "1.625rem"
    img.style.marginLeft = "1rem"
    heading.appendChild(img);

    // Create the top div
    const topDiv = document.createElement('div');
    topDiv.style.height = '20vh';
    topDiv.style.width = '100%';
    topDiv.style.paddingLeft = '10%';
    topDiv.style.paddingRight = '10%';
    overlay.appendChild(topDiv);

    // Create the bottom div
    const bottomDiv = document.createElement('div');
    bottomDiv.style.height = '70vh';
    bottomDiv.style.width = '100%';
    bottomDiv.style.paddingLeft = '10%';
    bottomDiv.style.paddingRight = '10%';
    overlay.appendChild(bottomDiv);

    var queryHeading = document.createElement('h2');
    queryHeading.innerText = 'Query';
    topDiv.appendChild(queryHeading);

    const input = document.createElement('textarea');
    input.id = "input"
    input.style.width = '100%';
    input.style.fontSize = '20px';
    input.value = "What project variables are in the project Octopus Copilot Function?"
    input.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    input.style.borderRadius = '5px'
    topDiv.appendChild(input)

    // Create a new button element
    var button = document.createElement('button');
    button.innerText = 'Submit';
    button.style.fontSize = '20px';
    topDiv.appendChild(button);

    var answerHeading = document.createElement('h2');
    answerHeading.innerText = 'Answer';
    bottomDiv.appendChild(answerHeading);

    const answer = document.createElement('textarea');
    answer.id = "answer"
    answer.readOnly = true
    answer.style.width = '100%';
    answer.style.fontSize = '20px';
    answer.style.height = '50vh';
    answer.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    answer.style.borderRadius = '5px'
    bottomDiv.appendChild(answer);

    var close = document.createElement('img');
    close.src = chrome.runtime.getURL("cross.png")
    close.style.position = 'fixed';
    close.style.top = '0px';
    close.style.right = '0px';
    close.style.width = '32px';
    close.style.height = '32px';
    close.style.marginTop = '10px';
    close.style.marginRight = '10px';
    close.style.cursor = 'pointer';
    close.style.zIndex = 10001;
    overlay.appendChild(close)

    close.onclick = function () {
        destroyOverlay()
    }

    function submit() {
        var intervalId = setThinking()
        input.disabled = true
        button.disabled = true
        chrome.runtime
            .sendMessage({query: input.value})
            .then(response => {
                clearInterval(intervalId);
                answer.value = response.answer
                input.disabled = false
                button.disabled = false
            })
    }

    button.onclick = submit

    input.onkeydown = function (event) {
        if (event.keyCode === 13) {
            submit()
            event.preventDefault()
            return false
        }
    }
}

function setThinking() {
    let count = 1
    return setInterval(function () {
        count = (count + 1) % 3
        answer.value = "Thinking" + ".".repeat(count + 1)
    }, 1000);
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