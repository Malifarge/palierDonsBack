const express = require('express')
const app = express()
const passport = require('../config/passport')
const { userExist } = require('../middlewares/user')
const { Users } = require('../models')

app.get('/me',passport.authenticate('jwt'),(req,res)=>{
    res.json(req.user)
})

app.get('/user',async (req,res)=>{
    try{
        const streams = await Users.findAll({})
        res.json(streams)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.get ('/user/:user_Id',userExist,(req,res)=>{
    res.json(req.userName)
})

app.delete('/user/:user_Id',userExist,async(req,res)=>{
    const {id} = req
    try{
        const user = await Users.destroy(
            {
                where:{
                    id
                }
            }
        )
        res.json(user)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

module.exports = app