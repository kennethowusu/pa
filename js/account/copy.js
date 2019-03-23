$('.refLink').on('click',function(){
  const clipboard = new ClipboardJS('.refLink');;
  clipboard.on('success', function(e) {
    $('.refLink').html('Copied!');

  });
})
