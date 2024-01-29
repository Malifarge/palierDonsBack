require("dotenv").config()

const express = require("express")
const app = express()

const cors= require("cors")
const morgan = require("morgan")

const session = require('express-session')


const port= process.env.PORT

require('./config/passport')
require("./models")

const palierRoutes = require("./routes/palier")
const authRoutes = require("./routes/auth")
const usersRoutes = require('./routes/users')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.use('/',palierRoutes)
app.use('/',authRoutes)
app.use('/',usersRoutes)

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})