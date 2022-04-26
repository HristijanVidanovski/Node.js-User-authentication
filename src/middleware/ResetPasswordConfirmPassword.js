const validatePassword = (req, res, next) => {
    if(req.body.newPasswordReset !== req.body.confirmPasswordReset) {
        req.message='Passwords do not match'
        }
     next()

     
        
    
    
    
}

module.exports = validatePassword