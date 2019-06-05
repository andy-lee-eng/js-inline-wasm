const encoded = '${base64data}';
export default new Promise(resolve => {
    const decoded = atob(encoded);
    const len = decoded.length;
    const bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = decoded.charCodeAt(i);
    }
    resolve(new Response(bytes, { status: 200, headers: { "Content-Type": "application/wasm" } }));
});
