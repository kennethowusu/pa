const email = $('#email');
const password = $("#password");
const loginBtn = $("#loginBtn");


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
