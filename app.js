/**
 * Titile : This is application main file 
 * Author: MD jahangir alam
 * Description: 
 * Date: 
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

// middleware 

const setupMiddleware = require('./Middleware/Middleware')
setupMiddleware(app)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 
 

//TODO: 
//Views engine setup
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(cors())
//Static folder 
app.use('/public', express.static( 'public'))
// // routers
const setupRouter = require('./Router/Router')

setupRouter(app)



const {addUser, upload, GetData, update , deleteUser} = require('./Controller/UserController')
const {addProfile} = require('./Controller/ProfileController')



app.post('/addProfile/:id', upload, addProfile)


app.get('/getUser/:id', GetData)
app.put('/getUser/:id', update)
app.delete('/getUser/:id', deleteUser)
//port

const PORT = process.env.PORT || 9090

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})