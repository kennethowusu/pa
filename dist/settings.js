const accountNameSubmit = $("#accountNameSubmit");
let firstname = $("#firstname")
let lastname  = $("#lastname")
let accountError = $('.accountError')
let changePasswordError = $('.changePasswordError')

const changePasswordSubmit = $("#changePasswordSubmit")
let   password = $("#password");
let   newPassword = $("#newPassword")
let   confirmPassword = $("#confirmPassword")


accountNameSubmit.click(function(e){
  e.preventDefault();

  let firstnameVal = firstname.val();
  let lastnameVal = lastname.val();


  accountError.text('').removeClass('alert').removeClass('alert-danger')
  if(firstnameVal.length == 0){
    accountError.text('Enter firstname').addClass('alert').addClass('alert-danger')
  }
  else if(lastnameVal.length == 0){
    accountError.text('Enter lastname').addClass('alert').addClass('alert-danger')
  }

  else{

    $.ajax({
      type:'post',
      url:'/user/settings/accountname',
      data:{firstname:firstnameVal,lastname:lastnameVal}
    })
    .done(function(result){
      if(result.success){
        accountError.addClass('alert alert-success').text(result.success)
      }
    })
  }

})


changePasswordSubmit.click(function(e){
  e.preventDefault();
  let passwordVal = password.val()
  let newPasswordVal = newPassword.val();
  let confirmPasswordVal = confirmPassword.val()

  changePasswordError.text('').removeClass('alert').removeClass('alert-danger')

  if(passwordVal.length == 0){
    changePasswordError.text('Enter current password').addClass('alert').addClass('alert-danger')
  }else if(newPasswordVal == 0){
    changePasswordError.text('Enter new password').addClass('alert').addClass('alert-danger')
  }
  else if(newPasswordVal !== confirmPasswordVal ){
    changePasswordError.text('Passwords do not match').addClass('alert').addClass('alert-danger')
  }

  else{
    $.ajax({
      type:'post',
      url:'/user/settings/password',
      data:{password:passwordVal,newPassword:newPasswordVal,confirmPassword:confirmPasswordVal}
    })
    .done(function(result){
      if(result.error){
          changePasswordError.addClass('alert alert-danger').text(result.error)
      }
      if(result.success){
        changePasswordError.addClass('alert alert-success').text(result.success)
        password.val('')
        newPassword.val('')
        confirmPassword.val('')
      }
    })
  }



})
