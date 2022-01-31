const {Router} = require("express")
const isValid = require("../middlewares/registrationDataMiddlewares")
const controller = require("../controllers/auth.controller")

authRouter = Router()

authRouter.post("/", isValid.password, isValid.email, controller.authUser)

module.exports = authRouter