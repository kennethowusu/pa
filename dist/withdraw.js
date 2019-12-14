
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




function addToErrors(errorName,errorContainer){
  if(errorContainer.includes(errorName)){
    return;
  }
 errorContainer.push(errorName);
 return console.log(errorContainer);
}

function removeFromErrors(errorName,errorContainer){
 if(errorContainer.includes(errorName)){
   var index = errorContainer.indexOf(errorName);
   if (index > -1) {
    errorContainer.splice(index, 1);
   }
   return console.log(errorContainer);
 }
 return;

}

function check(condition,errorName,errorContainer){
  if(condition){
    addToErrors(errorName,errorContainer)
  }else{
    removeFromErrors(errorName,errorContainer)
  }
}

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
withdrawBtn.on('click',function(e){
  $("#withdrawalModal").modal()
})

const withdrawErrorStore = {
  paymentErr : "Select payment mode",
  addressErr : "Provide  wallet address",
  amountErr  : "Enter amount to withdraw"
}
const withdrawError = [
  "paymentErr" ,
  "addressErr",
  "amountErr"
]
requestWithdrawalBtn.on('click',function(e){
  e.preventDefault()
  $('.error').html('');
  $('.form-control').removeClass('border-danger')

  const amountVal = amount.val()
  const paymentModeVal = paymentMode.find(":selected").val()
  const addressVal = address.val()
  check(isEmpty(paymentModeVal),'paymentErr',withdrawError)
  check(isEmpty(amountVal),'amountErr',withdrawError)
  check(isEmpty(addressVal),'addressErr',withdrawError)

  if(withdrawError.length > 0){
    withdrawError.forEach(function(error){
      $('.'+error).html(withdrawErrorStore[error])
      $('.'+error).siblings('.form-control').addClass('border-danger')
    })
  }else{
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
})
