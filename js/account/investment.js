const goldBtn = $("#goldBtn");
const diamondBtn = $("#diamondBtn");
const platinumBtn = $("#platinumBtn")


goldBtn.on('click',function(){
  swal({
    text:"Continue activating Gold package?",
    buttons:['Cancel','Continue'],
    icon:"info"
  })
  .then(function(isConfirm){
    if(isConfirm){
      window.location.href = "/account/investment/deposit?package=gold"
    }
  })
})


diamondBtn.on('click',function(){
  swal({
    text:"Continue activating Diamond package?",
    buttons:['Cancel','Continue'],
    icon:"info"
  })
  .then(function(isConfirm){
    if(isConfirm){
      window.location.href = "/account/investment/deposit?package=diamond"
    }
  })
})

platinumBtn.on('click',function(){
  swal({
    text:"Continue activating Platinum package?",
    buttons:['Cancel','Continue'],
    icon:"info"
  })
  .then(function(isConfirm){
    if(isConfirm){
      window.location.href = "/account/investment/deposit?package=platinum"
    }
  })
})


const currency = $('#currency')
const amount   = $("#amount");
const wallet   = $("#wallet");
const transactionId = $("#transactionId")
const confirmPaymentBtn = $("#confirmPaymentBtn")

const packageErrorStore = {
  'emptyCurrency' : "Please select currency",
  "amountEmpty"   : "Please enter amount",
  "walletEmpty"   : "Provide wallet address",
  "transactionIdEmpty" : "Enter Transaction ID"
}

packageError = [
  'emptyCurrency',
  "amountEmpty"  ,
  "walletEmpty" ,
  "transactionIdEmpty"
]
confirmPaymentBtn.on('click',function(e){
  e.preventDefault()
  $('.error').html('')
  $('.form-control').removeClass('border-danger')

   const currencyVal = currency.find(':selected').val()
   const amountVal   = amount.val()
   const walletVal  = wallet.val()
   const transactionIdVal = transactionId.val()

   check(isEmpty(currencyVal),'emptyCurrency',packageError)
   check(isEmpty(amountVal),'amountEmpty',packageError)
   check(isEmpty(walletVal),'walletEmpty',packageError)
   check(isEmpty(transactionIdVal),'transactionIdEmpty',packageError)

  if(packageError.length > 0 ){
    packageError.forEach(function(error){
      $('.'+error).html(packageErrorStore[error])
      $('.'+error).siblings('.form-control').addClass('border-danger')
    })
  }else{
    const data = {
      amount:amountVal,
      currency:currencyVal,
      wallet:walletVal,
      transactionId:transactionIdVal,
      type:$("#type").val(),
      package:$("#package").val()
    }
    $.ajax({
      type:'post',
      url:"/account/investment/deposit/confirm-deposit",
      data:data
    })
    .done(function(ajaxResult){
      if(ajaxResult.error){
        swal({
          text:ajaxResult.error,
          icon:'error'
        })
      }else if(ajaxResult.success){
        swal({
          text:ajaxResult.success,
          icon:"success"
        })
        .done(function(isConfirm){
          if(isConfirm){
            window.location.replace('/account/summary')
          }
        })
      }
    })
  }
})
