import { Encoding } from '../constants';
import { EncodeDecode } from '../helpers';
import { CharacterFrequency }  from '../constants';

function freqScore(string: string) {
    let score = 0;
    string = string.toLowerCase();

    string.split("").map((char: string, idx: number) => {
        return CharacterFrequency[string[idx]] ? score += CharacterFrequency[string[idx]] : false
    })
    return score;
}

function determineEncoding(text: string|number): any {
    
    if (typeof text === 'number') {
        return Encoding.DECIMAL
    }

    // Now that we know it is not a number, we can proceed as a string.
    text = String(text);
    
    if (parseInt(text, 16).toString(16) === text) {
        return Encoding.HEX;
    }

    const base64Decode = EncodeDecode.decode(Encoding.BASE_64.text);
    const base64Encode = EncodeDecode.encode(Encoding.BASE_64.text);

    if (base64Encode(base64Decode(text)) === text) {
        return Object.assign(Encoding.BASE_64, {});
    }

    const isAscii = text.split('')
                        .map(char => char.charCodeAt(0))
                        .every(c => c <= 127);
    
    if (isAscii) {
        return Encoding.ASCII;
    }

    return null;
}

function buildKeysizeBlocks(msg: Buffer): Function {
    return function(keySize: number): Buffer[] {
        let blocks=[];

        for (var i = 0; i < Math.floor(msg.length / keySize); i ++) {
            blocks.push(Buffer.from(
                msg.slice(i * keySize, (i * keySize) + keySize))
            );
        }

        return blocks;
    }
}

function transposeBlocks(blocks: Buffer[]): Buffer[] {
    
    let blockSize = blocks[0].length;
    let tempStringBlocks = [...new Array(blockSize)].map((_) => []);

    for (let blockKey = 0; blockKey < blockSize; blockKey++) {
        for (let i = 0; i < blocks.length; i++) {
            tempStringBlocks[blockKey].push(blocks[i][blockKey]);
        }
    }

    let transposeBlocks = [];
    for (const tempString of tempStringBlocks) {
        transposeBlocks.push(Buffer.from(tempString));
    }

    return transposeBlocks;
}

function mabyeStringToBuffer(text: string|Buffer): Buffer {
    
    if (Buffer.isBuffer(text)) {
        return text;
    } 

    let type = determineEncoding(text);
    return Buffer.from(text, type);
}

export {
    freqScore,
    determineEncoding,
    buildKeysizeBlocks,
    transposeBlocks,
    mabyeStringToBuffer
}