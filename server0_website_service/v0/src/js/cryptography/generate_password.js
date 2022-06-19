const crypto = require("crypto");

const GenerateSaltEntropy = (count_required_bytes) => {
    return crypto.randomBytes(count_required_bytes);
};

const REGISTER_PasswordSaltingAndHashing = () => {

};

const LOGIN_PasswordSaltingAndHashing = () => {

};