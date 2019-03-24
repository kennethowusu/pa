$('.refLink').on('click',function(){
  const clipboard = new ClipboardJS('.refLink');;
  clipboard.on('success', function(e) {
    $('.refLink').html('Copied!');

  });
})


function uncopy(e){
  const btn = $(e.target);
  $('.clip').not(btn).html('Copy')
}
//=========copy crypto currency addresses=====//


$('.bitcoin').on('click',function(e){
  const clipboard = new ClipboardJS('.bitcoin');
  clipboard.on('success', function(e) {
    $('.bitcoin').html('Copied!');
  });
    uncopy(e);
})

$('.bitcoin-cash').on('click',function(e){
  const clipboard = new ClipboardJS('.bitcoin-cash');
  clipboard.on('success', function(e) {
    $('.bitcoin-cash').html('Copied!');
  });
    uncopy(e);
})

$('.ethereum').on('click',function(e){
  const clipboard = new ClipboardJS('.ethereum');
  clipboard.on('success', function(e) {
    $('.ethereum').html('Copied!');


  });
  uncopy(e);
})


$('.stellar').on('click',function(e){
  const clipboard = new ClipboardJS('.stellar');
  clipboard.on('success', function(e) {
    $('.stellar').html('Copied!');
  });
    uncopy(e);
})
