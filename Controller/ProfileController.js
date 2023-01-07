const db = require("../Model/DMBS")
const {validationResult} = require('express-validator')
const Profiles = db.profile
const User = db.users
const user_profile = db.userforenkey
const path = require("path")
const {remove} = require('../utilitis/fileSystem')

// Get profile page controler
const getProfileController = async (req, res, next) => {
   
    try {
        if(!req.session.isLoggedIn){ 
            res.redirec('/')
        }else{
            let haveProfile = await user_profile.findOne( 
                {
                where: { 
                    userId : req.user.id   
                },
                
            });
            if(haveProfile){
                haveProfile = await Profiles.findByPk(haveProfile.profileId)
                res.render('pages/userDesbord/userProfileEdite.ejs', {
                    title: 'Edit Your Profile',
                    error: {},
                    // flashMessage: Flash.getMessage(req),
                    profile: haveProfile
                })
                
            }else{
                res.render('pages/userDesbord/userCreateProfile.ejs')
            } 
        }
        //
        
    } catch (error) {
        next(error) 
    }
}


const addProfile = async(req, res, next) =>{

    let profilePic = "profile pic not found";
    let passportImg = "Passport Photo not found"
    let profilepicname;
    let passportPicName;
    if(req.files){
        for(let i = 0; i < req.files.length; i++){
            switch (req.files[i].fieldname) {
                case "profilePic":
                    profilePic = req.files[i].path
                    profilepicname = req.files[i].filename
                    break;
                case "passport":
                    passportImg = req.files[i].path
                    break;
            
                default:
                    break;
            }
        }
    }

    try {

        // let educationJson = {
        //      college: req.body.college,
        //     // department: req.body.department,
        //     passingYear: req.body.passingYear,
        //     board: req.body.board,
        //     result: req.body.result,
        // }
        let user_id = req.user.id
        let info = {
            profilePic: profilePic ,
            passportImg: passportImg,
            fullname: req.body.fullname,
            fathername : req.body.fathername,
            email : req.body.email,
            dateOfBrit: req.body.date,
            address : req.body.address,
            phone : req.body.phone,
            language: req.body.language,
            country: req.body.country,
            skill: req.body.skill,
            gender: req.body.gender,
            passportNumber: req.body.passportNumber,
            passportEpireDate: req.body.passportEpireDate, 
            college: req.body.college,
            passingYear: req.body.passingYear,
            board: req.body.board,
            result: req.body.result,

            // education: JSON.stringify(educationJson)
            
        }    
        let Errors = validationResult(req).formatWith(err => {return {params: err.param, msg: err.msg}})
    
        if(!Errors.isEmpty()){
        console.log("------------------------------------------------------df---", info);

            if(req.files){

                remove(profilepicname)
            }
            return res.json({
                error: Errors.errors,
                values: req.body.username
            })
        }
    
        try {
            const haveUser = await User.findByPk(user_id)
            if(haveUser){
                const profile = await Profiles.create(info)
                haveUser.addProfiles(profile)
                res.status(200).json(haveUser)
                
     
    
            }else{
                console.log("______________Error profile_________________________ ");
            }
        } catch (error) {
            next(error)
        }
        
    } catch (error) {
        next(error)
    }
    
    
}

const getProfile = async (req, res, next) => {
// console.log("K_________________________________________________________", req.user.id)
    // const result = await User.findOne({
    //     where: { id: req.user.id },
    //     include: Profiles
    //   });
    
    

    let data = await User.findOne({
        where: { id: req.user.id },
        include: Profiles
      });

    if(data){
        
        res.json(data)
    }else{
        console.log("Your data not found");
    }


}

module.exports = {
    addProfile,
    getProfile,
    getProfileController
}