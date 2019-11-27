const burger = $("#burger")
const mainNavClose = $("#mainNavClose")
const mainNav = $("#main-nav")


burger.click(function(){
  mainNav.toggleClass('mobileNavActive')
  burger.toggleClass('change')
})
//burger
//close button
