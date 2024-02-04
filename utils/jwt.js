const jwt = require("jsonwebtoken")

const issueToken = (user)=>{
    const expiresIn = "7d"
    const token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn})
    return token
}

module.exports = issueToken