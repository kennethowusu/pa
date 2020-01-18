





//=======================sidebar====================//
let header__burger = $('.header__burger');
let sidebarOuter   = $('.sidebar--outer');
header__burger.click(function(){
  openSidebar();
})

sidebarOuter.click(function(){
 openSidebar();

})

function openSidebar(){
  $('.sidebar').toggleClass('opened')
  $('.sidebar--outer__background').toggleClass('opened')
  $('.close').toggleClass('opened')
}



//====================overlay======================//
let overlayBtn = $('.overlay-btn')

overlayBtn.click(function(e){
  const target = $(this)
  overlayTarget = target.attr('overlay-target')
  showOverlay(overlayTarget)
})

function showOverlay(overlayId){
  $('.overlay'+'#'+overlayId).toggleClass('active')
  $('body').toggleClass('active')
}

let overlayClose = $('.overlay--btn');
overlayClose.click(function(e){
  let target = $(this)
  target.parents('.overlay').removeClass('active')
  $("body").removeClass('active')
})


//===========================dropdown==================//



  function DropDown(el) {
				this.dd = el;
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dd.on('click', function(event){
						$(this).toggleClass('active');
						event.stopPropagation();
					});
				}
			}

			$(function() {

				var dd = new DropDown( $('#dd') );

				$(document).click(function() {
					// all dropdowns
					$('.wrapper-dropdown-2').removeClass('active');
				});

			});
