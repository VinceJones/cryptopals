function encode(type: BufferEncoding): Function {
    return function(value: string): string {
        return Buffer.from(value).toString(type);
    }
}

function decode(type: BufferEncoding): Function {
    return function(value: string): string {
        return Buffer.from(value, type).toString();
    }
}

export {
    decode,
    encode,
}