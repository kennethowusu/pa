
'use strict';
const nodemailer = require('nodemailer');
//require mail Template
var template = require('./mailTemplate');

//require dotenv
require('dotenv').config();





// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user:'support@primeaxisllc.com', // generated ethereal user
        pass: 'Prim#daxim22' // generated ethereal password
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
          subject:'GlammyCare Reset Password', // Subject line
          text: 'Hello world?', // plain text body
          html: template.generateResetCodeTemplate(resetCode) // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });

}

//Send Deposit Notification
module.exports.sendDepositMail = function(){
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: 'consultkenneth@gmail.com', // list of receivers
          subject:'Depsit', // Subject line
          text: 'Hello world?', // plain text body
          html: template.sendDepositMail() // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });
}


module.exports.sendSettlementFailedMessage = function(){
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: 'consultkenneth@gmail.com', // list of receivers
          subject:'Depsit', // Subject line
          text: 'Hello world?', // plain text body
          html: 'sorry we could not charge your credit card' // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });
}


module.exports.sendEmailVerificationLink = (email,verificationLink)=>{
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: `${email}`, // list of receivers
          subject:'Email Verification', // Subject line
          text: 'Hello world?', // plain text body
          html: template.sendEmailVerificationLink(verificationLink) // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });
}

//send crypto payment
module.exports.sendCryptoPayment = (email,type,address,transaction_id)=>{
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: `informkenneth@gmail.com`, // list of receivers
          subject:'New Crypto Payment Request', // Subject line
          text: 'Hello world?', // plain text body
          html: template.sendCryptoPayment(email,type,address,transaction_id) // html body
      };

        //sendMail
        transporter.sendMail(mailOptions, (error, info) => {
          return res.send(info);
        });
  });
}

//send crypto payment
module.exports.topupCryptoPayment = (email,type,address,transaction_id,amount)=>{
  nodemailer.createTestAccount((err, account) => {
      // setup email data with unicode symbols
      const mailOptions = {
          from: '"Prime Axis LLC " <support@primeaxisllc.com>', // sender address
          to: `informkenneth@gmail.com`, // list of receivers
          subject:'Top Up Crypto Payment Request(Principal Top Up)', // Subject line
          text: 'Hello world?', // plain text body
          html: template.topupCryptoPayment(email,type,address,transaction_id,amount) // html body
      };

        //sendMail
        transporter.sendMail(mailOptions, (error, info) => {
          return res.send(info);
        });
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
          html: template.passwordResetLink(passwordResetLink) // html body
      };

      //sendMail
      module.exports.sendMail(mailOptions);
  });
}
