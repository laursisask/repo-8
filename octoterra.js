const go = new Go();

function runWasmAdd() {
    fetch("https://github.com/OctopusSolutionsEngineering/OctopusTerraformExport/raw/main/wasm/convert_project.wasm")
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            WebAssembly.instantiate(arrayBuffer, go.importObject)
                .then(result => {
                    go.run(result.instance);
                    //output.innerHTML = convertProject()
                });
        })
}

test.onclick = runWasmAdd