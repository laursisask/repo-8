const go = new Go();

function runWasmAdd() {
    WebAssembly.instantiateStreaming(fetch('add.wasm'),
        go.importObject).then((result) => {
        go.run(result.instance);
        output.innerHTML = add()
    });
}

test.onclick = runWasmAdd