
$.ajax({
  type:'get',
  url:'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=34fa603f537b4eeb82d4c6dea3ef2aac',

})
.done(function(ajaxResult){
  const latestNews = ajaxResult.articles.slice(0, 6);


latestNews.forEach(function(cryptoNews){
 var html =    ` <div class="col-md-4 ">
        <div class="blog-entry">
          <a href="${cryptoNews.url}" target="_blank" class="block-20" style="background-image: url(${cryptoNews.urlToImage})">
          </a>
          <div class="text d-flex py-4">
            <div class="meta mb-3">
              <div><a>kkks</a></div>
              <div><a>${cryptoNews.author}</a></div>

            </div>
            <div class="desc pl-3">
              <h3 class="heading"><a href="${cryptoNews.url}" target="_blank">${cryptoNews.title}</a></h3>
            </div>
          </div>
        </div>
      </div>`;

      $("#newsContainer").append(html)

    })
  })



const email = $('#email');
const password = $("#password");
const firstname = $("#firstname")
const lastname = $("#lastname")
const country  = $("#country")
const confirmPassword = $("#confirmPassword")
const loginBtn = $("#loginBtn");
const registerBtn = $("#registerBtn")

const loginErrorStore = {
  emailInvalidErr : "Please provide a valid Email Address",
  emailEmptyErr   : "Please provide an email",
  passwordEmptyErr: "Please provide a passord"
}

const loginError = [
  "emailInvalidErr",
  'emailEmptyErr',
  'passwordEmptyErr'
]

loginBtn.on('click',function(e){
  $('.error').html('')
  $('.form-control').removeClass('border-danger')
  const emailVal = email.val();
  const passwordVal = password.val()
  e.preventDefault();

  if(emailVal.length == '0'){
    addToErrors('emailEmptyErr',loginError)
  }else{
    removeFromErrors('emailEmptyErr',loginError)
  }

  if(!isEmail(emailVal)){
    addToErrors('emailInvalidErr',loginError)
  }else{
    removeFromErrors('emailInvalidErr',loginError)
  }

  if(passwordVal.length == '0'){
    addToErrors('passwordEmptyErr',loginError)
  }else{
    removeFromErrors('passwordEmptyErr',loginError)
  }


  if(loginError.length > 0){
    loginError.forEach(function(error){
      $("."+error).html(loginErrorStore[error])
      $('.'+error).siblings('.form-control').addClass('border-danger')
    })
  }else{
    const data = {email:emailVal,password:passwordVal}
    $.ajax({
      type:'post',
      url:'/login',
      data:data
    })
    .done(function(ajaxResult){
      if(ajaxResult.error){
        $(".loginError").html(ajaxResult.error)

      }else if(ajaxResult.success){
        $(e.target).css('opacity','0.5');
        window.location.replace('/account/summary')
      }
    })
  }
})


//==========for Register ===========//



const registerErrorStore = {
  firstnameEmptyErr:"Please provide firstname",
  lastnameEmptyErr:"Please provide lastname",
  countryEmptyErr :"Please provide Country",
  emailInvalidErr : "Please provide a valid Email Address",
  emailEmptyErr   : "Please provide an email",
  passwordEmptyErr: "Please provide a passord",
  confirmPasswordEmptyErr:"Please confirm password",
  passwordInvalidErr:"Passwords do not match"
}

const registerError = [
  "firstnameEmptyErr",
  "lastnameEmptyErr",
  "countryEmptyErr" ,
  "emailInvalidErr",
  'emailEmptyErr',
  'passwordEmptyErr',
  "passwordInvalidErr",
  "confirmPasswordEmptyErr"
]
registerBtn.on('click',function(e){
  e.preventDefault();
  $('.error').html('')
  $('.form-control').removeClass('border-danger')

  const firstnameVal = firstname.val()
  const lastnameVal     = lastname.val()
  const emailVal = email.val();
  const countryVal = country.find(':selected').val()
  const passwordVal = password.val()
  const confirmPasswordVal = confirmPassword.val()



  if(firstnameVal.length == '0'){
    addToErrors('firstnameEmptyErr',registerError)
  }else{
    removeFromErrors('firstnameEmptyErr',registerError)
  }

  if(lastnameVal.length == '0'){
    addToErrors('lastnameEmptyErr',registerError)
  }else{
    removeFromErrors('lastnameEmptyErr',registerError)
  }

  if(countryVal.length == '0'){
    addToErrors('countryEmptyErr',registerError)
  }else{
    removeFromErrors('countryEmptyErr',registerError)
  }
  if(emailVal.length == '0'){
    addToErrors('emailEmptyErr',registerError)
  }else{
    removeFromErrors('emailEmptyErr',registerError)
  }

  if(!isEmail(emailVal)){
    addToErrors('emailInvalidErr',registerError)
  }else{
    removeFromErrors('emailInvalidErr',registerError)
  }

  if(passwordVal.length == '0'){
    addToErrors('passwordEmptyErr',registerError)
  }else{
    removeFromErrors('passwordEmptyErr',registerError)
  }
  if(confirmPasswordVal.length == '0'){
    addToErrors('confirmPasswordEmptyErr',registerError)
  }else{
    removeFromErrors('confirmPasswordEmptyErr',registerError)
  }

  if(passwordVal !== confirmPasswordVal  ){
    addToErrors('passwordInvalidErr',registerError)
  }else{
    removeFromErrors('passwordInvalidErr',registerError)
  }

  if(registerError.length > 0){
    registerError.forEach(function(error){
      $("."+error).html(registerErrorStore[error])
      $('.'+error).siblings('.form-control').addClass('border-danger')
    })
  }else{
    const data = {
      firstname:firstnameVal,
      lastname:lastnameVal,
      email:emailVal,
      country:countryVal,
      password:passwordVal,
      confirmPassword:confirmPasswordVal
    }

    $.ajax({
      type:'post',
      url:'/register',
      data:data
    })
    .done(function(ajaxResult){
      if(ajaxResult.error){
        $(".registerError").html(ajaxResult.error)

      }else if(ajaxResult.success){
        $(e.target).css('opacity','0.5');
        window.location.replace('/account/summary')
      }
    })
  }
})





const resendConfirmationLink = $("#resendConfirmationLink");
resendConfirmationLink.on('click',function(e){
  e.preventDefault()
  $.ajax({
    type:'post',
    url :'/account/confirmation/send-confirmation-link'
  })
})



//===============for resetting password==============//
const forgotpassword = $("#forgotpassword")
forgotpassword.on('click',function(e){
  e.preventDefault();
  $("#resetPasswordModal").modal()
})
