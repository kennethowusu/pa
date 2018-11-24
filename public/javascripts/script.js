//==================FOR HAMBURGER=====================//

 const showMenu =  ()=>{
  $('.js-hamburger').on('click',()=>{
    $('body').toggleClass('translate');
    $('.burger-cont').toggleClass('p-relative');
    $('.burger1,.burger2,.burger3').toggleClass('change');
  });
}

showMenu();
