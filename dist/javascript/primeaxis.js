const burger = $("#burger")
const mainNavClose = $("#mainNavClose")
const mainNav = $("#main-nav")


burger.click(function(){
  mainNav.toggleClass('mobileNavActive')
  burger.toggleClass('change')
})
//burger
//close button

//Add style to header on scroll
$(window).scroll(function() {
    
     var scroll = $(window).scrollTop();
     if (scroll >= 75) {
         burger.addClass("scrolled");
     } else {
         burger.removeClass("scrolled");
     }
 });
