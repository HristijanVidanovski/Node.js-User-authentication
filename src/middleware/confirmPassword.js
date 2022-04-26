const validatePassword = (req, res, next) => {
    
    if(req.body.repeatPasswordFromUser !== req.body.passwordFromUser) {
        req.message='Passwords do not match'
        
        }
     next()

     
        
    
    
    
}

module.exports = validatePassword