
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
