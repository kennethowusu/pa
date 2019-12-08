const burger = $("#burger")
const mainNavClose = $("#mainNavClose")
const mainNav = $("#main-nav")


burger.click(function(){
  mainNav.toggleClass('mobileNavActive')
  burger.toggleClass('change')
})
//burger
//close button

//close nav on click on link
$('.main-nav-link').click(function(){
  mainNav.removeClass('mobileNavActive')
  burger.removeClass('change')
})
//Add style to burger on scroll
$(window).scroll(function() {

     var scroll = $(window).scrollTop();
     if (scroll >= 75) {
         burger.addClass("scrolled");
     } else {
         burger.removeClass("scrolled");
     }
 });

 //Add style to header on scroll
 $(window).scroll(function() {
     const header = $('.header');
      var scroll = $(window).scrollTop();
      if (scroll >= 15) {
          header.addClass("scrolled");
      } else {
          header.removeClass("scrolled");
      }
  });
