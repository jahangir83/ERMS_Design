

module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("profile", {
        fullname:{
            type: DataTypes.STRING,
            allowNull:false,
        
        },
        fathername:{
            type : DataTypes.STRING,
            allowNull: false
        },
        email: {
            type    : DataTypes.STRING,
            isUnique :true,
            allowNull:false,
            validate:{
                isEmail : true
            }
        },
        address:{
            type: DataTypes.TEXT
        },
        dateOfBrit:{
            type: DataTypes.STRING 
        },
        gender:{
            type: DataTypes.STRING
        },
        phone:{
            type: DataTypes.INTEGER

        }, 
        skill:{
            type: DataTypes.STRING 
        },
        language:{
            type: DataTypes.STRING 
        },
        profilePic:{
            type :DataTypes.STRING,
            
        },
        passportNumber:{
            type: DataTypes.STRING,
            // allowNull: false
        },
        passportImg: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        passportEpireDate:{
            type: DataTypes.STRING,
            // allowNull: false 

        },
        // college:{
        //     type: DataTypes.STRING,
        //     // allowNull: false
        // },
        // // department: { // This fild remove after 
        // //     type: DataTypes.STRING,
        // //     // allowNull : false
        // // },

        // passingYear:{
        //     type: DataTypes.STRING,
        //     // allowNull : false
            
        // },
        // board:{
        //     type: DataTypes.STRING,
        //     // allowNull : false
        // },
        // result:{
        //     type: DataTypes.STRING,
        //     // allowNull : false
        // },
        education:{
            type: DataTypes.TEXT,
            get: function(){
                console.log(JSON.parse(this.getDataValue('education')));
                return JSON.parse(this.getDataValue('education'));
            },
            set: function(education){
                return this.setDataValue('education', JSON.stringify(education))
            }
        } 

    })

    return Profile;
}