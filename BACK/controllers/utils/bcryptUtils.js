const bcrypt = require('bcryptjs');
const saltRounds = 10;

// 加密
const encryption = async (plainText) => {
    return await bcrypt.hash(plainText, saltRounds);
};

// 比较
const compare = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
};

module.exports = { encryption, compare };