
var user = require('../functions/userFunctions');

//generate resetCode



module.exports.generateResetCodeTemplate = (resetCode)=>{

 return   `<div style="font-family:'Arial'">

    <h1 style="font-family:lato">It's easy! Reset your password now.</h1>
    <h4>Hello Kenneth,</h4><br>
    <p>Please enter the following verification code on our website or app, and you'll be able to reset your password.</p>
    <b>${resetCode}</b>
      <p>Sincerely,<br>
    </p>-GlammyCare Customer Care Team</p>

  </div>`;
}

module.exports.sendDepositMail = ()=>{

}
module.exports.sendEmailVerificationLink = (verificationLink)=>{
  return `<div>
           Please click on the following link to verify your email <a href='${verificationLink}'>${verificationLink}</a>
          </div>
  `
}

module.exports.passwordResetLink = (passwordResetLink)=>{
  return `<div>
           This is your link <a href='${passwordResetLink}'>${passwordResetLink}</a>
          </div>
  `
}

module.exports.sendCryptoPayment = (email,type,address,transaction_id)=>{
  return `<div>
           <p>Email:  ${email}<p>
           <p>Cryto Currency Type:  ${type}<p>
           <p>Crypto Currency Wallet Address:  ${address}<p>
           <p>transaction Id:   ${transaction_id}<p>
          </div>
  `
}
