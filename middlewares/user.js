const {Users}= require('../models')

const emailExist = async(req,res,next)=>{
    const {email} = req.body
    try{
        const userEmail = await Users.findAll({
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

module.exports = emailExist