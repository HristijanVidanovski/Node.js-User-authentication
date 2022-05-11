const multer  = require('multer')
const path = require('path');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/img')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() +'-'+ file.originalname)
        }
    })
    const uploadProfileImage = multer({ storage: storage })
module.exports = uploadProfileImage


