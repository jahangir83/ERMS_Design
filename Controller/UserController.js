const db = require("../Model/DMBS")

const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const multer = require('multer')
const path = require('path')

const {Op} = require("sequelize")

// create main Model
const Users = db.users
const Profile = db.profile


//user login system
const addUser = async (req, res, next) => {

    // distrac the value
    let { username, password, email} = req.body
    let Errors = validationResult(req).formatWith(err => {return {params: err.param, msg: err.msg}})

    if(!Errors.isEmpty()){
        // Error pass 
        return res.json({
            error: Errors.errors,
            values: req.body.username
        })
    }

    try {
        //User password hasing with brypt
        let hashPass = await bcrypt.hash(password, 11);
        const users = await Users.create({
            username: username,
            email: email,
            password: hashPass
        })
        if(users){
            req.session.isLoggedIn = true
            req.session.user = users
            req.session.save(err => {
            if (err) {
                return next(err)
            }
            
            res.status(200).json(users)
            })
        }
    


    } catch (error) {
        next(error)
        console.log(error);
    }




}
//Login user
const userLogin = async(req, res, next) =>{
    let { email, password} = req.body;

    
    let Errors = validationResult(req).formatWith(err => {return {params: err.param, msg: err.msg}});

    if(!Errors.isEmpty()){
        return res.json({
            error: Errors.errors,
            values: req.body
        })
    }

    try {
        let matchUser = await Users.findOne({
            where:{
                email: email
            }
        })
        if(matchUser){
            let matchPass = await bcrypt.compare(password, matchUser.password)

            if(matchPass){
                req.session.isLoggedIn = true
                req.session.user = matchUser
                req.session.save(err => {
                if (err) {
                    return next(err)
                }
                
                res.json({
                    matchUser
                })
                })
            }else{
                res.json({
                    error:[
                    {param:'password', msg: 'you password not mathch'}, 

                    ]
                   })
            }
        }else{
            res.json("user not math ")
        }

    } catch (error) {
        next(error)
    }

}

//user logout controller start
const logoutControler = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
           return next(err)
        }
       
         return res.redirect('/', )
    })
}
//user logout controller start

// Get user Data
const GetData = async(req, res) =>{
    let user_id = req.params.id
console.log(user_id,"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    let Data = await Users.findOne({
        where: {
            id: user_id,
          },
        include: {
            model: Profile,
           
          },
       
       
    });
    if (Data === null) {
        console.log('Not found!');
      } else {
        // console.log(Data instanceof Data); //true
        // Its primary key is 123
        res.json(Data) 
        console.log("_______________________________________________________________", JSON.parse(Data.profiles[0].education))
      }
}

const update =async (req, res) =>{
    let user_id = req.params.id
    

    let result = await Profile.findOne({
        where:{
            userId: user_id
        }
    })
    if(result != null && result.userId == user_id){
        
        result.set({
            // title: "update title",
            // fullname: "update fullname",
            // email: "update@gmail.com"
        })
        await result.save();
        res.send("sucess")

    }else{
        console.log("No update ")
    }
}

const deleteUser = async (req, res) => {
    let user_id = req.params.id

    let finsAndSelect = await Profile.findOne({
        where:{
            id: user_id
        }
    });
    if(finsAndSelect != null && finsAndSelect.id == user_id){
        
        let value = finsAndSelect;
        await finsAndSelect.destroy();
        res.send("delete sucess", value)

    }else{
        console.log("No delete ")
        res.send("delete unsucess!")

    }


}


const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/uploadImage')
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})
 
const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).any()


module.exports = {
    addUser,
    userLogin,
    upload,
    GetData,
    update,
    deleteUser,
    logoutControler
}