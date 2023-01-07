/**
 * Title : Node js file System module define
 * Description: User image or any unwanted file or garbeg and Add file etc
 * Author: MD jahangir alma 
 * Date: 04/11/2022
 */

/* module require or import */
const fs = require('fs')

const path = require("path")

//Remove function 
//Auguments = path , filename and callback
module.exports.remove =  (filename) => {

    // setTimeout(() => {
        fs.unlink(path.join(__dirname, `../public/uploadimage/${filename}`), (err) => {
            if(err){
                console.log("File not remove ", err)
                
            }else{
                console.log("File successfully removed");
            }
        })
    // },2000)
    
}