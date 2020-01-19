





//=======================sidebar====================//
let header__burger = $('.header__burger');
let sidebarOuter   = $('.sidebar--outer');
header__burger.click(function(){
  openSidebar();
})

sidebarOuter.click(function(){
 openSidebar();

})

function openSidebar(){
  $('.sidebar').toggleClass('opened')
  $('.sidebar--outer__background').toggleClass('opened')
  $('.close').toggleClass('opened')
}



//====================overlay======================//
let overlayBtn = $('.overlay-btn')

overlayBtn.click(function(e){
  const target = $(this)
  overlayTarget = target.attr('overlay-target')
  showOverlay(overlayTarget)
})

function showOverlay(overlayId){
  $('.overlay'+'#'+overlayId).toggleClass('active')
  $('body').toggleClass('active')
}

let overlayClose = $('.overlay--btn');
overlayClose.click(function(e){
  let target = $(this)
  target.parents('.overlay').removeClass('active')
  $("body").removeClass('active')
})


//===========================dropdown==================//



  function DropDown(el) {
				this.dd = el;
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dd.on('click', function(event){
						$(this).toggleClass('active');
						event.stopPropagation();
					});
				}
			}

			$(function() {

				var dd = new DropDown( $('#dd') );

				$(document).click(function() {
					// all dropdowns
					$('.wrapper-dropdown-2').removeClass('active');
				});

			});


//============================================withdraw=========================//


function isEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


$('.isMoney,.isNumber').keypress(function(key) {
       if(key.charCode < 48 || key.charCode > 57) return false;
   });




$('.isMoney').on('focusout',function(e){

const target = $(e.target);
const targetValue = parseFloat(Math.abs(target.val()))
target.val(targetValue.toFixed(2))

})







 function isEmpty(fieldVal){
  if(fieldVal.length == '0'){
    return true
  }else{
    return false;
  }
}

function isTheSame(firstValue,secondValue){
  if(firstValue === secondValue){
    return true;
  }else{
    return false;
  }
}



const withdrawBtn = $("#withdrawalBtn")
const requestWithdrawalBtn = $("#requestWithdrawalBtn")
const amount = $("#amount")
const paymentMode = $("#paymentMode")
const address  = $("#address")



requestWithdrawalBtn.on('click',function(e){
  e.preventDefault()



  $('select,input').removeClass('is-invalid')
  const amountVal = amount.val()
  const paymentModeVal = paymentMode.find(":selected").val()
  const addressVal = address.val()

   if(isEmpty(amountVal)){
     amount.addClass('is-invalid')
   }
   if(isEmpty(paymentModeVal)){
     paymentMode.addClass('is-invalid')
   }
    if(isEmpty(addressVal)){
      address.addClass('is-invalid')
   }
   let errors = $('form').find('.is-invalid').length

   if(errors < 1 ){
         swal({
           text:"Send payment Request?",
           icon: "info",
           buttons:["Cancel","Continue"]
         })
         .then(function(isConfirm){
           if(isConfirm){
             const data = {
               amount:amountVal,
               paymentMode:paymentModeVal,
               address:addressVal
             }
             $.ajax({
               type:'post',
               url:'/account/withdraw/request',
               data:data
             })
             .done(function(ajaxResult){
               if(ajaxResult.error){
                 swal({
                   text:ajaxResult.error,
                   icon:"error"
                 })
               }else if(ajaxResult.success){
                 $('.form-control').val('')
                 swal({
                   text : "Payment request sent successfully",
                   icon:"success"
                 })
                 .then(function(isConfirm){
                   if(isConfirm){
                     window.location.replace('/user/withdraw')
                   }
                 })
               }
             })
           }
         })
   }




})//requestWithdrawalBtn.click
//=============================================withdraw========================================//


//========================settings======================================//
const firstname = $("#firstname")
const lastname  = $("#lastname")

const accountNameSubmit = $("#accountNameSubmit")

accountNameSubmit.click(function(e){
   e.preventDefault();
   $("#firstname,#lastname").removeClass('is-invalid')

   let firstnameVal = firstname.val();
   let lastnameVal  = lastname.val();

   if(isEmpty(firstnameVal)){
     firstname.addClass('is-invalid')
   }

   if(isEmpty(lastnameVal)){
     lastname.addClass('is-invalid');
   }

   let errors = $("#settingsName").find('.is-invalid').length;
   if(errors < 1){
     $.ajax({
       type:'post',
       url:'/user/settings/accountname',
       data:{firstname:firstnameVal,lastname:lastnameVal}
     })
     .done(function(result){
       if(result.success){
         $("#accountNameAlert").addClass('alert alert-success').text(result.success)
         setTimeout(function(){ window.location.href = "/user/settings"; }, 500);
       }
     })
   }


})


//=============change password================//
const currentPassword = $("#currentPassword");
const newPassword  = $("#newPassword");
const confirmPassword = $("#confirmPassword")
const changePasswordSubmit = $("#changePasswordSubmit")

changePasswordSubmit.click(function(e){
  e.preventDefault();

  $("#currentPassword,#newPassword,#confirmPassword").removeClass('is-invalid')

  let currentPasswordVal = currentPassword.val();
  let newPasswordVal     = newPassword.val();
  let confirmPasswordVal = confirmPassword.val();

  if(isEmpty(currentPasswordVal)){
    currentPassword.addClass('is-invalid')
  }
  if(isEmpty(newPasswordVal)){
    newPassword.addClass('is-invalid')
  }

  if(newPasswordVal !== confirmPasswordVal){
    confirmPassword.addClass('is-invalid')
  }

  let errors = $("#settingsPassword").find('.is-invalid').length;
  if(errors < 1){
        $.ajax({
          type:'post',
          url:'/user/settings/password',
          data:{password:currentPasswordVal,newPassword:newPasswordVal,confirmPassword:confirmPasswordVal}
        })
        .done(function(result){
          $("#changePasswordError").removeClass('alert-danger')
          if(result.error){
              $("#changePasswordError").addClass('alert alert-danger').text(result.error)
          }
          if(result.success){
            $("#changePasswordError").addClass('alert alert-success').text(result.success)
            currentPassword.val('')
            newPassword.val('')
            confirmPassword.val('')
            setTimeout(function(){ window.location.href = "/user/settings"; }, 500)
          }
          ;
        })
  }

})
