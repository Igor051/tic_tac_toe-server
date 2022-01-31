let validator = require("isemail");
let {isEmailAlreadyExist} = require("../../service/service.registration")

module.exports = {
    checkEmail(req, res, next) {
        if (typeof (req.body.email) !== "string") {
            res.statusCode = 400
            res.send("email must be a string")
            res.end()
            return
        }
        let isValid = validator.validate(req.body.email);
        if (isValid) {
            next()
        } else {
            res.statusCode = 400
            res.send("invalid email")
            res.end()
        }
    },
    async isAlreadyExist(req, res, next) {
        let alreadyExist = await isEmailAlreadyExist(req.body.email)
        if (alreadyExist) {
            res.statusCode = 409
            res.send("This email is already exist")
            res.end()
        } else {
            next()
        }
    }
}