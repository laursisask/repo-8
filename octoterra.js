const go = new Go();

function is_empty_array(array) {
    return typeof array === 'undefined' || array === null || array.length === 0
}

function runWasmAdd() {
    response.value = "Processing..."
    text.disabled = true
    submit.disabled = true

    fetch(" http://localhost:7071/api/query_parse?message=" + encodeURIComponent(text.value))
        .then(response => response.json())
        .then(entities => {
            logs.value += JSON.stringify(entities, null, 4) + "\n\n"

            fetch("https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport/raw/main/wasm/convert_project.wasm")
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    WebAssembly.instantiate(arrayBuffer, go.importObject)
                        .then(result => {
                            go.run(result.instance);

                            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                                const url = new URL(tabs[0].url)
                                const space = tabs[0].url.split("/")[4]

                                logs.value += JSON.stringify(url.origin) + "\n"
                                logs.value += JSON.stringify(space) + "\n"

                                const excludeAllProjects = is_empty_array(entities.project_names)
                                const excludeAllTargets = is_empty_array(entities.target_names)
                                const excludeAllRunbooks = is_empty_array(entities.runbook_names)
                                const excludeAllVariableSets = is_empty_array(entities.library_variable_sets)
                                const excludeAllTenants = is_empty_array(entities.tenant_names)

                                convertProject(
                                    url.origin,
                                    space,
                                    excludeAllProjects,
                                    entities.project_names ? entities.project_names.join(",") : null,
                                    excludeAllTargets,
                                    entities.target_names ? entities.target_names.join(",") : null,
                                    excludeAllRunbooks,
                                    entities.runbook_names ? entities.runbook_names.join(",") : null,
                                    excludeAllVariableSets,
                                    entities.library_variable_sets ? entities.library_variable_sets.join(",") : null,
                                    excludeAllTenants,
                                    entities.tenant_names ? entities.tenant_names.join(",") : null,
                                ).then(hcl => {

                                    logs.value += hcl + "\n"

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