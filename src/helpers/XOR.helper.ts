/*
 * XOR two strings
 * @docs https://stackoverflow.com/questions/30651062/how-to-use-the-xor-on-two-strings#answer-30651307
 */
function hex(a: string, b: string): string {
    let result = "";
    let maxStringLength = Math.max(a.length, b.length);
    let convertStringToInt = (value: string) => {
        return  parseInt(value.charAt(maxStringLength), 16);
    }

    while (maxStringLength-- > 0) {
        result = (convertStringToInt(a) ^ convertStringToInt(b)).toString(16) + result;
    }
        
    return result;
}

export {
    hex,
};