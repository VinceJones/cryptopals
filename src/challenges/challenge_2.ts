import { XOR } from '../helpers';
import { Encoding } from '../constants';

/*
 * Challenge 2:
 * 
 * Fixed XOR
 * Write a function that takes two equal-length buffers and produces their XOR combination.
 *
 * If your function works properly, then when you feed it the string:
 * 1c0111001f010100061a024b53535009181c
 *
 * ... after hex decoding, and when XOR'd against:
 * 686974207468652062756c6c277320657965
 *
 * ... should produce:
 * 746865206b696420646f6e277420706c6179
 * 
 * XOR Calculator
 * @docs http://xor.pw/?
 */
const STRING_1 = '1c0111001f010100061a024b53535009181c';
const STRING_2 = '686974207468652062756c6c277320657965';
const COMPARE_STRING = '746865206b696420646f6e277420706c6179';

const xorTwoEqualStringLengths = XOR.equalStringLength(Encoding.HEX.text);

const COMPARE = xorTwoEqualStringLengths(STRING_1)(STRING_2) === COMPARE_STRING;

const OUTPUT = `
Challenge 2:\n
Fixed XOR\n\n
HEX text         = ${STRING_1}\n
XOR compare text = ${STRING_2}\n
expected text    = ${COMPARE_STRING}\n
isSame: ${COMPARE}\n`;

 export default OUTPUT;
