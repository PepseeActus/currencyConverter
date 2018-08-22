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

      $('select').formSelect();
    }
  }
  xhttp.open('GET', 'http://data.fixer.io/api/latest?access_key=bbaa60a02be8dc9a0739ac9e1dd37a3f', true);
  xhttp.send();
}

function convertCurrency(way) {
  if (way == 'right') {
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var fromAmount = document.getElementById('fromAmount').value;
    var toAmount = document.getElementById('toAmount');
  } else {
    var from = document.getElementById('to').value;
    var to = document.getElementById('from').value;
    var fromAmount = document.getElementById('toAmount').value;
    var toAmount = document.getElementById('fromAmount');
  }

  if(from.length>0 && to.length>0 && fromAmount.length>0){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if (xhttp.readyState == 4 && xhttp.status == 200){
        var obj = JSON.parse(this.responseText);
        var fact = obj.rates[to];

        if (fact != undefined){
          var result = convert(fromAmount, from, to, obj);

          toAmount.value = result.toFixed(2);
        }
      }
    }
    xhttp.open('GET', 'http://data.fixer.io/api/latest?access_key=bbaa60a02be8dc9a0739ac9e1dd37a3f'+'&from='+from+'&to='+to, true);
    xhttp.send();
  }
}

function convert(amount, currencyIn, currencyOut, json) {
  var currencyInRate = json.rates[currencyIn];
  var currencyOutRate = json.rates[currencyOut];
  if (currencyIn == 'EUR') {
    var result = parseFloat(amount) * parseFloat(currencyOutRate);

    return result;
  } else if (currencyOut == 'EUR') {
    var result = parseFloat(amount) / parseFloat(currencyInRate);

    return result;
  } else {
    var result = (parseFloat(amount) / parseFloat(currencyInRate)) * parseFloat(currencyOutRate);
    console.log(result);
    return result;
  }
}
