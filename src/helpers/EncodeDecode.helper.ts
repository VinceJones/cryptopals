// import DataTypes from '../constants/DataTypes.constants';

// const HEX = '/^[0-9a-fA-F]{1,}$/';

// function isHex(value: string) {
//     return value.match(HEX);
// }

// function isBase64(value: string) {
//     return Buffer.from(
//         Buffer.from(value).toString(DataTypes.BASE_64),
//         DataTypes.BASE_64
//     ).toString() === value;
// }

// function getStringType(value: string) {
//     if (isHex(HEX)) {
//         console.log('isHex');
//         return DataTypes.HEX;
//     } else if (isBase64(value)) {
//         console.log('isBase64');
//         return DataTypes.BASE_64;
//     }

//     return null;
// }

function encode(value: string, type: BufferEncoding) {
    return Buffer.from(value).toString(type);
}

function decode(value: string, type: BufferEncoding) {
    return Buffer.from(value, type).toString();
}

export default {
    decode,
    encode,
}