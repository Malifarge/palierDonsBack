const {Users}= require('../models')

const userNameExist = async(req,res,next)=>{
    const {userName} = req.body
        const UserName = await Users.findOne({
            where:{
                userName
            }
        })
        console.log(UserName);
        if(UserName){
            res.status(409).json("userName déjà utilisé")
        }else{
            next()
        }
}

const userExist = async(req,res,next)=>{
    const id = Number(req.params.user_Id)
    try{
        const user = await Users.findOne({
            where:{
                id
            }
        })
        if(user){
            req.id = id
            req.userName = user.userName
            next()  
        }else{
            res.status(404).json("User not found")
        }
    }catch(e){
        res.status(500).json("Internal server error")
    }
}

module.exports = {
    userNameExist,
    userExist
    }