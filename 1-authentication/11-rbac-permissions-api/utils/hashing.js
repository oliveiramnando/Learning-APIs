const { hash, compare } = require('bcrypt');

exports.doHash = (value,saltValue) => {
    const result = hash(value, saltValue);
    return result;
} 

exports.compareHash = (value,hashedValue) => {
    const result = compare(value,hashedValue);
    return result;
} 