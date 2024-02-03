const express = require("express")
const  {Paliers} = require("../models")
const verifyPalier = require("../middlewares/palier")
const { userExist } = require("../middlewares/user")

const app = express()

app.get('/palier',async (req,res)=>{
    try{
        const paliers = await Paliers.findAll()
        res.json(paliers)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.get('/palier/:id',verifyPalier,async (req,res)=>{
    try{
        res.json(req.palier)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.get('/palier/user/:user_Id',userExist,async(req,res)=>{
    try{
        const paliers = await Paliers.findAll({
            where:{
                user_Id:req.id
            }
        })
        res.json(paliers)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.post('/palier',async (req,res)=>{
    try{
        const palier = await Paliers.create(req.body)
        res.json(palier)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.put('/palier/:id',verifyPalier,async (req,res)=>{
    try{
        const palier = await Paliers.update(
            {Prix: req.body.Prix,
            Goal: req.body.Goal,
            Validation: req.body.Validation
            },
            {
                where:{
                    id:req.id
                }
            }
        )
        res.json(palier)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

app.delete('/palier/:id',verifyPalier,async (req,res)=>{
    const {id} = req
    try{
        const palier = await Paliers.destroy(
            {
                where:{
                    id
                }
            }
        )
        res.json(palier)
    }catch(e){
        res.status(500).json("Internal server error")
    }
})

module.exports = app