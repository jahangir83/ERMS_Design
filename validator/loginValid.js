const db = require('../Model/DMBS')
const { body } = require('express-validator')
let User = db.users
const loginValid = [
    body('email')
        .not()
        .isEmpty()
        .isEmail().withMessage('please provide your valid email')
        .custom(async email => {
            let user = await User.findOne({
                where:{
                    email: email
                },
            })
            if (!user) {
                throw new Error("User Not Found")
            }
            return true
        }),
    body('password')
        .not().isEmpty()
        .withMessage('Please provide your password')    
]

module.exports = loginValid