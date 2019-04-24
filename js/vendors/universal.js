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
