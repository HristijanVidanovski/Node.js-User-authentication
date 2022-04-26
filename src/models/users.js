// models/user.js
var mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var UserSchema = new mongoose.Schema({

    emailFromUser: {
        type: String,
       
        lowercase: true,
        requred: true
},
passwordFromUser: {
    type: String,
  
},
profileImageName: {
type: String,
default:"avatar.jpg"
},
tokens: [
  {
    token: {
      type: String,
      required: true
    }
  }
]
})




UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('passwordFromUser')){ 
      user.passwordFromUser = await bcrypt.hash(user.passwordFromUser, 10)
    }
  
    next()
  })

 

  UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token =  jwt.sign({ user_id: user._id}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
  }

  /*
  UserSchema.methods.generateHashedTokenForgotPassword = async function () {
    const user = this
    if (user.tokens) {user.tokens=[]}
    const token = await jwt.sign({ user_id: user._id}, process.env.JWT_SECRET,{expiresIn: '1h'})
    //const hashedTokenForgotPassword = await bcrypt.hash(token, 10)
    user.tokens = await user.tokens.concat({token})
    await user.save()
    return token
  }
*/
 
  //find user by email and password for login
  UserSchema.statics.findByCredentials = async function (email, password){     
    const existingUser = await User.findOne({emailFromUser: email})//find user by email
    if(!existingUser){
       throw new Error('Incorrect email')
    }
    const isMatch = await bcrypt.compare(password, existingUser.passwordFromUser)

    if(!isMatch){
       throw new Error('Incorrect password')
    }
    return existingUser
 }

 UserSchema.statics.findByIdandPassword = async function (id, password){     
  const existingUser = await User.findOne({_id: id})//find user by email
  if(!existingUser){
     throw new Error('user not found')
  }
  const isMatch = await bcrypt.compare(password, existingUser.passwordFromUser)

  if(!isMatch){
     throw new Error('Incorrect password')
  }

  
  return existingUser
}


  //find user by email  for google login
  UserSchema.statics.findByEmail = async function (email){     
    const existingUser = await User.findOne({emailFromUser: email})//find user by email
    if(!existingUser){
      return undefined
    }
    return existingUser
 }
  

 

var User = mongoose.model('User', UserSchema)
module.exports =  User