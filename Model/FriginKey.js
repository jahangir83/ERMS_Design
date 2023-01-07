
const db = require('./DMBS')
const profile =  db.profile
const user = db.users
const education = db.Education
const passport = db.Userpassport


module.exports = (sequelize, DataTypes) => {
    const useridentifyID = sequelize.define('user_profile', {
        userId: {
          type: DataTypes.INTEGER,
          references: user, // 'Movies' would also work
          referencesKey: 'id'
          
        },
        profileId: {
          type: DataTypes.INTEGER,
          references: profile,
          referencesKey : 'id'
        },
        educationId:{
          type: DataTypes.INTEGER,
          references: education,
            referencesKey : 'id'
          
        },
        passportId:{
          type: DataTypes.INTEGER,
          references:passport,
          referencesKey : 'id'
          
        }
      });

      return useridentifyID
}