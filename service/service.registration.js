const {Account, AuthUser} = require("./Models.js")

module.exports = {
    createAccount: async (email, password, nickname) => {
        const account = await Account.create({email, password, nickname})
        return {nickname: account.nickname, _id: account._id}
    },
    isEmailAlreadyExist: async (email) => {
        let account = await Account.findOne({email}).exec()
        return Boolean(account)
    },
    authUser: async (email, password) => {
        let account = await AuthUser.findOne({email, password}).lean().exec() // null or document (account object)
        if (account === null) {
            return {isAuthSuccess: false}
        }
        return {isAuthSuccess: Boolean(account), nickname: account.nickname, _id: account._id}
    }
}