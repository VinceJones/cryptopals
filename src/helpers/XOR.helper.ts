/*
 * XOR two strings
 * @docs https://stackoverflow.com/questions/30651062/how-to-use-the-xor-on-two-strings#answer-30651307
 */
function hex(a:string, b:string): string {
    let result = "";
    let maxStringLength = Math.max(a.length, b.length);

    for (var i = 0; i < maxStringLength; i += 4) {

        let convertStringToBinary = (value: string) => {
            return parseInt(value.slice(-i-4, -i || value.length), 16)
        }

        result = (
            "000"+(
                // parseInt(a.slice(-i-4, -i||a.length), 16) ^ parseInt(b.slice(-i-4, -i||b.length), 16)
                convertStringToBinary(a) ^ convertStringToBinary(b)
                ).toString(16)
            ).slice(-4) + result;
    }
        
    return result;
}

export {
    hex,
};