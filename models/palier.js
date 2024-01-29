const {DataTypes} = require("sequelize")

module.exports = (sequelize) =>{
    const Paliers = sequelize.define('Paliers',{
        Prix: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Goal: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Validation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Pseudo_Id : {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })

    return Paliers
}