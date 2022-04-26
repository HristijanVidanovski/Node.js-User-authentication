process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

var nodemailer = require('nodemailer');

const forgotPasswordSendMail = (email, subject, text)=> {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vidanovskihristijan@gmail.com',
          pass: 'hwfmhpiqpcleyilc',
          
        }
      });
      
      var mailOptions = {
        from: 'vidanovskihristijan@gmail.com',
        to: email,
        subject,
        text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info);
        }
      })
      
      
      
}

module.exports = forgotPasswordSendMail





