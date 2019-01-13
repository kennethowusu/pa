
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
    if(amount >=10000){
      window.location.href = "/account/plan/deposit?type="+plan_type+'&amount='+amount+'&title='+title;
    }else{
      $('.error-message').html(error_message);
    }
  }else if(plan_type=='platinum-plan'){
    if(amount >=1000){
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
