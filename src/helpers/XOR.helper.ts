import { Util, Binary } from '../helpers';
import { XorSingleCharacterResult } from '../interfaces';
import { Encoding } from '../constants';

/*
 * XOR two strings
 *
 * @todo: Refactor to return buffer.
 * 
 * @returns string
 *   HEX string
 */
function equalStringLength(stringA: string|Buffer): Function {
    return function(stringB: string|Buffer): number[] {
        const bufferA = Util.mabyeStringToBuffer(stringA);
        const bufferB = Util.mabyeStringToBuffer(stringB);

        let results = [];

        for (let i = 0; i < bufferA.length; i++) {
            results.push(bufferA[i] ^ bufferB[i % bufferB.length]);
        }

        return results;
    }
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

        score = Util.freqScore(xorResults.join(''));

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
 *   Returns a Uint8Array of hex values.
 */
function repeatingEncrypt(xorKey: string): Function {
    return function (stringToEncrypt: string): Uint8Array {
        const toEncryptHexBuffer = Buffer.from(
            Buffer.from(stringToEncrypt).toString(Encoding.HEX.text),
            Encoding.HEX.text,
        );
        const keyBuffer = Buffer.from(xorKey);

        return toHexString(
            toEncryptHexBuffer.map(
                (value: number, idx: number) => {
                    return value ^ keyBuffer[idx % keyBuffer.length] 
            }),
        );
    }
}

function countCharInString(regexp: RegExp): Function {
    return function(text: string): number {
        return (text.match(regexp) || []).length;
    }
}

/*
 * Hamming Distance
 *
 * Hamming distance is a metric for comparing two binary data strings. While
 * comparing two binary strings of equal length, Hamming distance is the
 * number of bit positions in which the two bits are different.
 * 
 * In order to calculate the Hamming distance between two strings, and , we
 * perform their XOR operation, (a ⊕ b), and then count the total number of
 * 1s in the resultant string.
 */
function hammingDistance(stringA: string|Buffer): Function {
    return function (stringB: string|Buffer): number {

        const toBinaryFunc = Binary.to();
        const countFunc = countCharInString(/1/g);
        const counts: number[] = [];
        
        const hexXorResult = equalStringLength(stringA)(stringB);
        const hexXorResultBuff = Buffer.from(hexXorResult, Encoding.HEX.text);

        for (const decResult of hexXorResultBuff) {
            counts.push(countFunc(
                toBinaryFunc(decResult),
            ));
        }

        return counts.reduce((a, b) => a + b);
    }
}

interface KeySizeResult { 
    keySize: number;
    score: number;
}

function determineKeySize(message: Buffer): Function {
    return function (max: number): number {    
        const keySizeResults: KeySizeResult[] = [];
        let keySizeFunc = testKeySize(message);

        for (let keySize = 2; keySize < max; keySize++) {
            keySizeResults.push({
                keySize: keySize,
                score: keySizeFunc(keySize),
            });
        }

        return keySizeResults.reduce((x, y) => x.score < y.score ? x : y).keySize;
    }
}

function testKeySize(message: Buffer): Function {
    return function(keySize: number): number {
        const tests = 50;
        let score = 0;

        for (let i = 0; i < tests; i++) {
            let first  = message.slice(keySize * i, keySize * (i + 1));
            let second = message.slice(keySize * (i + 2), keySize * (i + 3));

            score += hammingDistance(first)(second)
        }

        return score / (tests * keySize);
    }
}

export {
    equalStringLength,
    singleCharacter,
    binaryHexComparison,
    repeatingEncrypt,
    hammingDistance,
    countCharInString,
    determineKeySize,
};