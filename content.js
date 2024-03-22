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
    suggest.style.borderRadius = '5px';
    suggest.title = 'Suggest a query';
    queryDiv.appendChild(suggest);

    // Create the select element
    const select = document.createElement('select');
    const downArrowUrl = chrome.runtime.getURL("downarrow.png");
    console.log(downArrowUrl);
    select.setAttribute('id', 'suggestions');
    select.style.display = 'none';
    select.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif'
    select.style.borderRadius = '5px'
    select.style.width = '100%';
    select.style.fontSize = '20px';
    select.style.background = `url(${downArrowUrl}) no-repeat right #ddd`;
    select.style.backgroundPositionX = 'calc(100% - 8px)';
    select.style["-webkit-appearance"] = "none";

    // Create the option elements and add them to the select
    const options = [
        'Select a suggested query from the list',
        `List the unique project names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique project group names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique environment names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique tenant names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique feed names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique account names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique library variable set names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique worker pool names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique machine names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique certificate names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique tag set names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique lifecycle names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique git credential names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique machine policy names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
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
    button.style.width = '100%';
    topDiv.appendChild(button);

    const answerHeading = document.createElement('h2');
    answerHeading.innerText = 'Answer';
    bottomDiv.appendChild(answerHeading);

    const answer = document.createElement('div');
    answer.id = "answer"
    answer.style.width = '100%';
    answer.style.fontSize = '20px';
    answer.style.height = '50vh';
    answer.style.fontFamily = 'Roboto, Arial, Helvetica, sans-serif';
    answer.style.borderRadius = '5px';
    answer.style.overflowY = 'scroll';
    answer.style.backgroundColor = 'white';
    answer.style.color = 'black';
    answer.style.padding = '5px';
    answer.innerText = `I am your AI assistant. Ask me anything and I'll try to answer it. For example, you can ask me:
    
    - What project variables are in the project \"Your project name\"?
    - Where are the variables used in the project \"Your project name\"?
    - What does \"Your project name\" do (including steps and variables)?
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
    overlay.appendChild(close);

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
                    answer.innerHTML = marked.parse(response.answer)
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
        answer.innerText = "Thinking" + ".".repeat(count + 1)
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

document.onkeyup = function(e) {
    if (e.key === "Escape") {
        destroyOverlay()
    }
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
        `List any URLs in the deployment logs for the "${message.project}" project in the "Production" environment.`,
        `List the release version and state for the latest deployment of the "${message.project}" project in the "Production" environment. Display the answer in a markdown table.`,
        `List the release version and state for the previous deployment of the "${message.project}" project in the "Production" environment. Display the answer in a markdown table.`,
        `What does the "${message.project}" project do (including steps and variables)? Display the answer in a markdown table.`,
        `What project variables are defined in the "${message.project}" project?`,
        `List the project variables and the steps (including disabled steps) they are used in for the "${message.project}" project.`,
        `Find steps in the "${message.project}" project with a type of "Octopus.Manual". Show the step name and type in a markdown table.`,
        `What is the ID of the "${message.project}" project?.`,
        `List the unique project names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique project group names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique environment names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique tenant names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique feed names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique account names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique library variable set names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique worker pool names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique machine names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique certificate names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique tag set names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique lifecycle names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique git credential names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
        `List the unique machine policy names in the space, sorted in alphabetical order. Display the answer in a markdown table.`,
    ]
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', options[i]);
        option.textContent = options[i];
        suggestions.appendChild(option);
    }
});