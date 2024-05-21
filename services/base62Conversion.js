const bigInt = require('big-integer');

const  toBase62 = (id)=> {
    const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const base = bigInt(BASE62_CHARS.length);
    let result = '';

    let num = bigInt(id);
    while (num.gt(0)) {
        const remainder = num.mod(base);
        result = BASE62_CHARS.charAt(remainder) + result;
        num = num.divide(base);
    }

    console.log("base62  : " + result)
    return result || '0';
}

module.exports = toBase62;
