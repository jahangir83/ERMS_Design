const Router = require('express').Router()


const profileValid = require("../validator/profileValidator")

const {isAuthtenticat} = require("../Middleware/authMiddleware")
const {
addProfile,
generalProfileCheck,
getProfile,
getProfileController,

} = require('../Controller/ProfileController')
const {
upload
    
    } = require('../Controller/UserController')


Router.get('/check1',isAuthtenticat, )

// Router.get('/getprofile', getProfile )
 
Router.post("/addprofile", isAuthtenticat,upload,  profileValid, addProfile)
Router.get("/getprofile", isAuthtenticat, getProfileController, addProfile)



module.exports = Router
