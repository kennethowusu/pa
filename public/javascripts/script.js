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
  });
}

showMenu();
