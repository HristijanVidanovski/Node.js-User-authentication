const express = require('express')
const hbs = require('hbs')
const path = require('path') 

//const auth = require('..src/middleware/auth')
const app = express()
const port = process.env.PORT
require('./db/mongoose')// ne zema nisto samo go run fajlot-connect database


const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const userRouter = require('./routers/user')
app.use(userRouter) // use user router


//render pages
app.get('/forgotPasswordReset', (req, res) => {// route do about.hbs
    res.render('forgotPasswordReset')
})

app.get('/signUpPage', (req, res) => {// route do about.hbs
    res.render('signUpPage')  
})

app.get('/signIn', (req, res) => {// route do about.hbs
    res.render('signInPage')
})
   
app.get('/profilePage', (req, res) => {// route do about.hbs
    res.render('profilePage')
})

app.get('/forgotPasswordEmail', (req, res) => {// route do about.hbs
   res.render('forgotPasswordEmail')
})
      



app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + port)
})










