// //==================FOR STICKY HEADER========================//
// $('.header').sticky();
//
// $('.header').on('sticky-start',function(){
//   $('.header').toggleClass('header-sticky');
//   $('.nav-link').toggleClass('links-sticky');
//   $('.burger1,.burger2,.burger3').addClass('burger-sticky');
//   $('.hamburger-text,.sublist a').addClass('hamburger-text-sticky');
//   $('.hamburger').addClass('hamburger-sticky');
// })
//
// $('.header').on('sticky-end',function(){
//   $('.header').removeClass('header-sticky');
//   $('.nav-link').removeClass('links-sticky');
//   $('.burger1,.burger2,.burger3').removeClass('burger-sticky');
//   $('.hamburger-text,.sublist a').removeClass('hamburger-text-sticky');
//   $('.hamburger').removeClass('hamburger-sticky');
// })
//
//
//
//
// //==================FOR HAMBURGER=====================//
//
//  const showMenu =  ()=>{
//   $('.js-hamburger').on('click',()=>{
//     $('body').toggleClass('translate');
//     $('.burger-cont').toggleClass('p-relative');
//     $('.burger1,.burger2,.burger3').toggleClass('change');
//     $('body').toggleClass('control-body');
//   });
// }
//
// // showMenu();
//
//

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

function element_exist_and_empty(element,empty_element_message){
  if(element.length && element.val().length<1){
    element.siblings('.error-div').html(empty_element_message);
    addToErrors(element.attr('attr-name')+'-empty');
  }else{
    return false;
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

//=======================for signup==================================//
$('.form-submit').on('click',(e)=>{
  e.preventDefault();
  check_for_empty_fields();
});
