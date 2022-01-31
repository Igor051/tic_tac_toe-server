const {checkPassword} = require("./checkPassword")
const {checkEmail, isAlreadyExist} = require("./checkEmail")
const {checkNickname} = require("./checkNickname")

module.exports = {password: checkPassword, email: checkEmail, nickname: checkNickname, isEmailAlreadyExist: isAlreadyExist}