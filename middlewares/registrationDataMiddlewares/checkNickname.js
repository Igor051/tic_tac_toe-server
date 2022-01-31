module.exports = {
    checkNickname(req, res, next) {
        try {
            if (typeof(req.body.nickname) !== "string") {
                throw new Error("nickName must be a string")
            } else if (req.body.nickname.length < 1) {
                throw new Error("nickName must have at least 1 character")
            }
            next()

        } catch (e) {
            res.statusCode = 400
            res.send(e.message)
            res.end()
        }

    }
}