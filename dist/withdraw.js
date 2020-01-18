
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
