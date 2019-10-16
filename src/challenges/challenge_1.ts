import { DataTypes } from '../constants';
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
const HEX_STRING = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
const COMPARE_STRING = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';

const HEX_DECODE = EncodeDecode.decode(HEX_STRING, DataTypes.HEX);
const ENCODE_TO_BASE64 = EncodeDecode.encode(HEX_DECODE, DataTypes.BASE_64);
const COMPARE = ENCODE_TO_BASE64 === COMPARE_STRING;

const OUTPUT = `
Challenge 1:\n
Convert hex to base64\n\n
original text = ${HEX_STRING}\n
expected text = ${COMPARE_STRING}\n
hex decode    = ${HEX_DECODE}\n
base64 encode = ${ENCODE_TO_BASE64}\n
isSame: ${COMPARE}\n`;

export default OUTPUT;