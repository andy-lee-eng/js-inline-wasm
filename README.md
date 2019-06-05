## js-inline-wasm

A tool for bundling a WebAssembly .wasm file into a .js ES6 library file with async loading.

### Installation

```
npm install -D js-inline-wasm
```

### Usage

```
$ inlinewasm sample.wasm [--output sample.js] [--type fetch]
```

### Options

* --input file          The .wasm file to inline

* -o, --output file     The .js file to create

* -t, --type typeName   The type of JavaScript file to generate

* -h, --help            Show this Help page

### Templates

Each template outputs a different variant of JavaScript file

#### -type fetch

Creates a JavaScript file with a default export function that can be used anywhere you could use `fetch()`. e.g.

```javascript
import fetchSample from 'sample'; // sample.js contains the bundled .wasm

WebAssembly.instantiateStreaming(fetchSample)
    .then(obj => obj.instance.exports.exported_func());
```

#### -type encoded

Creates a JavaScript file with a default export byte array containing the decoded .wasm content

**Note:** You'll probably want to use [`WebAssembly.instantiateStreaming()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming) in most cases, as it is more efficient than `instantiate()`.

```javascript
import decodedSample from 'sample'; // sample.js contains the bundled .wasm

WebAssembly.instantiate(decodedSample)
    .then(obj => obj.instance.exports.exported_func());
```

#### -type encoded

Creates a JavaScript file with a default export string value containing the base64 encoded .wasm file

```javascript
import encodedSample from 'sample'; // sample.js contains the bundled .wasm

// Decode the base64 string then compile...
```
