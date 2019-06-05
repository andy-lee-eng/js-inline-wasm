const encoded = '${base64data}';
const decoded = atob(encoded);
const len = decoded.length;
const bytes = new Uint8Array(len);

for (var i = 0; i < len; i++) {
    bytes[i] = decoded.charCodeAt(i);
}

export default bytes;
