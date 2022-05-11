const User = require('../models/users')
const auth = async (req, res, next) => {
  const jwt = require('jsonwebtoken')
  const token = req.header("Bearer")// token from client auth
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET) 
      const user = await User.findOne({_id:decoded.user_id, 'tokens.token': token})//find user by email
      req.user = user
      req.token = token
    } catch (err) {
      res.message = 'Error login'
    }
    return next()
  }
  module.exports = auth