const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.accountSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    nickname: {
        type: String,
        required: true,
        minLength: 1
    }
});

module.exports.authUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
});