var fromAmount = $('#fromAmount').val();
console.log(fromAmount);
var from = $('#from').val();
console.log(from);
var to = $('#to').val();
console.log(to);

function convert(){
  $.ajax({
      url: 'http://www.apilayer.net/api/live?access_key=476a103e3541250b9aa2b704e0ac4185'+'&from='+from+'&to='+to+'&amount='+fromAmount,
      dataType: 'jsonp',
      success: function(json) {
        alert(json.result);
      }
  });
}
