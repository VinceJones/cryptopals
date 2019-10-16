function encode(value: string, type: BufferEncoding): string {
    return Buffer.from(value).toString(type);
}

function decode(value: string, type: BufferEncoding): string {
    return Buffer.from(value, type).toString();
}

export {
    decode,
    encode,
}