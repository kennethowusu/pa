
//templates
const verificationEmailLinkTemplate  = require('./verificationEmailLinkTemplate')
'use strict';
const nodemailer = require('nodemailer');
//require mail Template


//require dotenv
require('dotenv').config();





// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user:'support@primeaxisllc.com', // generated ethereal user
        pass: 'Prim#axim22' // generated ethereal password
    }
});



// send mail with defined transport object
module.exports.sendMail = function(mailOptions){
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         var fs = require('fs');
         var wstream = fs.createWriteStream('mailError.txt');
         wstream.write(error.response.toString());
         wstream.end();

         return;
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}



//Send Reset Code
module.exports.sendResetCode = function(resetCode){
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Glammycare " <support@primeaxisllc.com>', // sender address
          to: 'consultkenneth@gmail.com', // list of receivers
          subject:' Reset Password', // Subject line
          text: 'Hello world?', // plain text body
          html: '' // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });

}

module.exports.sendEmailVerificationLink = (name,email,verificationLink)=>{
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: `${email}`, // list of receivers
          subject:'Email Verification', // Subject line
          text: 'Hello world?', // plain text body
          html: verificationEmailLinkTemplate(name,verificationLink) // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });
}




module.exports.sendPasswordResetLink = (email,passwordResetLink)=>{
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: `${email}`, // list of receivers
          subject:'Email Verification', // Subject line
          text: 'Hello world?', // plain text body
          html: '' // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });
}
