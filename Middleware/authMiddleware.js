
const  db = require("../Model/DMBS")
const User = db.users;


exports.bindUserWithRequest =  () => {
    return async (req, res, next) => {
        // console.log("______ home res.locals_____________",res.locals.user , "__________ res.session--", req.session.user.id)
        if (!req.session.isLoggedIn) {
            return next()
        }

        try {
            // console.log("bindwith user ------------------------------------------------------------------------------------------------------------------", req.session.user._id, "---------------------------------------------------");
            let user = await User.findByPk(req.session.user.id)
            
            req.user = user

            next()
           
        } catch (e) {
            console.log(e)
            next(e)
       }
    }
}
//
exports.isAuthtenticat = (req, res, next) => {
    
    if (!req.session.isLoggedIn) {

        res.render('pages/messagepage.ejs')
    }
    next()
}

exports.isUnAutenticate = (req, res, next) => {
     if (req.session.isLoggedIn) {
        res.redirect("/deshbord")
    } 
    next()
}