const {Router} = require("express")
const controller = require("../controllers/registration.controller")
const {isEmailAlreadyExist,...isValid} = require("../middlewares/registrationDataMiddlewares")

registrationRouter = Router()

registrationRouter.post("/", isEmailAlreadyExist, isValid.password, isValid.email, isValid.nickname, controller.createUser)

module.exports = registrationRouter