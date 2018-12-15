
//=================================for notifications==============================//
const notificationDropdown = $('#notificationDropdown');
const notificationCount    = $('.js-notification-count');
notificationDropdown.on('click',function(){
  $.ajax({
    type:'put',
    url:'/account/user/notification'
  }).done(function(){
    notificationCount.remove();
  })
})

//=============copy url===============//
$('.clipboard').on('click',function(){
  const clipboard = new Clipboard('.clipboard');
  clipboard.on('success', function(e) {
    $('.clipboard').html('Copied!');

  });
})


//======================for payment=============//
const displayPaymentOption = function(){
  const card_payment_section = $('.card-payement-section');
  const paypal_payment_section = $('.paypal-payment-section');
  if($('#card-option').is(':checked')) {
    // paypal_payment_section.hide();
    // card_payment_section.show();
    console.log('card is checked')
   }
  else if($('#paypal-option').is(':checked')){
    // card_payment_section.hide();
    // paypal_payment_section.show();
    console.log('paypal is checked')
  }
}
displayPaymentOption();
