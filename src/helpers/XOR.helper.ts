import { Binary, CharacterFrequency } from '../helpers';
import { XorSingleCharacterResult } from '../interfaces';

/*
 * XOR two strings
 * @docs https://stackoverflow.com/questions/30651062/how-to-use-the-xor-on-two-strings#answer-30651307
 */
function hex(a: string, b: string): string {
    let result = "";
    let maxLength = Math.max(a.length, b.length);
    

    while (maxLength-- > 0) {
        result = (stringToInt(a, maxLength) ^ stringToInt(b, maxLength)).toString(16) + result;
    }
        
    return result;
}

function stringToInt(value: string, position: number): number {
    return parseInt(value.charAt(position), 16);
}

/*
 * XOR String against all binary
 */
function singleCharacter(cipherArray: string[]): XorSingleCharacterResult {

    let texts = [];
    let tempText: any[] = [];
    let xorResult: any[] = [];
    let score = 0;
    let lastHighScore = 0;
    let highestScoringText: string = null;
    let tempTextAccumulation = '';

    let binaryArray = Binary.build256Array();

    for (var i = 0; i < binaryArray.length; i++) {
        for (var j = 0; j < cipherArray.length; j++) {
            for (var k = 0; k < cipherArray[j].length; k++) {
                xorResult = xorResult.concat(
                    Number(cipherArray[j][k]) ^  Number(binaryArray[i][k]),
                );
            }

            tempText.push(String.fromCharCode(
                Number(parseInt(xorResult.join(''), 2).toString(10)),
            ));

            xorResult = [];
        }

        tempTextAccumulation = tempText.join('');
        texts.push(tempTextAccumulation);

        let scoreString = new String(tempTextAccumulation).toString();

        score = CharacterFrequency.freqScore(scoreString);

        if (score > lastHighScore) {
            lastHighScore = score;
            highestScoringText = tempTextAccumulation;
        }

        tempText = [];
        score = 0;
    }

    let binaryKey = texts.map((text: string, idx: number) => {
        return text === highestScoringText ? idx : false;
    }).filter((result: boolean|number)=> {
        return result !== false;
    });

    return {
        text: highestScoringText,
        key: binaryArray[Number(binaryKey)],
    };
}

export {
    hex,
    singleCharacter,
};