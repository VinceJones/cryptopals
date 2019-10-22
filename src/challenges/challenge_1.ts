import { Encoding } from '../constants';
import { EncodeDecode } from '../helpers';

/*
 * Challenge 1:
 * 
 * Convert hex to base64
 * The string:
 * 49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d
 *
 * Should produce:
 * SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t
 *
 * So go ahead and make that happen. You'll need to use this code for the rest of the exercises.
 *
 * Cryptopals Rule
 * Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.
 * 
 * @docs https://cryptopals.com/sets/1/challenges/1
 */
const hexString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
const compareString = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';

const hexDecodeFunc = EncodeDecode.decode(Encoding.BASE_64.text);
const base64EncodeFunc = EncodeDecode.encode(Encoding.BASE_64.text);

const encodeToBase64 = base64EncodeFunc(
    hexDecodeFunc(hexString),
);

const OUTPUT = `
Challenge 1:\n
Convert hex to base64\n\n
original text = ${hexString}\n
expected text = ${compareString}\n
base64 encode = ${encodeToBase64}\n
isSame: ${encodeToBase64 === compareString}\n`;

export default OUTPUT;