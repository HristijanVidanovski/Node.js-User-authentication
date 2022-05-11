const User = require('../models/users')
const authResetPassword = async (req, res, next) => {
  const jwt = require('jsonwebtoken')
  const token = req.params.token
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET) 
      const user = await User.findOne({_id:decoded.user_id, 'tokens.token': token})//find user by email
      if(!user){throw new Error}
      req.user = user 
    } catch (err) {
      req.message = 'Error reset password. Try again' 
    }
    return next()
  }
  module.exports = authResetPassword