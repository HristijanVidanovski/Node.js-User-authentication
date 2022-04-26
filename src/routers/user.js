const express = require('express')
const hbs = require('hbs')
const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')
const User = require('../models/users')
const checkConfirmPassword = require('../middleware/confirmPassword')
var multer  = require('multer')
const uploadProfileImage = require('../middleware/uploadProfileImage')
const ResetPasswordConfirmPassword = require('../middleware/ResetPasswordConfirmPassword')
const auth = require('../middleware/auth')

const authResetPassword = require('../middleware/authResetPassword')
const authGoogle = require('../middleware/authGoogle')
const { check, validationResult } = require('express-validator')
const forgotPasswordSendMail = require('../emails/forgotPasswordSendEmail')

const router =  new express.Router() // create new route
//620cb925cdee6a1f988bffc6

router.post('/uploadProfileImage',auth, uploadProfileImage.single('inpFile'), function (req, res) {

   const user = req.user
   user.profileImageName=req.file.filename
   user.save() 
   res.json({profileImageFileName: user.profileImageName, redirect_path:"/profilePage" }) 
 })

router.post('/forgotPasswordReset/:token',ResetPasswordConfirmPassword, authResetPassword, async (req, res) => {
   try {
      if(req.message){
         return res.json({message:req.message })
      }
      const user = req.user
      user.passwordFromUser=req.body.newPasswordReset
      //user.tokens=[]
      await user.save()   
     
      res.json({message:'Password has been successfully changed' }) 
   } catch (e) {  
      console.log(e) 
      return res.status(500).json({message: 'Internal Server Error'})
   }
  })

router.post('/forgotPasswordEmail', async (req, res) => {
   try {
      const forgotPasswordFindUserByEmail = await User.findByEmail(req.body.emailResetPassword)//find existing user
         if (!forgotPasswordFindUserByEmail) {
            throw new Error('user not found')
         }
      const tokenSendMailResetPassword = await forgotPasswordFindUserByEmail.generateAuthToken()
      const link =`http://localhost:3000/forgotPasswordReset?token=${tokenSendMailResetPassword}`
      forgotPasswordSendMail(forgotPasswordFindUserByEmail.emailFromUser,'ResetPasswordLink', link) 
      res.json({message:'Reset password link has been sent to your email' })    
   } catch (e) {   
      return res.status(500).json({message: 'Internal Server Error'})
   }
  })





router.post('/signInGoogle',authGoogle, async (req, res) => {

   req.message 
   try {
            const user = await User.findByEmail(req.user.email)//find existing user
            if (req.message) { //if found, generate token and send data to client
               //console.log('error gugl')
               res.json({message: req.message })
            } else if(user) {//if user is found in db genratetoken
               const token = await user.generateAuthToken()
               console.log('email exists in db, generate token')
               res.json({ token, email: req.user.email, redirect_path:"/profilePage", message: 'User exist and signed in with Google' })
            } else { //if not found, create new user, generate token, save  and send data to client.Get data from google for user.
               const user = new User({emailFromUser:req.user.email})
               
               const token = await user.generateAuthToken()
               await user.save()  
             
               res.json({ token, email: req.user.email, redirect_path:"/profilePage", message: 'User not exist, saved and signedin with Google' })
            }
   } catch (e) {  
         return res.status(500).json({message: 'Internal Server Error'})
   }
})


router.post('/signUp',checkConfirmPassword, async  (req, res)=> {
   try {
      const Exsitinguser = await User.findByEmail(req.body.emailFromUser)//find existing user
     
      if (req.message) {
            res.json({message: req.message })//password match middleware
       } else if (!Exsitinguser) { //create new user
            const user = new User(req.body)
            const token = await user.generateAuthToken()
           // console.log(token)
            await user.save()   
            res.json({ token, email: req.body.email, redirect_path:"/profilePage",message: 'User is not found. Register and save' }) 
       } else if (!Exsitinguser.passwordFromUser) {//User with no password->signin with google
            const token = await Exsitinguser.generateAuthToken()
            Exsitinguser.passwordFromUser=req.body.passwordFromUser
            await Exsitinguser.save() 
            res.json({ token, email: Exsitinguser.emailFromUser, redirect_path:"/profilePage", message: 'User is google. Logedin' })  
       } else {
            res.json({message: 'User already exist' }) 
       }
   } catch (e) {
      console.log(e)
      return res.status(500).json({message: 'Internal Server Error'})
   }   
 })



     router.post('/signIn', async (req, res) => {
      try {
         const user = await User.findByCredentials(req.body.emailFromUser, req.body.passwordFromUser)
         const token = await user.generateAuthToken()
         
         res.json({ user, token, redirect_path: "/profilePage" })      
      } catch (e) {   
         res.json({error:'Email or password incorrect' }) 
         //res.status(400).send(e)
         
      }
     })

     router.post('/profile',auth, async (req, res) => {    
      try {
         //res.redirect("/SignInPage")
         
         res.json({email: req.user.emailFromUser, profileImageFileName: req.user.profileImageName})
      } catch (e) {
         //console.log(e)
         
      }
      
     })


     //logout user
    
      try {
        req.user.tokens = req.user.tokens.filter((token)=> {
           return token.token != req.token
        })
        await req.user.save()
        res.json({redirect_path:"/signIn"})
      } catch (e) {
         
      }
     })
 module.exports = router