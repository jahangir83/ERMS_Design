

const db = require('../Model/DMBS')
const profile = db.profile
const user = db.users
const {body} = require('express-validator')

const profielValidator = [

   

    body('fullname')
        .not()
        .isEmpty().withMessage("Please Enter your name")
        .isLength({max: 50}).withMessage("Name is just 50 caracter number")
        .trim()
    ,
    body('fathername')
        .not()
        .isEmpty().withMessage("Please Enter your father Name")
        .isLength({max: 50}).withMessage("Name is just 50 caracter number")
        .trim()
    ,
    body('date')
        .not()
        .isEmpty().withMessage("Please Enter your Date of Birth")
    ,

    body('address')
        .trim()
        .not()
        .isEmpty().withMessage("Please Enter your Address")
        
    ,
    body("phone")
        .not()
        .isEmpty().withMessage('plase Enter your Phone number')
        .isNumeric().withMessage("Only number applycable")
   ,
   body('language')
        .not()
        .isEmpty()
        .withMessage("please Write the language you know ")
    ,
    body("country")
        .not()
        .isEmpty().withMessage("Please select your gender")
        .custom(async country => {
            if(country === "Choose..."){
                return Promise.reject("Please Select your country")
            }
            return true;
        })
    ,
    body("skill")
        .not()
        .isEmpty().withMessage("Please enter skill")
    ,
    body("gender")
        .not()
        .isEmpty().withMessage("Please select your gender")
        .custom(async gender => {
            if(gender === "Choose..."){
                return Promise.reject("Please Select your gender")
            }
            return true;
        })
    ,
    body("passportNumber")
        .custom(async (passportNumber) => {
            if(passportNumber === undefined || passportNumber === null){
                return true
            }else{
                if(passportNumber.length > 5){
                    return true;
                }else{
                    return Promise.reject('Please Enter your passport number')
                }
            }
        })
       
    ,
    body("passportEpireDate")
    .custom(async (passportEpireDate) => {
        if(passportEpireDate === undefined || passportEpireDate === null){
            return true
        }else{
            if(passportEpireDate.length > 5){
                return true;
            }else{
                return Promise.reject('please Enter your passport Expirence')
            }
        }
    })
    ,

   /* Education validator */
    body('college')
    .trim()
    .not()
    .isEmpty().withMessage("Please Enter your college")
    ,

    body('passingYear')
    .trim()
    .not()
    .isEmpty().withMessage("Please Enter your passingYear")
    
    ,
    body('board')
    .trim()
    .not()
    .isEmpty().withMessage("Please Enter your board")
    
    ,
    body('result')
    .trim()
    .not()
    .isEmpty().withMessage("Please Enter your result")
    
    ,

]

module.exports = profielValidator