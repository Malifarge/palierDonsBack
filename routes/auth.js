const express = require("express")
const bcrypt = require('bcrypt')
const issueToken = require("../utils/jwt")
const {Users}= require('../models')
const { userNameExist } = require("../middlewares/user")

const app = express()

app.post('/login',async(req,res)=>{
    const {userName,password} = req.body
    try{
        const user = await Users.findOne({
            where:{
                userName
            }
        })

        
        if(user){
            const validPassword = await bcrypt.compare(password,user.password)
            if(validPassword){
                const token = issueToken({id:user.id})
                res.json({
                    token
                })
            }else{
                res.status(404).json('Not Found')
            }
        }else{
            res.status(404).json("User Not Found")
        }
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.post('/signup', userNameExist,async (req,res)=>{
    const {userName,password} = req.body

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await Users.create({
        userName,
        password: hashedPassword
    })

    res.json(user)
})

module.exports = app