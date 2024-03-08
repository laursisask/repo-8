const go = new Go();

function runWasmAdd() {
    WebAssembly.instantiateStreaming(fetch('add.wasm'),
        go.importObject).then((result) => {
        go.run(result.instance);
    });
}

test.onclick = runWasmAdd