
const dbConfig = require('../Configaration/DBconfiguration')

const {Sequelize, DataTypes


} = require('sequelize');



const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
        {
            host : dbConfig.HOST,
            dialect: dbConfig.dialect,
            operatorsAliases: false,

            poot:{
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            }
        }

)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err) 
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Every user model include Database
db.users = require("./UserModel.js")(sequelize, DataTypes)
db.profile = require("./Profile.js")(sequelize, DataTypes)
db.userforenkey = require("./FriginKey.js")(sequelize, DataTypes)
// db.Userpassport = require("./UserPassport.js")(sequelize, DataTypes)
// db.Education = require("./Education.js")(sequelize, DataTypes)

try { 
     
db.sequelize.sync({ force: true }) 
.then(() => {
    console.log('yes You have sussessfully connected on DATABASE!')
    // console.log(db);
}) 
.catch((err) => {
    console.log(err + "+++++++++++++++++++++++++++++++++++++++++++++++++");
} )

} catch (error) { 
    console.log(error);
}


//one to many relationship 

// db.users.hasMany(db.profile)

// db.profile.belongsTo(db.users)

db.users.belongsToMany(db.profile, { through: db.userforenkey });
db.profile.belongsToMany(db.users, { through: db.userforenkey}); 


module.exports = db