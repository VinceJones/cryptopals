import { XOR } from '../helpers';
import { Encoding } from '../constants';

/*
 * Challenge 3:
 *
 * Single-byte XOR cipher
 * The hex encoded string:
 * 1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736
 * 
 * ... has been XOR'd against a single character. Find the key, decrypt the message.
 * You can do this by hand. But don't: write code to do it for you.
 * 
 * How? Devise some method for "scoring" a piece of English plaintext. 
 * Character frequency is a good metric. Evaluate each output and choose the one with the best score.
 * 
 * Achievement Unlocked
 * You now have our permission to make "ETAOIN SHRDLU" jokes on Twitter.
 */

const cipher: string = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';

const result: any = XOR.singleCharacter(
    Buffer.from(cipher, Encoding.HEX.text)
);

const output = `
Challenge 3:\n
Single-byte XOR cipher\n\n
Cipher             = ${cipher}\n
Key                = ${result.key}\n
Message            = ${result.text}\n`;

export default output;