const {DataTypes} = require("sequelize")

module.exports = (sequelize) =>{
    const Users = sequelize.define('Users',{
        userName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        // email:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return Users
}