const currentPassword        = $("#currentPassword");
const newPassword       = $("#newPassword")
const confirmPassword   = $("#confirmPassword")
const changePasswordBtn = $("#changePasswordBtn")





const changePErrorStore = {
  emptyCurrentP : "Please enter your current Password",
  emptyNewP     : " Please provide new password",
  emptyConfirmP : "Re-enter password",
  passwordInvalid : "Passwords do not match"
}

const changePError = [
  "passwordInvalid",
  "emptyNewP",
  "emptyConfirmP",
  "emptyCurrentP"
]
changePasswordBtn.on('click',function(e){
  e.preventDefault();

  const currentPasswordVal = currentPassword.val();
  const newPasswordVal  = newPassword.val();
  const confirmPasswordVal = confirmPassword.val()

  check(isEmpty(currentPasswordVal),'emptyCurrentP',changePError)

  check(isEmpty(newPasswordVal),'emptyNewP',changePError)
  check(isEmpty(confirmPasswordVal),'emptyConfirmP',changePError)

  check(!isTheSame(newPasswordVal,confirmPasswordVal),'passwordInvalid',changePError)
  $('.form-control').removeClass('border-danger')
  $('.error').html('')



  if(changePError.length > 0){
    changePError.forEach(function(error){
      $('.'+error).html(changePErrorStore[error])
      $('.'+error).siblings('input').addClass('border-danger')
    })
  }else{
    const data = {currentPassword:currentPasswordVal,newPassword:newPasswordVal}

    swal({
      text : "Change Password",
      icon : "info",
      buttons: ["Cancel",'Continue']
    })
    .then(function(isConfirm){
      if(isConfirm){
        $.ajax({
          type:'post',
          url :'/account/settings/change-password',
          data:data
        })
        .done(function(ajaxResult){
          if(ajaxResult.error){
            swal({
              text : "Error occured while changing password",
              icon : "error"
            })
          }else if(ajaxResult.confirmPasswordError){
            $('.emptyCurrentP').html('The password you entered does not match your current password')
            $('.emptyCurrentP').siblings('input').addClass('border-danger')
          }else if(ajaxResult.success){
            swal({
              text:"Password changed changed successfully",
              icon:"success"
            })
            .then(function(){
              window.location.replace('/account/logout')
            })
          }
        })
      }
    })
  }

})
