//======for hamburger menu=============//
const mobileToggle = $(".mobile-toggle")

mobileToggle.on('click',function(e){
  $('.sidebar').toggleClass('no-translate')
})




function isEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


$('.isMoney,.isNumber').keypress(function(key) {
       if(key.charCode < 48 || key.charCode > 57) return false;
   });




$('.isMoney').on('focusout',function(e){

const target = $(e.target);
const targetValue = parseFloat(Math.abs(target.val()))
target.val(targetValue.toFixed(2))

})




function addToErrors(errorName,errorContainer){
  if(errorContainer.includes(errorName)){
    return;
  }
 errorContainer.push(errorName);
 return console.log(errorContainer);
}

function removeFromErrors(errorName,errorContainer){
 if(errorContainer.includes(errorName)){
   var index = errorContainer.indexOf(errorName);
   if (index > -1) {
    errorContainer.splice(index, 1);
   }
   return console.log(errorContainer);
 }
 return;

}

function check(condition,errorName,errorContainer){
  if(condition){
    addToErrors(errorName,errorContainer)
  }else{
    removeFromErrors(errorName,errorContainer)
  }
}

 function isEmpty(fieldVal){
  if(fieldVal.length == '0'){
    return true
  }else{
    return false;
  }
}

function isTheSame(firstValue,secondValue){
  if(firstValue === secondValue){
    return true;
  }else{
    return false;
  }
}
