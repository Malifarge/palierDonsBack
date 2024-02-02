const {Users}= require('../models')

const emailExist = async(req,res,next)=>{
    const {email} = req.body
    try{
        const userEmail = await Users.findOne({
            where:{
                email
            }
        })
        if(userEmail.length > 0){
            res.status(409).json("Email déjà utilisé")
        }else{
            next()
        }
    }catch(e){
        res.status(500).json("Internal server error")
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
    emailExist,
    userExist
    }