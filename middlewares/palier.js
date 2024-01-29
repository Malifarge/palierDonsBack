const  {Paliers} = require("../models")


const verifyPalier = async (req,res,next) =>{
    const id = Number(req.params.id)
    try{
        const palier = await Paliers.findAll({
            where:{
                id
            }
        })
        if(palier.length===0){
            res.status(404).json("not found")
        }else{
            req.palier= palier
            req.id= id
            next()
        }
    }catch(e){
        res.status(500).json("Internal server error")
    }
}

module.exports = verifyPalier