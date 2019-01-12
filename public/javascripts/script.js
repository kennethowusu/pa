//==================FOR STICKY HEADER========================//
// $('.header').sticky();

$('.header').on('sticky-start',function(){
  $('.header').toggleClass('header-sticky');
  $('.nav-link').toggleClass('links-sticky');
  $('.burger1,.burger2,.burger3').addClass('burger-sticky');
  $('.hamburger-text,.sublist a').addClass('hamburger-text-sticky');
  $('.hamburger').addClass('hamburger-sticky');
})

$('.header').on('sticky-end',function(){
  $('.header').removeClass('header-sticky');
  $('.nav-link').removeClass('links-sticky');
  $('.burger1,.burger2,.burger3').removeClass('burger-sticky');
  $('.hamburger-text,.sublist a').removeClass('hamburger-text-sticky');
  $('.hamburger').removeClass('hamburger-sticky');
})




//==================FOR HAMBURGER=====================//

function showMenu(){
  $('.hamburger').on('click',function(){
    $('.nav').toggleClass('translate');
  })
}
showMenu();
const errors = [];
const firstname         = $('.firstname');
const lastname          = $('.lastname');
const country           = $('.country');
const email             = $('.email');
const password          = $('.password');
const confirm_password  = $('.confirm_password');

//=========================empty element messages============//
const firstname_empty
 = `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">First name must not be empty<span>`;

const lastname_empty
 = `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">Last name name must not be empty<span>`;

const country_empty
= `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">Please choose a country<span>`;

const email_empty
 = `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">Email must not be empty<span>`;

 const password_empty =
  `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">Enter a password<span>`;

const email_val_error =
`<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">Enter a valid email address<span>`;
const password_confirm_error =
`<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">Passwords do not match<span>`;

function element_exist_and_empty(element,empty_element_message){
  if(element.length && element.val().length<1){
    element.siblings('.error-div').html(empty_element_message);
    add_error_border(element);
    addToErrors(element.attr('attr-name')+'-empty');

  }else{
    element.siblings('.error-div').html('');
    remove_error_border(element);
    removeFromErrors(element.attr('attr-name')+'-empty');
  }
}


function check_for_empty_fields(){
  element_exist_and_empty(firstname,firstname_empty);
  element_exist_and_empty(lastname,lastname_empty);
  element_exist_and_empty(country,country_empty);
  element_exist_and_empty(email,email_empty);
  element_exist_and_empty(password,password_empty);
}
//============add to errors=====//
function addToErrors(errorName){
  if(errors.includes(errorName)){
    return;
  }
 errors.push(errorName);
 return console.log(errors);
}

//==========remove from errors=========//
function removeFromErrors(errorName){
 if(errors.includes(errorName)){
   var index = errors.indexOf(errorName);
   if (index > -1) {
    errors.splice(index, 1);
   }
   return console.log(errors);
 }
 return;

}

//============validate email ==============//
function email_validate(){
  const pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  if(!errors.includes('email-empty')){
    if (!pattern.test(email.val())){
        email.siblings('.error-div').html(email_val_error);
        add_error_border(email);
        addToErrors(email.attr('attr-name')+'-val');
    }else{
      email.siblings('.error-div').html('');
      remove_error_border(email);
      removeFromErrors(email.attr('attr-name')+'-val');
    }
  }
}

function check_confirm_password(){
  if(!errors.includes('password-empty')){
    if(password.val() !== confirm_password.val()){
      confirm_password.siblings('.error-div').html(password_confirm_error);
      addToErrors(confirm_password.attr('attr-name')+'-val');
      add_error_border(confirm_password);
    }else{
      confirm_password.siblings('.error-div').html('');
      remove_error_border(confirm_password);
      removeFromErrors(confirm_password.attr('attr-name')+'-val');
    }
  }
}

function submit_disabled(){
  if(errors.length>0){
    $('.form-submit').addClass('submit-disabled');
    // submit_enabled();
  }
}
$('input').on('keypress',function(){
  $('.form-submit').removeClass('submit-disabled');
})
function add_error_border(element){
  element.addClass('border-red');
}

function remove_error_border(element){
  element.removeClass('border-red');
}
// function submit_enabled(){
//   $('body').on('click',function(){
//     if($('.form-submit').hasClass('submit-disabled')){
//       $('.form-submit').removeClass('submit-disabled');
//     }
//   })
// }
//=======================for signup==================================//
$('.form-submit.signup').on('click',(e)=>{
  e.preventDefault();
  check_for_empty_fields();
  email_validate();
  check_confirm_password();
  submit_disabled();
  if(errors.length==0){
    signup();
  }
});

//=======================for signup==================================//
$('.form-submit.signin').on('click',(e)=>{
  e.preventDefault();
  check_for_empty_fields();
  email_validate();
  submit_disabled();
  if(errors.length==0){
    signin();
  }
});

//=============================ajax request for signup=====================//
function signup(){
  const data = $('.form-signup').serialize();
  const url  = '/register';
  $.ajax({
    type:"post",
    url:url,
    data:data
  }).done(function(result){
    if(result.hasOwnProperty('email_error')){
      var emailError =  `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">${result.email_error}<span>`;
      email.siblings('.error-div').html(emailError);
      add_error_border(email);
    }else if(result.hasOwnProperty('success')){
      remove_error_border(email);
        $('.form-submit').addClass('submit-disabled');
        $('.signup-loader').css('display','inline');
      function signup_redirect(){

        $('.signup-loader').css('display','inline-block !important');
        window.location.replace(result.success);
      }
      setTimeout(signup_redirect,3000);
    }
  })
}


function signin(){
  const data = $('.form-signin').serialize();
  const url  = '/login';
  $.ajax({
    type:"post",
    url:url,
    data:data
  }).done(function(result){
    if(result.hasOwnProperty('sign_in_mail_error')){
      var emailError =  `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">${result.sign_in_mail_error}<span>`;
      email.siblings('.error-div').html(emailError);
      add_error_border(email);
    }else if(result.hasOwnProperty('sign_in_password_error')){
      var passwordError =  `<span class="error"><img src="/images/rasta/warning.png " class="error-img " alt="">${result.sign_in_password_error}<span>`;
      password.siblings('.error-div').html(passwordError);
      add_error_border(password)
    }
    else if(result.hasOwnProperty('success')){
      remove_error_border(email);
      remove_error_border(password);
      $('.form-submit').addClass('submit-disabled');
      $('.signup-loader').css('display','inline');
      function signin_redirect(){
        submit_disabled();
        $('.signup-loader').css('display','inline-block !important');
        window.location.replace(result.success);
      }
      setTimeout(signin_redirect,3000);
    }
  })
}
//=======reset password ============//
$('.form-notice.reset').on('click',function(e){
  e.preventDefault();
  $('.password-reset-form-cont').toggle();
})
$('.form-box.reset-link').on('click',function(){
  const email = $('#recovery_email').val();
  const data  = {email:email};
  $.ajax({
    type:'post',
    url : '/account/password/reset/send',
    data : data
  }).done(function(result){
    $('.reset-link-notice').html(result);
  })
})

//===for faqs===//
$('.tab-btn-investment').on('click',function(e){
  $(e.target).addClass('active');
  $('.tab-btn-info').removeClass('active');
  $('.information-faq').hide();
  $('.investment-faq').show();
})

$('.tab-btn-info').on('click',function(e){
  $(e.target).addClass('active');
  $('.tab-btn-investment').removeClass('active');
  $('.investment-faq').hide();
  $('.information-faq').show();
})
//  const headers = {'Access-Control-Allow-Credentials': true}
// $.ajax({
//   type:'get',
//   url:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//   xhrFields: {
//         withCredentials: true
//     },
//   crossDomain: true,
//   data:{'CMC_PRO_API_KEY':'ad9410ba-172b-4f51-866b-5812dccf5271'}
// }).done(function(data){
//   console.log(data)
// })
