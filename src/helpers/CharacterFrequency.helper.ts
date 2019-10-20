import { CharacterFrequency }  from '../constants';

function freqScore(string: string) {

    // console.log('freqScore string', string);
    let score=0;
    string = string.toLowerCase();

    string.split("").map((char: string, idx: number) => {
        return CharacterFrequency[string[idx]] ? score += CharacterFrequency[string[idx]] : false
    })
    return score;
}

export {
    freqScore,
}