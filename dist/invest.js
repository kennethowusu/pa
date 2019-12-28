// $("#investModal").modal()


const packageType = $('.package-type');
const investModal = $('#investModal');
const investProcceed = $("#investProcceed")
const amount = $('#amount')
const amountError = $("#amountError")

packageType.on('click',function(e){
  let target = $(this);
  let name = target.attr('name');
  let min  = target.attr('min');
  let max  = target.attr('max')
  let minAmount = target.attr('minAmount')
  let maxAmount = target.attr('maxAmount')
  let weekly    = target.attr('weekly')


  //=====Insert in Invest Modal=======//
  $('#name').text(name)
  $('#min').text(min)
  $('#max').text(max)
  $("#weekly").text(weekly)


  //=========adding select class====//
  packageType.removeClass('selected');
  target.addClass('selected');

  investProcceed.prop('disabled',false)


 investProcceed.click(function(e){
    investModal.modal()
 })

})
