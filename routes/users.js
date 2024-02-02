const express = require('express')
const app = express()
const passport = require('../config/passport')
const { userExist } = require('../middlewares/user')

app.get('/me',passport.authenticate('jwt'),(req,res)=>{
    res.json(req.user)
})

app.get ('/user/:user_Id',userExist,(req,res)=>{
    res.json(req.userName)
})

module.exports = app