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

    const queryHeading = document.createElement('h2');
    queryHeading.innerText = 'Query';
    topDiv.appendChild(queryHeading);

    // query div
    const queryDiv = document.createElement('div');
    queryDiv.style.width = '100%';
    topDiv.appendChild(queryDiv);

    // Create the input element
    const input = document.createElement('input');
    input.id = "input"
    input.style.width = "calc(100% - 50px)"
    input.size = 100
    input.autocomplete = 'off';
    input.style.fontSize = '20px';
    input.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    input.style.borderRadius = '5px'
    input.style.marginBottom = '5px'
    input.setAttribute('id', 'list');
    queryDiv.appendChild(input);

    // Create the suggestion button
    const suggest = document.createElement('button');
    suggest.innerText = '?';
    suggest.style.fontSize = '20px';
    suggest.style.width = '50px';
    queryDiv.appendChild(suggest);

    // Create the select element
    const select = document.createElement('select');
    select.setAttribute('id', 'suggestions');
    select.style.display = 'none';
    select.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    select.style.borderRadius = '5px'
    select.style.width = '100%';
    select.style.fontSize = '20px';

    // Create the option elements and add them to the select
    const options = [
        'Select a suggested query from the list',
        'List anything interesting in the deployment logs for the "project name" project in the "environment name" environment'
    ];
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', options[i]);
        option.textContent = options[i];
        select.appendChild(option);
    }

    // Add the select element to the document body
    topDiv.appendChild(select);

    // Create a new button element
    const button = document.createElement('button');
    button.innerText = 'Submit';
    button.style.fontSize = '20px';
    topDiv.appendChild(button);

    const answerHeading = document.createElement('h2');
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
    answer.value = `I am your AI assistant. Ask me anything and I'll try to answer it. For example, you can ask me:
    
    - What project variables are in the project \"Your project name\"?
    - Where are the variables used in the project \"Your project name\"?
    - What does \"Your project name\" do?
    - What targets are in the space?
    - What packages are used by the project \"Your project name\"?
    - What accounts are used by the "project \"Your project name\"?
    
As an AI I sometimes make mistakes. Verify the information I provide before making any decisions.
    `
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
        try {
            input.disabled = true
            button.disabled = true
            suggest.disabled = true
            chrome.runtime
                .sendMessage({query: input.value})
                .then(response => {
                    clearThinking(answer, input, button, suggest, intervalId)
                    answer.value = response.answer
                    answer.scrollTop = answer.scrollHeight;
                })
        } catch {
            clearThinking(answer, input, button, intervalId)
        }
    }

    button.onclick = submit

    input.onkeydown = function (event) {
        if (event.keyCode === 13) {
            submit()
            event.preventDefault()
            return false
        }
    }

    select.addEventListener('change', function() {
        input.value = this.value
        this.value = 'Select a suggested query from the list'
        select.style.display = 'none'
        button.style.display = 'block'
        input.style.display = 'inline-block'
        suggest.style.display = 'inline-block'
    });

    suggest.onclick = function () {
        select.style.display = 'block'
        button.style.display = 'none'
        input.style.display = 'none'
        suggest.style.display = 'none'
    }
}

function clearThinking(answer, input, button, suggest, intervalId) {
    clearInterval(intervalId);
    answer.value = ""
    input.disabled = false
    button.disabled = false
    suggest.disabled = false
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

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const suggestions = document.getElementById('suggestions');

    if (!suggestions) {
        return
    }

    while (suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);
    }

    // Create the option elements and add them to the select
    const options = [
        'Select a suggested query from the list',
        `List anything interesting in the deployment logs for the "${message.project}" project in the "Production" environment.`,
        `List the release version for the latest deployment of the "${message.project}" project in the "Production" environment.`,
        `What does the "${message.project}" project do?`,
        `What project variables are defined in the "${message.project}" project?`,
        `List the project variables and the steps they are used in for the "${message.project}" project.`,
    ]
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', options[i]);
        option.textContent = options[i];
        suggestions.appendChild(option);
    }
});