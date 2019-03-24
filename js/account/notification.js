const notificationHand = $("#notificationHand")
const notificationCount = $("#notificationCount")

const singleNotePreview = $('.singleNotePreview')
singleNotePreview.on('click',function(e){
  const target = $(e.target);
  const noteId = target.attr('noteid');

  const data = {noteId:noteId}
  $.ajax({
    type:'post',
    url : '/account/notifications/singlenote/read',
    data:data
  })
})
notificationHand.on('click',function(){
  $.ajax({
    type : 'post',
    url  : '/account/notifications/read'
  })
  .done(function(ajaxResult){
    if(ajaxResult.success){
      notificationCount.remove();
    }
  })
})
