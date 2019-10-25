import * as fs from "fs";
import { XorSingleCharacterResult } from '../interfaces';
import { XOR, Util } from '../helpers';
import { Encoding } from '../constants';

/*
 * Challenge 4:
 *
 * Detect single-character XOR
 * One of the 60-character strings in this file has been encrypted by single-character XOR.
 * 
 * Find it.
 * (Your code from #3 should help.)
 */

const filePath = 'src/data/challenge_4.txt';
const data = fs.readFileSync(filePath, Encoding.UTF8.text);

let result: XorSingleCharacterResult = null;
let score = 0;
let lastHighScore = 0;
let highestScoringResult: XorSingleCharacterResult = null;
let highestScoreingCipher: string = null;

data.split('\n').map((cipher: string) => {

    result = XOR.singleCharacter(
        Buffer.from(cipher, Encoding.HEX.text)
    );

    score = Util.freqScore(result.text);

    if (score > lastHighScore) {
        lastHighScore = score;
        highestScoringResult = result;
        highestScoreingCipher = cipher;
    }

    score = 0;
    result = null;
});

const output = `
Challenge 4:\n
Detect single-character XOR\n\n
Cipher             = ${highestScoreingCipher}\n
Binary Key         = ${highestScoringResult.key}\n
Message            = ${highestScoringResult.text}\n`;

export default output;