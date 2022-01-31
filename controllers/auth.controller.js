const {authUser} = require("../service/service.registration")

module.exports = {
    authUser: async (req,res)=>{
        try{
            const {email, password} = req.body
            const account = await authUser(email, password)
            if(account.isAuthSuccess) {
                return res.send({nickname: account.nickname, _id: account._id})
            }else{
                res.statusCode = 401
                throw new Error("bad auth data")
            }
        }catch (e){
            res.send(e.message)
        }
    }
}