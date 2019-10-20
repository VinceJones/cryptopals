function to(value: string|number, from: number = 10): string {
    if (typeof value === 'number') {
        value = String(value);
    }

    let binary = parseInt(value, from).toString(2);

    if (binary.length < 8) {
        binary = String().padStart(8 - binary.length, "0") + binary;
    }

    return binary
}

function build256Array(): string[] {
    const RESULT: string[] = [];

    for (let i = 0; i < 256; i++) {
        RESULT.push(to(i));
    }

    return RESULT;
}

export {
    to,
    build256Array,
}