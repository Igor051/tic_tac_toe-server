const mongoose = require("mongoose");
const {accountSchema, authUserSchema} = require("./Shemas.js")

module.exports.Account = mongoose.model("Account", accountSchema, "account");
module.exports.AuthUser = mongoose.model("AuthUser", authUserSchema, "account");