const {Sequelize} = require("sequelize")

const {DB_NAME,DB_USERNAME,DB_PASSWORD,DB_HOST,JAWSDB_URL} = process.env

if (JAWSDB_URL){
    const sequelize = new Sequelize(JAWSDB_URL)
    const connectDb = async () =>{
        try{
            await sequelize.authenticate()
            console.log(`Connected to db ${sequelize.config.database}`);
        }catch(e){
            console.log(e);
        }
    }
    
    connectDb()
    
    const Users = require('./users')(sequelize)
    const Paliers = require("./palier")(sequelize)
    
    Users.hasMany(Paliers)
    Paliers.belongsTo(Users)
    
    sequelize.sync({alter:true})
    
    module.exports = {
        sequelize,
        Users,
        Paliers
    }

}else{
    const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
        host: DB_HOST,
        dialect: "mysql",
        logging:false
    })

    const connectDb = async () =>{
        try{
            await sequelize.authenticate()
            console.log(`Connected to db ${sequelize.config.database}`);
        }catch(e){
            console.log(e);
        }
    }
    
    connectDb()
    
    const Users = require('./users')(sequelize)
    const Paliers = require("./palier")(sequelize)
    
    Users.hasMany(Paliers)
    Paliers.belongsTo(Users)
    
    sequelize.sync({alter:true})
    
    module.exports = {
        sequelize,
        Users,
        Paliers
    }
}

