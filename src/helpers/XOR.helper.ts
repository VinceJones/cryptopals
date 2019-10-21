import { CharacterFrequency } from '../helpers';
import { XorSingleCharacterResult } from '../interfaces';

/*
 * XOR two strings
 * @docs https://stackoverflow.com/questions/30651062/how-to-use-the-xor-on-two-strings#answer-30651307
 */
function hex(a: string, b: string): string {
    const bufferA = Buffer.from(a, 'hex');
    const bufferB = Buffer.from(b, 'hex');
    const maxLength = Math.max(bufferA.length, bufferB.length);

    let results = [];

    for (let i = 0; i < maxLength; i++) {
        results.push((bufferA[i] ^ bufferB[i]).toString(16));
    }

    return results.join("");
}

function binaryHexComparison(hexBuffer: Buffer): Function {
    return function(binaryValue: number): string[] {
        let xorResults: string[] = [],
            xorResult: number = null;

        for (const hexValue of hexBuffer) {
            xorResult = hexValue ^ binaryValue;

            if (xorResult > 160) {
                return [];
            }

            xorResults.push(
                String.fromCharCode(xorResult)
            );
        }

        return xorResults;
    }
}

function singleCharacter(hexBuffer: Buffer): XorSingleCharacterResult {

    // Build an array of binary that only uses valid english characters.
    const binaryArray = [...new Array(160)].map((_, i) => i);
    const compareFunc = binaryHexComparison(hexBuffer);

    let highestScoringText = '',
        lastHighScore: number = 0,
        binaryKey: number = null,
        score = 0,
        xorResults: string[] = null;

    for (const binaryValue of binaryArray) {

        xorResults = compareFunc(binaryValue);

        if (xorResults.length !== hexBuffer.length) {
            continue;
        }

        score = CharacterFrequency.freqScore(xorResults.join(''));

        if (score > lastHighScore) {
            lastHighScore = score;
            highestScoringText = xorResults.join('');
            binaryKey = binaryValue;
        }
    }

    return {
        text: highestScoringText,
        key: String(binaryKey),
    };
}

function toHexString(byteArray: Uint8Array) {
    return Array.prototype.map.call(byteArray, function(byte: number) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

/*
 * Use a string as a repeating key XOR to encrypt another string.
 *
 * @return Uint8Array
 *   Returns a Uint8Array of hex values
 */
function repeatingEncrypt(xorKey: string): Function {
    return function (stringToEncrypt: string): Uint8Array {
        const toEncryptHexBuffer = Buffer.from(Buffer.from(stringToEncrypt).toString('hex'), 'hex');
        const keyBuffer = Buffer.from(xorKey);

        return toHexString(
            toEncryptHexBuffer.map(
                (value: number, idx: number) => {
                    return value ^ keyBuffer[idx % keyBuffer.length] 
            }),
        );
    }
}

export {
    hex,
    singleCharacter,
    binaryHexComparison,
    repeatingEncrypt,
};