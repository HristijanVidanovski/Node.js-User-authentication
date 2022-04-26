const multer  = require('multer')
const path = require('path');


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/img')
        
        },
        filename: function (req, file, cb) {
         
          cb(null, Date.now() +'-'+ file.originalname)
          //path.extname(file.originalname) - file extension.jpg
          //console.log(file)
        }
    })
    
    const uploadProfileImage = multer({ storage: storage })


//console.log(uploadProfileImage)
module.exports = uploadProfileImage


