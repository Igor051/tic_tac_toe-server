const {createAccount}= require("../service/service.registration")

module.exports = {
    createUser: async (req,res)=>{
        try{
            const {email, password, nickname} = req.body
            const account = await createAccount(email, password, nickname)
            return res.send({nickname: account.nickname, _id: account._id})
        }catch (e){
            res.send(e.message)
        }
    }
}