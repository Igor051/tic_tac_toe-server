const {Router} = require("express")
const registrationRouter = require("./routes/registration.router")
const authRouter = require("./routes/auth.router")


let apiRouter = Router()

apiRouter.use("/registration", registrationRouter)
apiRouter.use("/login", authRouter)

module.exports = apiRouter