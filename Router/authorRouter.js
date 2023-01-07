const Router  = require('express').Router();

const {
    addUser,
     upload ,
     userLogin,
     logoutControler,
     GetData

} = require('../Controller/UserController')
const signupValid = require('../validator/signupValid')
const loginValid = require('../validator/loginValid')

const {isAuthtenticat} = require("../Middleware/authMiddleware")



Router.post('/signup', signupValid, addUser)
Router.post('/login', loginValid, userLogin)
Router.get('/logout', logoutControler)

Router.get('/get/:id', GetData)



module.exports = Router