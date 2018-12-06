//==================FOR STICKY HEADER========================//
$('.header').sticky();

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

 const showMenu =  ()=>{
  $('.js-hamburger').on('click',()=>{
    $('body').toggleClass('translate');
    $('.burger-cont').toggleClass('p-relative');
    $('.burger1,.burger2,.burger3').toggleClass('change');
    $('body').toggleClass('control-body');
  });
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
$('.form-submit').on('click',(e)=>{
  e.preventDefault();
  check_for_empty_fields();
  email_validate();
  check_confirm_password();
  submit_disabled();
  if(errors.length==0){
    signup();
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
      function signup_redirect(){
        $('.signup-loader').css('display','inline-block !important');
        window.location.replace(result.success);
      }
      setTimeout(signup_redirect,3000);
    }
  })
}
