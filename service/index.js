const mongoose = require("mongoose");
const {accountSchema} = require("./Shemas")

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/tic_tac", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, function (error) {
        if (error) {
            console.log(error);
        }
    });
}


module.exports.runDB = runDB