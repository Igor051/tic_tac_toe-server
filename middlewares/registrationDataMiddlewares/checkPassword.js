// довжина 8-100 символів, мін 1 заглавна буква, все тип стр, без пробілів
let passwordValidator = require('password-validator');
let passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8, "password must have at least 8 characters")
    .is().max(100, "password must be no more than 8 characters")
    .has().uppercase(1, "password must have at least 1 uppercase character")
    .has().not().spaces(0, "password must not have spaces")

module.exports = {
    checkPassword(req, res, next) {
        let isValid = passwordSchema.validate(req.body.password) // true or false

        if (typeof (req.body.password) !== "string") {
            res.statusCode = 400
            res.send("password must be a string")
            res.end()

        } else if (!isValid) {
            res.statusCode = 400
            // получаю масив обєктів де вказано що конкретно не так {details: true}
            let validationData = passwordSchema.validate(req.body.password, {details: true})
            // фільтрую його, бо все на фронт слати не треба
            let responseData = validationData.map((item) => {
                return item.message
            })
            res.send(responseData)
            res.end()
        } else {
            next()
        }
    }
}