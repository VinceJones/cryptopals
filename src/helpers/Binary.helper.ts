import { Encoding } from '../constants';

function to(from: number = Encoding.DECIMAL.value): Function {
    return function (value: string|number): string {
        if (typeof value === 'number') {
            value = String(value);
        }

        let binary = parseInt(value, from).toString(Encoding.BASE_64.value);

        if (binary.length < 8) {
            binary = String().padStart(8 - binary.length, "0") + binary;
        }

        return binary
    }
}

function build256Array(length: number = 256): string[] {
    const RESULT: string[] = [];
    const toBinaryFunc = to();

    for (let i = 0; i < length; i++) {
        RESULT.push(toBinaryFunc(i));
    }

    return RESULT;
}

export {
    to,
    build256Array,
}