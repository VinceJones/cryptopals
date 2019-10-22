import { CharacterFrequency, Binary } from '../helpers';
import { XorSingleCharacterResult } from '../interfaces';
import { Encoding } from '../constants';

/*
 * XOR two strings
 * 
 * @returns string
 *   HEX string
 */
function equalStringLength(type: BufferEncoding): Function {
    return function(stringA: string): Function {
        return function(stringB: string): string {
            const bufferA = Buffer.from(stringA, type);
            const bufferB = Buffer.from(stringB, type);
            const maxLength = Math.max(bufferA.length, bufferB.length);

            let results = [];

            for (let i = 0; i < maxLength; i++) {
                results.push((bufferA[i] ^ bufferB[i]).toString(16));
            }

            return results.map((byte: string) => {
                if (byte.length === 2) {
                    return byte;
                }

                return '0' + byte;
            }).join("");;
        }
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
function hammingDistance(type: BufferEncoding): Function {
    return function(stringA: string): Function {
        return function (stringB: string): number {

            const toBinaryFunc = Binary.to();
            const countFunc = countCharInString(/1/g);
            const counts: number[] = [];
            
            const hexXorResult = equalStringLength(type)(stringA)(stringB);
            const hexXorResultBuff = Buffer.from(hexXorResult, Encoding.HEX.text);

            for (const decResult of hexXorResultBuff) {
                counts.push(countFunc(
                    toBinaryFunc(decResult),
                ));
            }

            return counts.reduce((a, b) => a + b);
        }
    }
}


export {
    equalStringLength,
    singleCharacter,
    binaryHexComparison,
    repeatingEncrypt,
    hammingDistance,
    countCharInString,
};