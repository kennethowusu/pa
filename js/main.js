
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


function uncopy(e){
  const btn = $(e.target);
  $('.clip').not(btn).html('Click to copy')
}
//=========copy crypto currency addresses=====//
$('.btc-clip').on('click',function(e){
  const clipboard = new Clipboard('.btc-clip');
  clipboard.on('success', function(e) {
    $('.btc-clip').html('Copied!');


  });
  uncopy(e);
})


$('.btc-cash-clip').on('click',function(e){
  const clipboard = new Clipboard('.btc-cash-clip');
  clipboard.on('success', function(e) {
    $('.btc-cash-clip').html('Copied!');
  });
    uncopy(e);
})

$('.eth-clip').on('click',function(e){
  const clipboard = new Clipboard('.eth-clip');
  clipboard.on('success', function(e) {
    $('.eth-clip').html('Copied!');


  });
  uncopy(e);
})


$('.stellar-clip').on('click',function(e){
  const clipboard = new Clipboard('.stellar-clip');
  clipboard.on('success', function(e) {
    $('.stellar-clip').html('Copied!');


  });
    uncopy(e);
})



//======================for payment=============//
const card_payment_section = $('.card-payment-section');
const paypal_payment_section = $('.paypal-payment-section');
const crypto_payment_section = $('.crypto-payement-section');

const displayPaymentOptionAction =  function(){
  if($('#card-option').is(':checked')) {
    paypal_payment_section.hide();
    crypto_payment_section.hide();
    card_payment_section.show();
   }
  else if($('#paypal-option').is(':checked')){
    card_payment_section.hide();
    crypto_payment_section.hide();
    paypal_payment_section.show();
  }

  else if($('#crypto-option').is(':checked')){
    card_payment_section.hide();
    paypal_payment_section.hide();
    crypto_payment_section.show();
  }

}
const displayPaymentOption = function(){
  $('#card-option,#paypal-option,#crypto-option').on('click',function(){
     displayPaymentOptionAction();
  })
}
displayPaymentOptionAction();
displayPaymentOption();


//=========for investment plan====//
const plan_modal_container = $('.plan-modal-container');
const showPlanModal = function(){
  $('.btn.apply-plan').on('click',function(e){
    const target = $(e.target);
    const title = target.siblings('.plan-title').attr('value');
    const plan_type = target.siblings('.plan-title').attr('name');
    const url = "/account/includes/plan";
    const error_message = target.siblings('.plan-title').attr('error-message');
    $.ajax({
      type:'get',
      url:url
    }).done(function(result){
      $('.plan-modal-container').html(result);
      $('.modal-title').html(title);
      $('.plan-type').attr('name',plan_type);
      $('.plan-type').attr('error-message',error_message)
    })
  })
}
const closePlanModal = function(){
  plan_modal_container.on('click','.modal-plan-close',function(){
    $('.modal').remove();
  })
}
showPlanModal();
closePlanModal();
plan_modal_container.on('click','.plan-proceed-link',function(e){
  const amount = $('.amount').val();
  const plan_type = $('.plan-type').attr('name');
  const error_message = $('.plan-type').attr('error-message');
  const title = $('.modal-title').html();
  if(plan_type=='gold-plan'){
    if(amount > 999 && amount<=10000){
      window.location.href = "/account/plan/deposit?type="+plan_type+'&amount='+amount+'&title='+title;
    }else{
      $('.error-message').html(error_message);
    }
  }else if(plan_type=='diamond-plan'){
    if(amount >=11000  && amount<=50000){
      window.location.href = "/account/plan/deposit?type="+plan_type+'&amount='+amount+'&title='+title;
    }else{
      $('.error-message').html(error_message);
    }
  }else if(plan_type=='platinum-plan'){
    if(amount >=50000){
      window.location.href = "/account/plan/deposit?type="+plan_type+'&amount='+amount+'&title='+title;
  }else{
    $('.error-message').html(error_message);
  }
}
})

//===for reset link====//
 const sendResetLink = function(){
   $('#reset-link').on('click',function(e){
     e.preventDefault();
     const url = '/account/confirmation/send';
     $.ajax({
       type : 'get',
       url  : url
     }).done(function(data){
       console.log(data);
     })
   })
 }
sendResetLink();

//======for crypto payment
const crypto_btn = $('#submit-crypto-details');
const crypto_transaction_id = $('#crypto-transaction-id');
const crypto_type = $('#crypto-type');
const crypto_address = $('#crypto-address');
const crypto_fields_error = $('.crypto-fields-error');
crypto_btn.on('click',function(e){


  if(crypto_type.val().length < 1  || crypto_address.val().length < 1 || crypto_transaction_id.val().length < 1){
    crypto_fields_error.html('Please fill in all the fields.')
  }
  else{
    const data = {address:crypto_address.val(),type:crypto_type.val(),transaction_id:crypto_transaction_id.val()};
    $.ajax({
      type:'post',
      url:'/account/plan/deposit/crypto',
      data:data

    }).done(function(result){
      console.log(result);
    })
  }
})





//======for top up crypto payment
const top_up_crypto_btn = $('#top-up-submit-crypto-details');
const top_up_crypto_transaction_id = $('#top-up-crypto-transaction-id');
const top_up_crypto_type = $('#top-up-crypto-type');
const top_up_crypto_address = $('#top-up-crypto-address');
const top_up_crypto_fields_error = $('.top-up-crypto-fields-error');
const top_up_crypto_amount    = $('#top-up-crypto-amount')
top_up_crypto_btn.on('click',function(e){
   if(top_up_crypto_type.val().length == '0' ||
      top_up_crypto_transaction_id.val().length == '0' ||
      top_up_crypto_address.val().length == '0' ||
      top_up_crypto_amount.val().length == '0'

 ){
    top_up_crypto_fields_error.html('Please fill in all the fields.')
   }

   else{
     const data = {address:top_up_crypto_address.val(),
               type:top_up_crypto_type.val(),
               transaction_id:top_up_crypto_transaction_id.val(),
               amount:top_up_crypto_amount.val()
             };

     top_up_crypto_fields_error.html('')
     $.ajax({
       type:'post',
       url:'/account/plan/deposit/crypto/top-up',
       data:data
     }).done(function(result){
       console.log($('.top-up-crypto-cont').html('Thank you for requesting to top up.Your request will be process shortly'))
     })
   }
})


$('.note_ind').on("click",function(e){
  const target = $(e.target);
  const note_id = target.attr('note_id');

  $.ajax({
    type:'put',
    url:'/account/notifications/'+note_id
  }).done(function(result){
      target.parents('card').removeClass('unread');
  })
})