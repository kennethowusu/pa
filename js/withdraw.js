


const withdrawPaymentOption  = $("#withdrawPaymentOption");
const withdrawPaymentOptionError = $("#withdrawPaymentOptionError")
const withdrawPaymentDetailError = $("#withdrawPaymentDetailError")
const withdrawPaymentAddress = $("#withdrawPaymentAddress");
const withdrawPaymentBtn     = $("#withdrawPaymentBtn")


withdrawPaymentBtn.on('click',function(){

  const withdrawPaymentOptionVal = withdrawPaymentOption.find(':selected').val();
  const withdrawPaymentAddressVal = withdrawPaymentAddress.val();
  $('.withdrawPaymentErrors').html('')

  if(withdrawPaymentOptionVal.length == '0'){
    withdrawPaymentOptionError.html('Choose payment option')
  }

  else if(withdrawPaymentAddressVal.length == '0'){
    console.log(withdrawPaymentAddressVal)
    console.log(withdrawPaymentAddressVal)
    withdrawPaymentDetailError.html('Enter payment Address')
  }

  else{
    showLoader();
    const data = {paymentOption:withdrawPaymentOptionVal,paymentAddress:withdrawPaymentAddressVal}
    $.ajax({
      type:'post',
      url:'/account/withdraw/request',
      data:data
    }).done(function(ajaxResult){
      if(ajaxResult.hasOwnProperty('success')){
        function redirect(){
          window.location.replace('/account/withdraw')
        }
        setTimeout(redirect,3000)
      }

    })
  }

})
