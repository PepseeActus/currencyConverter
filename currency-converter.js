function loadCurrencies(){
  var from = document.getElementById('from');
  var to = document.getElementById('to');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState == 4 && xhttp.status == 200){
      var obj = JSON.parse(this.responseText);
      var options = '';
      for(key in obj.rates){
        options = options + '<option>' + key + '</option>';
      }
      from.innerHTML = options;
      to.innerHTML = options;
    }
  }
  xhttp.open('GET', 'http://data.fixer.io/api/latest?access_key=bbaa60a02be8dc9a0739ac9e1dd37a3f', true);
  xhttp.send();
}

function convertCurrency(){
  var from = document.getElementById('from').value;
  var to = document.getElementById('to').value;
  var fromAmount = document.getElementById('fromAmount').value;
  var toAmount = document.getElementById('toAmount');
  if(from.length>0 && to.length>0 && fromAmount.length>0){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var obj = JSON.parse(this.responseText);
        var fact = obj.rates[to];
        if(fact != undefined){
          toAmount.innerHTML = parseFloat(fromAmount)*parseFloat(fact);
        }
      }
    }
    xhttp.open('GET', 'http://data.fixer.io/api/latest?access_key=bbaa60a02be8dc9a0739ac9e1dd37a3f'+'&from='+from+'&to='+to, true);
    xhttp.send();
  }
}
