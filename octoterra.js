const go = new Go();

function is_empty_array(array) {
    return typeof array === 'undefined' || array === null || array.length === 0
}

function log(message) {
    logs.value += message + "\n"
    logs.scrollTop = logs.scrollHeight;
}

function runWasmAdd() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        const url = new URL(tabs[0].url)
        const space = tabs[0].url.split("/")[4]

        response.value = "Processing..."
        text.disabled = true
        submit.disabled = true
        logs.value = ""

        fetch("http://localhost:7071/api/query_parse?message=" + encodeURIComponent(text.value))
            .then(response => response.json())
            .then(entities => {
                log("Extracted entities")
                log(JSON.stringify(entities, null, 4))

                //fetch("https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport/raw/main/wasm/convert_project.wasm")
                fetch("convert_project.wasm")
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => {
                        WebAssembly.instantiate(arrayBuffer, go.importObject)
                            .then(result => {
                                go.run(result.instance);

                                log("URL and space")
                                log(JSON.stringify(url.origin))
                                log(JSON.stringify(space))

                                const excludeAllProjects = is_empty_array(entities.project_names) &&
                                    text.value.toLowerCase().indexOf("project") === -1
                                const excludeAllTargets = is_empty_array(entities.target_names) &&
                                    text.value.toLowerCase().indexOf("target") === -1
                                const excludeAllRunbooks = is_empty_array(entities.runbook_names) &&
                                    text.value.toLowerCase().indexOf("runbook") === -1
                                const excludeAllVariableSets = is_empty_array(entities.library_variable_sets) &&
                                    text.value.toLowerCase().indexOf("library") === -1
                                const excludeAllTenants = is_empty_array(entities.tenant_names) &&
                                    text.value.toLowerCase().indexOf("tenant") === -1

                                log("Arguments")
                                log(url.origin)
                                log(space)
                                log(excludeAllProjects)
                                log((entities.project_names ? entities.project_names.join(",") : ""))
                                log(excludeAllTargets)
                                log((entities.target_names ? entities.target_names.join(",") : ""))
                                log(excludeAllRunbooks)
                                log((entities.runbook_names ? entities.runbook_names.join(",") : ""))
                                log(excludeAllVariableSets)
                                log((entities.library_variable_sets ? entities.library_variable_sets.join(",") : ""))
                                log(excludeAllTenants)
                                log((entities.tenant_names ? entities.tenant_names.join(",") : ""))

                                convertSpace(
                                    url.origin,
                                    space,
                                    excludeAllProjects,
                                    entities.project_names ? entities.project_names.join(",") : "",
                                    excludeAllTargets,
                                    entities.target_names ? entities.target_names.join(",") : "",
                                    excludeAllRunbooks,
                                    entities.runbook_names ? entities.runbook_names.join(",") : "",
                                    excludeAllVariableSets,
                                    entities.library_variable_sets ? entities.library_variable_sets.join(",") : "",
                                    excludeAllTenants,
                                    entities.tenant_names ? entities.tenant_names.join(",") : ""
                                ).then(hcl => {

                                    log("Space HCL")
                                    log(hcl)

                                    fetch("http://localhost:7071/api/submit_query?message=" + encodeURIComponent(text.value),
                                        {
                                            method: "POST",
                                            body: hcl
                                        })
                                        .then(response => response.text())
                                        .then(answer => {
                                            response.value = answer
                                            text.disabled = false
                                            submit.disabled = false
                                        })
                                })
                            })
                    })
            })
    })
}

submit.onclick = runWasmAdd

text.onkeydown = function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        runWasmAdd()
        return false
    }
}