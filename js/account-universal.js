

function showLoader(){
  $.ajax({
    type:'get',
    url:'/account/content/loader'
  }).done(function(ajaxResult){
    $('body').append(ajaxResult);
  })
}

function hideLoader(){
  $("#loader").remove();
}
